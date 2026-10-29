import { ObjectId, getProjectsCollection, isMongoConfigured } from '@/lib/mongodb';
import { isAdminAuthenticated, isSameOriginRequest } from '@/lib/admin-auth';
import { normalizeProjectInput } from '@/lib/project-validation';

export const dynamic = 'force-dynamic';

function unauthorized() {
  return Response.json({ error: 'Sign in to manage projects.' }, { status: 401 });
}

export async function PUT(request, { params }) {
  if (!(await isAdminAuthenticated())) return unauthorized();
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: 'Request origin was not accepted.' }, { status: 403 });
  }
  if (!isMongoConfigured()) {
    return Response.json({ error: 'Set MONGODB_URI in your environment first.' }, { status: 503 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return Response.json({ error: 'Project was not found.' }, { status: 404 });
  }

  try {
    const input = normalizeProjectInput(await request.json());
    const collection = await getProjectsCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...input, updatedAt: new Date() } }
    );
    if (!result.matchedCount) {
      return Response.json({ error: 'Project was not found.' }, { status: 404 });
    }
    return Response.json({ ok: true, slug: input.slug });
  } catch (error) {
    if (error?.code === 11000) {
      return Response.json({ error: 'That project URL is already in use.' }, { status: 409 });
    }
    if (error instanceof SyntaxError || error.message?.includes('required')) {
      return Response.json({ error: error.message || 'Invalid project data.' }, { status: 400 });
    }
    console.error('Admin project update failed:', error);
    return Response.json({ error: 'Could not update the project in MongoDB.' }, { status: 503 });
  }
}

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthenticated())) return unauthorized();
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: 'Request origin was not accepted.' }, { status: 403 });
  }
  if (!isMongoConfigured()) {
    return Response.json({ error: 'Set MONGODB_URI in your environment first.' }, { status: 503 });
  }

  const { id } = await params;
  if (!ObjectId.isValid(id)) {
    return Response.json({ error: 'Project was not found.' }, { status: 404 });
  }

  try {
    const collection = await getProjectsCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (!result.deletedCount) {
      return Response.json({ error: 'Project was not found.' }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (error) {
    console.error('Admin project delete failed:', error);
    return Response.json({ error: 'Could not delete the project from MongoDB.' }, { status: 503 });
  }
}

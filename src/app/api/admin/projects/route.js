import { isAdminAuthenticated, isSameOriginRequest } from '@/lib/admin-auth';
import { getAdminProjects, getProjectsCollection, isMongoConfigured } from '@/lib/mongodb';
import { normalizeProjectInput } from '@/lib/project-validation';

export const dynamic = 'force-dynamic';

function unauthorized() {
  return Response.json({ error: 'Sign in to manage projects.' }, { status: 401 });
}

function databaseNotConfigured() {
  return Response.json(
    { error: 'Set MONGODB_URI in your environment before managing projects.' },
    { status: 503 }
  );
}

export async function GET() {
  if (!(await isAdminAuthenticated())) return unauthorized();
  if (!isMongoConfigured()) return databaseNotConfigured();

  try {
    return Response.json({ projects: await getAdminProjects() });
  } catch (error) {
    console.error('Admin project list failed:', error);
    return Response.json({ error: 'Could not load projects from MongoDB.' }, { status: 503 });
  }
}

export async function POST(request) {
  if (!(await isAdminAuthenticated())) return unauthorized();
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: 'Request origin was not accepted.' }, { status: 403 });
  }
  if (!isMongoConfigured()) return databaseNotConfigured();

  try {
    const input = normalizeProjectInput(await request.json());
    const collection = await getProjectsCollection();
    const now = new Date();
    const result = await collection.insertOne({ ...input, createdAt: now, updatedAt: now });
    return Response.json({ id: result.insertedId.toString(), slug: input.slug }, { status: 201 });
  } catch (error) {
    if (error?.code === 11000) {
      return Response.json({ error: 'That project URL is already in use.' }, { status: 409 });
    }
    if (error instanceof SyntaxError || error.message?.includes('required')) {
      return Response.json({ error: error.message || 'Invalid project data.' }, { status: 400 });
    }
    console.error('Admin project create failed:', error);
    return Response.json({ error: 'Could not save the project to MongoDB.' }, { status: 503 });
  }
}

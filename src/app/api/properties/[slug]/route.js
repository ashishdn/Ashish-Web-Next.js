import { requireUser } from '../../../../lib/api-auth.js';
import { getPropertiesCollection, withoutPrivateFields } from '../../../../lib/properties.js';

export const runtime = 'nodejs';

export async function GET(_request, { params }) {
  const { slug } = await params;
  const listing = await (await getPropertiesCollection()).findOne({
    $or: [{ slug }, { id: slug }],
    moderationStatus: 'approved',
    status: { $ne: 'removed' },
  });
  if (!listing) return Response.json({ error: 'Listing not found.' }, { status: 404 });
  return Response.json({ ...withoutPrivateFields(listing), isSubmitted: true });
}

export async function DELETE(request, { params }) {
  const userResult = await requireUser(request);
  if (userResult.response) return userResult.response;
  const { slug: id } = await params;
  const result = await (await getPropertiesCollection()).deleteOne({ id, ownerId: userResult.user.id });
  if (!result.deletedCount) return Response.json({ error: 'Listing not found.' }, { status: 404 });
  return new Response(null, { status: 204 });
}

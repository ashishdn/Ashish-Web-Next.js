import { requireUser } from '../../../../lib/api-auth.js';
import { getPropertiesCollection } from '../../../../lib/properties.js';

export const runtime = 'nodejs';

export async function GET(request) {
  const userResult = await requireUser(request);
  if (userResult.response) return userResult.response;
  const listings = await (await getPropertiesCollection())
    .find({ ownerId: userResult.user.id, moderationStatus: { $ne: 'deleted' } })
    .project({ _id: 0 }).sort({ createdAt: -1 }).toArray();
  return Response.json(listings);
}

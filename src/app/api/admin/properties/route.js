import { requireAdmin } from '../../../../lib/api-auth.js';
import { getPropertiesCollection } from '../../../../lib/properties.js';

export const runtime = 'nodejs';

export async function GET(request) {
  const adminResult = await requireAdmin(request);
  if (adminResult.response) return adminResult.response;
  const listings = await (await getPropertiesCollection())
    .find({ moderationStatus: { $in: ['pending', 'rejected', 'approved'] } })
    .project({ _id: 0 }).sort({ createdAt: -1 }).toArray();
  return Response.json(listings);
}

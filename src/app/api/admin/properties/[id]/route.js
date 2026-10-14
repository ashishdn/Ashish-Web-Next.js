import { requireAdmin } from '../../../../../lib/api-auth.js';
import { getPropertiesCollection, readJsonBody } from '../../../../../lib/properties.js';

export const runtime = 'nodejs';

export async function PATCH(request, { params }) {
  const adminResult = await requireAdmin(request);
  if (adminResult.response) return adminResult.response;

  const parsed = await readJsonBody(request, 1024 * 1024);
  if (parsed.error) return parsed.error;
  const { moderationStatus } = parsed.data || {};
  if (!['approved', 'rejected'].includes(moderationStatus)) {
    return Response.json({ error: 'Choose approved or rejected.' }, { status: 400 });
  }

  const { id } = await params;
  const updated = await (await getPropertiesCollection()).findOneAndUpdate(
    { id },
    { $set: { moderationStatus, reviewedAt: new Date().toISOString(), reviewedBy: adminResult.user.id } },
    { returnDocument: 'after', projection: { _id: 0 } },
  );
  if (!updated) return Response.json({ error: 'Listing not found.' }, { status: 404 });
  return Response.json(updated);
}

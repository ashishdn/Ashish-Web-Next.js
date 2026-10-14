import { randomUUID } from 'node:crypto';
import { requireUser } from '../../../lib/api-auth.js';
import { getPropertiesCollection, readJsonBody, withoutPrivateFields } from '../../../lib/properties.js';

export const runtime = 'nodejs';

export async function GET() {
  const properties = await getPropertiesCollection();
  const listings = await properties.find({ moderationStatus: 'approved', status: { $ne: 'removed' } })
    .project({ _id: 0 }).sort({ createdAt: -1 }).toArray();
  return Response.json(listings.map((listing) => ({ ...withoutPrivateFields(listing), isSubmitted: true })));
}

export async function POST(request) {
  const userResult = await requireUser(request);
  if (userResult.response) return userResult.response;

  const parsed = await readJsonBody(request);
  if (parsed.error) return parsed.error;
  const listing = parsed.data;
  const rent = Number(listing?.monthlyRent);
  if (!listing?.title?.bn?.trim() || !listing?.address?.bn?.trim() || !Number.isFinite(rent) || rent <= 0) {
    return Response.json({ error: 'Please provide a title, address, and valid rent.' }, { status: 400 });
  }

  const id = randomUUID();
  const saved = {
    ...listing,
    id,
    slug: id,
    monthlyRent: rent,
    status: 'available',
    moderationStatus: 'pending',
    ownerId: userResult.user.id,
    ownerEmail: userResult.user.email,
    createdAt: new Date().toISOString(),
  };
  await (await getPropertiesCollection()).insertOne(saved);
  return Response.json(saved, { status: 201 });
}

import { getDatabase } from './db.js';

export async function getPropertiesCollection() {
  const database = await getDatabase();
  return database.collection('properties');
}

export async function readJsonBody(request, maxBytes = 15 * 1024 * 1024) {
  const body = await request.text();
  if (Buffer.byteLength(body, 'utf8') > maxBytes) {
    return { error: Response.json({ error: 'The request body is too large.' }, { status: 413 }) };
  }
  try {
    return { data: JSON.parse(body) };
  } catch {
    return { error: Response.json({ error: 'Request body must be valid JSON.' }, { status: 400 }) };
  }
}

export function withoutPrivateFields(listing) {
  const { _id, ownerId, ownerEmail, reviewedBy, reviewedAt, ...publicListing } = listing;
  return publicListing;
}

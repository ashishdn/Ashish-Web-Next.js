import { requireUser } from '../../../lib/api-auth.js';

export const runtime = 'nodejs';

export async function GET(request) {
  const result = await requireUser(request);
  if (result.response) return result.response;
  return Response.json({ user: result.user });
}

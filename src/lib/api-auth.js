import { getAuth } from './auth.js';

export async function requireUser(request) {
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) {
    return { response: Response.json({ error: 'Sign in is required.' }, { status: 401 }) };
  }
  if (!session.user.emailVerified) {
    return { response: Response.json({ error: 'Verify your email before continuing.' }, { status: 403 }) };
  }
  return { user: session.user };
}

export async function requireAdmin(request) {
  const result = await requireUser(request);
  if (result.response) return result;
  if (result.user.role !== 'admin') {
    return { response: Response.json({ error: 'Admin access required.' }, { status: 403 }) };
  }
  return result;
}

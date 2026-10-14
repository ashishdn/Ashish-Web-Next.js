import { toNextJsHandler } from 'better-auth/next-js';
import { getAuth } from '../../../../lib/auth.js';

export const runtime = 'nodejs';

async function handler(request) {
  const auth = await getAuth();
  const handlers = toNextJsHandler(auth);
  const method = handlers[request.method];
  if (!method) return new Response('Method Not Allowed', { status: 405 });
  return method(request);
}

export { handler as GET, handler as POST, handler as PATCH, handler as PUT, handler as DELETE };

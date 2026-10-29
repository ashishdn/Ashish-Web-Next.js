import { cookies } from 'next/headers';
import { ADMIN_COOKIE_NAME, isAdminAuthenticated, isSameOriginRequest } from '@/lib/admin-auth';

export async function GET() {
  return Response.json({ authenticated: await isAdminAuthenticated() });
}

export async function DELETE(request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: 'Request origin was not accepted.' }, { status: 403 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, '', { httpOnly: true, path: '/', maxAge: 0 });
  return Response.json({ ok: true });
}

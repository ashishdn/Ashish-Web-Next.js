import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminToken,
  isAdminConfigured,
  isSameOriginRequest,
  verifyAdminCredentials,
} from '@/lib/admin-auth';

const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function getAttemptKey(request) {
  return (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
}

function recordAttempt(key) {
  const now = Date.now();
  const attempt = attempts.get(key);
  if (!attempt || attempt.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (attempt.count >= MAX_ATTEMPTS) return false;
  attempt.count += 1;
  return true;
}

export async function POST(request) {
  if (!isSameOriginRequest(request)) {
    return Response.json({ error: 'Request origin was not accepted.' }, { status: 403 });
  }
  if (!isAdminConfigured()) {
    return Response.json(
      { error: 'Admin environment variables are not configured yet.' },
      { status: 503 }
    );
  }

  const attemptKey = getAttemptKey(request);
  if (!recordAttempt(attemptKey)) {
    return Response.json(
      { error: 'Too many login attempts. Wait 15 minutes and try again.' },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Enter your username and password.' }, { status: 400 });
  }

  if (!verifyAdminCredentials(body?.username, body?.password)) {
    return Response.json({ error: 'Username or password is incorrect.' }, { status: 401 });
  }

  attempts.delete(attemptKey);
  const cookieStore = await cookies();
  cookieStore.set(
    ADMIN_COOKIE_NAME,
    createAdminToken(process.env.ADMIN_USERNAME),
    adminCookieOptions()
  );

  return Response.json({ ok: true });
}

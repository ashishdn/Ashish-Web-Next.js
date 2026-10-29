import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'ashishweb_admin_session';
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

export function isAdminConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD &&
      process.env.ADMIN_SESSION_SECRET &&
      process.env.ADMIN_SESSION_SECRET.length >= 32
  );
}

function safeEqual(left, right) {
  const leftDigest = createHash('sha256').update(String(left)).digest();
  const rightDigest = createHash('sha256').update(String(right)).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

export function verifyAdminCredentials(username, password) {
  if (!isAdminConfigured()) return false;
  return (
    safeEqual(username, process.env.ADMIN_USERNAME) &&
    safeEqual(password, process.env.ADMIN_PASSWORD)
  );
}

function sign(encodedPayload) {
  return createHmac('sha256', process.env.ADMIN_SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');
}

export function createAdminToken(username) {
  const payload = Buffer.from(
    JSON.stringify({ username, expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1000 })
  ).toString('base64url');
  return `${payload}.${sign(payload)}`;
}

function verifyAdminToken(token) {
  if (!isAdminConfigured() || typeof token !== 'string' || token.length > 2048) {
    return false;
  }

  const [payload, providedSignature, extra] = token.split('.');
  if (!payload || !providedSignature || extra) return false;

  const expectedSignature = sign(payload);
  if (!safeEqual(providedSignature, expectedSignature)) return false;

  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return (
      data.username === process.env.ADMIN_USERNAME &&
      Number.isFinite(data.expiresAt) &&
      data.expiresAt > Date.now()
    );
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DURATION_SECONDS,
  };
}

export function isSameOriginRequest(request) {
  const origin = request.headers.get('origin');
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

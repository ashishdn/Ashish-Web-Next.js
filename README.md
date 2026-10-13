# BachelorBari

Property listings use MongoDB, while Better Auth handles email/password accounts, email verification, and Google sign-in. New submissions stay private until an administrator approves them.

## Local setup

1. Install Node.js 20+ and copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to a MongoDB Atlas or local MongoDB connection string and choose `MONGODB_DB`.
3. Set `BETTER_AUTH_SECRET` to a random secret of at least 32 characters. Keep `.env` private.
4. Add the administrator's email to `ADMIN_EMAILS` before creating that account. Separate multiple addresses with commas. Admin access is assigned server-side; there is no public admin signup or role selector.
5. Configure SMTP (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, and `SMTP_FROM`) so verification and sign-in emails can be delivered.
6. For Google sign-in, create a Google OAuth web client. Add the deployed site's origin as an authorized JavaScript origin and `https://YOUR_DOMAIN/api/auth/callback/google` as an authorized redirect URI. Put the client ID and secret in `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.
7. Set `APP_URL` and `BETTER_AUTH_URL` to the exact deployed origin, then run `npm run dev` locally or `npm run build && npm start` in production.

The server reads `.env` automatically. Set production environment values through the hosting provider's secret manager. MongoDB Atlas must allow connections from the deployed server.

## Access and listing flow

- Email/password signup sends a verification link. Unverified accounts cannot create posts.
- Google sign-in uses Google's account verification.
- `/landlord/dashboard` shows only the signed-in owner's submissions and review status. The owner can delete their own post.
- `/admin` is available only to users whose email is in `ADMIN_EMAILS`; use `/admin/signup` for the allowlisted administrator account. The API independently checks the stored admin role on every admin request.
- Posts start as `pending` and only appear on public pages after approval.
- Existing sample listings are retained as demo content in the frontend.

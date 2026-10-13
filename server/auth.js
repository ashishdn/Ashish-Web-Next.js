import { betterAuth } from 'better-auth';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import nodemailer from 'nodemailer';
import { getDatabase } from './db.js';

const database = await getDatabase();
const adminEmails = new Set(
  (process.env.ADMIN_EMAILS || '').split(',').map((email) => email.trim().toLowerCase()).filter(Boolean)
);

let transporter;
if (process.env.SMTP_HOST) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    } : undefined,
  });
}

export const auth = betterAuth({
  appName: 'BachelorBari',
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || process.env.APP_URL || 'http://localhost:3000',
  trustedOrigins: [process.env.APP_URL, 'http://localhost:3000'].filter(Boolean),
  database: mongodbAdapter(database),
  user: {
    additionalFields: {
      role: { type: ['user', 'admin'], required: false, defaultValue: 'user', input: false },
    },
  },
  socialProviders: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      prompt: 'select_account',
    },
  } : {},
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => sendMail({
      to: user.email,
      subject: 'Reset your BachelorBari password',
      text: `Reset your password: ${url}`,
    }),
  },
  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => sendMail({
      to: user.email,
      subject: 'Verify your BachelorBari email',
      text: `Verify your email address: ${url}`,
    }),
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => ({
          data: {
            ...user,
            role: adminEmails.has(user.email.toLowerCase()) ? 'admin' : 'user',
          },
        }),
      },
    },
  },
});

async function sendMail({ to, subject, text }) {
  if (!transporter || !process.env.SMTP_FROM) {
    console.error('Email delivery is not configured. Set SMTP_* and SMTP_FROM to enable verification emails.');
    throw new Error('Email delivery is not configured');
  }
  await transporter.sendMail({ from: process.env.SMTP_FROM, to, subject, text });
}

export { adminEmails };

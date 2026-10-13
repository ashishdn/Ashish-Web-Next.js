import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fromNodeHeaders, toNodeHandler } from 'better-auth/node';
import { auth } from './auth.js';
import { getDatabase } from './db.js';

const app = express();
const port = Number(process.env.PORT || 3000);
const here = path.dirname(fileURLToPath(import.meta.url));
const database = await getDatabase();
const properties = database.collection('properties');

app.all('/api/auth/*', toNodeHandler(auth));
app.use(express.json({ limit: '12mb' }));

async function signedIn(req, res, next) {
  try {
    const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
    if (!session?.user) return res.status(401).json({ error: 'Sign in is required.' });
    if (!session.user.emailVerified) return res.status(403).json({ error: 'Verify your email before continuing.' });
    req.user = session.user;
    next();
  } catch (error) {
    console.error('Session check failed', error);
    res.status(401).json({ error: 'Your session could not be verified.' });
  }
}

function adminOnly(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin access required.' });
  next();
}

const asyncRoute = (handler) => (req, res, next) => Promise.resolve(handler(req, res, next)).catch(next);

app.get('/api/me', signedIn, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/properties', asyncRoute(async (_req, res) => {
  const listings = await properties.find({ moderationStatus: 'approved', status: { $ne: 'removed' } })
    .project({ _id: 0 }).sort({ createdAt: -1 }).toArray();
  res.json(listings.map(({ ownerId, ownerEmail, reviewedBy, reviewedAt, ...listing }) => ({
    ...listing,
    isSubmitted: true,
  })));
}));

app.post('/api/properties', signedIn, asyncRoute(async (req, res) => {
  const listing = req.body;
  if (!listing?.title?.bn || !listing?.address?.bn || !Number.isFinite(Number(listing.monthlyRent))) {
    return res.status(400).json({ error: 'Please provide a title, address, and valid rent.' });
  }
  const id = crypto.randomUUID();
  const saved = {
    ...listing,
    id,
    slug: id,
    status: 'available',
    moderationStatus: 'pending',
    ownerId: req.user.id,
    ownerEmail: req.user.email,
    createdAt: new Date().toISOString(),
  };
  await properties.insertOne(saved);
  res.status(201).json(saved);
}));

app.get('/api/my/properties', signedIn, asyncRoute(async (req, res) => {
  const listings = await properties.find({ ownerId: req.user.id, moderationStatus: { $ne: 'deleted' } })
    .project({ _id: 0 }).sort({ createdAt: -1 }).toArray();
  res.json(listings);
}));

app.delete('/api/properties/:id', signedIn, asyncRoute(async (req, res) => {
  const filter = { id: req.params.id, ownerId: req.user.id };
  const deleted = await properties.deleteOne(filter);
  if (!deleted.deletedCount) return res.status(404).json({ error: 'Listing not found.' });
  res.status(204).end();
}));

app.get('/api/admin/properties', signedIn, adminOnly, asyncRoute(async (_req, res) => {
  const listings = await properties.find({ moderationStatus: { $in: ['pending', 'rejected', 'approved'] } })
    .project({ _id: 0 }).sort({ createdAt: -1 }).toArray();
  res.json(listings);
}));

app.patch('/api/admin/properties/:id', signedIn, adminOnly, asyncRoute(async (req, res) => {
  const { moderationStatus } = req.body;
  if (!['approved', 'rejected'].includes(moderationStatus)) {
    return res.status(400).json({ error: 'Choose approved or rejected.' });
  }
  const updated = await properties.findOneAndUpdate(
    { id: req.params.id },
    { $set: { moderationStatus, reviewedAt: new Date().toISOString(), reviewedBy: req.user.id } },
    { returnDocument: 'after', projection: { _id: 0 } }
  );
  if (!updated) return res.status(404).json({ error: 'Listing not found.' });
  res.json(updated);
}));

app.use((error, _req, res, _next) => {
  console.error('API request failed', error);
  res.status(500).json({ error: 'The request could not be completed.' });
});

if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
} else {
  const dist = path.resolve(here, '../dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

app.listen(port, () => console.log(`BachelorBari server listening on http://localhost:${port}`));

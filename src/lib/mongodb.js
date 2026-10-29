import { MongoClient, ObjectId } from 'mongodb';
import { projectsData } from '@/data/projects';

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || 'ashishweb';
const clientKey = '__ashishwebMongoClientPromise';

async function getClient() {
  if (!uri) {
    throw new Error('MongoDB is not configured. Set MONGODB_URI in the environment.');
  }

  if (!globalThis[clientKey]) {
    const client = new MongoClient(uri, { appName: 'ashishweb-portfolio' });
    globalThis[clientKey] = client.connect();
  }

  return globalThis[clientKey];
}

export async function getProjectsCollection() {
  const client = await getClient();
  const collection = client.db(databaseName).collection('projects');
  await collection.createIndex({ slug: 1 }, { unique: true });
  return collection;
}

export async function getAdminProjects() {
  const collection = await getProjectsCollection();
  await seedProjectsIfEmpty(collection);
  const documents = await collection.find({}).sort({ sortOrder: 1, createdAt: -1 }).toArray();
  return documents.map(serializeProject);
}

async function seedProjectsIfEmpty(collection) {
  if (await collection.estimatedDocumentCount()) return;

  const now = new Date();
  const seeds = projectsData.projects.map((project, sortOrder) => {
    const { id, ...fields } = project;
    return {
      ...fields,
      published: true,
      sortOrder,
      createdAt: now,
      updatedAt: now,
    };
  });

  try {
    await collection.insertMany(seeds, { ordered: false });
  } catch (error) {
    if (error?.code !== 11000) throw error;
  }
}

function serializeProject(document) {
  const { _id, createdAt, updatedAt, ...fields } = document;
  return {
    ...fields,
    id: _id instanceof ObjectId ? _id.toString() : String(_id || fields.slug),
    published: fields.published !== false,
    createdAt: createdAt instanceof Date ? createdAt.toISOString() : createdAt,
    updatedAt: updatedAt instanceof Date ? updatedAt.toISOString() : updatedAt,
  };
}

export async function getProjects({ publishedOnly = false, featuredOnly = false } = {}) {
  if (!uri) {
    return projectsData.projects
      .map((project, sortOrder) => ({ ...project, sortOrder, published: true }))
      .filter((project) => !featuredOnly || project.featured)
      .filter((project) => !publishedOnly || project.published);
  }

  const collection = await getProjectsCollection();
  await seedProjectsIfEmpty(collection);

  const query = {};
  if (publishedOnly) query.published = { $ne: false };
  if (featuredOnly) query.featured = true;

  const documents = await collection
    .find(query)
    .sort({ sortOrder: 1, createdAt: -1 })
    .toArray();

  return documents.map(serializeProject);
}

export async function getProjectBySlug(slug) {
  const projects = await getProjects({ publishedOnly: true });
  return projects.find((project) => project.slug === slug) || null;
}

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export { ObjectId };

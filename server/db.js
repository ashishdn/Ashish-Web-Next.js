import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI is required');

const client = new MongoClient(uri);
let databasePromise;

export async function getDatabase() {
  if (!databasePromise) {
    databasePromise = client.connect().then(() =>
      client.db(process.env.MONGODB_DB || undefined)
    );
  }
  return databasePromise;
}

export { client };

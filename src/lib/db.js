import { MongoClient } from 'mongodb';

const globalForMongo = globalThis;

export async function getDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is required');

  if (!globalForMongo._bachelorBariMongoPromise) {
    globalForMongo._bachelorBariMongoPromise = new MongoClient(uri).connect();
  }
  const connectedClient = await globalForMongo._bachelorBariMongoPromise;
  return connectedClient.db(process.env.MONGODB_DB || undefined);
}



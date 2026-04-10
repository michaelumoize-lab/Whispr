import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";
import dns from "node:dns/promises";

// 1. Extend global types for both drivers
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const uri = process.env.MONGODB_URI!;
if (!uri) throw new Error("Please define the MONGODB_URI environment variable");

async function connectDB(): Promise<Db> {
  try {
    // 2. Cache Mongoose (for your Models)
    if (mongoose.connection.readyState === 0) {
      if (!global.mongooseConnection) {
        global.mongooseConnection = mongoose.connect(uri, { dbName: "whispr" }).catch((err) => {
          global.mongooseConnection = undefined;
          throw err;
        });
        console.log("📡 Mongoose: New Connection");
      }
      await global.mongooseConnection;
    }

    // 3. Cache MongoClient (Specifically for Better Auth)
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect().catch((err) => {
        global._mongoClientPromise = undefined;
        throw err;
      });
      console.log("📡 MongoClient: New Connection");
    }
    
    const client = await global._mongoClientPromise;
    
    return client.db("whispr");

  } catch (error: unknown) {
    if (error instanceof Error) {
      const mongoError = error as Error & { code?: number };
      if (mongoError.message.includes('Authentication failed') || mongoError.code === 8000) {
        throw new Error("❌ WHISPR AUTH ERROR: Check your credentials.");
      }
    }
    throw error;
  }
}

// Helper for manual MongoDB driver usage
let dbPromise: Promise<Db> | null = null;
export function getDb(): Promise<Db> {
  if (!dbPromise) {
    dbPromise = connectDB().catch((err) => {
      dbPromise = null;
      throw err;
    });
  }
  return dbPromise;
}

/**
 * MANDATORY FOR BETTER AUTH:
 * Better Auth needs the Promise<MongoClient>.
 * We ensure the connection logic starts when this is called.
 */
export async function getClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    await connectDB();
  }
  return global._mongoClientPromise!;
}
// Export the raw promise for the Better Auth adapter
export const clientPromise = getClientPromise();

// For backward compatibility (use carefully)
export const db = connectDB();
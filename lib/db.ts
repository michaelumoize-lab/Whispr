import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";
import dns from "node:dns/promises";

// 1. Extend global types for both drivers
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var mongooseConnection: Promise<typeof mongoose> | undefined;
}

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const envUri = process.env.MONGODB_URI;
if (!envUri) throw new Error("Please define the MONGODB_URI environment variable");

const uri: string = envUri;

async function connectDB(): Promise<Db> {
  try {
    // 2. Cache Mongoose
    if (mongoose.connection.readyState === 0) {
      if (!global.mongooseConnection) {
        global.mongooseConnection = mongoose.connect(uri, { dbName: "whispr" });
        console.log("📡 Mongoose: New Connection");
      }
      await global.mongooseConnection;
    }

    // 3. Cache MongoClient (for Better Auth)
    if (!global._mongoClientPromise) {
      const client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
      console.log("📡 MongoClient: New Connection");
    }
    
    const client = await global._mongoClientPromise;
    console.log("✅ DB Drivers Ready");
    
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

export const db = await connectDB();
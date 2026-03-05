import mongoose from 'mongoose';
import dns from 'node:dns/promises';

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (cached.conn) {
    // 1. Log when using an existing connection (very common in Next.js)
    console.log("🟢 Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = { bufferCommands: false };

    console.log("⏳ Connecting to MongoDB..."); // 2. Log start of connection

    mongoose.connection.on('connected', () => console.log('✅ MongoDB connected'));
    mongoose.connection.on('error', (err) => console.log('❌ MongoDB error:', err));

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", e); // 4. Log errors
    throw e;
  }

  return cached.conn;
}

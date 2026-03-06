// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db"; 

export const auth = betterAuth({
  database: mongodbAdapter(db),
  plugins: [nextCookies()],
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});


// import dns from "node:dns/promises";
// import { betterAuth } from "better-auth";
// import { MongoClient, Db } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import { nextCookies } from "better-auth/next-js";

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// // Extend global for TypeScript
// declare global {
//   var _mongoClientPromise: Promise<MongoClient> | undefined;
// }

// if (!process.env.MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// const client = new MongoClient(process.env.MONGODB_URI!);

// export async function getDb(): Promise<Db> {
//   try {
//     const clientPromise = await client.connect();
//     return clientPromise.db("whispr");

//   } catch (error: unknown) {

//     if (error instanceof Error) {

//     const mongoError = error as Error & { code?: number };
    
//     if (error.message.includes('Authentication failed') || mongoError.code === 8000) {
//       throw new Error("❌ WHISPR AUTH ERROR: Your MongoDB credentials (username/password) are incorrect. Please check your MONGODB_URI.");
//     }
//   }

//     throw error;
//   }
// }

// export const db = await getDb();

// export const auth = betterAuth({
//   plugins: [nextCookies()],
//   database: mongodbAdapter(db),
//   emailAndPassword: { enabled: true },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     },
//   },
// });



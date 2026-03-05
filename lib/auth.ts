import dns from "node:dns/promises";
import { betterAuth } from "better-auth";
import { MongoClient, Db } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Extend global for TypeScript
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(process.env.MONGODB_URI!);

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}

const clientPromise: Promise<MongoClient> = global._mongoClientPromise;
export const db: Db = (await clientPromise).db("whispr");

export const auth = betterAuth({
  plugins: [nextCookies()],
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});


// import dns from 'node:dns/promises';
// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";
// import { nextCookies } from "better-auth/next-js";


// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const client = new MongoClient(process.env.MONGODB_URI!) 
// await client.connect(); 
// const db = client.db("whispr");

// export const auth = betterAuth({
//     plugins: [nextCookies()],
//   database: mongodbAdapter(db),
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders: {
//     google: {
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     },
//   },
// });


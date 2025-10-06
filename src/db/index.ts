import * as schema from "./schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Use process.env for Node.js environment variables
const DATABASE_URL = process.env.DATABASE_URL || "";

if (!DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Please add it to your .env.local file.\n" +
    "Example: DATABASE_URL=\"postgres://username:password@host:port/database\""
  );
}

const client = postgres(DATABASE_URL);
export const db = drizzle(client, { schema });

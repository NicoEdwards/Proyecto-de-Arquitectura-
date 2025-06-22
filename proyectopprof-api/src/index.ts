// DO NOT RENAME OR MOVE THIS FILE — used by a script in "deno.json"

import { app } from "./app.ts";
import { SERVER_PORT } from "./config/env.ts";
import { startCrons } from "./crons.ts";
import { connectDB } from "./lib/mongoose/db.ts";

// Connect to the database
await connectDB();

// Start crons
startCrons();

// Start the server
try {
  console.log(`Server is running on port ${SERVER_PORT}`);
  await app.listen({ port: SERVER_PORT });
} catch (error) {
  console.error(`Server failed to start: ${error}`);
  Deno.exit(1);
}

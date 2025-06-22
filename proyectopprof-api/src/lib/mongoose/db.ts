import { MONGODB_URI } from "@/config/env.ts";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connection status: ${mongoose.connection.readyState}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    Deno.exit(1);
  }
};

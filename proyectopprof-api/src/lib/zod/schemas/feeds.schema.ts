import { paramPositiveInt, text } from "@/lib/zod/utils/fields.ts";
import { z } from "zod";

// Types
export type GetAllUsers = z.infer<typeof getAllUsersSchema>;

// Fields
const limit = paramPositiveInt;
const page = paramPositiveInt;
const search = text;

// Schemas
export const getAllUsersSchema = z.strictObject({ limit, page, search })
  .partial();

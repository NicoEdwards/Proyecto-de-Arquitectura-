import { email, password } from "@/lib/zod/utils/fields.ts";
import { z } from "zod";

// Types
export type LoginAuth = z.infer<typeof loginAuthSchema>;

// Schemas
export const loginAuthSchema = z.strictObject({ email, password });

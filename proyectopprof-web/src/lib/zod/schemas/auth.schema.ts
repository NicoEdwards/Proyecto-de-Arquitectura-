import { email, password } from '@/lib/zod/utils/fields';
import { z } from 'zod';

// Types
export type LoginAuth = z.infer<typeof loginAuthSchema>;
export type RegisterAuth = z.infer<typeof registerAuthSchema>;

// Fields
const checkbox = z.boolean().optional();
const chile = checkbox;
const bci = checkbox;

// Schemas
export const loginAuthSchema = z.strictObject({ email, password });

export const registerAuthSchema = z.strictObject({
  email,
  password,
  chile,
  bci,
});

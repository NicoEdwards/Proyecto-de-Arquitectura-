import { z } from "zod";

export const positiveInt = z.number().int().positive();
export const paramPositiveInt = z.string().transform(Number).pipe(positiveInt);

export const text = z.string().trim().min(1).max(60);

export const email = z.string().email().min(5).max(60);

export const password = z
  .string()
  .min(8)
  .max(20)
  .refine((val) => /^[^\s]+$/.test(val), {
    message: "Must not contain spaces",
  });

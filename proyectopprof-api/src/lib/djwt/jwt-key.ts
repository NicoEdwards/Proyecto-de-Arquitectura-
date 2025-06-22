import { JWT_SECRET } from "@/config/env.ts";

const encoder = new TextEncoder();
const keyData = encoder.encode(JWT_SECRET);

export const jwtKey = await crypto.subtle.importKey(
  "raw",
  keyData,
  { name: "HMAC", hash: "SHA-512" },
  false,
  ["sign", "verify"],
);

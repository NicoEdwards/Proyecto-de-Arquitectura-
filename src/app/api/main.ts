import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import {
  create,
  verify,
  getNumericDate,
  Payload,
} from "https://deno.land/x/djwt@v3.0.1/mod.ts";
import { usersCollection } from "../database/db.ts";

const JWT_SECRET = "mi_clave_super_secreta";

// ✅ Ahora generamos una CryptoKey
async function createKey() {
  return await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

const key = await createKey();

const USER = { email: "admin@demo.com", password: "1234" };

async function createJWT(email: string) {
  return await create(
    { alg: "HS256", typ: "JWT" },
    {
      email,
      exp: getNumericDate(60 * 60),
    },
    key
  );
}

async function verifyToken(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return false;
  const token = auth.slice(7);
  try {
    const payload = (await verify(token, key)) as Payload;
    return payload;
  } catch {
    return false;
  }
}

serve(async (req) => {
  const url = new URL(req.url);
  if (url.pathname === "/register" && req.method === "POST") {
    const { email, password } = await req.json();

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return new Response("Usuario ya existe", { status: 409 });
    }

    await usersCollection.insertOne({ email, password });
    return new Response("Usuario registrado", { status: 201 });
  }

  if (url.pathname === "/login" && req.method === "POST") {
    const { email, password } = await req.json();
    if (email === USER.email && password === USER.password) {
      const token = await createJWT(email);
      return new Response(JSON.stringify({ token }), {
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("Credenciales inválidas", { status: 401 });
  }

  if (url.pathname === "/protected" && req.method === "GET") {
    const payload = await verifyToken(req);
    if (!payload) return new Response("Acceso denegado", { status: 403 });
    return new Response(`Hola ${payload.email}, acceso concedido`);
  }

  return new Response("Not found", { status: 404 });
});

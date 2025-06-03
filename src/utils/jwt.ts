import { create, getNumericDate } from 'https://deno.land/x/djwt@v3.0.1/mod.ts';

const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'default_secret';

export async function generateToken(payload: Record<string, unknown>) {
  return await create({ alg: 'HS256', typ: 'JWT' }, payload, JWT_SECRET);
}

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'; //revisarlo
import { create, verify, getNumericDate, Payload } from 'https://deno.land/x/djwt@v3.0.1/mod.ts';
import { create, getNumericDate } from 'https://deno.land/x/djwt@v3.0.1/mod.ts';
import { connectToDatabase } from '../database/client.ts';
import addUser from './add-user.ts';
import getUser from './get-user.ts';
import { extraerPromocionesDesdeUrl } from "./fetch_html.ts";

const promociones = await extraerPromocionesDesdeUrl("https://www.bancofalabella.cl/descuentos");
console.log("Promociones obtenidas:", promociones);
//Conexión a base de datos
await connectToDatabase();

//en el mismo archivo del createKey
const JWT_SECRET = 'mi_clave_super_secreta';

//archivo aparte para la clave secreta
async function createKey() {
  return await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(JWT_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}
const key = await createKey();

async function createJWT(email: string) {
  return await create({ alg: 'HS256', typ: 'JWT' }, { email, exp: getNumericDate(60 * 60) }, key);
}
serve(
  async (req: Request) => {
    const url = new URL(req.url);
    console.log('req: ', req);

    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
        },
      });
    }

    if (req.method === 'POST' && url.pathname === '/register') {
      try {
        const { email, password } = await req.json();
        const { id } = await addUser(email, password);

        return new Response(JSON.stringify({ id }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          },
        });
      } catch (err) {
        const error = err as Error;
        return new Response(error.message, {
          status: 400,
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          },
        });
      }
    }
    if (req.method === 'POST' && url.pathname === '/login') {
      try {
        const { email, password } = await req.json();
        const response = await getUser(email, password);
        if (response) {
          const token = await createJWT(email);
          return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:3000',
              'Access-Control-Allow-Credentials': 'true',
            },
          });
        }
      } catch (err) {
        const error = err as Error;
        return new Response(error.message, {
          status: 400,
          headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
          },
        });
      }
    }
    return new Response('Ruta no encontrada', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  },
  { port: 8000 }
);

/*
  if (url.pathname === '/protected' && req.method === 'GET') {
    console.log('req: ', req);

    const payload = await verifyToken(req);
    if (!payload) return new Response('Acceso denegado', { status: 403 });
    return new Response(`Hola ${payload.email}, acceso concedido`);
  }
    */
//return new Response('Not found', { status: 404 });
//});
/*


async function verifyToken(req: Request) {
  const auth = req.headers.get('authorization');
  console.log(auth);
  if (auth?.startsWith('Bearer ') == false) return false;

  const token = auth?.slice(7);

  try {
    const payload = (await verify(token!, key)) as Payload;
    return payload;
  } catch {
    return false;
  }*/

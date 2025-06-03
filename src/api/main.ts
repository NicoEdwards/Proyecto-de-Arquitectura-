import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'; //revisarlo
import { create, verify, getNumericDate, Payload } from 'https://deno.land/x/djwt@v3.0.1/mod.ts';
import { connectToDatabase } from '../database/client.ts';
import addUser from './add-user.ts';
import getUser from './get-user.ts';
import { extraerPromocionesDesdeUrl } from "./fetch_html.ts";
import { usersCollection } from '../database/collections/users.ts';
import { v4 as uuidv4 } from 'uuid';
import { fetchHTML } from './falabellascraping.ts';

const promociones = await extraerPromocionesDesdeUrl("https://www.bancofalabella.cl/descuentos");
console.log("Promociones obtenidas:", promociones);

//Conexión a base de datos
await connectToDatabase();

// Clave secreta para JWT
const JWT_SECRET = 'mi_clave_super_secreta';

// Función para agregar usuario
async function addUser(email: string, password: string) {
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw new Error('Usuario ya existe');
  }
  await usersCollection.insertOne({ userId: uuidv4(), email, password });
  return { success: true };
}

// Función para crear clave para JWT (si decides implementarlo más adelante)
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

/*<<<<<<< main
async function createJWT(email: string) {
  return await create({ alg: 'HS256', typ: 'JWT' }, { email, exp: getNumericDate(60 * 60) }, key);
}
serve(
  async (req: Request) => {
    const url = new URL(req.url);
    console.log('req: ', req);
    
    if (url.pathname === '/register' && req.method === 'POST') {
    const { email, password } = await req.json();
    try {
      const result = await addUser(email, password);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      };
    }

    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
        },
=======
serve(async req => {
  const url = new URL(req.url);

  if (url.pathname === '/register' && req.method === 'POST') {
    const { email, password } = await req.json();
    try {
      const result = await addUser(email, password);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
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
  // Ruta para hacer web scraping
  if (url.pathname === '/fetch-html' && req.method === 'GET') {
    const fixedUrl = 'https://www.bancofalabella.cl/descuentos'; // Cambia esta URL por la que desees scrapear

    const html = await fetchHTML(fixedUrl);
    if (html === null) {
      return new Response('Failed to fetch HTML.', { status: 500 });
    }

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
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
/*
  return new Response('Not found', { status: 404 });
});/*

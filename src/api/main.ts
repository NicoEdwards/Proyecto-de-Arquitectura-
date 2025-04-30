import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';
import { usersCollection } from '../database/collections/users.ts';
import { connectToDatabase } from '../database/client.ts';
import { v4 as uuidv4 } from 'uuid';
import { fetchHTML } from '../api/fetch_html.ts';

// Conexión a base de datos
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

serve(async req => {
  const url = new URL(req.url);

  if (url.pathname === '/register' && req.method === 'POST') {
    const { email, password } = await req.json();
    try {
      const result = await addUser(email, password);
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      const error = err as Error;
      return new Response(error.message, { status: 409 });
    }
  }

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

  return new Response('Not found', { status: 404 });
});

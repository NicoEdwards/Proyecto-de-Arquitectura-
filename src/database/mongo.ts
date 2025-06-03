//NO SE USA

/// <reference lib="deno.ns" />

import mongoose from 'mongoose';
import { config } from 'https://deno.land/x/dotenv@v3.2.2/mod.ts';

// URL de la base de datos, desde variables de entorno
//const MONGO_URI = Deno.env.get("MONGO_URI");
const env = config();
const MONGO_URI = env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in environment variables');
}

// Función que conecta a la base de datos
export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI!); // Conectar a la base de datos, el "!" es para indicarle a TS que es un valor definido
    console.log('✅ Connected to MongoDB successfully');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    throw error;
  }
}

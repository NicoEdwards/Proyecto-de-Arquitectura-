//import { MongoClient } from 'https://deno.land/x/mongo@v0.31.1/mod.ts';
import { MongoClient } from 'npm:mongodb@6.1.0';
import { config } from 'https://deno.land/x/dotenv@v3.2.2/mod.ts';

const env = config();
const MONGO_URI = env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI no definida en el archivo .env');
}

const client = new MongoClient(MONGO_URI);

/**
 * Inicializa la conexión a la base de datos.
 * Debe llamarse una sola vez al inicio de la app.
 */
export async function connectToDatabase() {
  try {
    await client.connect();
    //await client.connect(MONGO_URI);
    console.log('✅ Conexión a MongoDB establecida correctamente');
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    throw error;
  }
}

export { client };

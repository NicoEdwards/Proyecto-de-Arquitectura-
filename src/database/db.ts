import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";

// Definir la interfaz UserSchema
interface UserSchema {
  _id: { $oid: string };
  email: string;
  password: string;
}

// Conectar a la base de datos de MongoDB
const client = new MongoClient();
await client.connect("mongodb://localhost:27017");

const db: Database = client.database("Cluster0"); // Nombre de la base de datos

// Crear la colección de usuarios
export const usersCollection = db.collection<UserSchema>("users"); // Ahora usa UserSchema correctamente

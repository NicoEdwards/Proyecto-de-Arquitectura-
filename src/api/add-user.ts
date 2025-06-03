import { usersCollection } from '../database/collections/users.ts';
import { v4 as uuidv4 } from 'uuid';

async function addUser(email: string, password: string) {
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    throw new Error('Usuario ya existe');
  }
  const id = await usersCollection.insertOne({ userId: uuidv4(), email, password });
  return { id };
}

export default addUser;

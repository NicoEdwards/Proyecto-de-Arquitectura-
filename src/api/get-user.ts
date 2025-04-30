import { usersCollection } from '../database/collections/users.ts';

async function getUser(email: string, password: string) {
  const user = await usersCollection.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  if (user.password !== password) {
    throw new Error('Invalid password');
  }
  return { user };
}

export default getUser;

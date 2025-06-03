import { db } from '../db.ts';

interface UserSchema {
  //_id: { $oid: string };
  userId: string;
  email: string;
  password: string;
}

export const usersCollection = db.collection<UserSchema>('Users');

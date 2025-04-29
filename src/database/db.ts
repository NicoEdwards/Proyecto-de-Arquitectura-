import { client } from './client.ts';
//import { Database } from 'https://deno.land/x/mongo@v0.31.1/mod.ts';

//export const db: Database = client.Database('FinSight');

export const db = client.db('FinSight');

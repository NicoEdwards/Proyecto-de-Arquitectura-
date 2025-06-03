//NO SE USA

import { MongoClient } from 'mongodb';
import { IDatabaseConnection } from './IDatabaseConnection.ts';

export class MongoDatabaseConnection implements IDatabaseConnection {
  private client: MongoClient;
  private uri: string;

  constructor(uri: string) {
    this.uri = uri;
    this.client = new MongoClient(uri);
  }

  async connect(): Promise<void> {
    await this.client.connect();
    console.log('Connected to MongoDB');
  }

  async disconnect(): Promise<void> {
    await this.client.close();
    console.log('Disconnected from MongoDB');
  }
}

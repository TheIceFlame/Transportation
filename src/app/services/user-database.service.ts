import Dexie, {Table} from 'dexie';
import {RequestData} from './request-db.service';

export interface User {
  id?: number;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export class UserDB extends Dexie {
  users!: Table<User, number>;

  constructor() {
    super('RequestDatabase');

    this.version(1).stores({
      users: '++id, username, phoneNumber, address'
    });
  }

  async addUser(user: User): Promise<number> {
    const exists = await this.users.where('username').equals(user.username).first();
    if (exists) {
      throw new Error('Username already exists');
    }
    return this.users.add(user);
  }

  async getUser(username: string): Promise<User | undefined> {
    return this.users.where('username').equals(username).first();
  }

  async login(username: string, password: string): Promise<User> {
    const user = await this.getUser(username);
    if (!user) {
      throw new Error('User not found');
    }
    if (user.password !== password) {
      throw new Error('Incorrect password');
    }
    return user;
  }
}

export const user = new UserDB();

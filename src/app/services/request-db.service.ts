import Dexie, {Table} from 'dexie';

export interface RequestData {
  id?: number;
  description: string;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  status: string;
  date: string;
}

export class RequestDB extends Dexie {
  requests!: Table<RequestData, number>;

  constructor() {
    super('requestDatabase');
    this.version(1).stores({
      requests: '++id, description, startLat, startLng, endLat, endLng, status, date'
    });
  }
}

export const db = new RequestDB();

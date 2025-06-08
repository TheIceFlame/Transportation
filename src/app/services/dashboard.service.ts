import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  async get_data(): Promise<any> {
    const url = `${this.apiUrl}/order/dashboard`;
    return await lastValueFrom(this.http.get(url));
  }
}

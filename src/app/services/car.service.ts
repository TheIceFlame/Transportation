import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  async add_vehicle(userData: any): Promise<any> {
    const url = `${this.apiUrl}/vehicle/register`;
    return await lastValueFrom(this.http.post(url, userData));
  }

  async update_vehicle(userData: any,id:any): Promise<any> {
    const url = `${this.apiUrl}/vehicle/update/${id}`;
    return await lastValueFrom(this.http.post(url, userData));
  }


  async assign(userData: any): Promise<any> {
    const url = `${this.apiUrl}/driver-vehicle/assign`;
    return await lastValueFrom(this.http.post(url, userData));
  }

  async update_status_vehicle(id:any,status: any): Promise<any> {
    const url = `${this.apiUrl}/vehicle/status/${id}`;
    let params = new HttpParams()
      .set('status',status)
    return await lastValueFrom(this.http.patch(url, null,{params:params}));
  }

  async vehicle_by_id(id:any): Promise<any> {
    const url = `${this.apiUrl}/vehicle/${id}`;
    return await lastValueFrom(this.http.get(url));
  }

  async vehicles(
    page: number,
    size: number,
    refregiration: boolean,
    vehicle_type: string
  ): Promise<any> {
    const url = `${this.apiUrl}/vehicle/available`;

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('refregiration', refregiration)
      .set('vehicle_type', vehicle_type)

    return await lastValueFrom(this.http.get(url, { params }));
  }
}

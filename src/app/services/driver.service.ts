import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  async complete_profile(userData: any): Promise<any> {
    const url = `${this.apiUrl}/driver/register`;
    return await lastValueFrom(this.http.post(url, userData));
  }

  async update_status(id:any,userData: any): Promise<any> {
    const url = `${this.apiUrl}/driver/status/${id}`;
    return await lastValueFrom(this.http.put(url, userData));
  }

  async driver_by_id(id:any): Promise<any> {
    const url = `${this.apiUrl}/driver/${id}`;
    return await lastValueFrom(this.http.get(url));
  }

  async drivers(
    page: number,
    size: number,
    operatingCities: string,
    date?: string,
    licenseNumber?: string,
    licenseClass?: string,
    country?: string
  ): Promise<any> {
    const url = `${this.apiUrl}/driver/available`;

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('operating_cities', operatingCities);

    if (date) {
      params = params.set('date', date);
    }

    if (licenseNumber) {
      params = params.set('licenseNumber', licenseNumber);
    }

    if (licenseClass) {
      params = params.set('licenseClass', licenseClass);
    }

    if (country) {
      params = params.set('country', country);
    }

    return await lastValueFrom(this.http.get(url, { params }));
  }
}

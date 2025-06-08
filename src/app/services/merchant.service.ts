import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  async complete_profile(userData: any): Promise<any> {
    const url = `${this.apiUrl}/merchant/complete_profile`;
    return await lastValueFrom(this.http.post(url, userData));
  }


  async getMerchants(
    page: number,
    size: number,
    isActive?: boolean,
    sortField?: string,
    sortDirection?: string
  ): Promise<any> {
    const url = `${this.apiUrl}/merchant/all`;

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (isActive !== undefined) {
      params = params.set('isActive', isActive.toString());
    }
    if (sortField) {
      params = params.set('sortField', sortField);
    }
    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }

    return await lastValueFrom(this.http.get(url, { params }));
  }

}

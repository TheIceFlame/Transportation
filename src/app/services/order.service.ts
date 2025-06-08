import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  async create_order(userData: any): Promise<any> {
    const url = `${this.apiUrl}/order/create`;
    return await lastValueFrom(this.http.post(url, userData));
  }

  async get_orders(merchantId: any, page?: any, size?: any, status?: any): Promise<any> {
    let params = new HttpParams()
      .set('merchantId', merchantId)
      .set('page', page)
      .set('size', size)
    const url = `${this.apiUrl}/order/merchant`;
    return await lastValueFrom(this.http.get(url, {params: params}));
  }

  async pending_orders(merchantId?: any): Promise<any> {
    let params = new HttpParams()
    if (merchantId) {
      params = params.set('merchantId', merchantId);
    }
    const url = `${this.apiUrl}/order/pending`;
    return await lastValueFrom(this.http.get(url, {params: params}));
  }

  async delete_orders(merchantId: any): Promise<any> {
    const url = `${this.apiUrl}/order/cancel/${merchantId}`;
    return await lastValueFrom(this.http.put(url,null));
  }

  async confirm(merchantId: any): Promise<any> {
    const url = `${this.apiUrl}/order/confirm/${merchantId}`;
    return await lastValueFrom(this.http.put(url,null));
  }

  async delete_orders_comp(merchantId: any): Promise<any> {
    const url = `${this.apiUrl}/order/delete/${merchantId}`;
    return await lastValueFrom(this.http.delete(url));
  }
}

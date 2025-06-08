import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, lastValueFrom, of} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {SharedService} from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedSource = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;
  roleAs?: string | null;
  token?: string | null;
  isLogin?:boolean = false;
  constructor(private shared: SharedService,private http: HttpClient,private cookieService:CookieService) {
    const isLogged = this.isLoggedIn();
    this.isLoggedSource.next(isLogged);
  }

  async register(userData: any): Promise<any> {
    const url = `${this.apiUrl}/auth/register`;
    return await lastValueFrom(
      this.http.post(url, userData, { withCredentials: true })
    );
  }


  logout(){
    this.isLogin = false;
    this.roleAs = '';
    // this.cookieService.set('STATE_DASH', 'false',);
    // this.cookieService.set('ROLE_DASH', '');
    // this.cookieService.set('TOKEN_DASH', '');
    this.cookieService.deleteAll()
    this.changeLoggedIn(false)
    this.shared.changeUser(null)
    return of({success: this.isLogin, role: ''});
  }


  changeLoggedIn(state: boolean) {
    this.isLoggedSource.next(state)
  }

  async auth(userData: any): Promise<any> {
    const url = `${this.apiUrl}/auth/authenticate`;
    return await lastValueFrom(
      this.http.post(url, userData, { withCredentials: true })
    );
  }

  isLoggedIn() {
    const loggedIn = this.cookieService.get('STATE_DASH');
    const token = this.cookieService.get('TOKEN_DASH');
    if (loggedIn == 'true' && token != '') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  getRole() {
    this.roleAs = this.cookieService.get('ROLE_DASH');
    return this.roleAs;
  }

  getToken() {
    this.token = this.cookieService.get('TOKEN_DASH');
    return this.token;
  }
}

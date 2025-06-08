import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {lastValueFrom, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router:Router,private http: HttpClient,private shared:SharedService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.getUserProfile().then((user) => {
        this.shared.changeUser(user)
        resolve({user: user})
      }).catch((err) => {
        this.shared.changeUser(null)
        reject(err)
      })
    })
  }

  getProfile() {
    return lastValueFrom(this.http.get<any>(environment.apiUrl + '/merchant/current-user'))
  }

  getUserProfile() {
    return lastValueFrom(this.http.get<any>(environment.apiUrl + '/merchant/user'))
  }
}

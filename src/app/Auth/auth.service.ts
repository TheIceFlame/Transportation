import { Injectable } from '@angular/core';
import {User} from '../services/user-database.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setLoggedUser(user: User) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
  }

  getLoggedUser(): User | null {
    const userData = localStorage.getItem('loggedUser');
    return userData ? JSON.parse(userData) : null;
  }

  logout() {
    localStorage.removeItem('loggedUser');
  }

  isLoggedIn(): boolean {
    return this.getLoggedUser() !== null;
  }
}

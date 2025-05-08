import { Component } from '@angular/core';
import {user} from '../../services/user-database.service';
import {AuthService} from '../../Auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  email:string=""
  password:string=""
  message:string=""

  constructor(private authService: AuthService,private router:Router) {}

  async login() {
    try {
      const loggedInUser = await user.login(this.email, this.password);
      this.message = `Welcome, ${loggedInUser.username}!`;
      this.authService.setLoggedUser(loggedInUser);
      this.router.navigate(['/Request']);
      localStorage.setItem('Toaster',String(true))
      localStorage.setItem('Toaster_Msg','Login failed')
    } catch (error: any) {
      localStorage.setItem('Toaster',String(true))
      localStorage.setItem('Toaster_Msg','Login failed')
    }
  }
}

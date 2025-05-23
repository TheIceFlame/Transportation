import { Component } from '@angular/core';
import {AuthService} from '../../Auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  constructor(private authService:AuthService,private router:Router) {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/SignIn']);
  }
}

import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {


  constructor(private service:AuthService,private router:Router) {

  }

  logout() {
    this.service.logout();
    this.router.navigate(['/SignIn'])
  }
}

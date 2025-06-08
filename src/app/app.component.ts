import { Component } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'delivery';
  isShow:boolean=false;
  isAdminRoute: boolean = false;
  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isAdminRoute = this.router.url.includes('/admin');
      }
    });
  }
}

import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  isExpanded = true;
  currentRoute = 'dashboard';
  menu1: any[] = [];
  constructor(private uservice:UserService,private service:AuthService,private router:Router,private route:ActivatedRoute) {
    this.setMenus();
  }


  logout() {
    this.service.logout();
    this.router.navigate(['/SignIn'])
  }

  private setMenus() {
    const url = this.router.url.split('/');
    const part = url[2] ? url[2].split('?') : [];
    console.log(part)
    this.menu1 = [
      { package: "ORDERS", name: 'Orders', icon: 'orders', root: '/admin/merchant', active: part[0] === 'merchant' },
      { package: "DRIVERS", name: 'Drivers', icon: 'drivers', root: '/admin/drivers', active: part[0] === 'drivers' },
      { package: "VEHICLE", name: 'Vehicle', icon: 'vehicle', root: '/admin/vehicles', active: part[0] === 'vehicles' },
      { package: "SCHEDULING", name: 'Scheduling', icon: 'scheduling', root: '/admin/scheduling', active: part[0] === 'scheduling' }
    ];
  }



  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

}

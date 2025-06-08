import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewRequestComponent} from './Layouts/new-request/new-request.component';
import {RequestsComponent} from './Layouts/requests/requests.component';
import {SignInComponent} from './Layouts/sign-in/sign-in.component';
import {SignUpComponent} from './Layouts/sign-up/sign-up.component';
import {authGuard} from './Auth/auth.guard';
import {CompleteProfileComponent} from './Layouts/complete-profile/complete-profile.component';
import {UserService} from './services/user.service';
import {GlobalVariables} from './global-variables';
import {SidebarComponent} from './Admin-Dashboard/sidebar/sidebar.component';
import {DashbaordComponent} from './Admin-Dashboard/dashbaord/dashbaord.component';
import {MerchantsComponent} from './Admin-Dashboard/merchants/merchants.component';
import {DriversComponent} from './Admin-Dashboard/drivers/drivers.component';
import {CompleteProfileDriverComponent} from './Layouts/complete-profile-driver/complete-profile-driver.component';
import {UpdateStatusComponent} from './Admin-Dashboard/drivers/update-status/update-status.component';
import {VehicleComponent} from './Admin-Dashboard/vehicle/vehicle.component';
import {NewCarComponent} from './Admin-Dashboard/vehicle/new-car/new-car.component';
import {UpdateCarStatusComponent} from './Admin-Dashboard/vehicle/update-car-status/update-car-status.component';
import {
  AssignCarToDriverComponent
} from './Admin-Dashboard/drivers/assign-car-to-driver/assign-car-to-driver.component';
import {SchedulingComponent} from './Admin-Dashboard/scheduling/scheduling.component';

const routes: Routes = [
  { path: '', redirectTo: 'Request', pathMatch: 'full' },
  {path:'Request/New',component:NewRequestComponent,resolve:{ user : UserService }, canActivate: [authGuard]},
  {path:'Request',component:RequestsComponent,resolve:{ user : UserService }, canActivate: [authGuard]},
  {path:'Complete-profile',component:CompleteProfileComponent, canActivate: [authGuard]},
  {path:'Complete-profile-driver',component:CompleteProfileDriverComponent, canActivate: [authGuard]},
  {path:'SignIn',component:SignInComponent, canActivate: [authGuard]},
  {path:'Registration',component:SignUpComponent, canActivate: [authGuard]},

  // ADMIN PARENT ROUTE
  {
    path: 'admin',
    component: SidebarComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashbaordComponent },
      { path: 'drivers', component: DriversComponent },
      { path: 'vehicles', component: VehicleComponent },
      { path: 'scheduling', component: SchedulingComponent },
      { path: 'driver/:id/assign', component: AssignCarToDriverComponent },
      { path: 'vehicles/new', component: NewCarComponent },
      { path: 'driver/status/:id', component: UpdateStatusComponent },
      { path: 'vehicles/status/:id', component: UpdateCarStatusComponent },
      { path: 'merchant', component: MerchantsComponent }
      // Add other admin children here
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[GlobalVariables]
})
export class AppRoutingModule { }

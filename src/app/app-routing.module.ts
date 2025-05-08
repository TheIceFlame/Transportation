import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewRequestComponent} from './Layouts/new-request/new-request.component';
import {RequestsComponent} from './Layouts/requests/requests.component';
import {SignInComponent} from './Layouts/sign-in/sign-in.component';
import {SignUpComponent} from './Layouts/sign-up/sign-up.component';
import {authGuard} from './Auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'Request', pathMatch: 'full' },
  {path:'Request/New',component:NewRequestComponent, canActivate: [authGuard]},
  {path:'Request',component:RequestsComponent, canActivate: [authGuard]},
  {path:'SignIn',component:SignInComponent, canActivate: [authGuard]},
  {path:'Registration',component:SignUpComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

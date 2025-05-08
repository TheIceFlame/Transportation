import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewRequestComponent} from './Layouts/new-request/new-request.component';
import {RequestsComponent} from './Layouts/requests/requests.component';

const routes: Routes = [
  {path:'Request/New',component:NewRequestComponent},
  {path:'Request',component:RequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

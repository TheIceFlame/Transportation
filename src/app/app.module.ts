import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewRequestComponent } from './Layouts/new-request/new-request.component';
import { NavbarComponent } from './Includes/navbar/navbar.component';
import { RequestsComponent } from './Layouts/requests/requests.component';
import { HoverToggleDirective } from './Directive/hover-toggle.directive';
import { RequestCardComponent } from './Layouts/requests/request-card/request-card.component';
import { AddRequestCardComponent } from './Layouts/requests/add-request-card/add-request-card.component';
import { LogoComponent } from './Commun/logo/logo.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NewRequestComponent,
    NavbarComponent,
    RequestsComponent,
    HoverToggleDirective,
    RequestCardComponent,
    AddRequestCardComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

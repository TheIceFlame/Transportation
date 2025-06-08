import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NewRequestComponent} from './Layouts/new-request/new-request.component';
import {NavbarComponent} from './Includes/navbar/navbar.component';
import {RequestsComponent} from './Layouts/requests/requests.component';
import {HoverToggleDirective} from './Directive/hover-toggle.directive';
import {RequestCardComponent} from './Layouts/requests/request-card/request-card.component';
import {AddRequestCardComponent} from './Layouts/requests/add-request-card/add-request-card.component';
import {LogoComponent} from './Commun/logo/logo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignInComponent} from './Layouts/sign-in/sign-in.component';
import {ConditionalMenuDirective} from './Directive/conditional-menu.directive';
import {SignUpComponent} from './Layouts/sign-up/sign-up.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {InterceptorService} from './services/interceptor.service';
import { CompleteProfileComponent } from './Layouts/complete-profile/complete-profile.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { SidebarComponent } from './Admin-Dashboard/sidebar/sidebar.component';
import { DashbaordComponent } from './Admin-Dashboard/dashbaord/dashbaord.component';
import { MerchantsComponent } from './Admin-Dashboard/merchants/merchants.component';
import { StringPipe } from './pipes/string.pipe';
import { DriversComponent } from './Admin-Dashboard/drivers/drivers.component';
import { CompleteProfileDriverComponent } from './Layouts/complete-profile-driver/complete-profile-driver.component';
import { UpdateStatusComponent } from './Admin-Dashboard/drivers/update-status/update-status.component';
import { VehicleComponent } from './Admin-Dashboard/vehicle/vehicle.component';
import { NewCarComponent } from './Admin-Dashboard/vehicle/new-car/new-car.component';
import { UpdateCarStatusComponent } from './Admin-Dashboard/vehicle/update-car-status/update-car-status.component';
import { AssignCarToDriverComponent } from './Admin-Dashboard/drivers/assign-car-to-driver/assign-car-to-driver.component';
import { SchedulingComponent } from './Admin-Dashboard/scheduling/scheduling.component';
import {FullCalendarModule} from '@fullcalendar/angular';


@NgModule({
  declarations: [
    AppComponent,
    NewRequestComponent,
    NavbarComponent,
    RequestsComponent,
    HoverToggleDirective,
    RequestCardComponent,
    AddRequestCardComponent,
    LogoComponent,
    SignInComponent,
    ConditionalMenuDirective,
    SignUpComponent,
    CompleteProfileComponent,
    SidebarComponent,
    DashbaordComponent,
    MerchantsComponent,
    StringPipe,
    DriversComponent,
    CompleteProfileDriverComponent,
    UpdateStatusComponent,
    VehicleComponent,
    NewCarComponent,
    UpdateCarStatusComponent,
    AssignCarToDriverComponent,
    SchedulingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule.forRoot({type: 'ball-spin'})

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

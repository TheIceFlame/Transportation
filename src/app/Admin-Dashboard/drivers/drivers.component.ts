import { Component } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {GlobalVariables} from '../../global-variables';
import {NgxSpinnerService} from 'ngx-spinner';
import {DriverService} from '../../services/driver.service';
import {MatDialog} from '@angular/material/dialog';
import {UpdateStatusComponent} from './update-status/update-status.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss'
})
export class DriversComponent {
  constructor(
    private service: DriverService,
    private glovar: GlobalVariables,
    private dialog: MatDialog,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.Drivers(0);
  }

  paginatedDriver: any = {
    size: 5,
    nb_drivers: 0,
    page: -1,
    driver: [],
    pages: 1
  };

  filters = {
    date: '',
    licenseNumber: '',
    licenseClass: '',
    country: '',
    operatingCities: 'Tunis' // This is required
  };

  Drivers(page: number) {
    this.spinner.show();

    this.service.drivers(
      page,
      this.paginatedDriver.size,
      this.filters.operatingCities,
      this.filters.date,
      this.filters.licenseNumber,
      this.filters.licenseClass,
      this.filters.country
    ).then(res => {
      this.paginatedDriver.nb_drivers = res.totalElements;
      this.paginatedDriver.page = res.number;
      this.paginatedDriver.pages = res.totalPages;
      this.paginatedDriver.driver = res.content;
    }).finally(() => {
      this.spinner.hide();
    });
  }

  change(id:any){
    this.router.navigate([`/admin/driver/status/${id}`])
  }

  assign(id:any){
    this.router.navigate([`/admin/driver/${id}/assign`])
  }

}

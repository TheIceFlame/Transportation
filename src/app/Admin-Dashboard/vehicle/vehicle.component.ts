import { Component } from '@angular/core';
import {DriverService} from '../../services/driver.service';
import {GlobalVariables} from '../../global-variables';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {CarService} from '../../services/car.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {
  constructor(
    private service: CarService,
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
    refregiration: false,
    vehicle_type: 'CAR',
  };

  Drivers(page: number) {
    this.spinner.show();

    this.service.vehicles(
      page,
      this.paginatedDriver.size,
      this.filters.refregiration,
      this.filters.vehicle_type
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
    this.router.navigate([`/admin/vehicles/status/${id}`])
  }

}

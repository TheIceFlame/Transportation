import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {CarService} from '../../../services/car.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-assign-car-to-driver',
  templateUrl: './assign-car-to-driver.component.html',
  styleUrl: './assign-car-to-driver.component.scss'
})
export class AssignCarToDriverComponent implements OnInit{
  cars: any[] = [];
  selectedCar: any = null;
  driverId: string = '100'; // Driver ID is always 100 as mentioned
  startDate: string = '';
  endDate: string = '';
  currentPage: number = 1;
  id:any;
  paginatedDriver = {
    size: 10 // Default page size
  };

  filters = {
    refregiration: false,
    vehicle_type: 'TRUCK'
  };

  constructor(
    private spinner: NgxSpinnerService,
    private service: CarService // Replace with your actual service type
    , private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.loadCars(0);
  }

  loadCars(page: number = 1): void {
    this.spinner.show();
    this.currentPage = page;

    this.service.vehicles(
      page,
      this.paginatedDriver.size,
      this.filters.refregiration,
      this.filters.vehicle_type
    ).then((res: any) => {
      this.cars = res.content;
    }).finally(() => {
      this.spinner.hide();
    });
  }

  selectCar(car: any): void {
    this.selectedCar = car;
  }

  assignCarToDriver(): void {
    if (!this.selectedCar || !this.startDate || !this.endDate) {
      alert('Please select a car and provide start and end dates');
      return;
    }

    const requestBody = {
      driverId: this.id,
      vehicleId: this.selectedCar.id.toString(),
      startDate: this.startDate,
      endDate: this.endDate
    };

    this.spinner.show();

    // Replace this with your actual assignment service call
    this.service.assign(requestBody).then((response: any) => {
      alert('Car assigned successfully!');
      this.resetForm();
    }).catch((error: any) => {
      console.error('Error assigning car:', error);
      alert('Failed to assign car. Please try again.');
    }).finally(() => {
      this.spinner.hide();
    });
  }

  resetForm(): void {
    this.selectedCar = null;
    this.startDate = '';
    this.endDate = '';
  }

  onFilterChange(): void {
    this.loadCars(0); // Reload cars when filters change
  }
}

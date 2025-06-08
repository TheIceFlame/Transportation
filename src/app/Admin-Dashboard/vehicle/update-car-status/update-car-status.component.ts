import { Component } from '@angular/core';
import {DriverService} from '../../../services/driver.service';
import {ActivatedRoute} from '@angular/router';
import {CarService} from '../../../services/car.service';

export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  ON_BREAK = 'ON_BREAK',
  OFF_DUTY = 'OFF_DUTY'
}

@Component({
  selector: 'app-update-car-status',
  templateUrl: './update-car-status.component.html',
  styleUrl: './update-car-status.component.scss'
})
export class UpdateCarStatusComponent {
  driverId: any; // You can get this from route params or input
  currentStatus: any;
  selectedStatus: any;
  isLoading: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  // Make enum available in template
  DriverStatus = DriverStatus;

  // Status options for dropdown/radio buttons
  statusOptions = [
    {value: DriverStatus.AVAILABLE, label: 'Available', icon: '✅', color: 'success'},
    {value: DriverStatus.ASSIGNED, label: 'Assigned', icon: '🚗', color: 'warning'},
    {value: DriverStatus.ON_BREAK, label: 'On Break', icon: '☕', color: 'info'},
    {value: DriverStatus.OFF_DUTY, label: 'Off Duty', icon: '🏠', color: 'secondary'}
  ];

  constructor(private service: CarService, private route: ActivatedRoute) {
    this.driverId = this.route.snapshot.paramMap.get('id');
    service.vehicle_by_id(this.driverId).then((res)=>{
      this.currentStatus = res.vehicleStatus
    })
  }

  ngOnInit(): void {
    // Initialize selected status with current status
    this.selectedStatus = this.currentStatus;
  }

  async changeStatus(): Promise<void> {
    if (!this.driverId) {
      this.showMessage('Driver ID is required', 'error');
      return;
    }

    if (this.selectedStatus === this.currentStatus) {
      this.showMessage('Please select a different status', 'error');
      return;
    }

    this.isLoading = true;
    this.message = '';

    try {

      await this.service.update_status_vehicle(this.driverId,  this.selectedStatus);

      // Update current status after successful API call
      this.currentStatus = this.selectedStatus;

      this.showMessage(`Status successfully updated to ${this.getStatusLabel(this.selectedStatus)}`, 'success');

    } catch (error: any) {
      console.error('Error updating status:', error);
      this.showMessage(
        error?.error?.message || 'Failed to update status. Please try again.',
        'error'
      );
    } finally {
      this.isLoading = false;
    }
  }

  onStatusChange(status: DriverStatus): void {
    this.selectedStatus = status;
    this.message = ''; // Clear any existing messages
  }

  getStatusLabel(status: DriverStatus): string {
    return this.statusOptions.find(option => option.value === status)?.label || status;
  }

  getStatusIcon(status: DriverStatus): string {
    return this.statusOptions.find(option => option.value === status)?.icon || '';
  }

  getStatusColor(status: DriverStatus): string {
    return this.statusOptions.find(option => option.value === status)?.color || 'primary';
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    this.message = message;
    this.messageType = type;

    // Auto-hide success messages after 3 seconds
    if (type === 'success') {
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
    }
  }

  // Reset to current status
  resetStatus(): void {
    this.selectedStatus = this.currentStatus;
    this.message = '';
  }
}

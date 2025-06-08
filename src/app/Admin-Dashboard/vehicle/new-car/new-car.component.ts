import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CarService} from '../../../services/car.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrl: './new-car.component.scss'
})
export class NewCarComponent implements OnInit{
  vehicleForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  max:any
  vehicleTypes = [
    { value: 'TRUCK', label: 'Truck' },
    { value: 'VAN', label: 'Van' },
    { value: 'CAR', label: 'Car' },
  ];

  vehicleStatuses = [
    { value: 'AVAILABLE', label: 'Available' },
    { value: 'ASSIGNED', label: 'Assigned' },
    { value: 'ON_BREAK', label: 'On Break' },
    { value: 'OFF_DUTY', label: 'Off Duty' }
  ];

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  constructor(
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private carService: CarService
  ) {
    this.max = new Date().getFullYear() + 1
    this.vehicleForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      licensePlate: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]+$/)]],
      registrationExpirationMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
      registrationState: ['', [Validators.required]],
      vin: ['', [Validators.required, Validators.minLength(3)]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]],
      model: ['', [Validators.required]],
      hasRefrigeration: [false],
      vehicleType: ['', [Validators.required]],
      vehicleStatus: ['AVAILABLE', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.vehicleForm.get('vehicleType')?.valueChanges.subscribe(type => {
      if (type === 'TRUCK') {
        this.vehicleForm.get('hasRefrigeration')?.enable();
      } else {
        this.vehicleForm.get('hasRefrigeration')?.setValue(false);
        this.vehicleForm.get('hasRefrigeration')?.disable();
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (this.vehicleForm.valid) {
      this.spinner.show()
      this.isSubmitting = true;
      this.submitError = '';
      this.submitSuccess = false;

      try {
        const formData = this.vehicleForm.value;

        const vehicleData = {
          name: formData.name,
          licensePlate: formData.licensePlate,
          registrationExpirationMonth: parseInt(formData.registrationExpirationMonth), // Convert to number
          registrationState: formData.registrationState,
          vin: formData.vin,
          year: formData.year.toString(), // Convert to string as per your API
          model: parseInt(formData.model) || formData.model, // Keep as number if possible, fallback to string
          hasRefrigeration: formData.hasRefrigeration || false, // Ensure boolean
          vehicleType: formData.vehicleType,
          vehicleStatus: formData.vehicleStatus
        };

        console.log('Sending vehicle data:', vehicleData); // Debug log
        const response = await this.carService.add_vehicle(vehicleData);

        this.spinner.hide()
        this.submitSuccess = true;
        this.vehicleForm.reset();
        this.vehicleForm.patchValue({ vehicleStatus: 'AVAILABLE' });

        setTimeout(() => {
          this.submitSuccess = false;
        }, 3000);

      } catch (error: any) {
        this.spinner.hide()
        this.submitError = error.message || 'Failed to add vehicle. Please try again.';
      } finally {
        this.spinner.hide()
        this.isSubmitting = false;
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.vehicleForm.controls).forEach(key => {
      const control = this.vehicleForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.vehicleForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.vehicleForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['pattern']) return `${fieldName} format is invalid`;
      if (field.errors['min']) return `${fieldName} value is too low`;
      if (field.errors['max']) return `${fieldName} value is too high`;
    }
    return '';
  }

  onReset(): void {
    this.vehicleForm.reset();
    this.vehicleForm.patchValue({ vehicleStatus: 'AVAILABLE' });
    this.submitError = '';
    this.submitSuccess = false;
  }
}

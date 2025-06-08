import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DriverService} from '../../services/driver.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-complete-profile-driver',
  templateUrl: './complete-profile-driver.component.html',
  styleUrl: './complete-profile-driver.component.scss'
})
export class CompleteProfileDriverComponent  implements OnInit {
  driverForm!: FormGroup;
  showSuccessMessage = false;
  progressPercentage = 0;
  operatingCities: string[] = [];
  cityInput = '';

  licenseClasses = [
    { value: 'A', label: 'Class A - Heavy Trucks & Buses' },
    { value: 'B', label: 'Class B - Light Trucks & Cars' },
    { value: 'C', label: 'Class C - Regular Cars' },
    { value: 'D', label: 'Class D - Motorcycles' },
    { value: 'CDL', label: 'CDL - Commercial Driver\'s License' }
  ];

  countries = [
    'Tunisia', 'Algeria', 'Morocco', 'Libya', 'Egypt',
    'France', 'Italy', 'Spain', 'Other'
  ];

  constructor(private fb: FormBuilder,private service:DriverService,private cookieService: CookieService,private router:Router,private spinner:NgxSpinnerService) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.setupFormValueChanges();
  }

  private initializeForm(): void {
    this.driverForm = this.fb.group({
      licenseNumber: ['', [
        Validators.required,
        Validators.minLength(5),
        this.licenseNumberValidator
      ]],
      licenseExpiration: ['', [
        Validators.required,
        this.futureDateValidator
      ]],
      licenseClass: ['', Validators.required],
      country: ['', Validators.required],
      operatingCitiesInput: ['']
    });
  }

  private setupFormValueChanges(): void {
    this.driverForm.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }

  // Custom Validators
  private licenseNumberValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const pattern = /^[A-Z0-9]+$/;
    if (!pattern.test(value)) {
      return { 'invalidFormat': true };
    }
    return null;
  }

  private futureDateValidator(control: AbstractControl): {[key: string]: any} | null {
    const value = control.value;
    if (!value) return null;

    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      return { 'pastDate': true };
    }
    return null;
  }

  // City Management
  addCity(): void {
    const cityName = this.cityInput.trim();
    if (cityName && !this.operatingCities.includes(cityName)) {
      this.operatingCities.push(cityName);
      this.cityInput = '';
      this.updateProgress();
    }
  }

  removeCity(cityName: string): void {
    this.operatingCities = this.operatingCities.filter(city => city !== cityName);
    this.updateProgress();
  }

  onCityInputKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addCity();
    }
  }

  // Progress Calculation
  private updateProgress(): void {
    const formControls = this.driverForm.controls;
    const requiredFields = ['licenseNumber', 'licenseExpiration', 'licenseClass', 'country'];

    let completedFields = 0;
    const totalFields = requiredFields.length + 1; // +1 for operating cities

    // Check form fields
    requiredFields.forEach(fieldName => {
      const control = formControls[fieldName];
      if (control.value && control.valid) {
        completedFields++;
      }
    });

    // Check operating cities
    if (this.operatingCities.length > 0) {
      completedFields++;
    }

    this.progressPercentage = Math.round((completedFields / totalFields) * 100);
  }

  // Form Validation Helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.driverForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.driverForm.get(fieldName);
    if (!field || !field.errors) return '';

    const errors = field.errors;

    switch (fieldName) {
      case 'licenseNumber':
        if (errors['required']) return 'License number is required';
        if (errors['minlength']) return 'License number must be at least 5 characters';
        if (errors['invalidFormat']) return 'License number must contain only letters and numbers';
        break;

      case 'licenseExpiration':
        if (errors['required']) return 'License expiration date is required';
        if (errors['pastDate']) return 'License expiration date must be in the future';
        break;

      case 'licenseClass':
        if (errors['required']) return 'License class is required';
        break;

      case 'country':
        if (errors['required']) return 'Country is required';
        break;
    }

    return '';
  }

  getCitiesError(): string {
    return this.operatingCities.length === 0 ? 'At least one operating city is required' : '';
  }

  // Form Submission
  onSubmit(): void {
    if (this.driverForm.valid && this.operatingCities.length > 0) {
      this.spinner.show()
      const formData = {
        licenseNumber: this.driverForm.get('licenseNumber')?.value,
        licenseExpiration: this.driverForm.get('licenseExpiration')?.value,
        licenseClass: this.driverForm.get('licenseClass')?.value,
        country: this.driverForm.get('country')?.value,
        operatingCities: this.operatingCities.join(', ')
      };

      console.log('Driver Profile Data:', formData);

      this.service.complete_profile(formData).then((res)=>{
        this.spinner.hide()
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.resetForm();
          this.cookieService.deleteAll()
          this.router.navigate(['SignIn'])

        }, 3000);
      }).catch((err)=>{
        this.spinner.hide()
      })

    } else {
      // Mark all fields as touched to show validation errors
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.driverForm.controls).forEach(key => {
      const control = this.driverForm.get(key);
      control?.markAsTouched();
    });
  }

  private resetForm(): void {
    this.driverForm.reset();
    this.operatingCities = [];
    this.cityInput = '';
    this.showSuccessMessage = false;
    this.progressPercentage = 0;
  }

  // Utility Methods
  get isFormValid(): boolean {
    return this.driverForm.valid && this.operatingCities.length > 0;
  }

  get todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}


import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MerchantService} from '../../services/merchant.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {GlobalVariables} from '../../global-variables';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrl: './complete-profile.component.scss'
})
export class CompleteProfileComponent implements OnInit {
  profileForm: FormGroup;
  progressPercentage: number = 0;
  showSuccessMessage: boolean = false;

  constructor(private pub: GlobalVariables, private spinner: NgxSpinnerService, private router: Router, private fb: FormBuilder, private service: MerchantService) {
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      company_name: [''],
      city: ['', [Validators.required]],
      zipCode: [''],
      houseNumber: [''],
      street: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.updateProgress();
    this.profileForm.valueChanges.subscribe(() => {
      this.updateProgress();
    });
  }

  updateProgress(): void {
    const formControls = Object.keys(this.profileForm.controls);
    const filledControls = formControls.filter(key => {
      const value = this.profileForm.get(key)?.value;
      return value && value.toString().trim() !== '';
    });
    this.progressPercentage = (filledControls.length / formControls.length) * 100;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.spinner.show()
      const profileData = this.profileForm.value;
      console.log('Profile Data:', profileData);

      const {email, phone_number, company_name, city, zipCode, street, houseNumber} = this.profileForm.value;

      const requestBody = {
        email,
        phone_number,
        company_name,
        city,
        zipCode,
        street,
        houseNumber
      };

      this.progressPercentage = 100;

      this.service.complete_profile(requestBody).then((response) => {
        this.spinner.hide()
        this.showSuccessMessage = true;
        this.router.navigate(['Request'])
      }).catch((err) => {
        console.log(err);
        if (err.status === 409) {
          this.pub.showMsg("You are not allowed to complete your profile twice")
          this.router.navigate(['Request'])
        }
        this.spinner.hide()
      })
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        this.showSuccessMessage = false;

      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.profileForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
    }
    return '';
  }
}

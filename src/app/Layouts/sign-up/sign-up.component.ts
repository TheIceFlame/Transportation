import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {GlobalVariables} from '../../global-variables';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signupForm: FormGroup;
  message: string = '';

  constructor(private glovar: GlobalVariables,private spinner:NgxSpinnerService,private fb: FormBuilder, private router: Router,private Auth:AuthService) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['MERCHANT', Validators.required] // default value
    });
  }

  async onSignup() {
    if (this.signupForm.invalid) {
      this.message = 'Please fill in all fields correctly.';
      return;
    }

    this.spinner.show()
    const { firstname, lastname, email, password, roles } = this.signupForm.value;

    const requestBody = {
      firstname,
      lastname,
      email,
      password,
      roles: [roles] // Now it can be 'MERCHANT' or 'DRIVER'
    };

    this.Auth.register(requestBody).then((res)=>{
      this.spinner.hide()
      this.glovar.showMsg('Registration successful!')
      this.signupForm.reset();
      this.router.navigate(['/SignIn']);
    }).catch((err)=>{
      if(err.status === 200){
        this.spinner.hide()
        this.glovar.showMsg('Registration successful!')
        this.signupForm.reset();
        this.router.navigate(['/SignIn']);
      }
      this.spinner.hide()
      this.message = err.message || 'An error occurred during registration.';
    })
  }

}

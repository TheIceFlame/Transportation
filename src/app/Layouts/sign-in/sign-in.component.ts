import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {NgxSpinnerService} from 'ngx-spinner';
import {GlobalVariables} from '../../global-variables';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  message: string = ""
  signinForm: FormGroup;

  constructor(private uservice: UserService, private spinner: NgxSpinnerService, private glovar: GlobalVariables, private cookieService: CookieService, private fb: FormBuilder, private Auth: AuthService, private router: Router) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // const tokenExists = this.cookieService.check('TOKEN_DASH');
    // if (tokenExists) {
    //   this.router.navigate(['/']);
    // }

  }

  async onSignin() {
    if (this.signinForm.invalid) {
      this.message = 'Please fill in all fields correctly.';
      this.spinner.hide()
      return;
    }

    this.spinner.show()
    const {email, password} = this.signinForm.value;

    const requestBody = {
      email,
      password
    };
    this.Auth.auth(requestBody).then((res) => {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      this.cookieService.set('TOKEN_DASH', res.access_token, tomorrow, '/');
      this.cookieService.set('STATE_DASH', 'true', tomorrow, '/');
      this.cookieService.set('ROLE_DASH', res.roles, tomorrow, '/');
      if (res.roles && res.roles.includes('MANAGER')) {
        this.spinner.hide()
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.uservice.getUserProfile().then((res) => {
          this.spinner.hide()
          this.router.navigate(['/Request']);
        }).catch((err) => {
          this.spinner.hide();
          if (res.roles && res.roles.includes('MERCHANT')) {
            this.spinner.hide()
            this.router.navigate(['/Complete-profile']);
          } else {
            this.router.navigate(['/Complete-profile-driver']);
          }

        })
      }

      this.message = '';
      this.spinner.hide()
      this.glovar.showMsg('Welcome ! you have logged in successfully')
      this.signinForm.reset();
    }).catch((err) => {
      this.spinner.hide()
      this.message = err.message || 'An error occurred during registration.';
    })
  }
}

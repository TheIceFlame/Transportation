import {Component} from '@angular/core';
import {db} from '../../services/request-db.service';
import {User, user} from '../../services/user-database.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  phoneNumber = '';
  address = '';
  email = ''; // assuming you treat email as username
  password = '';
  re_password = '';
  toggle_vue: boolean = false;
  toggle_vue_2: boolean = false;
  message: string = '';

  constructor(private router:Router) {
  }

  togglePassword() {
    this.toggle_vue = !this.toggle_vue;
  }

  togglePassword2() {
    this.toggle_vue_2 = !this.toggle_vue_2;
  }

  async register() {
    if (!this.email || !this.password || !this.re_password || !this.phoneNumber || !this.address) {
      this.message = 'Please fill in all fields.';
      return;
    }

    if (this.password !== this.re_password) {
      this.message = 'Passwords do not match.';
      return;
    }

    try {
      const existingUser = await user.getUser(this.email);
      if (existingUser) {
        this.message = 'This email is already registered.';
        return;
      }

      const newUser: User = {
        username: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        address: this.address
      };

      await user.addUser(newUser);
      this.message = 'Registration successful!';

      // Optionally, reset form
      this.email = '';
      this.password = '';
      this.re_password = '';
      this.phoneNumber = '';
      this.address = '';
      this.router.navigate(['/SignIn']);
    } catch (error: any) {
      this.message = error.message || 'An error occurred during registration.';
    }
  }
}

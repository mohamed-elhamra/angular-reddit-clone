import { AuthService } from './../shared/auth.service';
import { PasswordValidator } from './../../validator/password.validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  signupRequestPayload: SignupRequestPayload;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupRequestPayload = {
      userName: '',
      password: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: PasswordValidator });
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  signup() {
    this.signupRequestPayload.userName = this.username.value;
    this.signupRequestPayload.email = this.email.value;
    this.signupRequestPayload.password = this.password.value;

    this.authService.signup(this.signupRequestPayload).subscribe(data => {
      console.log(data);
    })
  }

}

import { LoginRequestPayload } from './login-request.payload';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginRequestPayload = {
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.loginRequestPayload.email = this.email.value;
    this.loginRequestPayload.password = this.password.value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      console.log(data);
    })
  }

}

import { SignupRequestPayload } from './../signup/signup-request.payload';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(signupRequestPayload: SignupRequestPayload) {
    return this.http.post(`${environment.apiURL}users`, signupRequestPayload);
  }

}

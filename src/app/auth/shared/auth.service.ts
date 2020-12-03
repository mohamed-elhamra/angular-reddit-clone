import { LoginResponse } from './../login/login-response.payload';
import { LoginRequestPayload } from './../login/login-request.payload';
import { SignupRequestPayload } from './../signup/signup-request.payload';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from 'ngx-webstorage';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload) {
    return this.http.post(`${environment.apiURL}users`, signupRequestPayload);
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>(`${environment.apiURL}users/login`, loginRequestPayload)
      .pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.localStorage.store('username', data.username);
        return true;
      }));


  }

}

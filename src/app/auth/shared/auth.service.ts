import { LoginResponse } from './../login/login-response.payload';
import { LoginRequestPayload } from './../login/login-request.payload';
import { SignupRequestPayload } from './../signup/signup-request.payload';
import { environment } from './../../../environments/environment';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LocalStorageService } from 'ngx-webstorage';
import { map, tap } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

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
        this.localStorage.store('email', data.email);
        return true;
      }));
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName()
    }
    return this.http.post<LoginResponse>(`${environment.apiURL}users/refresh/token`,
      refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.store('authenticationToken', response.authenticationToken);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorage.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorage.retrieve('expiresAt');
  }

  logout() {
    this.http.post(`${environment.apiURL}users/logout`, this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }

}

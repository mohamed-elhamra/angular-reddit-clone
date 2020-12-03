import { AuthService } from './../auth/shared/auth.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isTokenRefreshing = false;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwtToken = this.authService.getJwtToken();
    if (jwtToken) {
      this.addToken(request, jwtToken);
    }
    return next.handle(request);
  }

  addToken(request: HttpRequest<any>, jwtToken: any) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + jwtToken)
    });
  }
}

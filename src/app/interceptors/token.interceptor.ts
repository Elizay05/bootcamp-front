import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('authToken');

    if (request.url.endsWith('/login')) {
        return next.handle(request);
    }
    
    if (accessToken) {
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      return next.handle(modifiedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            localStorage.clear();
            this.authService.notifyAuthError(error);
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}
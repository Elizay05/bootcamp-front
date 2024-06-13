import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authErrorSubject = new BehaviorSubject<boolean>(false);
  authError$ = this.authErrorSubject.asObservable();

  private error: HttpErrorResponse | null = null;

  constructor(private router: Router) { }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getDecodedToken(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.role : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  hasAnyRole(roles: string[]): boolean {
    if (!Array.isArray(roles) || roles.length === 0) {
      return false;
    }
    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;
  }

  notifyAuthError(error: HttpErrorResponse) {
    this.error = error;
    this.authErrorSubject.next(true);
  }

  clearAuthError() {
    this.error = null;
    this.authErrorSubject.next(false);
  }

  getAuthError(): HttpErrorResponse | null {
    return this.error;
  }

  redirectToLogin() {
    localStorage.clear();
    this.clearAuthError();
    this.router.navigate(['/login']);
  }
}

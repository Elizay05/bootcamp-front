import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

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
}

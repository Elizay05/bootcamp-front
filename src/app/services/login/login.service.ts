import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthToken } from 'src/app/interfaces/auth-token.interface';
import { environmentAuth } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environmentAuth.apiBaseUrl}/auth/login`;

  constructor(private httpClient: HttpClient) { }

  login(login: { email: string, password: string }): Observable<AuthToken> {
    return this.httpClient.post<AuthToken>(this.apiUrl, login);
  }
}

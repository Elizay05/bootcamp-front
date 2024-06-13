import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthToken } from 'src/app/interfaces/auth-token.interface';
import { LoginService } from 'src/app/services/login/login.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { PATHS } from 'src/app/util/paths.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  formDataLogin = {
    onFormSubmit: this.onLoginSubmit.bind(this)
  };

  isModalLoginOpen: boolean = false;
  isModalStatusOpen: boolean = false;

  status = {message: '', status_svg:''}

  constructor(private loginService: LoginService,
    private router: Router,
    private statusMessages: StatusMessagesService
  ) { 
  }

  openLogin(): void {
    this.isModalLoginOpen = true;
  }

  onLoginSubmit(formData: any): void {
    this.loginService.login(formData).subscribe({
      next: (login: AuthToken) => {
        const token = login.token;
        localStorage.setItem('authToken', token);
        this.isModalLoginOpen = false;
        this.router.navigate([PATHS.START]);
      },
      error: (error) => {
        this.isModalLoginOpen = false;
        this.isModalStatusOpen = true;
        this.status = this.statusMessages.handleError(error);
      }
    });
  }

  onCloseStatusModal(): void {
    this.isModalStatusOpen = false;
  }
}

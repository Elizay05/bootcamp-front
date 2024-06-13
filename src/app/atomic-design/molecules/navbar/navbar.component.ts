import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'molecule-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() pathImage: string = '';
  @Input() nameAltImage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  logout(): void {
    this.authService.redirectToLogin();
  }
}

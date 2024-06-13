import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ICONS } from 'src/app/util/icons.constants';

@Component({
  selector: 'organism-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {
  @Input() pathImage: string = '';
  @Input() nameAltImage: string = '';
  public iconHome = ICONS.HOME;
  public iconLibrary = ICONS.LIBRARY;
  public isLoggedIn: boolean = false;

  constructor(public authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
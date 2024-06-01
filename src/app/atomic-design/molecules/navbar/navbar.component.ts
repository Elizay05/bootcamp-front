import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'molecule-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() pathImage: string = '';
  @Input() nameAltImage: string = '';

  constructor(private router: Router) { }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}

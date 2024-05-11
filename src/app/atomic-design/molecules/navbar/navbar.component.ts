import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'molecule-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() pathImage: string = '';
  @Input() nameAltImage: string = '';

  constructor() { }

}

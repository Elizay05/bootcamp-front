import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'molecule-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() listItem: { route: string, item: string}[] = [];

constructor(private router: Router) { }

navigateTo(route: string): void {
  this.router.navigate([route]);
}
}

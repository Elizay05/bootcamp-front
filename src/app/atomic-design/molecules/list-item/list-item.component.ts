import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'molecule-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() items: { route: string, item: string}[] = [];

constructor(private router: Router) { }

navigateTo(route: string): void {
  this.router.navigate([route]);
}
}

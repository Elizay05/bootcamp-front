import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'molecule-option-aside',
  templateUrl: './option-aside.component.html',
  styleUrls: ['./option-aside.component.scss']
})
export class OptionAsideComponent {
  @Input() text: string = ""; 
  @Input() icon: string = "";
  @Input() route: string = "";

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}

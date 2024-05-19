import { Component } from '@angular/core';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'template-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  icon_add = icons.ADD

  constructor() { }

}

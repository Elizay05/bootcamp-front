import { Component, Input } from '@angular/core';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'molecule-info-back',
  templateUrl: './info-back.component.html',
  styleUrls: ['./info-back.component.scss']
})
export class InfoBackComponent{
  @Input() text: string = '';
  @Input() description: string = '';
  icon_three_points: string = icons.THREE_POINTS;

  constructor() { }

}

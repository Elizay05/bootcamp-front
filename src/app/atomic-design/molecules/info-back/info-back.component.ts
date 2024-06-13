import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICONS } from 'src/app/util/icons.constants';
import { PATHS } from 'src/app/util/paths.constants';

@Component({
  selector: 'molecule-info-back',
  templateUrl: './info-back.component.html',
  styleUrls: ['./info-back.component.scss']
})
export class InfoBackComponent{
  @Input() text: string = '';
  @Input() description: string = '';
  @Input() itemsCount: number = 0;
  @Input() icon: string = ICONS.THREE_POINTS;

  @Output() navigateSection = new EventEmitter<void>();
  @Output() navigateButton = new EventEmitter<void>();


  paths: string[] = [
    PATHS.BOOTCAMP,
    PATHS.CAPACITY
  ]
  
  constructor() { }

  onSectionClick() {
    this.navigateSection.emit();
  }
  onButtonClick() {
    this.navigateButton.emit();
  }
}
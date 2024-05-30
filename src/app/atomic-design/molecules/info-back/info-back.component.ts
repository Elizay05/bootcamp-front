import { Component, EventEmitter, Input, Output } from '@angular/core';
import { icons } from 'src/app/util/icons.enum';
import { PATH_BOOTCAMP, PATH_CAPACITY } from 'src/app/util/path-variables';

@Component({
  selector: 'molecule-info-back',
  templateUrl: './info-back.component.html',
  styleUrls: ['./info-back.component.scss']
})
export class InfoBackComponent{
  @Input() text: string = '';
  @Input() description: string = '';
  @Input() itemsCount: number = 0;
  @Input() icon: string = icons.THREE_POINTS;

  @Output() navigateSection = new EventEmitter<void>();
  @Output() navigateButton = new EventEmitter<void>();


  paths: string[] = [
    PATH_BOOTCAMP,
    PATH_CAPACITY,
  ]
  
  constructor() { }

  onSectionClick() {
    this.navigateSection.emit();
  }
  onButtonClick() {
    this.navigateButton.emit();
  }
}
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ICONS } from 'src/app/util/icons.constants';

@Component({
  selector: 'molecule-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() initialPageSize: number = 10;
  @Input() initialOrderBy: boolean = true;
  @Input() initialAscending: boolean = true;

  initialDropdownSize: string = ''
  optionsPagination = ['10 por página', '25 por página', '50 por página'];

  @Input() optionsOrderBy: { [key: string]: boolean } = {};
  initialDropdownOrderBy: string = '';

  icon_arrows: string = ICONS.ARROWS_UP
  icon_down_arrow: string = ICONS.DOWN_ARROW

  @Output() sizeChange = new EventEmitter<number>();
  @Output() orderByChange = new EventEmitter<boolean>();
  @Output() ascendingChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialPageSize']) {
      this.updateInitialDropdownSize(this.initialPageSize + ' por página');
    }
    if (changes['initialOrderBy']) {
      this.initialDropdownOrderBy = this.getOrderKeyByValue(this.initialOrderBy);
    }
    if (changes['initialAscending']) {
      this.icon_arrows = this.initialAscending ? ICONS.ARROWS_UP : ICONS.ARROWS_DOWN;
    }
  }

  updateInitialDropdownSize(newText: string): void {
    this.initialDropdownSize = newText;
    const size = parseInt(newText.split(' ')[0], 10);
    this.sizeChange.emit(size);
  }

  updateInitialDropdownOrderBy(newText: string): void {
    this.initialDropdownOrderBy = newText;
    const orderByValue = this.optionsOrderBy[newText];
    this.orderByChange.emit(orderByValue);
  }

  updateButtonIcon(): void {
    if (this.icon_arrows === ICONS.ARROWS_UP) {
      this.icon_arrows = ICONS.ARROWS_DOWN;
      this.ascendingChange.emit(false);
    } else {
      this.icon_arrows = ICONS.ARROWS_UP;
      this.ascendingChange.emit(true);
    }
  }

  getOrderOptions(): string[] {
    return Object.keys(this.optionsOrderBy);
  }

  getOrderKeyByValue(value: boolean): string {
    return Object.keys(this.optionsOrderBy).find(key => this.optionsOrderBy[key] === value) ?? '';
  }
}
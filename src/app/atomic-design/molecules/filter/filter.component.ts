import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'molecule-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  initialDropdownSize: string = '10 por página'
  optionsPagination = ['10 por página', '25 por página', '50 por página'];

  @Input() optionsOrderBy: { [key: string]: boolean } = {};
  initialDropdownOrderBy: string = 'nombre';

  icon_arrows: string = icons.ARROWS_UP
  icon_down_arrow: string = icons.DOWN_ARROW

  @Output() sizeChange = new EventEmitter<number>();
  @Output() orderByChange = new EventEmitter<boolean>();
  @Output() ascendingChange = new EventEmitter<boolean>();

  constructor(private cdr: ChangeDetectorRef) { }

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
    if (this.icon_arrows === icons.ARROWS_UP) {
      this.icon_arrows = icons.ARROWS_DOWN;
      this.ascendingChange.emit(false);
    } else {
      this.icon_arrows = icons.ARROWS_UP;
      this.ascendingChange.emit(true);
    }
  }

  getOrderOptions(): string[] {
    return Object.keys(this.optionsOrderBy);
  }
}

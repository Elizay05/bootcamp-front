import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'molecule-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  initialDropdownText: string = '10 por página'
  icon_arrows: string = icons.ARROWS_UP
  icon_down_arrow: string = icons.DOWN_ARROW
  optionsPagination = ['10 por página', '25 por página', '50 por página'];
  @Output() sizeChange = new EventEmitter<number>();
  @Output() ascendingChange = new EventEmitter<boolean>();

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  updateButtonText(newText: string): void {
    this.initialDropdownText = newText;
    const size = parseInt(newText.split(' ')[0], 10);
    this.sizeChange.emit(size);
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
}

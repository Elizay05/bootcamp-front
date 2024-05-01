import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'molecule-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class DrobdownComponent implements OnInit {
  buttonText: string = '10 por página'; // Inicializado con el valor predeterminado
  buttonIcon: string = 'stat_2';
  @Input() sizePagination1: string = '10 por página';
  @Input() sizePagination2: string = '25 por página';
  @Input() sizePagination3: string = '50 por página';
  @Output() sizeChange = new EventEmitter<number>();
  @Output() ascendingChange = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  updateButtonText(newText: string): void {
    this.buttonText = newText;
    const size = parseInt(newText.split(' ')[0], 10);
    console.log("Emitting size:", size);
    this.sizeChange.emit(size);
  }

  updateButtonIcon(): void {
    if (this.buttonIcon === 'stat_2') {
      this.buttonIcon = 'stat_minus_2';
      this.ascendingChange.emit(false);
    } else {
      this.buttonIcon = 'stat_2';
      this.ascendingChange.emit(true);
    }
  }
}

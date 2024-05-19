import { Component, EventEmitter, Input, Output } from '@angular/core';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'molecule-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss']
})
export class StatusModalComponent {
  icon_close = icons.CLOSE;

  @Input() status = {message: '', status_svg: ''};
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  close(): void {
    this.closeModal.emit();
  }

}

import { Component, Input } from '@angular/core';

  @Component({
    selector: 'molecule-button-icon',
    templateUrl: './button-icon.component.html',
    styleUrls: ['./button-icon.component.scss']
  })
  export class ButtonIconComponent {
    @Input() classButton: string = "";
    @Input() text: string = "";
    @Input() icon: string = "";
    isIconButtom: boolean = true;
    @Input() disabled: boolean = false;
    @Input() classIcon: string = "";

    constructor() { }

  }

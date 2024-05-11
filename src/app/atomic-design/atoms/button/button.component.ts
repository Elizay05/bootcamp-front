import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'atom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() primary: boolean = true;
  @Input() isButtomCircle: boolean = false;
  @Input() disabled: boolean = false;
  @Input() active: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

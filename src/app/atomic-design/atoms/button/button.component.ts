import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'atom-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string = "";
  @Input() isButtomCircle: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(this.isButtomCircle)
  }

}

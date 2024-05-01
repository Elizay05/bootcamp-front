import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'molecule-info-back',
  templateUrl: './info-back.component.html',
  styleUrls: ['./info-back.component.scss']
})
export class InfoBackComponent implements OnInit {
  @Input() text: string = '';
  @Input() description: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

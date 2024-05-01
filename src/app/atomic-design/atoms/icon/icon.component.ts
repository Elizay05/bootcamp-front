import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'atom-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() iconName: string = '';
  @Input() isIconButtom: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}

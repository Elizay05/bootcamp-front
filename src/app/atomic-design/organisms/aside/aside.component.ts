import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'organism-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {
  @Input() pathImage: string = '';
  @Input() nameAltImage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

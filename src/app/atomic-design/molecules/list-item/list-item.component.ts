import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'molecule-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() route1: string = "/home/library/technologies";
  @Input() route2: string = "/home/library/capacities";
  @Input() route3: string = "/home/library/bootcamps";
  @Input() item1: string = ""; 
  @Input() item2: string = ""; 
  @Input() item3: string = ""; 


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateTo(route: string): void {
    this.router.navigate(['/home/library', route]);
  }

}

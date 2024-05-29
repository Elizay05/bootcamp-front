import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { CapacityService } from 'src/app/services/capacity/capacity.service';


@Component({
  selector: 'app-capacity-detail',
  templateUrl: './capacity-detail.component.html',
  styleUrls: ['./capacity-detail.component.scss']
})
export class CapacityDetailComponent implements OnInit {
  capacity: Capacity | undefined;  
  constructor(
    private route: ActivatedRoute,
    private capacityService: CapacityService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const capacityId = Number(params.get('id'));
      if (capacityId) {
        this.capacityService.loadCapacities().subscribe(() => {
          this.capacityService.getCapacityById(capacityId).subscribe({
            next: capacity => {
              this.capacity = capacity;
            },
            error: error => {
              console.error(error);
            }
          });
        });
      }
    });
  }
}
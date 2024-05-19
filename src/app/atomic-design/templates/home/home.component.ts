import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PATH_BOOTCAMP, PATH_CAPACITY, PATH_TECHNOLOGY } from 'src/app/util/path-variables';

@Component({
  selector: 'template-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showMoleculeListItem: boolean = false;
  pathActive: string = this.router.url

  listItem = [
      {
        route: PATH_TECHNOLOGY,
        item: 'Tecnologías',
      },
      {
        route: PATH_CAPACITY,
        item: 'Capacidades',
      },
      {
        route: PATH_BOOTCAMP,
        item: 'Bootcamps',
      }
    ];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
        this.showMoleculeListItem = event.urlAfterRedirects === PATH_TECHNOLOGY || event.urlAfterRedirects === PATH_CAPACITY || event.urlAfterRedirects === PATH_BOOTCAMP;
    });
  }
}

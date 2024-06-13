import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PATHS } from 'src/app/util/paths.constants';

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
        route: PATHS.TECHNOLOGY,
        item: 'Tecnologías',
      },
      {
        route: PATHS.CAPACITY,
        item: 'Capacidades',
      },
      {
        route: PATHS.BOOTCAMP,
        item: 'Bootcamps',
      }
    ];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showMoleculeListItem = this.isRelevantRoute(event.urlAfterRedirects);
    });
  }


  private isRelevantRoute(url: string): boolean {
    return url === PATHS.TECHNOLOGY ||
           url.startsWith(PATHS.CAPACITY) ||
           url.startsWith(PATHS.BOOTCAMP);
  }
}

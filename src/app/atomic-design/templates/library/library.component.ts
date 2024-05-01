import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Technology } from 'src/app/common/technology';
import { TechnologyService } from 'src/app/services/technology.service';

@Component({
  selector: 'template-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  showMoleculeListItem: boolean = false;

  technologies: Technology[] = [];
  errorMessage: string = '';
  selectedSize: number = 10;
  isAscending: boolean = true;

  constructor(private router: Router, private technologyService: TechnologyService) {
    this.router.events.pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
        this.showMoleculeListItem = event.urlAfterRedirects === '/home/library/technologies' || event.urlAfterRedirects === '/home/library/capacities' || event.urlAfterRedirects === '/home/library/bootcamps';
    });
  }

  ngOnInit(): void {
    this.getTechnologies(this.selectedSize, this.isAscending);
  }

  getTechnologies(size: number, ascending: boolean): void {
    this.technologyService.getTechnologies(size, ascending)
      .subscribe(
        data => {
          console.log("Data received:", data);
          this.technologies = data;
        },
        error => this.errorMessage = 'Error fetching technologies ' + error.message
    );
  }

  onSizeChange(newSize: number): void {
    console.log("Received size:", newSize);
    this.selectedSize = newSize;
    console.log("Emitting size:", this.selectedSize);
    this.getTechnologies(this.selectedSize, this.isAscending);
  }

  onAscendingChange(ascending: boolean): void {
    console.log("Received ascending:", ascending);
    this.isAscending = ascending
    console.log("Emitting ascending:", this.isAscending);
    this.getTechnologies(this.selectedSize, this.isAscending);
  }
}

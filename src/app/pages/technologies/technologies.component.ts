import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Technology } from 'src/app/common/technology';
import { TechnologyService } from 'src/app/services/technology/technology.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { icons } from 'src/app/util/icons.enum';



@Component({
  selector: 'page-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.scss']
})
export class TechnologiesComponent implements OnInit {
  data$ = this.technologyService.data$;

  technologies: Technology[] = [];
  totalPages: number = 0;
  currentPage: number = 0;


  selectedSize: number = 10;
  isAscending: boolean = true;

  icon_add: string = icons.ADD

  isModalFormOpen: boolean = false;
  isModalStatusOpen: boolean = false;

  formData = {
    title: 'Crear Tecnologia',
    placeholderName: "Ingresa el nombre de la tecnologia", 
    placeholderDescription: "Ingresa la descripción de la tecnologia",  
    onFormSubmit: this.onFormSubmit.bind(this),
  }

  status = {message: '', status_svg:''}
  
  constructor(private router: Router, 
    private technologyService: TechnologyService, 
    private statusMessages: StatusMessagesService) {
  }

  ngOnInit(): void {
    this.technologyService.data$.subscribe(result => {
      if (result) {
        this.technologies = result.content;
        this.totalPages = result.totalPages || 0;
        this.currentPage = result.pageNumber || 0;
      }
    });
  }

  onPageChange(newPage: number): void {
    this.technologyService.updatePage(newPage);
  }

  onSizeChange(newSize: number): void {
    this.technologyService.updateSize(newSize);
  }

  onAscendingChange(isAscending: boolean): void {
    this.technologyService.updateOrder(isAscending);
  }


  openCreateModal(): void {
    this.isModalFormOpen = true;
  }

  onFormSubmit(formData: any): void {
    console.log(formData)
    this.technologyService.createTechnology(formData).subscribe({
      next: (newTechnology) => {
        this.technologies.push(newTechnology);
        this.isModalFormOpen = false;
        this.isModalStatusOpen = true;
        this.status = this.statusMessages.handleSuccess(newTechnology, "¡Tecnología creada!");
      },
      error: (error) => {
        this.isModalFormOpen = false;
        this.isModalStatusOpen = true;
        this.status = this.statusMessages.handleError(error, "tecnologia");
      }
    });
  }

  onCloseStatusModal(): void {
    this.isModalStatusOpen = false;
    this.technologyService.refreshData();
  }
}
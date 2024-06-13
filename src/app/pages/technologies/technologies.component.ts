import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TechnologyService } from 'src/app/services/technology/technology.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { Technology } from 'src/app/interfaces/technology.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ICONS } from 'src/app/util/icons.constants';



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
  initialPageSize: number = 10;
  initialAscending: boolean = true;


  icon_add: string = ICONS.ADD

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
    private statusMessages: StatusMessagesService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.technologyService.data$.subscribe(result => {
      if (result) {
        this.technologies = result.content;
        this.totalPages = result.totalPages || 0;
        this.currentPage = result.pageNumber || 0;
      }
    });

    this.technologyService.getPaginationState().subscribe(state => {
      this.initialPageSize = state.size;
      this.initialAscending = state.isAscending;
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
        this.status = this.statusMessages.handleError(error, "una tecnologia");
      }
    });
  }

  onCloseStatusModal(): void {
    this.isModalStatusOpen = false;
    this.technologyService.refreshData();
    if (this.status.message === "Tu sesión ha expirado, inicia nuevamente") {
      this.authService.redirectToLogin();
    }
  }
}
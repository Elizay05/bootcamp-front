import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { Technology } from 'src/app/interfaces/technology.interface'; 
import { AuthService } from 'src/app/services/auth/auth.service';
import { CapacityService } from 'src/app/services/capacity/capacity.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { ICONS } from 'src/app/util/icons.constants';
import { PATHS } from 'src/app/util/paths.constants';
import { INTENGERS } from 'src/app/util/intenger.constants';

@Component({
  selector: 'page-capacities',
  templateUrl: './capacities.component.html',
  styleUrls: ['./capacities.component.scss']
})
export class CapacitiesComponent implements OnInit {
  data$ = this.capacityService.data$;

  capacities: Capacity[] = [];
  technologies: Technology[] = [];
  path = PATHS.CAPACITY;
  totalPages: number = 0;
  currentPage: number = 0;


  selectedSize: number = 10;

  optionsOrderBy = {
    'nombre' : true,
    'tecnologías' : false
  };

  isAscending: boolean = true;
  initialPageSize: number = 10;
  initialOrderBy: boolean = true;
  initialAscending: boolean = true;

  icon_add: string = ICONS.ADD

  isModalFormOpen: boolean = false;
  isModalStatusOpen: boolean = false;

  formData = {
    title: 'Crear Capacidad',
    placeholderName: "Ingresa el nombre de la capacidad", 
    placeholderDescription: "Ingresa la descripción de la capacidad",  
    isSelectCapacity: true,
    selectName: 'Tecnologías',
    placeholderSelect:"Seleccione las tecnologías de la capacidad",
    options: this.technologies,  
    onFormSubmit: this.onFormSubmit.bind(this),
    minOptionsSize: INTENGERS.MIN_TECHNOLOGIES_SIZE,
    maxOptionsSize: INTENGERS.MAX_TECHNOLOGIES_SIZE,
  }

  status = {message: '', status_svg:''}
  
  constructor(private router: Router, 
    private capacityService: CapacityService,
    private statusMessages: StatusMessagesService,
    public authService: AuthService) {}

  ngOnInit(): void {
    this.capacityService.data$.subscribe(result => {
      if (result) {
        this.capacities = result.content;
        this.formData.options = this.technologies;
        this.totalPages = result.totalPages || 0;
        this.currentPage = result.pageNumber || 0;
      }
    });

    this.capacityService.getTechnologies().subscribe(technologies => {
      this.technologies = technologies;
      this.formData.options = this.technologies;
    });

    this.capacityService.getPaginationState().subscribe(state => {
      this.initialPageSize = state.size;
      this.initialOrderBy = state.orderBy;
      this.initialAscending = state.isAscending;
    });
    
  }

  onPageChange(newPage: number): void {
    this.capacityService.updatePage(newPage);
  }

  onSizeChange(newSize: number): void {
    this.capacityService.updateSize(newSize);
  }

  onAscendingChange(isAscending: boolean): void {
    this.capacityService.updateOrder(isAscending);
  }

  onOrderByChange(orderBy: boolean): void {
    this.capacityService.updateOrderBy(orderBy);
  }

  openCreateModal(): void {
    this.isModalFormOpen = true;
  }

  onFormSubmit(formData: any): void {
    this.capacityService.createCapacity(formData).subscribe({
      next: (newCapacity) => {
        this.capacities.push(newCapacity);
        this.isModalFormOpen = false;
        this.isModalStatusOpen = true;
        this.status = this.statusMessages.handleSuccess(newCapacity, "¡Capacidad creada!");
      },
      error: (error) => {
        this.isModalFormOpen = false;
        this.isModalStatusOpen = true;
        this.status = this.statusMessages.handleError(error, "una capacidad");
      }
    });
  }

  onCloseStatusModal(): void {
    this.isModalStatusOpen = false;
    this.capacityService.refreshData();
    if (this.status.message === "Tu sesión ha expirado, inicia nuevamente") {
      this.authService.redirectToLogin();
    }
  }

  onNavigateToDetail(capacityId: number): void {
    this.router.navigate([PATHS.CAPACITY, capacityId]);
  }
}
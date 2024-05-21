import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { Technology } from 'src/app/interfaces/technology.interface';
import { CapacityService } from 'src/app/services/capacity/capacity.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { icons } from 'src/app/util/icons.enum';
import { PATH_CAPACITY } from 'src/app/util/path-variables';
import { variables } from 'src/app/util/variables.enum';

@Component({
  selector: 'app-capacity-detail',
  templateUrl: './capacity-detail.component.html',
  styleUrls: ['./capacity-detail.component.scss']
})
export class CapacityDetailComponent implements OnInit {
  capacity: Capacity | undefined;

  technologies: Technology[] = [];
  icon_add: string = icons.ADD
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
    minOptionsSize: variables.MIN_TECHNOLOGIES_SIZE,
    maxOptionsSize: variables.MAX_TECHNOLOGIES_SIZE,
  }

  status = {message: '', status_svg:''}
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private capacityService: CapacityService,
    private statusMessages: StatusMessagesService
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

    this.capacityService.getTechnologies().subscribe(technologies => {
      this.technologies = technologies;
      this.formData.options = this.technologies;
    });
  }

  openCreateModal(): void {
    this.isModalFormOpen = true;
  }

  onFormSubmit(formData: any): void {
    this.capacityService.createCapacity(formData).subscribe({
      next: (newCapacity) => {
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
    this.router.navigate([PATH_CAPACITY]);
    this.isModalStatusOpen = false;
    this.capacityService.refreshData();
  }
}

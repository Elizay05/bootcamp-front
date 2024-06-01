import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BootcampService } from 'src/app/services/bootcamp/bootcamp.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { icons } from 'src/app/util/icons.enum';
import { PATH_BOOTCAMP } from 'src/app/util/path-variables';
import { variables } from 'src/app/util/variables.enum';

@Component({
  selector: 'page-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  icon_add = icons.ADD

  capacities: Capacity[] = [];

  isModalFormOpen: boolean = false;
  isModalStatusOpen: boolean = false;

  formData = {
    title: 'Crear Bootcamp',
    placeholderName: "Ingresa el nombre del bootcamp", 
    placeholderDescription: "Ingresa la descripción del bootcamp",  
    isSelectBootcamp: true,
    selectName: 'Capacidades',
    placeholderSelect:"Seleccione las capacidades del bootcamp",
    options: this.capacities,  
    onFormSubmit: this.onFormSubmit.bind(this),
    minOptionsSize: variables.MIN_CAPACITY_SIZE,
    maxOptionsSize: variables.MAX_CAPACITY_SIZE,
  }

  status = {message: '', status_svg:''}

  constructor(private router: Router, 
    private bootcampService: BootcampService,
    private statusMessages: StatusMessagesService,
    private authService: AuthService,
  ) {}

    ngOnInit(): void {
    this.bootcampService.getCapacities().subscribe(capacities => {
      this.capacities = capacities;
      this.formData.options = this.capacities;
    });
  }

  openCreateModal(): void {
    if (this.authService.getUserRole() === 'ADMINISTRATOR') {
      this.isModalFormOpen = true;
    }
  }

  onFormSubmit(formData: any): void {
    this.bootcampService.createBootcamp(formData).subscribe({
      next: (newBootcamp) => {
        this.isModalFormOpen = false;
        this.isModalStatusOpen = true;
        this.status = this.statusMessages.handleSuccess(newBootcamp, "¡Bootcamp creado!");
      },
      error: (error) => {
        this.isModalFormOpen = false;
        this.isModalStatusOpen = true;
        this.status = this.statusMessages.handleError(error, "un bootcamp");
      }
    });
  }

  onCloseStatusModal(): void {
    this.isModalStatusOpen = false;
    this.router.navigate([PATH_BOOTCAMP])
  }
}

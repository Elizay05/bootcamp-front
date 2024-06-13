import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bootcamp } from 'src/app/interfaces/bootcamp.interface';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BootcampService } from 'src/app/services/bootcamp/bootcamp.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { ICONS } from 'src/app/util/icons.constants';
import { PATHS } from 'src/app/util/paths.constants';
import { INTENGERS } from 'src/app/util/intenger.constants';

@Component({
  selector: 'app-bootcamp-detail',
  templateUrl: './bootcamp-detail.component.html',
  styleUrls: ['./bootcamp-detail.component.scss']
})
export class BootcampDetailComponent implements OnInit {
  bootcamp: Bootcamp | undefined;

  capacities: Capacity[] = [];
  icon_add: string = ICONS.ADD
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
    minOptionsSize: INTENGERS.MIN_CAPACITY_SIZE,
    maxOptionsSize: INTENGERS.MAX_CAPACITY_SIZE,
  }

  status = {message: '', status_svg:''}
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bootcampService: BootcampService,
    private statusMessages: StatusMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bootcampId = Number(params.get('id'));
      if (bootcampId) {
        this.bootcampService.loadBootcamps().subscribe(() => {
          this.bootcampService.getBootcampById(bootcampId).subscribe({
            next: bootcamp => {
              this.bootcamp = bootcamp;
            },
            error: error => {
              console.error(error);
            }
          });
        });
      }
    });

    this.bootcampService.getCapacities().subscribe(capacities => {
      this.capacities = capacities;
      this.formData.options = this.capacities;
    });
  }

  openCreateModal(): void {
    this.isModalFormOpen = true;
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
    if (this.status.message === "Tu sesión ha expirado, inicia nuevamente") {
      this.authService.redirectToLogin();
    }else{
      this.router.navigate([PATHS.BOOTCAMP]);
      this.isModalStatusOpen = false;
      this.bootcampService.refreshData();
    }
  }
}


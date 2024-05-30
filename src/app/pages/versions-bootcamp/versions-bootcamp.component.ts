import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bootcamp } from 'src/app/interfaces/bootcamp.interface';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { BootcampService } from 'src/app/services/bootcamp/bootcamp.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { VersionBootcampService } from 'src/app/services/version-bootcamp/version-bootcamp.service';
import { icons } from 'src/app/util/icons.enum';
import { PATH_BOOTCAMP } from 'src/app/util/path-variables';
import { variables } from 'src/app/util/variables.enum';

@Component({
  selector: 'app-versions-bootcamp',
  templateUrl: './versions-bootcamp.component.html',
  styleUrls: ['./versions-bootcamp.component.scss']
})
export class VersionsBootcampComponent implements OnInit {
  bootcamp: Bootcamp | undefined;

  capacities: Capacity[] = [];
  icon_add: string = icons.ADD
  isModalVersionFormOpen: boolean = false;
  isModalFormOpen: boolean = false;
  isModalStatusOpen: boolean = false;

  formDataVersion = {
    onFormSubmit: this.onFormVersionSubmit.bind(this)
  };

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
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bootcampService: BootcampService,
    private versionBootcampService: VersionBootcampService,
    private statusMessages: StatusMessagesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bootcampId = Number(params.get('id'));
      if (bootcampId) {
        this.bootcampService.loadBootcamps().subscribe(() => {
          this.bootcampService.getBootcampById(bootcampId).subscribe({
            next: bootcamp => {
              this.bootcamp = bootcamp;
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

  openCreateVersionModal(): void {
    this.isModalVersionFormOpen = true;
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

  onFormVersionSubmit(formData: any): void {
    if (this.bootcamp) {
      formData.bootcampId = this.bootcamp.id;
    }
    this.versionBootcampService.createVersionBootcamp(formData).subscribe({
      next: (newVersion) => {
        this.isModalVersionFormOpen = false;
        this.isModalStatusOpen = true;
        this.status = this.statusMessages.handleSuccess(newVersion, "¡Versión creada!");
      },
      error: (error) => {
        this.isModalVersionFormOpen = false;
        this.isModalStatusOpen = true;
        this.status = this.statusMessages.handleError(error, "una versión");
      }
    });
  }

  onCloseStatusModal(): void {
    this.route.paramMap.subscribe(params => {
      const bootcampId = Number(params.get('id'));
      this.router.navigate([PATH_BOOTCAMP, bootcampId, 'versions']);
    });
    this.isModalStatusOpen = false;
  }
}

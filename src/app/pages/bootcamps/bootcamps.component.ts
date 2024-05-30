import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bootcamp } from 'src/app/interfaces/bootcamp.interface';
import { Capacity } from 'src/app/interfaces/capacity.interface';
import { BootcampService } from 'src/app/services/bootcamp/bootcamp.service';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { icons } from 'src/app/util/icons.enum';
import { PATH_BOOTCAMP } from 'src/app/util/path-variables';
import { variables } from 'src/app/util/variables.enum';

@Component({
  selector: 'app-bootcamps',
  templateUrl: './bootcamps.component.html',
  styleUrls: ['./bootcamps.component.scss']
})
export class BootcampsComponent implements OnInit {
  data$ = this.bootcampService.data$;

  bootcamps: Bootcamp[] = [];
  capacities: Capacity[] = [];
  path = PATH_BOOTCAMP;
  totalPages: number = 0;
  currentPage: number = 0;


  selectedSize: number = 10;

  optionsOrderBy = {
    'nombre' : true,
    'capacidades' : false
  };

  isAscending: boolean = true;
  initialPageSize: number = 10;
  initialOrderBy: boolean = true;
  initialAscending: boolean = true;

  icon_add: string = icons.ADD
  icon_arrow: string = icons.RIGTH_ARROW

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
    private statusMessages: StatusMessagesService) {
  }

  ngOnInit(): void {
    this.bootcampService.data$.subscribe(result => {
      if (result) {
        this.bootcamps = result.content;
        this.formData.options = this.capacities;
        this.totalPages = result.totalPages || 0;
        this.currentPage = result.pageNumber || 0;
      }
    });

    this.bootcampService.getCapacities().subscribe(capacities => {
      this.capacities = capacities;
      this.formData.options = this.capacities;
    });

    this.bootcampService.getPaginationState().subscribe(state => {
      this.initialPageSize = state.size;
      this.initialOrderBy = state.orderBy;
      this.initialAscending = state.isAscending;
    });
    
  }

  onPageChange(newPage: number): void {
    this.bootcampService.updatePage(newPage);
  }

  onSizeChange(newSize: number): void {
    this.bootcampService.updateSize(newSize);
  }

  onAscendingChange(isAscending: boolean): void {
    this.bootcampService.updateOrder(isAscending);
  }

  onOrderByChange(orderBy: boolean): void {
    this.bootcampService.updateOrderBy(orderBy);
  }

  openCreateModal(): void {
    this.isModalFormOpen = true;
  }

  onFormSubmit(formData: any): void {
    this.bootcampService.createBootcamp(formData).subscribe({
      next: (newBootcamp) => {
        this.bootcamps.push(newBootcamp);
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
    this.bootcampService.refreshData();
  }

  onNavigateToDetail(bootcampId: number): void {
    this.router.navigate([PATH_BOOTCAMP, bootcampId]);
  }
}
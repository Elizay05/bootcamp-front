import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalFormComponent } from 'src/app/atomic-design/organisms/modal-form/modal-form.component';
import { Technology } from 'src/app/common/technology';
import { StatusMessagesService } from 'src/app/services/status/status-messages.service';
import { TechnologyService } from 'src/app/services/technology/technology.service';
import { icons } from 'src/app/util/icons.enum';

@Component({
  selector: 'page-capacities',
  templateUrl: './capacities.component.html',
  styleUrls: ['./capacities.component.scss']
})
export class CapacitiesComponent implements OnInit {
  data$ = this.technologyService.data$;

  technologies: Technology[] = [];
  totalPages: number = 0;
  currentPage: number = 0;


  selectedSize: number = 10;
  isAscending: boolean = true;

  icon_add = icons.ADD  


  constructor(private router: Router, 
    private technologyService: TechnologyService, 
    public dialog: MatDialog, 
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
    this.dialog.open(ModalFormComponent, {
      panelClass: 'custom-modalForm',
      data: 
      { title: 'Crear Capacidad', 
        placeholderName: "Ingresa el nombre de la capacidad", 
        placeholderDescription: "Ingresa la descripción de la capacidad",  
        isSelect: true,
        selectName: 'Tecnologías',
        placeholderSelect:"Seleccione las tecnologías de la capacidad",
        options: this.technologies,
        onFormSubmit: this.onFormSubmit.bind(this),
        minOptionsSize: 3,
        maxOptionsSize: 20,
      }  
    });
  }

  onFormSubmit(formData: any): void {
    this.technologyService.createTechnology(formData).subscribe({
      next: (newTechnology) => {
        this.technologies.push(newTechnology);
        this.dialog.closeAll();
        this.statusMessages.handleSuccess(newTechnology, "¡Tecnología creada!");
        this.ngOnInit();
      },
      error: (error) => {
        this.dialog.closeAll();
        this.statusMessages.handleError(error, "tecnología");
      }
    });
  }  

}

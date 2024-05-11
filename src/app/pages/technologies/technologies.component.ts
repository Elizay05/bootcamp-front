import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Technology } from 'src/app/common/technology';
import { TechnologyService } from 'src/app/services/technology/technology.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from 'src/app/atomic-design/organisms/modal-form/modal-form.component'; 
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
      data: 
      { title: 'Crear tecnología', 
        placeholderName: "Ingresa el nombre de la tecnología", 
        placeholderDescription: "Ingresa la descripción de la tecnología",  
        onFormSubmit: this.onFormSubmit.bind(this),
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
        this.statusMessages.handleError(error);
      }
    });
  }  
}

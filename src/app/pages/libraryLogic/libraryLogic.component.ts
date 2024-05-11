import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { Technology } from 'src/app/common/technology';
import { TechnologyService } from 'src/app/services/technology/technology.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalFormComponent } from 'src/app/atomic-design/organisms/modal-form/modal-form.component'; 

@Component({
  selector: 'page-library',
  templateUrl: './libraryLogic.component.html',
  styleUrls: ['./libraryLogic.component.scss']
})
export class LibraryLogicComponent implements OnInit {
  showMoleculeListItem: boolean = false;
  //Agregar esto en el utils de variables que voy a crear.
  minTechSize = 3;
  maxTechSize = 10;

  technologies: Technology[] = [];
  errorMessage: string = '';
  selectedSize: number = 10;
  isAscending: boolean = true;
  

  constructor(private router: Router, private technologyService: TechnologyService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { AtomsModule } from '../atoms/atoms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';


const organisms = [AsideComponent, ModalFormComponent];

@NgModule({
  declarations: [...organisms],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,  MatDialogModule, MoleculesModule, AtomsModule, RouterModule],
  exports: [...organisms]
})
export class OrganismsModule { }

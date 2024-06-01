import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideComponent } from './aside/aside.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { AtomsModule } from '../atoms/atoms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { FormVersionComponent } from './form-version/form-version.component';
import { LoginModalComponent } from './login-modal/login-modal.component';


const organisms = [AsideComponent, ModalFormComponent, FormVersionComponent, LoginModalComponent];

@NgModule({
  declarations: [...organisms],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,  MatDialogModule, MoleculesModule, AtomsModule, RouterModule],
  exports: [...organisms]
})
export class OrganismsModule { }

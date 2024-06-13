import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganismsModule } from '../organisms/organisms.module';
import { MoleculesModule } from '../molecules/molecules.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

const templates = [HomeComponent];

@NgModule({
  declarations: [...templates],
  imports: [CommonModule, OrganismsModule, MoleculesModule, RouterModule],
  exports: [...templates]
})
export class TemplatesModule { }

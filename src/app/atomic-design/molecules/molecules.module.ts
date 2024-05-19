import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from './button-icon/button-icon.component';
import { AtomsModule } from '../atoms/atoms.module';
import { FilterComponent } from './filter/filter.component';
import { InfoBackComponent } from './info-back/info-back.component';
import { ListItemComponent } from './list-item/list-item.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { OptionAsideComponent } from './option-aside/option-aside.component';
import { PaginationComponent } from './pagination/pagination.component';
import { StatusModalComponent } from './status-modal/status-modal.component';
import { RouterModule } from '@angular/router';


const molecules = [
  ButtonIconComponent, 
  FilterComponent, 
  InfoBackComponent, 
  ListItemComponent, 
  NavbarComponent,
  OptionAsideComponent,
  PaginationComponent,
  StatusModalComponent
];

@NgModule({
  declarations: [...molecules],
  imports: [CommonModule, AtomsModule, RouterModule],
  exports: [...molecules]
})
export class MoleculesModule { }

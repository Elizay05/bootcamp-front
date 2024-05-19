import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { IconComponent } from './icon/icon.component';

const atoms = [ButtonComponent, IconComponent];

@NgModule({
  declarations: [...atoms],
  imports: [CommonModule],
  exports: [...atoms]
})
export class AtomsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { LibraryComponent } from './library/library.component';
//import { CapacitiesComponent } from './capacities/capacities.component';
import { TemplatesModule } from '../atomic-design/templates/templates.module';
import { MoleculesModule } from '../atomic-design/molecules/molecules.module';
import { TechnologiesComponent } from './technologies/technologies.component';
import { PagesRoutingModule } from './pages-routing.module';
import { OrganismsModule } from '../atomic-design/organisms/organisms.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    LibraryComponent,
    StartComponent,
    //CapacitiesComponent,
    TechnologiesComponent
  ],
  imports: [
    CommonModule, 
    PagesRoutingModule, 
    TemplatesModule, 
    MoleculesModule, 
    OrganismsModule,
    BrowserAnimationsModule
  ],
  exports: [LibraryComponent, StartComponent, /*CapacitiesComponent*/ TechnologiesComponent]
})
export class PagesModule { }

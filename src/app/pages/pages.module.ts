import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { LibraryComponent } from './library/library.component';
import { TemplatesModule } from '../atomic-design/templates/templates.module';
import { MoleculesModule } from '../atomic-design/molecules/molecules.module';
import { TechnologiesComponent } from './technologies/technologies.component';
import { PagesRoutingModule } from './pages-routing.module';
import { OrganismsModule } from '../atomic-design/organisms/organisms.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CapacitiesComponent } from './capacities/capacities.component';
import { AppRoutingModule } from '../app-routing.module';
import { CapacityDetailComponent } from './capacity-detail/capacity-detail.component';
import { BootcampsComponent } from './bootcamps/bootcamps.component';
import { BootcampDetailComponent } from './bootcamp-detail/bootcamp-detail.component';
import { VersionsBootcampComponent } from './versions-bootcamp/versions-bootcamp.component';
import { AtomsModule } from '../atomic-design/atoms/atoms.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LibraryComponent,
    StartComponent,
    CapacitiesComponent,
    TechnologiesComponent,
    CapacityDetailComponent,
    BootcampsComponent,
    BootcampDetailComponent,
    VersionsBootcampComponent,
    LoginComponent
  ],
  imports: [
    CommonModule, 
    PagesRoutingModule, 
    AppRoutingModule,
    TemplatesModule, 
    MoleculesModule, 
    AtomsModule,
    OrganismsModule,
    BrowserAnimationsModule
  ],
  exports: [
    LibraryComponent, 
    StartComponent, 
    CapacitiesComponent, 
    TechnologiesComponent, 
    CapacityDetailComponent, 
    BootcampsComponent
  ]
})
export class PagesModule { }
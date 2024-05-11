import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './atomic-design/organisms/aside/aside.component';
import { HomeComponent } from './atomic-design/templates/home/home.component';
import { NavbarComponent } from './atomic-design/molecules/navbar/navbar.component';
import { ListItemComponent } from './atomic-design/molecules/list-item/list-item.component';
import { IconComponent } from './atomic-design/atoms/icon/icon.component';
import { ButtonComponent } from './atomic-design/atoms/button/button.component';
import { ButtonIconComponent } from './atomic-design/molecules/button-icon/button-icon.component';
import { OptionAsideComponent } from './atomic-design/molecules/option-aside/option-aside.component';
import { StartComponent } from './pages/start/start.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { LibraryLogicComponent } from './pages/libraryLogic/libraryLogic.component';
import { InfoBackComponent } from './atomic-design/molecules/info-back/info-back.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './atomic-design/molecules/filter/filter.component';
import { PaginationComponent } from './atomic-design/molecules/pagination/pagination.component';
import { ModalFormComponent } from './atomic-design/organisms/modal-form/modal-form.component';
import { TechnologiesComponent } from './pages/technologies/technologies.component';
import { CapacitiesComponent } from './pages/capacities/capacities.component';
import { EmptyComponent } from './pages/empty/empty.component';
import { StatusModalComponent } from './atomic-design/molecules/status-modal/status-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    LibraryLogicComponent,
    NavbarComponent,
    ListItemComponent,
    IconComponent,
    ButtonComponent,
    ButtonIconComponent,
    OptionAsideComponent,
    StartComponent,
    MaterialsComponent,
    HomeComponent,
    InfoBackComponent,
    FilterComponent,
    PaginationComponent,
    ModalFormComponent,
    TechnologiesComponent,
    CapacitiesComponent,
    EmptyComponent,
    StatusModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, 
  ],
  providers: [ 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

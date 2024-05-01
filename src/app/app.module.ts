import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AsideComponent } from './atomic-design/organisms/aside/aside.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './atomic-design/molecules/navbar/navbar.component';
import { ListItemComponent } from './atomic-design/molecules/list-item/list-item.component';
import { IconComponent } from './atomic-design/atoms/icon/icon.component';
import { ButtonComponent } from './atomic-design/atoms/button/button.component';
import { ButtonIconComponent } from './atomic-design/molecules/button-icon/button-icon.component';
import { OptionAsideComponent } from './atomic-design/molecules/option-aside/option-aside.component';
import { StartComponent } from './atomic-design/templates/start/start.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { LibraryComponent } from './atomic-design/templates/library/library.component';
import { InfoBackComponent } from './atomic-design/molecules/info-back/info-back.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DrobdownComponent } from './atomic-design/molecules/filter/filter.component';
import { PaginationComponent } from './atomic-design/molecules/pagination/pagination.component';
import { ModalFormComponent } from './atomic-design/organisms/modal-form/modal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    HomeComponent,
    NavbarComponent,
    ListItemComponent,
    IconComponent,
    ButtonComponent,
    ButtonIconComponent,
    OptionAsideComponent,
    StartComponent,
    MaterialsComponent,
    LibraryComponent,
    InfoBackComponent,
    DrobdownComponent,
    PaginationComponent,
    ModalFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

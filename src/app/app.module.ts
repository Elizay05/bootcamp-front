import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';


import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AtomsModule } from './atomic-design/atoms/atoms.module';
import { MoleculesModule } from './atomic-design/molecules/molecules.module';
import { OrganismsModule } from './atomic-design/organisms/organisms.module';
import { TemplatesModule } from './atomic-design/templates/templates.module';
import { PagesModule } from './pages/pages.module';
import { PagesRoutingModule } from './pages/pages-routing.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    HttpClientModule,
    PagesModule,
  ],
  providers: [ 
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }

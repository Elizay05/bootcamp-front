import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { StartComponent } from './atomic-design/templates/start/start.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { LibraryComponent } from './atomic-design/templates/library/library.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: 'start',
        component: StartComponent
      },
      {
        path: "library",
        component: LibraryComponent,
        children: [
          {
            path: "technologies",
            component: LibraryComponent
          },
          {
            path: "capacities",
            component: LibraryComponent
          },
          {
            path: "bootcamps",
            component: LibraryComponent
          },
          {
            path: 'versionBootcamp',
            component: LibraryComponent
          },
          {
            path: '**',
            redirectTo: 'technologies',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'start',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: "materials",
    component: MaterialsComponent
  },
  
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

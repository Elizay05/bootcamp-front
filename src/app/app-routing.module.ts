import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './atomic-design/templates/home/home.component';
import { AppComponent } from './app.component';
import { StartComponent } from './pages/start/start.component';
import { MaterialsComponent } from './pages/materials/materials.component';
import { LibraryLogicComponent } from './pages/libraryLogic/libraryLogic.component';
import { TechnologiesComponent } from './pages/technologies/technologies.component';
import { CapacitiesComponent } from './pages/capacities/capacities.component';
import { EmptyComponent } from './pages/empty/empty.component';

const routes: Routes = [
  {
    path: 'home',
    component: StartComponent
  },
  {
    path: "library",
    component: EmptyComponent,
    children: [
      {
        path: "technologies",
        component: TechnologiesComponent
      },
      {
        path: "capacities",
        component: CapacitiesComponent
      },
      {
        path: "bootcamps",
        component: LibraryLogicComponent
      },
      {
        path: 'versionBootcamp',
        component: LibraryLogicComponent
      },
      {
        path: '**',
        redirectTo: 'technologies',
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

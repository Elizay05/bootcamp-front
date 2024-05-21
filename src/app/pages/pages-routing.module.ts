import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { LibraryComponent } from './library/library.component';
import { TechnologiesComponent } from './technologies/technologies.component';
import { CapacitiesComponent } from './capacities/capacities.component';
import { CapacityDetailComponent } from './capacity-detail/capacity-detail.component';

const routes: Routes = [
  {path: 'home', component: StartComponent},
  {path: 'library', component: LibraryComponent,
    children: [
      {path: 'technologies', component: TechnologiesComponent},
      {path: 'capacities', component: CapacitiesComponent},
      {path: 'capacities/:id', component: CapacityDetailComponent},
      {path: 'bootcamps', component: CapacitiesComponent},
      {path: '**', redirectTo: 'technologies', pathMatch: 'full'}
    ]
  },
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

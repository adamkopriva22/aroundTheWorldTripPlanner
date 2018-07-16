import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripPlannerComponent }      from './trip-planner/trip-planner.component';


const routes: Routes = [
  { path: '', redirectTo: '/trip-planner', pathMatch: 'full' },
  { path: 'trip-planner', component: TripPlannerComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}
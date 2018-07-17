import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TripPlannerComponent } from './trip-planner/trip-planner.component';
import { ItineraryComponent } from './itinerary/itinerary.component';

const routes: Routes = [
  { path: '', redirectTo: '/trip-planner', pathMatch: 'full', runGuardsAndResolvers: 'always' },
  { path: 'trip-planner', component: TripPlannerComponent, runGuardsAndResolvers: 'always' },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
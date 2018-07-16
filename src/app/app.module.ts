import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { ItineraryComponent } from './itinerary/itinerary.component';
import { AppRoutingModule } from './app-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { RegionsSelectionComponent } from './regions-selection/regions-selection.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationSelectionComponent } from './location-selection/location-selection.component';
import { DateSelectionComponent } from './date-selection/date-selection.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatListModule, MatIconModule, MatAutocompleteModule} from '@angular/material';
import { FlexLayoutModule } from "@angular/flex-layout";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlightsSearchComponent } from './flights-search/flights-search.component';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { FlightLocationComponent } from './flight-location/flight-location.component';
import { TripPlannerComponent } from './trip-planner/trip-planner.component';


@NgModule({
  declarations: [
    AppComponent,
    ItineraryComponent,
    MessagesComponent,
    RegionsSelectionComponent,
    LocationSelectionComponent,
    DateSelectionComponent,
    FlightsSearchComponent,
    FlightDetailComponent,
    FlightLocationComponent,
    TripPlannerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatIconModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    BrowserAnimationsModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
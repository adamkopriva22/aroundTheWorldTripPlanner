import { Component, OnInit } from '@angular/core';

import { ItineraryService } from '../itinerary.service';
import { FlightSearchService } from '../flight-search.service';
import { Itinerary } from '../models/Itinerary';
import { RegionEnum } from '../models/RegionEnum';
import { Location } from '../models/Location';

@Component({
  selector: 'app-flights-search',
  templateUrl: './flights-search.component.html',
  styleUrls: ['./flights-search.component.css']
})
export class FlightsSearchComponent implements OnInit {

  goHome: boolean = false;
  selectedRegion: RegionEnum;
  itinerary: Itinerary;
  location: Location;

  constructor(
    private itineraryService: ItineraryService,
    private flightSearchService: FlightSearchService) {
    itineraryService.flightAdded$.subscribe(
      _ => {
        this.flightAdded();
      });
  }

  ngOnInit() {
    this.itinerary = this.itineraryService.getItineraryData();
    this.selectedRegion = this.itinerary.regions[0];
  }

  flightAdded() {
    if (this.goHome) {
      this.goHome = false;
      return;
    }

    if (!this.itineraryService.currentRegion) {
      this.goHome = true;
      this.location = this.itineraryService.startLocation;
    }

    this.selectedRegion = this.itineraryService.currentRegion;
  }

  getLocation(region: RegionEnum): string {
    return this.flightSearchService.getCountryCodesForRegion(region);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightSearchService } from '../flight-search.service';
import { ItineraryService } from '../itinerary.service';
import { FlightDetail } from '../models/FlightDetail';

@Component({
  selector: 'app-flight-location',
  templateUrl: './flight-location.component.html',
  styleUrls: ['./flight-location.component.css']
})
export class FlightLocationComponent implements OnInit {

  @Input() location: string;

  flights$: Observable<FlightDetail[]> = new Observable<FlightDetail[]>();

  constructor(
    private flightSearchService: FlightSearchService,
    private itineraryService: ItineraryService) { }

  ngOnInit() {    
    this.searchFlights();
  }

  searchFlights() {
    this.flights$ = this.flightSearchService.searchFlights(
      this.location, 
      this.itineraryService.currentLocation.id, 
      this.itineraryService.currentDate)
  }
}


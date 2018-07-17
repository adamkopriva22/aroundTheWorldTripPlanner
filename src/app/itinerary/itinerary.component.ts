import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../itinerary.service';
import { FlightDetail } from '../models/FlightDetail';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})

export class ItineraryComponent implements OnInit {

  flights: FlightDetail[] = new Array();
  sumPrice: number = 0.0;
  currency: string = "USD";

  constructor(
    private itineraryService: ItineraryService) {
    itineraryService.flightAdded$.subscribe(
          flight => {
            this.flightAdded(flight);
          });
  }

  ngOnInit() {
  }

  flightAdded(flight: FlightDetail) {
    this.flights = this.itineraryService.flights;
    this.sumPrice = this.itineraryService.flights.map(f => f.price).reduce((prev, next) => prev + next);
  }
}

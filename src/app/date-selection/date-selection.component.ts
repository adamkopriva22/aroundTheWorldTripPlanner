import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../itinerary.service';
import { ITripPlannerChildComponent } from '../trip-planner/trip-planner.component';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.css']
})

export class DateSelectionComponent implements OnInit, ITripPlannerChildComponent {

  flightDatepicker: Date = new Date();
  minDate: Date = new Date();

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.minDate.setDate(new Date().getDate() + 1)
    this.flightDatepicker.setDate(new Date().getDate() + 7);
  }

  save() {
    this.itineraryService.setStartDate(this.flightDatepicker);
  }

  isValid(): boolean {
    if (this.isItFutureDate(this.flightDatepicker)) {
      return true;
    }

    return false;
  }

  isItFutureDate(date: Date): boolean {
    if (date && date.getTime() > new Date().getTime()) {
      return true;
    }

    return false;
  }
}

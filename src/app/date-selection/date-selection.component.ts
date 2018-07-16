import { Component, OnInit } from '@angular/core';
import { ItineraryService } from '../itinerary.service';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.css']
})
export class DateSelectionComponent implements OnInit {

  flightDatepicker: Date = new Date();

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.flightDatepicker.setDate(new Date().getDate() + 7);
  }

  save()
  {
    this.itineraryService.setStartDate(this.flightDatepicker);
  }
}

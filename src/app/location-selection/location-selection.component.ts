import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { ItineraryService } from '../itinerary.service';

import { ITripPlannerChildComponent } from '../trip-planner/trip-planner.component';
import { Location } from '../models/Location';
import { FlightSearchService } from '../flight-search.service';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.css']
})

export class LocationSelectionComponent implements OnInit, ITripPlannerChildComponent {  
  locations$: Observable<Location[]>;
  private searchTerms = new Subject<string>();

  selectedLocation: Location;
  displayAlert: boolean = false;

  constructor(
    private flighSearchService: FlightSearchService,
    private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.locations$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.flighSearchService.searchLocaions(term)),
    );
    this.selectedLocation = new Location();
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
    this.displayAlert = false;
  }

  selectLocation(location: Location): void
  {
    this.selectedLocation = location;
    this.displayAlert = false;
  }

  save()
  {
    this.itineraryService.setLocation(this.selectedLocation);
  }

  isValid(): boolean {
    if (this.selectedLocation.id && this.selectedLocation.id.length !== 0)
      return true;

    this.displayAlert = true;
    return false;
  }
}
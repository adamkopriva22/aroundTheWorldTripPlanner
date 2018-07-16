import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { MessageService } from '../message.service';
import { ItineraryService } from '../itinerary.service';

import { Location } from '../models/Location';
import { FlightSearchService } from '../flight-search.service';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.css']
})

export class LocationSelectionComponent implements OnInit {  
  locations$: Observable<Location[]>;
  private searchTerms = new Subject<string>();

  selectedLocation: Location;

  constructor(
    private messageService: MessageService, 
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
  }

  selectLocation(location: Location): void
  {
    this.selectedLocation = location;
  }

  save()
  {
    this.itineraryService.setLocation(this.selectedLocation);
  }
}
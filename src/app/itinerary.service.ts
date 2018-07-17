import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { RegionEnum } from './models/RegionEnum';
import { MessageService } from './message.service';

import { FlightDetail } from './models/FlightDetail';
import { Itinerary } from './models/Itinerary';
import { Location } from './models/Location';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  regions: RegionEnum[];
  startLocation: Location;
  startDate: Date;
  currentLocation: Location;
  currentDate: Date;
  currentRegion: RegionEnum;
  flights: FlightDetail[];

  constructor(
    private messageService: MessageService) {
    this.regions = new Array();
    this.startLocation = new Location();
    this.startDate = new Date();
    this.currentLocation = new Location();
    this.currentDate = new Date();
    this.flights = new Array();
  }

  private flightAddedSource = new Subject<FlightDetail>();
  flightAdded$ = this.flightAddedSource.asObservable();

  flightAdded(flight: FlightDetail) {
    this.flights.push(flight);
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.currentLocation = { id: flight.airportTo, code: flight.cityTo } as Location;

    if (this.currentRegion != null) {
      var nextRegionIndex = this.regions.indexOf(this.currentRegion) + 1;

      if (nextRegionIndex > this.regions.length - 1) {
        this.currentRegion = null;
      }
      else {
        this.currentRegion = this.regions[nextRegionIndex];
      }
    }

    this.flightAddedSource.next(flight);
  }

  addRegion(region: RegionEnum) {
    if (this.regions.every(cont => cont != region)) {
      this.regions.push(region);
    }
    else {
      this.log(`Region "${region}" is already added.`)
    }
  }

  removeRegion(region: RegionEnum) {
    var index = this.regions.indexOf(region, 0);
    if (index > -1) {
      this.regions.splice(index, 1);
    }
    else {
      this.log(`Continent "${region}" cannot be removed`)
    }
  }

  getRegions(): RegionEnum[] {
    return this.regions;
  }

  setRegions(regions: RegionEnum[]) {
    this.regions = regions;
    this.currentRegion = regions[0];
  }

  setLocation(location: Location) {
    this.startLocation = location;
    this.currentLocation = location;
  }

  setStartDate(date: Date) {
    this.startDate = date;
    this.currentDate = date;
  }

  getItineraryData(): Itinerary {
    return {
      regions: this.regions,
      startLocation: this.startLocation,
      startDate: this.startDate,
      currentLocation: this.currentLocation,
      currentDate: this.currentDate,
      currentRegion: this.currentRegion
    } as Itinerary;
  }

  private log(message: string) {
    this.messageService.add('ItineraryService: ' + message);
  }
}

import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { RegionsSelectionComponent }  from '../regions-selection/regions-selection.component';
import { LocationSelectionComponent }    from '../location-selection/location-selection.component';
import { DateSelectionComponent }    from '../date-selection/date-selection.component';

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css']
})

export class TripPlannerComponent implements OnInit {
  
  @ViewChild(RegionsSelectionComponent)
  private continentsComponent: RegionsSelectionComponent;

  @ViewChild(LocationSelectionComponent)
  private locationComponent: LocationSelectionComponent;

  @ViewChild(DateSelectionComponent)
  private dateComponent: DateSelectionComponent;

  currentTab: string = "regions"

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  next() {
    switch (this.currentTab) {
      case "regions":
        this.currentTab = "location";
        this.continentsComponent.save();
        break;
      case "location":
        this.currentTab = "startDate";
        this.locationComponent.save();
        break;
      case "startDate":
        this.currentTab = "flights";
        this.dateComponent.save();
        break;
      default:
        break;
    }
  }
}

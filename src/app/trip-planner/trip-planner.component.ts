import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { RegionsSelectionComponent } from '../regions-selection/regions-selection.component';
import { LocationSelectionComponent } from '../location-selection/location-selection.component';
import { DateSelectionComponent } from '../date-selection/date-selection.component';

export interface ITripPlannerChildComponent {
  isValid(): boolean;
  save(): void
}

@Component({
  selector: 'app-trip-planner',
  templateUrl: './trip-planner.component.html',
  styleUrls: ['./trip-planner.component.css']
})

export class TripPlannerComponent implements OnInit {

  @ViewChild(RegionsSelectionComponent)
  private regionsComponent: RegionsSelectionComponent;

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
        if (this.regionsComponent.isValid()) {
          this.currentTab = "location";
          this.regionsComponent.save();
        }
        break;
      case "location":
        if (this.locationComponent.isValid()) {
          this.currentTab = "startDate";
          this.locationComponent.save();
        }
        break;
      case "startDate":
        if (this.dateComponent.isValid()) {
          this.currentTab = "flights";
          this.dateComponent.save();
        }
        break;
      default:
        break;
    }
  }
}

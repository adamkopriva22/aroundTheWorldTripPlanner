import { Component, OnInit } from '@angular/core';

import { MessageService } from '../message.service';
import { ItineraryService } from '../itinerary.service';

import { RegionEnum } from '../models/RegionEnum';

@Component({
  selector: 'app-regions-selection',
  templateUrl: './regions-selection.component.html',
  styleUrls: ['./regions-selection.component.css']
})

export class RegionsSelectionComponent implements OnInit {

  availableRegions: RegionEnum[];
  selectedRegions: RegionEnum[];

  constructor(private itineraryService: ItineraryService) { }

  ngOnInit() {
    this.availableRegions = [
      RegionEnum.Africa,
      RegionEnum.Asia,
      RegionEnum.Oceania,
      RegionEnum.Europe,
      RegionEnum.NorthAmerica,
      RegionEnum.SouthAmerica,
      RegionEnum.MiddleEast];

    this.selectedRegions = new Array();
  }

  addRegion(region: RegionEnum) {
    this.itineraryService.addRegion(region);
    this.selectedRegions = this.itineraryService.getRegions();

    var index = this.availableRegions.indexOf(region, 0);
    if (index > -1) {
      this.availableRegions.splice(index, 1);
    }
  }

  removeRegion(region: RegionEnum) {
    this.availableRegions.push(region);
    this.availableRegions.sort((r1, r2) => {
      if (r1.toString() < r2.toString()) {
        return -1;
      }
      else
        return 1;
    });

    this.itineraryService.removeRegion(region);
    this.selectedRegions = this.itineraryService.getRegions();
  }

  save() {
    this.itineraryService.setRegions(this.selectedRegions);
  }
}

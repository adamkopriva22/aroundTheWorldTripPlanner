import { Location } from './Location';
import { RegionEnum } from './RegionEnum';

export class Itinerary {
  regions: RegionEnum[];
  startLocation: Location;
  startDate: Date;
  currentLocation: Location;
  currentDate: Date;
  currentRegion: RegionEnum
}
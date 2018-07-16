import { Component, OnInit, Input} from '@angular/core';
import { FlightDetail } from '../models/FlightDetail';
import { ItineraryService } from '../itinerary.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {

  @Input() flight: FlightDetail;

  constructor(
    private itineraryService: ItineraryService,
    private messageService: MessageService) { }

  ngOnInit() {
  }

  selectFlight()
  {
      this.itineraryService.flightAdded(this.flight);
      this.messageService.add(`flight added: ${this.flight.price} ${this.flight.cityTo}`);
  }
}

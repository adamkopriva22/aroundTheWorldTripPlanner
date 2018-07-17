import { Country } from "./Country";

export class FlightData {
  id: string;
  cityFrom: string;
  flyTo: string;
  cityTo: string;
  price: string;
  dTime: string;
  aTime: string;
  countryTo: Country;
  countryFrom: Country;
}
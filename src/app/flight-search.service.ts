import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';

import { RegionEnum } from './models/RegionEnum';
import { Flights } from './models/skyPicker/Flights';
import { MessageService } from './message.service';
import { Locations } from './models/skyPicker/Locations';
import { Location } from './models/Location';
import { FlightDetail } from './models/FlightDetail';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {

  private skyPickerUrl = 'https://api.skypicker.com';
  private flightsUrl = '/flights';
  private locationsUrl = '/locations';

  private readonly europeanCountryCodes = "va,ch,ad,ee,is,am,al,cz,ge,at,ie,gi,gr,nl,pt,no,lv,lt,lu,es,it,ro,pl,be,fr,bg,dk,hr,de,hu,ba,fi,by,fo,mc,cy,mk,sk,mt,si,sm,se,gb".toUpperCase();
  private readonly oceaniaCountryCodes = "ck,pw,tv,nr,ki,mh,nu,to,nz,au,vu,sb,ws,fj,fm".toUpperCase();
  private readonly africaCountryCodes = "gw,zm,ci,eh,gq,eg,cg,cf,ao,ga,et,gn,gm,zw,cv,gh,rw,tz,cm,na,ne,ng,tn,lr,ls,tg,td,er,ly,bf,dj,sl,bi,bj,za,bw,dz,sz,mg,ma,ke,ml,km,st,mu,mw,so,sn,mr,sc,ug,sd,mz".toUpperCase();
  private readonly asiaCountryCodes = "mn,cn,af,am,vn,ge,in,az,id,ru,la,tw,tr,lk,tm,tj,pg,th,np,pk,ph,bd,ua,bn,jp,bt,hk,kg,uz,mm,sg,mo,kh,kr,mv,kz,my".toUpperCase();
  private readonly northAmericaCodes = "gt,ag,vg,ai,vi,ca,gd,aw,cr,cu,pr,ni,tt,gp,pa,do,dm,bb,ht,jm,hn,bs,bz,sx,sv,us,mq,ms,ky,mx".toUpperCase();
  private readonly southAmericaCodes = "gd,py,co,ve,cl,sr,bo,ec,gf,ar,gy,br,pe,uy,fk".toUpperCase();
  private readonly middleEastCodes = "om,lb,iq,ye,ir,bh,sy,qa,jo,kw,il,ae,sa".toUpperCase();

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getCountryCodesForRegion(region: RegionEnum): string {
    var countryCodes = "";
    switch (region) {
      case RegionEnum.Europe:
        countryCodes = this.europeanCountryCodes;
        break;
      case RegionEnum.Africa:
        countryCodes = this.africaCountryCodes;
        break;
      case RegionEnum.Asia:
        countryCodes = this.asiaCountryCodes;
        break;
      case RegionEnum.Oceania:
        countryCodes = this.oceaniaCountryCodes;
        break;
      case RegionEnum.NorthAmerica:
        countryCodes = this.northAmericaCodes;
        break;
      case RegionEnum.SouthAmerica:
        countryCodes = this.southAmericaCodes;
        break;
      case RegionEnum.MiddleEast:
        countryCodes = this.middleEastCodes;
        break;
      default:
        new Error(`${region} not handled`);
    }

    return countryCodes;
  }

  searchFlights(flyTo: string, flyFrom: string, dateFrom: Date): Observable<FlightDetail[]> {

    var formatDateFrom = `${dateFrom.getDate()}/${dateFrom.getMonth() + 1}/${dateFrom.getFullYear()}`;

    return this.http.get<Flights>(`${this.skyPickerUrl}${this.flightsUrl}?` +
      `flyFrom=${flyFrom}&` +
      `to=${flyTo}&` +
      `dateFrom=${formatDateFrom}&` +
      `dateTo=${formatDateFrom}&` +
      `typeFlight=oneway&` +
      `curr=USD&` +
      `oneforcity=1`)
      .pipe(
        retry(3),
        tap(_ => this.log(`found flights matching "${flyFrom}"`)),
        catchError(this.handleError<Flights>('searchLocations', new Flights())),
        map(flights => this.toFlightDetails(flights))
      );
  }

  toFlightDetails(flights: Flights): FlightDetail[] {
    var flightDetails = <FlightDetail[]>Array();

    if (flights && flights.data) {
      flights.data.forEach(flight => {
        var flightDetail = {
          id: flight.id,
          price: +flight.price,
          currency: flights.currency,
          airportTo: flight.flyTo,
          cityTo: flight.cityTo,
          countryTo: flight.countryTo.name,
          arrivalTime: flight.aTime,
          cityFrom: flight.cityFrom,
          countryFrom: flight.countryFrom.name,
          departureTime: flight.dTime
        } as FlightDetail;
        flightDetails.push(flightDetail);
      });
    }
    return flightDetails;
  }

  searchLocaions(term: string): Observable<Location[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Locations>(`${this.skyPickerUrl}${this.locationsUrl}/?term=${term}&active_only=true&location_types=airport&location_types=city&location_types=country`).pipe(
      retry(3),
      tap(_ => this.log(`found airports matching "${term}"`)),
      catchError(this.handleError<Locations>('searchLocations', new Locations())),
      map(locations => this.toLocationsArray(locations)),
    );
  }

  private toLocationsArray(locations: Locations): Location[] {
    var locs = <Location[]>Array();

    if (Array.isArray(locations.locations) && locations.locations.length) {
      locations.locations.forEach(location => {
        var loc = { id: location.id, code: location.code, name: location.name } as Location;
        locs.push(loc);
      });
    }
    return locs;
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('Flight service: ' + message);
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightLocationComponent } from './flight-location.component';

describe('FlightLocationComponent', () => {
  let component: FlightLocationComponent;
  let fixture: ComponentFixture<FlightLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

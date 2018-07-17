import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionsSelectionComponent } from './regions-selection.component';

describe('RegionsSelectionComponent', () => {
  let component: RegionsSelectionComponent;
  let fixture: ComponentFixture<RegionsSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegionsSelectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionsSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

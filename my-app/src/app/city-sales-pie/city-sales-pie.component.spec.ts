import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySalesPieComponent } from './city-sales-pie.component';

describe('CitySalesPieComponent', () => {
  let component: CitySalesPieComponent;
  let fixture: ComponentFixture<CitySalesPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitySalesPieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitySalesPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

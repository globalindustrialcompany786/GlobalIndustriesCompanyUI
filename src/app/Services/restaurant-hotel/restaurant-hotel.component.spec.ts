import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantHotelComponent } from './restaurant-hotel.component';

describe('RestaurantHotelComponent', () => {
  let component: RestaurantHotelComponent;
  let fixture: ComponentFixture<RestaurantHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantHotelComponent]
    });
    fixture = TestBed.createComponent(RestaurantHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

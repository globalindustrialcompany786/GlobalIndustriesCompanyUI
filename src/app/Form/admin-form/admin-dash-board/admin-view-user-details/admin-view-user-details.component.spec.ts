import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewUserDetailsComponent } from './admin-view-user-details.component';

describe('AdminViewUserDetailsComponent', () => {
  let component: AdminViewUserDetailsComponent;
  let fixture: ComponentFixture<AdminViewUserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewUserDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminViewUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

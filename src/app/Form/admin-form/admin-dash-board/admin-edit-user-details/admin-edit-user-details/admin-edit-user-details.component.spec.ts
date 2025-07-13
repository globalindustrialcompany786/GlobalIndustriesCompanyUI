import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditUserDetailsComponent } from './admin-edit-user-details.component';

describe('AdminEditUserDetailsComponent', () => {
  let component: AdminEditUserDetailsComponent;
  let fixture: ComponentFixture<AdminEditUserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEditUserDetailsComponent]
    });
    fixture = TestBed.createComponent(AdminEditUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

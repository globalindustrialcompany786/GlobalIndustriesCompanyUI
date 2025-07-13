import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateUserFormComponent } from './admin-create-user-form.component';

describe('AdminCreateUserFormComponent', () => {
  let component: AdminCreateUserFormComponent;
  let fixture: ComponentFixture<AdminCreateUserFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateUserFormComponent]
    });
    fixture = TestBed.createComponent(AdminCreateUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

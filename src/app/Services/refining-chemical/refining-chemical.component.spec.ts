import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefiningChemicalComponent } from './refining-chemical.component';

describe('RefiningChemicalComponent', () => {
  let component: RefiningChemicalComponent;
  let fixture: ComponentFixture<RefiningChemicalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RefiningChemicalComponent]
    });
    fixture = TestBed.createComponent(RefiningChemicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

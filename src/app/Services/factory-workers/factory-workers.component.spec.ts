import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryWorkersComponent } from './factory-workers.component';

describe('FactoryWorkersComponent', () => {
  let component: FactoryWorkersComponent;
  let fixture: ComponentFixture<FactoryWorkersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactoryWorkersComponent]
    });
    fixture = TestBed.createComponent(FactoryWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

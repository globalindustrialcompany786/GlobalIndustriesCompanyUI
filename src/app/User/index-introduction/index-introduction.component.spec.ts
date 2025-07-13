import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexIntroductionComponent } from './index-introduction.component';

describe('IndexIntroductionComponent', () => {
  let component: IndexIntroductionComponent;
  let fixture: ComponentFixture<IndexIntroductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexIntroductionComponent]
    });
    fixture = TestBed.createComponent(IndexIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexGalleryComponent } from './index-gallery.component';

describe('IndexGalleryComponent', () => {
  let component: IndexGalleryComponent;
  let fixture: ComponentFixture<IndexGalleryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexGalleryComponent]
    });
    fixture = TestBed.createComponent(IndexGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

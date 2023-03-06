import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivGalleryComponent } from './priv-gallery.component';

describe('PrivGalleryComponent', () => {
  let component: PrivGalleryComponent;
  let fixture: ComponentFixture<PrivGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

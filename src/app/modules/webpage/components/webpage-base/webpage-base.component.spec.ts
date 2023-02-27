import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageBaseComponent } from './webpage-base.component';

describe('WebpageBaseComponent', () => {
  let component: WebpageBaseComponent;
  let fixture: ComponentFixture<WebpageBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebpageBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebpageBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

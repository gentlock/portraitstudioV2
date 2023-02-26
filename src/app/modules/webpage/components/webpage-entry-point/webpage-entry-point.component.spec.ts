import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpageEntryPointComponent } from './webpage-entry-point.component';

describe('WebpageEntryPointComponent', () => {
  let component: WebpageEntryPointComponent;
  let fixture: ComponentFixture<WebpageEntryPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebpageEntryPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebpageEntryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

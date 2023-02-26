import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEntryPointComponent } from './admin-entry-point.component';

describe('AdminEntryPointComponent', () => {
  let component: AdminEntryPointComponent;
  let fixture: ComponentFixture<AdminEntryPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEntryPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEntryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

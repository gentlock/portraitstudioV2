import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioMgrComponent } from './portfolio-mgr.component';

describe('PortfolioMgrComponent', () => {
  let component: PortfolioMgrComponent;
  let fixture: ComponentFixture<PortfolioMgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PortfolioMgrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PortfolioMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

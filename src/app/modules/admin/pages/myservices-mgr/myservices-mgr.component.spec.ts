import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyservicesMgrComponent } from './myservices-mgr.component';

describe('MyservicesMgrComponent', () => {
  let component: MyservicesMgrComponent;
  let fixture: ComponentFixture<MyservicesMgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyservicesMgrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyservicesMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

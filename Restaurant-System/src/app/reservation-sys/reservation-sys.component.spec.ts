import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationSysComponent } from './reservation-sys.component';

describe('ReservationSysComponent', () => {
  let component: ReservationSysComponent;
  let fixture: ComponentFixture<ReservationSysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationSysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

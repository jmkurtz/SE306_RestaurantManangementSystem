import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustReservationComponent } from './cust-reservation.component';

describe('CustReservationComponent', () => {
  let component: CustReservationComponent;
  let fixture: ComponentFixture<CustReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

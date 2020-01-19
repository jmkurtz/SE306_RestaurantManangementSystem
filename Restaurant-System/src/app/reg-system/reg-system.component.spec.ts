import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegSystemComponent } from './reg-system.component';

describe('RegSystemComponent', () => {
  let component: RegSystemComponent;
  let fixture: ComponentFixture<RegSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

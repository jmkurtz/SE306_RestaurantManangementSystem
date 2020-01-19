import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventorySysComponent } from './inventory-sys.component';

describe('InventorySysComponent', () => {
  let component: InventorySysComponent;
  let fixture: ComponentFixture<InventorySysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventorySysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventorySysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

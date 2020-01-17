import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSuppliersComponent } from './orders-suppliers.component';

describe('OrdersSuppliersComponent', () => {
  let component: OrdersSuppliersComponent;
  let fixture: ComponentFixture<OrdersSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

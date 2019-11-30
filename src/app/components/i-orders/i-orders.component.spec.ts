import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IOrdersComponent } from './i-orders.component';

describe('IOrdersComponent', () => {
  let component: IOrdersComponent;
  let fixture: ComponentFixture<IOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

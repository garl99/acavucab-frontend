import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ROrdersComponent } from './r-orders.component';

describe('ROrdersComponent', () => {
  let component: ROrdersComponent;
  let fixture: ComponentFixture<ROrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ROrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ROrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

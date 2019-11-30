import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NCustomersComponent } from './n-customers.component';

describe('NCustomersComponent', () => {
  let component: NCustomersComponent;
  let fixture: ComponentFixture<NCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

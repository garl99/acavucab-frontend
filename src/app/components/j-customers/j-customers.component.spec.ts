import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JCustomersComponent } from './j-customers.component';

describe('JCustomersComponent', () => {
  let component: JCustomersComponent;
  let fixture: ComponentFixture<JCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

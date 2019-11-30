import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OSuppliersComponent } from './o-suppliers.component';

describe('OSuppliersComponent', () => {
  let component: OSuppliersComponent;
  let fixture: ComponentFixture<OSuppliersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OSuppliersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

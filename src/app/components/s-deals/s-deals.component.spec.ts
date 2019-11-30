import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SDealsComponent } from './s-deals.component';

describe('SDealsComponent', () => {
  let component: SDealsComponent;
  let fixture: ComponentFixture<SDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SDealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

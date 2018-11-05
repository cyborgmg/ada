import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivPCalendarComponent } from './div-p-calendar.component';

describe('DivPCalendarComponent', () => {
  let component: DivPCalendarComponent;
  let fixture: ComponentFixture<DivPCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivPCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivPCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

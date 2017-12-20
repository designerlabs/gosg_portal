import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirsttimeloginComponent } from './firsttimelogin.component';

describe('FirsttimeloginComponent', () => {
  let component: FirsttimeloginComponent;
  let fixture: ComponentFixture<FirsttimeloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirsttimeloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirsttimeloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficinfoComponent } from './trafficinfo.component';

describe('TrafficinfoComponent', () => {
  let component: TrafficinfoComponent;
  let fixture: ComponentFixture<TrafficinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrafficinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineserviceComponent } from './onlineservice.component';

describe('OnlineserviceComponent', () => {
  let component: OnlineserviceComponent;
  let fixture: ComponentFixture<OnlineserviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineserviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalservicesComponent } from './digitalservices.component';

describe('DigitalservicesComponent', () => {
  let component: DigitalservicesComponent;
  let fixture: ComponentFixture<DigitalservicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalservicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitalservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

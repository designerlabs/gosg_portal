import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckexamresultComponent } from './checkexamresult.component';

describe('CheckexamresultComponent', () => {
  let component: CheckexamresultComponent;
  let fixture: ComponentFixture<CheckexamresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckexamresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckexamresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

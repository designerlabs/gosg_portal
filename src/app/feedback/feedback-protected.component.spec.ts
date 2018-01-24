import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackProtectedComponent } from './feedback-protected.component';

describe('FeedbackProtectedComponent', () => {
  let component: FeedbackProtectedComponent;
  let fixture: ComponentFixture<FeedbackProtectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackProtectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

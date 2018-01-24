import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PollProtectedComponent } from './poll-protected.component';

describe('PollProtectedComponent', () => {
  let component: PollProtectedComponent;
  let fixture: ComponentFixture<PollProtectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PollProtectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PollProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

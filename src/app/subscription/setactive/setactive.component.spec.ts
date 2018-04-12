import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetactiveComponent } from './setactive.component';

describe('SetactiveComponent', () => {
  let component: SetactiveComponent;
  let fixture: ComponentFixture<SetactiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetactiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

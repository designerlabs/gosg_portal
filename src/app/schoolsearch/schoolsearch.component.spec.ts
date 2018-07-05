import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolsearchComponent } from './schoolsearch.component';

describe('SchoolsearchComponent', () => {
  let component: SchoolsearchComponent;
  let fixture: ComponentFixture<SchoolsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolsearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

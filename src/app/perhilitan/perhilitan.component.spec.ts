import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerhilitanComponent } from './perhilitan.component';

describe('PerhilitanComponent', () => {
  let component: PerhilitanComponent;
  let fixture: ComponentFixture<PerhilitanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerhilitanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerhilitanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

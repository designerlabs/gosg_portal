import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerhilitanrenewComponent } from './perhilitanrenew.component';

describe('PerhilitanrenewComponent', () => {
  let component: PerhilitanrenewComponent;
  let fixture: ComponentFixture<PerhilitanrenewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerhilitanrenewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerhilitanrenewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

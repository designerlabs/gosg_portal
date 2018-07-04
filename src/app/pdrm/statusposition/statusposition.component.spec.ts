import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuspositionComponent } from './statusposition.component';

describe('StatuspositionComponent', () => {
  let component: StatuspositionComponent;
  let fixture: ComponentFixture<StatuspositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatuspositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatuspositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

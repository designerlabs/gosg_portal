import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EparticipationComponent } from './eparticipation.component';

describe('EparticipationComponent', () => {
  let component: EparticipationComponent;
  let fixture: ComponentFixture<EparticipationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EparticipationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EparticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

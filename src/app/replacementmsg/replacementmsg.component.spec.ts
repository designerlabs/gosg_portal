import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementmsgComponent } from './replacementmsg.component';

describe('ReplacementmsgComponent', () => {
  let component: ReplacementmsgComponent;
  let fixture: ComponentFixture<ReplacementmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacementmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

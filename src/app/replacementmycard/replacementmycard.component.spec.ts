import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementmycardComponent } from './replacementmycard.component';

describe('ReplacementmycardComponent', () => {
  let component: ReplacementmycardComponent;
  let fixture: ComponentFixture<ReplacementmycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacementmycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementmycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

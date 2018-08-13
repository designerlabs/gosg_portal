import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RssmainComponent } from './rssmain.component';

describe('RssmainComponent', () => {
  let component: RssmainComponent;
  let fixture: ComponentFixture<RssmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RssmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RssmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

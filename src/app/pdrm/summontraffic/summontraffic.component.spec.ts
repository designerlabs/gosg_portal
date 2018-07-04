import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummontrafficComponent } from './summontraffic.component';

describe('SummontrafficComponent', () => {
  let component: SummontrafficComponent;
  let fixture: ComponentFixture<SummontrafficComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummontrafficComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummontrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

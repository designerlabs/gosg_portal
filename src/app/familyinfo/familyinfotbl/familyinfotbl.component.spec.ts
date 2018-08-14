import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyinfotblComponent } from './familyinfotbl.component';

describe('FamilyinfotblComponent', () => {
  let component: FamilyinfotblComponent;
  let fixture: ComponentFixture<FamilyinfotblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyinfotblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyinfotblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavmainComponent } from './sidenavmain.component';

describe('SidenavmainComponent', () => {
  let component: SidenavmainComponent;
  let fixture: ComponentFixture<SidenavmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavprotectedComponent } from './sidenavprotected.component';

describe('SidenavprotectedComponent', () => {
  let component: SidenavprotectedComponent;
  let fixture: ComponentFixture<SidenavprotectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavprotectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavprotectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

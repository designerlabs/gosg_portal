import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProtectedComponent } from './home-protected.component';

describe('HomeProtectedComponent', () => {
  let component: HomeProtectedComponent;
  let fixture: ComponentFixture<HomeProtectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProtectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProtectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

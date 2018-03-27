import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencydirectoryComponent } from './agencydirectory.component';

describe('AgencydirectoryComponent', () => {
  let component: AgencydirectoryComponent;
  let fixture: ComponentFixture<AgencydirectoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencydirectoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencydirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

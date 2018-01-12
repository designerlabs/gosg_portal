import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementSubComponent } from './announcement-sub.component';

describe('AnnouncementSubComponent', () => {
  let component: AnnouncementSubComponent;
  let fixture: ComponentFixture<AnnouncementSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

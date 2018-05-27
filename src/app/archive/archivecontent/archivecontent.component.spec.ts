import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivecontentComponent } from './archivecontent.component';

describe('ArchivecontentComponent', () => {
  let component: ArchivecontentComponent;
  let fixture: ComponentFixture<ArchivecontentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivecontentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivecontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

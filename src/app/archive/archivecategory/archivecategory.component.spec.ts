import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivecategoryComponent } from './archivecategory.component';

describe('ArchivecategoryComponent', () => {
  let component: ArchivecategoryComponent;
  let fixture: ComponentFixture<ArchivecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

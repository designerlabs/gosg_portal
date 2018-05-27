import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesubcategoryComponent } from './archivesubcategory.component';

describe('ArchivesubcategoryComponent', () => {
  let component: ArchivesubcategoryComponent;
  let fixture: ComponentFixture<ArchivesubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivesubcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivesubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

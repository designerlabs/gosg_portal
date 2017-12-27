import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppManagementComponent } from './app-management.component';
import { TranslateModule } from "@ngx-translate/core";
import { SidenavDashboardComponent } from "../sidenav-dashboard/sidenav-dashboard.component";

describe('AppManagementComponent', () => {
  let component: AppManagementComponent;
  let fixture: ComponentFixture<AppManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppManagementComponent,
        SidenavDashboardComponent],
      imports: [
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(AppManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

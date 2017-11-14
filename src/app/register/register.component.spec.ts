import { TestBed, inject, async, ComponentFixture } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement, InjectionToken } from '@angular/core';
import { RegisterComponent } from './register.component';
import { HttpModule, Http } from "@angular/http";
import { TranslateService, LangChangeEvent, TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, FormControl, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { APP_CONFIG, AppConfig } from '../config/app.config.module';
import { BreadcrumbService } from '../header/breadcrumb/breadcrumb.service';
import { SharedService } from '../common/shared.service';
import { BrowserModule } from '@angular/platform-browser';
import {  SharedModule } from '../shared/shared.module';
import { TextMaskModule } from "angular2-text-mask/dist/angular2TextMask";

describe('RegisterComponent', () => {
  let comp:    RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });

  it('should create component', () => expect(comp).toBeDefined() );
});

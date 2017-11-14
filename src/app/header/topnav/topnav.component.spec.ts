import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser'; 
import { DebugElement }    from '@angular/core';
import { TopnavComponent } from './topnav.component';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopnavService } from './topnav.service';
import * as $ from 'jquery';
import { Http, Response} from '@angular/http';

describe('TopnavComponent', () => {

  let fixture: ComponentFixture<TopnavComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let allElm;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        TopnavComponent
      ],
      providers: [TopnavService, Http]
    }).compileComponents();

    fixture = TestBed.createComponent(TopnavComponent);
    // console.log(fixture);
    // debugger;
    
  }));


  it('after click language button', async(() => {
    //const fixture = TestBed.createComponent(TopnavComponent);
    //fixture.detectChanges();

    const component = fixture.componentInstance;
    // console.log(component);
    // debugger;
    expect(component.currlang).toBe('English');
    fixture.debugElement.nativeElement.querySelector('button').click();
    expect(component.currlang).toBe('Bahasa Malaysia');
  }));


  //Can't find 'colorPaletteActive' class. still working on it
  // it('check color class',() => {
  //   fixture.detectChanges();
  //   de = fixture.debugElement.query(By.css('input'));
  //   el = de.nativeElement;
  //   expect(el.classList).toContain('colorPaletteActive'); // default   
  //   allElm = fixture.debugElement.nativeElement.querySelectorAll('input');
  //   const color1 = allElm[1]; 
  //   fixture.debugElement.nativeElement.querySelectorAll('input')[1].click();
  //   expect(color1.classList).toContain('colorPaletteActive'); 
  // });

});

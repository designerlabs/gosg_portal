import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { FaqService } from './faq.service';

@Component({
     templateUrl: 'faq.component.html',
     styles: [`
     a {
            color: #337ab7;
            text-decoration: none;
      }
      a:hover, a:focus {
        color: #1ebebc;
        text-decoration: underline;
      }
     `
     ],
     providers: [FaqService]
})

export class FaqComponent{
  lang = this.lang;
  faqData: string;
  faqList: string[]= [];

  /*constructor(private translate:TranslateService,private faqService:FaqService){
        this.lang = translate.currentLang;
        this.getMyEnFaq();
        translate.onLangChange.subscribe((event: LangChangeEvent) => {
            let myLang = translate.currentLang;
            if (myLang == "en") {
              console.log("ENGLISH");
              this.getMyEnFaq();
            }
            if (myLang == "ms") {
                console.log("MALAY");
                this.getMyEnFaq();
            }
        });
  }

  getMyEnFaq(){
      this.faqService.getFaqData()
                .subscribe(
                returnedData => {
                  this.faqData = returnedData.results;
                  console.log(this.faqData);
                  for(let result of this.faqData){
                        this.faqList.push(result['FAQ_question_'+this.lang]);
                        this.faqList.push(result['FAQ_answer_en'+this.lang]);
                  }
                  //console.log(this.faqQuestion);
                },
                error=>alert(error),
              );
    }*/

}

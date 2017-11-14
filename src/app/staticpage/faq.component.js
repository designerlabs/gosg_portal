"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var faq_service_1 = require("./faq.service");
var FaqComponent = (function () {
    function FaqComponent() {
        this.lang = this.lang;
        this.faqList = [];
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
    return FaqComponent;
}());
FaqComponent = __decorate([
    core_1.Component({
        templateUrl: './app/staticpage/faq.component.html',
        styles: ["\n     a {\n            color: #337ab7;\n            text-decoration: none;\n      }\n      a:hover, a:focus {\n        color: #1ebebc;\n        text-decoration: underline;\n      }\n     "
        ],
        providers: [faq_service_1.FaqService]
    }),
    __metadata("design:paramtypes", [])
], FaqComponent);
exports.FaqComponent = FaqComponent;
//# sourceMappingURL=faq.component.js.map
import { NgModule, InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

let baseURL = 'http://10.1.17.12:3000/';
// let baseURL = 'http://10.1.70.148:8080/gosg-service-common/';
// let commonURL = 'http://10.1.43.15:8080/';

// common service
let portalBaseURL = 'http://localhost:8020/portal/';
let protectedBaseURL = 'http://localhost:8021/portal-protected/';
let commonURL = 'http://10.1.70.148:8080/gosg-service-common/';

// backend service
// let commonURL = 'http://10.1.70.148:8080/gosg-service-common/';
let baseLocalURL = './app/apidata/';
let searchServiceURL = 'https://www.malaysia.gov.my/public/';

export class AppConfig {
    apiEndpoint: string;
    urlMenu: string;
    urlSlider: string;
    urlFooter: string;
    urlArticle: string;
    urlCountry: string;
    urlReligion: string;
    urlLifeevent: string;
    urlSubtopic: string;
    urlTopics: string;
    urlHighlights: string;
    urlGender: string;
    urlPoll: string;
    urlAnnouncement: string;
    urlCalendar: string;
    urlRegister: string;
    urlFeedbackType: string;
    urlFeedbackSubject: string;
    urlFeedback: string;
    urlProfile: string;
    portalURL:string;
    protectedURL:string;
    urlIntSearch:string;
    urlUserType:string;
    urlRace:string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    urlMenu: './app/apidata/menudata',
    urlSlider: baseURL+'slider',
    urlRegister: baseURL+'register',
    urlUserType:baseURL+'user-type/',
    urlFooter: './app/apidata/footer',
    portalURL: portalBaseURL,
    protectedURL:protectedBaseURL,
    urlArticle: './app/apida1ta/topic',
    urlCountry: commonURL+'country',
    urlReligion: commonURL+'religion/lang/',
    // urlCountry: baseLocalURL+'countries.json',
    // urlCountry: '/app/apidata/countries',
    urlLifeevent: './app/apidata/lifeevent',
    urlSubtopic: './app/apidata/subtopic',
    urlGender: './app/apidata/gender',
    urlTopics: './app/apidata/articlemenu',
    // urlTopics: 'https://gosgstg.malaysia.gov.my/public/cms/service/article_menu/',
    urlHighlights: './app/apidata/highlightbox',
    urlRace: commonURL+'race/lang/',
    urlPoll: './app/apidata/poll',
    urlAnnouncement: './app/apidata/announcement',
    urlCalendar: './app/apidata/calendar',    
    urlFeedbackType: commonURL+'feedback/type/lang/',
    urlFeedbackSubject: commonURL+'feedback/subject/lang/',
    urlFeedback: commonURL+'feedback',
    urlProfile: baseURL+'profile',
    urlIntSearch: searchServiceURL + 'query/0/internal',
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {

}

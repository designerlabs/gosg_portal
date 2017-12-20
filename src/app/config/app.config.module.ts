import { NgModule, InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

let baseURL = 'http://10.1.17.12:3000/';
let registrationUrl = 'http://10.1.70.148:8082/registration/';

// let commonURL = 'http://10.1.43.15:8080/';

// common service
let portalBaseURL = 'http://localhost:8020/portal/';
let protectedBaseURL = 'http://localhost:8021/portal-protected/';
let commonURL = 'http://10.1.70.148:8080/gosg-service-common/';
let publicURL = 'http://10.1.70.148:8080/gosg-service-public/';

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
    urlState:string;
    urlRace:string;
    urlCity:string;
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
    urlMail:string;
    urlAppAgency:string;
    
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    urlMenu: './app/apidata/menudata',
    urlSlider: baseURL+'slider',
    urlFooter: './app/apidata/footer',
    urlArticle: './app/apidata/topic',
    urlCountry: commonURL+'country',
    urlState: commonURL+'state',
    urlRace: commonURL+'race/lang/',
    urlCity: commonURL+'city/state/',
    urlReligion: commonURL+'religion/lang/',
    urlLifeevent: './app/apidata/lifeevent',
    urlSubtopic: './app/apidata/subtopic',
    urlTopics: './app/apidata/articlemenu',
    urlHighlights: './app/apidata/highlightbox',
    urlGender: commonURL+'/gender/type/lang/',
    urlPoll: './app/apidata/poll',
    urlAnnouncement: './app/apidata/announcement',
    urlCalendar: './app/apidata/calendar',
    urlRegister: baseURL+'register',    
    urlFeedbackType: commonURL+'feedback/type/lang/',
    urlFeedbackSubject: commonURL+'feedback/subject/lang/',
    urlFeedback: commonURL+'feedback',
    urlProfile: baseURL+'profile',
    portalURL: portalBaseURL,
    protectedURL:protectedBaseURL,
    urlIntSearch: searchServiceURL + 'query/0/internal',
    urlUserType:baseURL+'user-type/',
    urlMail: commonURL+'inbox/',
    urlAppAgency: './app/apidata/appAgency',

};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {

}

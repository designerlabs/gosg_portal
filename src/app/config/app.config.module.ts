import { NgModule, InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

let baseURL = '/';
//let baseURL = 'http://10.1.17.12:3000/';
let uapURL = '/';
//let uapURL = 'https://10.1.71.176/';
let registrationUrl = uapURL+'registration/';


// common service
let portalBaseURL = 'http://localhost:8020/portal/';
let protectedBaseURL = uapURL+'service-protected/';
let commonURL = uapURL+'service/';

// backend service
let baseLocalURL = './app/apidata/';
let searchServiceURL = 'https://www.malaysia.gov.my/public/';
let pollUrl = commonURL + "polls";

export class AppConfig {
    apiEndpoint: string;
    urlMenu: string;
    urlSlider: string;
    urlFooter: string;
    urlArticle: string;
    urlCountry: string;
    urlState:string;
    urlPostcode:string;
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
    urlAnnouncementSub: string;
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
    urlUapStaging:string;
    urlComplete: string;
    urlGetUser: string;
    urlDashboard: string;
    urlUAP: string;
    urlGetProfile: string;
    urlPollProtected:string;
    urlFeedbackProtected:string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndpoint: '',
    urlMenu: './app/apidata/menudata',
    urlSlider: baseURL+'slider',
    urlFooter: './app/apidata/footer',
    urlArticle: './app/apidata/topic',
    urlCountry: commonURL+'country',
    urlState: commonURL+'state',
    urlPostcode: commonURL+'postcode/city/',
    urlRace: commonURL+'race/lang/',
    urlCity: commonURL+'city/state/',
    urlReligion: commonURL+'religion/lang/',
    urlLifeevent: './app/apidata/lifeevent',
    urlSubtopic: './app/apidata/subtopic',
    urlTopics: './app/apidata/articlemenu',
    urlHighlights: './app/apidata/highlightbox',
    urlGender: commonURL+'gender/lang/',
    urlAnnouncement : commonURL + 'announcement/date/publish',    
    urlAnnouncementSub: commonURL + 'announcement/category',
    urlCalendar: './app/apidata/calendar',
    urlRegister: registrationUrl+'register',    
    urlFeedbackType: commonURL+'feedback/type/lang/',
    urlFeedbackSubject: commonURL+'feedback/subject/lang/',
    urlFeedback: commonURL+'feedback',
    urlFeedbackProtected: protectedBaseURL+'feedback',
    urlProfile: baseURL+'profile',
    portalURL: portalBaseURL,
    urlDashboard: uapURL + 'portal-protected/dashboard/',
    protectedURL:protectedBaseURL,
    urlIntSearch: searchServiceURL + 'query/0/internal',
    urlUserType:uapURL+'service/user/type/lang/',
    urlMail: protectedBaseURL+'inbox/',
    urlUAP: uapURL,
    urlComplete: protectedBaseURL+'user/complete/registration',
    urlGetUser: protectedBaseURL+'user/detail',
    urlGetProfile: protectedBaseURL+'user/profile',
    urlAppAgency: './app/apidata/appAgency',
    urlUapStaging: 'https://uapstaging.malaysia.gov.my/uap/validatesigncryption.jsp?language=',
    urlPoll: commonURL + 'polls',
    urlPollProtected: protectedBaseURL + 'polls'

};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {

}

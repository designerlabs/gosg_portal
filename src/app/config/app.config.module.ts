import { NgModule, InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

let baseURL = 'http://10.1.17.12:3000/';
let uapURL = 'https://10.1.71.176/';
let registrationUrl = uapURL+'registration/';
let announcementUrl = 'http://10.1.70.148:8081/service/';

// common service
let portalBaseURL = 'http://localhost:8020/portal/';
let protectedBaseURL = uapURL+'service-protected/';
let commonURL = uapURL+'service/';

// backend service
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
    urlUapStaging:string;
    urlComplete: string;
    urlGetUser: string;
    urlDashboard: string;
    urlUAP: string;
    urlGetProfile: string;   
    urlAnnouncementSub: string;
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
    urlGender: commonURL+'gender/lang/',
    urlPoll: './app/apidata/poll',
    urlAnnouncement: './app/apidata/announcement',
    urlAnnouncementSub: announcementUrl + 'announcement/category',
    urlCalendar: './app/apidata/calendar',
    urlRegister: registrationUrl+'register',    
    urlFeedbackType: commonURL+'feedback/type/lang/',
    urlFeedbackSubject: commonURL+'feedback/subject/lang/',
    urlFeedback: commonURL+'feedback',
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
    urlUapStaging: 'https://uapstaging.malaysia.gov.my/uap/validatesigncryption.jsp?language='

};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule {

}

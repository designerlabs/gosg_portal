webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/announcement/announcement.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".mainCard{\r\n    text-align: center;\r\n    margin-top: -28px;\r\n}\r\n\r\n.rwCalen {\r\n    padding-left: 5px;\r\n}\r\n\r\n.col-xs-3 {\r\n    width: 25%;\r\n    padding-left: 50px;\r\n    font-weight: 700;\r\n}\r\n\r\nh1{\r\n    font-weight:900;\r\n    font-size:45px;\r\n}\r\n\r\nh4{\r\n    font-weight:600;\r\n}\r\n\r\n.annoucement {\r\n    background-color: #666666;\r\n    color: #fff;\r\n    padding: 50px;\r\n    margin: auto;\r\n    text-align: center;\r\n}\r\n\r\n.calendar {\r\n    background-color: #1ebebc;\r\n    color: #fff;\r\n    padding: 10px 0px 0px!important;\r\n    margin: auto;\r\n    text-align: center;\r\n    min-height: 239px !important;\r\n}\r\n\r\n.tender {\r\n    background-color: #a6a394;\r\n    color: #fff;\r\n    padding: 50px;\r\n    margin: auto;\r\n    text-align: center;\r\n}\r\n\r\n/* hover effect */\r\n.card.effect__hover:hover .card__front {\r\n  -webkit-transform: rotateY(-180deg);\r\n          transform: rotateY(-180deg);\r\n}\r\n\r\n.card.effect__hover:hover .card__back {\r\n    border: #ff5078;\r\n  -webkit-transform: rotateY(0);\r\n          transform: rotateY(0);\r\n}\r\n.card_front{\r\n  position: absolute;\r\n}\r\n.card__back{\r\n  margin-top: -240px;\r\n}\r\n\r\n.card__front,\r\n.card__back {\r\n  -webkit-backface-visibility: hidden;\r\n          backface-visibility: hidden;\r\n  transition: -webkit-transform 1.0s;\r\n  transition: transform 1.0s;\r\n  transition: transform 1.0s, -webkit-transform 1.0s;\r\n}\r\n\r\n.card__back {\r\n  -webkit-transform: rotateY(-180deg);\r\n          transform: rotateY(-180deg);\r\n}\r\n.card {\r\n  position: relative;\r\n}\r\n\r\na.plain_tag{\r\n    text-decoration: none ;\r\n    color:#FFFFFF;\r\n    float: right;\r\n}\r\n\r\ndiv {\r\n    display: block;\r\n}\r\n\r\nimg{\r\n    width:100px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/announcement/announcement.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"margin-top: 20px; margin-bottom: 0px; padding-bottom:20px;\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-4\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12 card effect__hover \">\r\n                    <div class=\"annoucement card__front\">\r\n                        <img src=\"https://www.malaysia.gov.my/public/static/images/pengumuman-01.svg\" alt=\"pengumuman\">\r\n                        <h4 class=\"font-size-m\" style=\"text-align: center; font-family: Roboto;\">{{'home.highlights'|translate|uppercase}}</h4>\r\n                    </div>\r\n                    <div class=\"annoucement card__back warna_bg\" style=\"height: 240px; width: 360px; background-color: rgb(0, 189, 187);\">\r\n                    <h4 class=\"mainCard font-size-m\" style=\"font-family: Roboto;\">{{'home.currentHighlights'|translate|uppercase}}</h4><br>\r\n                        <ul class=\"\" style=\"list-style:none; padding:0px;text-align:left\">\r\n                          <li style=\"padding:1px 0px 1px 0px;\" *ngFor=\"let item of (announcementData ? announcementData.slice(0,3): [])\"><h4 class=\"font-size-s\" style=\"font-family: Roboto;\"><i class=\"fa fa-bullhorn\" aria-hidden=\"true\"></i>\r\n                            <a href=\"https://www.malaysia.gov.my/public/cms/announcement/page/50/\" style=\"color:#FFFFFF;\">\r\n                                 {{item.desc | slice:0:30}}...</a>          \r\n                            </h4></li>                \r\n                        </ul>\r\n                        <a href=\"https://www.malaysia.gov.my/public/cms/announcement/\" class=\"plain_tag\">\r\n                        <p class=\"font-size-s\" style=\"font-family: Roboto;\"><i class=\"fa fa-caret-right\"></i>{{'home.readmore'|translate}}</p></a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <div class=\"calendar warna_bg\" style=\"padding: 1px; background-color: rgb(0, 189, 187);\" [style.background-color]=\"getTheme()\">\r\n                        <a href=\"https://www.malaysia.gov.my/public/cms/calendar/\" style=\"color:#fff;\" >\r\n                            <h4 class=\"mainCalen font-size-m\" style=\"text-align: center; font-family: Roboto;\">{{'home.calendarTitle'|translate | uppercase}}</h4>\r\n                            <div class=\"dynamicCalen\" style=\"padding: 0px 10px;\">\r\n                                <div class=\"row rwCalen\" style=\"cursor: pointer;\" data-attr=\"497148400637395\" *ngFor=\"let item of calendarData\">\r\n                                    <div class=\"col-xs-3\">\r\n                                        <h1>{{item.day}}</h1>\r\n                                    </div>\r\n                                    <div class=\"col-xs-9 text-left\">\r\n                                        <h4>{{item.month}}</h4>\r\n                                        <p style=\"margin-top: -10px\">{{item.name}}</p>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-sm-4\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <div class=\"tender\">\r\n                        <a href=\"https://www.malaysia.gov.my/public/cms/topic/39/\"><img src=\"https://www.malaysia.gov.my/public/static/images/tender-01.svg\" alt=\"tender\"></a>\r\n                        <h4 class=\"font-size-m\" style=\"text-align: center; font-family: Roboto;\">TENDER</h4>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/announcement/announcement.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnouncementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AnnouncementComponent = (function () {
    function AnnouncementComponent(translate, http, config) {
        var _this = this;
        this.translate = translate;
        this.http = http;
        this.config = config;
        this.lang = 'en';
        this.announcementUrl = this.config.urlAnnouncement;
        this.calendarUrl = this.config.urlCalendar;
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                _this.lang = 'en';
                _this.getData(_this.lang);
                _this.getCalendarData(_this.lang);
            }
            if (myLang == 'ms') {
                _this.lang = 'ms';
                _this.getData(_this.lang);
                _this.getCalendarData(_this.lang);
            }
        });
    }
    AnnouncementComponent.prototype.ngOnInit = function () {
    };
    AnnouncementComponent.prototype.getData = function (lang) {
        var _this = this;
        return this.http.get(this.announcementUrl + '-' + lang + '.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.announcementData = data[0].results[0].Announcement;
            console.log(_this.announcementData);
        });
    };
    AnnouncementComponent.prototype.getCalendarData = function (lang) {
        var _this = this;
        return this.http.get(this.calendarUrl + '-' + lang + '.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.calendarData = data;
            console.log(_this.calendarData);
        });
    };
    AnnouncementComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    return AnnouncementComponent;
}());
AnnouncementComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-announcement',
        template: __webpack_require__("../../../../../src/app/announcement/announcement.component.html"),
        styles: [__webpack_require__("../../../../../src/app/announcement/announcement.component.css")]
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */]) === "function" && _c || Object])
], AnnouncementComponent);

var _a, _b, _c;
//# sourceMappingURL=announcement.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-management/app-management.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, " .example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    max-height: 500px;\r\n    min-width: 300px;\r\n  }\r\n  \r\n  .mat-table {\r\n    overflow: auto;\r\n    max-height: 500px;\r\n  }\r\n\r\n  .mat-row:nth-child(even) {\r\n    background: #f0f0f0;\r\n  }\r\n\r\n  .mat-header-cell {\r\n    font-weight: bold;\r\n    padding: 5px;\r\n  }\r\n\r\n  .mat-cell {\r\n      padding: 5px;\r\n      vertical-align: top;\r\n  }\r\n\r\n  .mat-column-subject{\r\n      max-width:70%;\r\n  }\r\n\r\n  .mat-column-position{\r\n      max-width:10%;\r\n  }\r\n\r\n  .mat-column-action{\r\n    max-width:20%;\r\n}\r\n\r\n/* .list-inline{\r\n\tmargin-top: 25px;\r\n}\r\n\r\n.list-inline li a:hover{\r\n\ttext-decoration:none;\r\n\tcolor:#333;\r\n} */\r\n\r\n.table_row:hover{\r\n    background:#ddd;\r\n}\r\n\r\nmat-table{\r\n    height: 100%;\r\n    min-height: 100%;\r\n    max-height: 100% !important;\r\n}\r\n\r\n.table_row_height{\r\n    height:45px;\r\n}\r\n\r\n.moreSearchOptBtn{\r\n    float: right;\r\n    position: relative;\r\n    clear: both;\r\n    margin-top: 15px;\r\n} \r\n\r\n/* Toggle search */\r\n.adSearch{\r\n    position: absolute;\r\n    right: 0px;\r\n    top:-20px;\r\n}\r\n\r\n.editBtn{\r\n    position: absolute;\r\n    right: -15px;\r\n    top:-60px;\r\n}\r\n  \r\n.editBtn-active {\r\n    position: absolute;\r\n    background-color: rgb(109, 185, 38);\r\n    color: #FFF;\r\n    right: -15px;\r\n    top:-60px;\r\n}\r\n\r\ninput{\r\n    color:#333;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-management/app-management.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid animated slideInDown\" style=\"background: #a7a495;\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <h1 style=\"margin-top: 10px;\" class=\"font-size-l\">{{'home.breadcrumb.appmgmt' | translate}}</h1>\r\n        <hr class=\"hr-custom2\">\r\n        <ul class=\"list-inline\" style=\"clear:both;\">\r\n          <li>\r\n            <a class=\"font-size-s\" href=\"/index/\">\r\n              {{'home.menu.home' | translate }}\r\n            </a>\r\n          </li>\r\n          <li>/</li>\r\n          <li>\r\n            {{'home.breadcrumb.appmgmt' | translate}}\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"container\">\r\n  <div class=\"col-md-12\">&nbsp;</div>\r\n  <div class=\"col-md-3 padding-left-0\">\r\n    <gosg-sidenav-dashboard></gosg-sidenav-dashboard>\r\n  </div>\r\n  <div class=\"col-md-9 mat-elevation-z8\" style=\"margin-top:15px;\">\r\n    <div class=\"moreSearchOptBtn\">\r\n        <!-- (click)=\"changeShowStatus()\" [ngClass]=\"{ 'editBtn-active': showHide, 'editBtn': !showHide  }\" -->\r\n        <!-- <i class=\"fa fa-search font-size-l\"></i> -->\r\n      <!-- <button type=\"button\" mat-fab color=\"warn\" class=\"ng-tns-c8-5 ng-trigger ng-trigger-indicatorRotate\" style=\"transform: rotate(0deg);\">&nbsp;\r\n      </button> -->\r\n    </div>\r\n    <form [formGroup]=\"searchForm\" (ngSubmit)=\"searchapp(searchForm.value)\" #adSearchForm=\"ngForm\" id=\"adSearch-form\" role=\"form\"\r\n      novalidate=\"novalidate\">\r\n      <br />\r\n      <mat-expansion-panel>\r\n              <mat-expansion-panel-header style=\"padding-top: 0px\">\r\n                <div class=\"col-md-4\">\r\n                  <mat-panel-title>\r\n                    <mat-form-field>\r\n                      <input matInput formControlName=\"appNumber\" placeholder=\"{{'appmngt.setSearch.appNumber' | translate}}\" name=\"appNum\" id=\"appNum\">\r\n                    </mat-form-field>\r\n                  </mat-panel-title>\r\n                </div>\r\n                <div class=\"col-md-4\">\r\n                </div>\r\n                <div class=\"col-md-4\" style=\"text-align: right\">\r\n                    <br />\r\n                  <mat-panel-description>\r\n                    {{ 'appmngt.setSearch.moreOpt' | translate }}\r\n                  </mat-panel-description>\r\n                </div>\r\n              </mat-expansion-panel-header>\r\n            <!-- </div> -->\r\n          <!-- </div> -->\r\n\r\n        <div class=\"col-md-12\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n              <mat-form-field>\r\n                <mat-select formControlName=\"agency\" placeholder=\"{{'appmngt.setSearch.agency' | translate}}\" name=\"agency\" id=\"agency\">\r\n                  <mat-option *ngFor=\"let data of dataAgency\" [value]=\"data.agencyId\">{{data.agency}}\r\n                  </mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n              <mat-form-field>\r\n                <mat-select formControlName=\"appStatus\" placeholder=\"{{'appmngt.setSearch.appStatus' | translate}}\" name=\"appStatus\" id=\"appStatus\">\r\n                  <mat-option *ngFor=\"let data of data\" [value]=\"data.statusId\">{{data.status}}\r\n                  </mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n            </div>\r\n          </div>\r\n          <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n              <mat-form-field>\r\n                <input matInput [matDatepicker]=\"startData\" formControlName=\"startData\" placeholder=\"{{'appmngt.setSearch.startDate' | translate}}\"\r\n                  name=\"startDate\" id=\"startDate\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"startData\" style=\"color:#333;\"></mat-datepicker-toggle>\r\n                <mat-datepicker #startData startView=\"year\" [startAt]=\"startDate\"></mat-datepicker>\r\n              </mat-form-field>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n              <mat-form-field>\r\n                <input matInput [matDatepicker]=\"endData\" formControlName=\"endData\" placeholder=\"{{'appmngt.setSearch.endDate' | translate}}\"\r\n                  name=\"endDate\" id=\"endDate\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"endData\" style=\"color:#333;\"></mat-datepicker-toggle>\r\n                <mat-datepicker #endData startView=\"year\" [startAt]=\"startDate\"></mat-datepicker>\r\n              </mat-form-field>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <!-- <br /> -->\r\n                <div style=\"height: 13px\">&nbsp;</div>\r\n              <button mat-raised-button type=\"button\" color=\"primary\" id=\"searchbtn\" class=\"form-control btn btn-md btn-success font-size-s\"\r\n                (click)=\"searchapp(searchForm.value)\" style=\"width: auto; height: 35px; font-family: Roboto;\">\r\n                <i class=\"fa fa-search\"></i> {{'appmngt.setSearch.search' | translate}}</button>\r\n              <button tabindex=\"\" mat-raised-button color=\"warn\" type=\"button\" id=\"btnreset\" class=\"form-control btn btn-md btn-warning font-size-s\"\r\n                style=\"width: auto; height: 35px; font-family: Roboto;\" (click)=\"resetModal.show()\">\r\n                <i class=\"fa fa-refresh\"></i> {{'feedback.label.reset' | translate }}</button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <br />\r\n      </mat-expansion-panel>\r\n\r\n      <p>&nbsp;</p>\r\n    </form>\r\n    <!-- <div class=\"row\"></div> -->\r\n    <table class=\"mat-table\" style=\"width:100%; z-index: 9999;\">\r\n      <tr class=\"mat-header-row\" style=\"height:45px\">\r\n        <th width=\"5%\" class=\"mat-header-cell\">{{'appmngt.tableHeader.num' | translate}}</th>\r\n        <th width=\"15%\" class=\"mat-header-cell\">{{'appmngt.tableHeader.appNo' | translate}}</th>\r\n        <th class=\"mat-header-cell\">{{'appmngt.tableHeader.appName' | translate}}</th>\r\n        <th width=\"10%\" class=\"mat-header-cell\">{{'appmngt.setSearch.agency' | translate}}</th>\r\n        <th width=\"15%\" class=\"mat-header-cell text-center\">{{'appmngt.tableHeader.submit' | translate}}</th>\r\n        <th width=\"15%\" class=\"mat-header-cell text-center\">{{'appmngt.tableHeader.status' | translate}}</th>\r\n        <th width=\"15%\" class=\"mat-header-cell text-center\">{{'appmngt.tableHeader.action' | translate}}</th>\r\n      </tr>\r\n      <tr class=\"mat-row\" *ngFor=\"let data of dataApp\" role=\"row\">\r\n        <td class=\"mat-cell text-center\">{{data.dataId}}</td>\r\n        <td class=\"mat-cell\">{{data.no_app}}</td>\r\n        <td class=\"mat-cell\">{{data.name_app}}</td>\r\n        <td class=\"mat-cell\">{{data.agency}}</td>\r\n        <td class=\"mat-cell text-center\">{{data.submit}}</td>\r\n        <td class=\"mat-cell text-center\">{{data.status}}</td>\r\n        <td class=\"mat-cell text-center\">\r\n          <button class=\"btn btn-sm btn-warning\">\r\n            <i class=\"fa fa-eye font-size-s\"></i>\r\n          </button>\r\n        </td>\r\n      </tr>\r\n    </table>\r\n\r\n    <mat-form-field style=\"width:50px;\">\r\n      <mat-select class=\"font-size-s\" value=\"10\" (change)=\"pageChange($event)\">\r\n        <mat-option value=\"5\">5</mat-option>\r\n        <mat-option value=\"10\">10</mat-option>\r\n        <mat-option value=\"25\">25</mat-option>\r\n        <mat-option value=\"50\">50</mat-option>\r\n      </mat-select>\r\n    </mat-form-field>\r\n    <div style=\"float:right; margin-top: 10px;\">\r\n      <span style=\"color:#000; padding-right:20px;\">{{'appmngt.tablebottom.page' | translate}}\r\n        <strong>1</strong> {{'appmngt.tablebottom.of' | translate}}\r\n        <strong>10</strong> {{'appmngt.tablebottom.in' | translate}}\r\n        <strong>500</strong> {{'appmngt.tablebottom.app' | translate}}</span>\r\n      <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(mailData?.pageNumber)\">\r\n        <i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i>\r\n      </button>\r\n      <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\" (click)=\"paginatorR(mailData?.pageNumber, mailData?.totalPages)\">\r\n        <i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i>\r\n      </button>\r\n    </div>\r\n    <br />\r\n  </div>\r\n  <br />\r\n</div>\r\n\r\n<app-confirm-dialog #resetModal [title]=\"'common.icon.warn'\" [content]=\"'common.msg.reset'\" [state]=\"'common.state.warn'\"\r\n  [isReset]=\"'true'\" (resetMethod)=\"resetMethod($event)\">\r\n</app-confirm-dialog>"

/***/ }),

/***/ "../../../../../src/app/app-management/app-management.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppManagementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_shared_service__ = __webpack_require__("../../../../../src/app/common/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_toastr__ = __webpack_require__("../../../../ngx-toastr/toastr.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialogs_dialogs_service__ = __webpack_require__("../../../../../src/app/dialogs/dialogs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_protected_service__ = __webpack_require__("../../../../../src/app/services/protected.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_portal_service__ = __webpack_require__("../../../../../src/app/services/portal.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var AppManagementComponent = (function () {
    function AppManagementComponent(protectedService, dialogsService, cdRef, toastr, sharedService, portalService, translate, http, _renderer, config) {
        this.protectedService = protectedService;
        this.dialogsService = dialogsService;
        this.cdRef = cdRef;
        this.toastr = toastr;
        this.sharedService = sharedService;
        this.portalService = portalService;
        this.translate = translate;
        this.http = http;
        this._renderer = _renderer;
        this.config = config;
        this.showHide = false;
        this.mailboxId = [];
        this.mailPageSize = 10;
        this.mailPageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.isMailContainerShow = 'block';
        this.languageId = this.languageId;
        this.collapse = true;
        this.barClass = "container-fluid";
    }
    AppManagementComponent.prototype.ngOnInit = function () {
        this.getDataApp();
        this.appNumber = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormControl"](),
            this.agency = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormControl"](),
            this.appStatus = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormControl"](),
            this.startData = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormControl"](),
            this.endData = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormControl"](),
            this.searchForm = new __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormGroup"]({
                appNumber: this.appNumber,
                agency: this.agency,
                appStatus: this.appStatus,
                startData: this.startData,
                endData: this.endData
            });
        this.languageId = 2;
        this.getMails(this.mailPageCount, this.mailPageSize);
    };
    AppManagementComponent.prototype.getMails = function (page, size) {
        var _this = this;
        this.protectedService.getMails('930701055000', page, size).
            subscribe(function (data) {
            _this.mailData = data;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('mailbox.err.failtoload'), '');
        });
    };
    AppManagementComponent.prototype.pageChange = function (event) {
        // this.getMails(this.mailPageCount, event.value);
        this.mailPageSize = event.value;
    };
    AppManagementComponent.prototype.paginatorL = function (page) {
        // this.getMails(page-1, this.mailPageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    AppManagementComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc = page + 1;
        this.noNextData = pageInc === totalPages;
        // this.getMails(page+1, this.mailPageSize);
    };
    AppManagementComponent.prototype.toggleCollapse = function () {
        // this.show = !this.show
        if (this.collapse == true) {
            this.collapse = false;
            this.barClass = "slideInDown";
        }
        else if (this.collapse == false) {
            this.collapse = true;
            this.barClass = "slideOutUp";
        }
    };
    AppManagementComponent.prototype.changeShowStatus = function () {
        console.log(this.showHide);
        this.showHide = !this.showHide;
        this.getAgencyApp();
        this.getStatusApp();
    };
    AppManagementComponent.prototype.getAgencyApp = function () {
        var _this = this;
        this.portalService.getAgencyApp().subscribe(function (data) {
            _this.dataAgency = data.agencyList;
            console.log(_this.dataAgency);
        });
    };
    AppManagementComponent.prototype.getStatusApp = function () {
        var _this = this;
        this.portalService.getStatusApp().subscribe(function (data) {
            _this.data = data.status;
            console.log(_this.data);
        });
    };
    AppManagementComponent.prototype.getDataApp = function () {
        var _this = this;
        this.portalService.getDataApp().subscribe(function (data) {
            _this.dataApp = data.dataTable;
            console.log(_this.dataApp);
        });
    };
    AppManagementComponent.prototype.resetSearch = function () {
        this.appNumber.reset();
        this.agency.reset();
        this.appStatus.reset();
        this.endData = null;
        this.startData = null;
        this.searchForm.get('endData').setValue("");
        this.searchForm.get('startData').setValue("");
    };
    AppManagementComponent.prototype.resetMethod = function (event) {
        this.resetSearch();
    };
    AppManagementComponent.prototype.searchapp = function (formValues) {
        var body = {
            "no_app": null,
            "agensi": null,
            "status": null,
            "startD": null,
            "endD": null
        };
        console.log(formValues);
        body.no_app = formValues.appNumber;
        body.agensi = formValues.agency;
        body.status = formValues.appStatus;
        body.startD = formValues.startData;
        body.endD = formValues.endData;
        var datasend = JSON.stringify(body);
    };
    return AppManagementComponent;
}());
AppManagementComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-app-management',
        template: __webpack_require__("../../../../../src/app/app-management/app-management.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-management/app-management.component.css")],
    }),
    __param(9, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_5__services_protected_service__["a" /* ProtectedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_protected_service__["a" /* ProtectedService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__dialogs_dialogs_service__["a" /* DialogsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__dialogs_dialogs_service__["a" /* DialogsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_ngx_toastr__["b" /* ToastrService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ngx_toastr__["b" /* ToastrService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__common_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__common_shared_service__["a" /* SharedService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_8__services_portal_service__["a" /* PortalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__services_portal_service__["a" /* PortalService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_9__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__angular_http__["Http"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_7__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__config_app_config_module__["b" /* AppConfig */]) === "function" && _k || Object])
], AppManagementComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=app-management.component.js.map

/***/ }),

/***/ "../../../../../src/app/article/article.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, " .sideBarMenu--title {\r\n            font-size: 20px;\r\n            color: #333;\r\n            font-weight: 600;\r\n            margin-bottom: 20px;\r\n        }\r\n\r\n        .defaultColor{\r\n            color:#333;\r\n        }\r\n\r\n        .list-unstyled {\r\n            margin-top: -15px;\r\n        }\r\n\r\n        .list-unstyled > li > div {\r\n            margin: 10px 0px;\r\n            padding: 0px;\r\n        }\r\n\r\n        .list-unstyled > li > div > a {\r\n            color: #333;\r\n        }\r\n\r\n        .list-unstyled > li > div > a:hover{\r\n            /* color: #23527c; */\r\n            color: #1ebebc;\r\n            text-decoration: underline;\r\n        }\r\n\r\n        .intro-box {\r\n            background-color: #f9fafc;\r\n            border-top: 3px solid #1ebebc;\r\n            margin-bottom: 20px;\r\n            padding: 0px 15px 15px 15px;\r\n            height: auto !important;\r\n            min-height: 115px;\r\n            display: inline-block;\r\n            width: 100%;\r\n            color:#333;\r\n            overflow: hidden;\r\n            float: left;\r\n            text-decoration: none;\r\n        }\r\n\r\n        .intro-box:hover {\r\n            text-decoration: none;\r\n            border-top: 3px solid #e6436e;\r\n            background: #eaeaea;\r\n        }\r\n\r\n        .intro-box:hover h4 {\r\n            color: #1ebebc !important;\r\n        }\r\n\r\n        \r\n\r\n        .intro-box h4 {\r\n            color: #333;\r\n            font-weight: 700;\r\n            padding: 0px 0px 10px 0px;\r\n        }\r\n\r\n        .intro-box p {\r\n            padding: 0px;\r\n        }\r\n\r\n        .topic_bg_title {\r\n            margin-top: 100px;\r\n            cursor: default;\r\n            color: #fff;\r\n            position: relative;\r\n            /* background: #fff; */\r\n            padding: 10px;\r\n            background: #333;\r\n            background: linear-gradient(to right, #333 60%, transparent);\r\n        }\r\n\r\n\r\n            .hr-custom2 {\r\n                margin-top: -5px;\r\n                margin-bottom: 0px;\r\n                border: 0;\r\n                border-top: 3px solid #918c79;\r\n                width: 8%;\r\n                float: left;\r\n            }\r\n\r\n            .list-inline{\r\n                margin-top: 25px;\r\n            }\r\n\r\n            .list-inline li a:hover{\r\n                text-decoration:none;\r\n                color:#333;\r\n            }\r\n\r\n            .titleWObg{\r\n                color:#333;\r\n            }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/article/article.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div class=\"container-fluid animated slideInDown\" style=\"background: #a7a495;\">\r\n    <div class=\"container\" *ngFor=\"let article of articleService.articles\">\r\n     <div class=\"row\" *ngFor=\"let data of article.results\">\r\n        <div class=\"col-md-12\">\r\n            <h1 style=\"margin-top: 10px;\" class=\"font-size-l\">{{data.title}}</h1>\r\n            <hr class=\"hr-custom2\">\r\n            <ul class=\"list-inline\" style=\"clear:both;\">\r\n                <li>\r\n                    <a class=\"font-size-s\" href=\"/index/\">\r\n                        {{'home.menu.home' | translate }}\r\n                    </a>\r\n                </li>\r\n                <li>/</li>\r\n                <li>\r\n                    {{'home.breadcrumb.register' | translate}}\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    </div>\r\n</div>\r\n\r\n<div style=\"margin-top:10px;\" class=\"container\" *ngFor=\"let article of articleService.articles\">\r\n\r\n    <div class=\"row\" *ngFor=\"let data of article.results\">\r\n        <div class=\"col-sm-3\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12 sideBarMenu\">\r\n                    <h4 class=\"sideBarMenu--title padding-bottom-l font-size-m warna_font\">\r\n                        {{data.title}}\r\n\r\n                    </h4>\r\n                    <ul class=\"list-unstyled\">\r\n                        <li class=\"liList\" *ngFor=\"let content of data.menu_left\">\r\n                            <div class=\"col-xs-12 col-md-12 col-sm-12\">\r\n                                <a class=\"warna_font sideBarMenu--link font-size-s\" [routerLinkActive]=\"['active']\"  [style.font-weight]=\"content.active ? 'bold' : 'normal'\"  [style.color]=\"content.active ? getTheme() : '#333'\"  href=\"\" (click)=\"clickSideMenu(content)\">\r\n                                {{content.label}}\r\n                          \r\n                                </a>\r\n                            </div>\r\n                            <ul style=\"list-style: none; padding-left: 15px;\">\r\n                                <li *ngFor=\"let subcontent of content.sub_menu_left\">\r\n                                     <a class=\"warna_font sideBarMenu--link font-size-s\" style=\"color:#333\"  href=\"\" (click)=\"clickSideMenu(content)\">\r\n                                        {{subcontent.label}}\r\n                                        \r\n                                    </a>\r\n                                </li>\r\n                            </ul>\r\n                            <!--<div class=\"col-xs-2\">(6)</div>-->\r\n                           \r\n                        </li>\r\n\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n        <div class=\"col-sm-6\">\r\n\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12 warna_font\">\r\n                    <div  *ngIf=\"checkImgData(data.description)\" style=\"position:absolute; width:auto;\">\r\n                        <h2 class=\"topic_bg_title font-size-l\">\r\n                            <span style=\"padding-left:10px;\">\r\n                                {{data.title}}\r\n                            </span>\r\n                        </h2>\r\n                    </div>\r\n\r\n\r\n                    <div  *ngIf=\"!checkImgData(data.description)\" style=\"position:relative;\">\r\n                        <h2 class=\"titleWObg font-size-l\">\r\n                                {{data.title}}\r\n                        </h2>\r\n                    </div>\r\n\r\n\r\n                    <span class=\"font-size-s defaultColor\" [innerHTML]=\"data.description\">\r\n\r\n                    </span>\r\n\r\n                    <div class=\"row padding-top-xl\">\r\n\r\n                        <div class=\"col-sm-6\" *ngFor=\"let leftContent of data.content\">\r\n                             <div>\r\n                                <div style=\"width:100%; margin-right:10px; height:auto;\">\r\n                                    <a class=\"intro-box warna_border_color\" [style.border-color]=\"getTheme()\" href=\"\" (click)=\"clickSideMenu(leftContent)\">\r\n                                        <h4 class=\"font-size-m warna_font\">\r\n                                            {{leftContent.label}}\r\n                                        </h4>\r\n                                        <span class=\"warna_font article-size font-size-s\" [innerHTML]=\"leftContent.description\"></span>\r\n                                        <div class=\"font-size-s\" style=\"text-align: right;\"><i class=\"fa fa-caret-right\"></i> {{'home.readmore' | translate }}</div>\r\n                                    </a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n\r\n\r\n\r\n    </div>\r\n\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/article/article.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article_service__ = __webpack_require__("../../../../../src/app/article/article.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header_nav_nav_service__ = __webpack_require__("../../../../../src/app/header/nav/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__header_breadcrumb_breadcrumb_service__ = __webpack_require__("../../../../../src/app/header/breadcrumb/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ArticleComponent = (function () {
    function ArticleComponent(articleService, route, navService, translate, router, breadcrumbService) {
        var _this = this;
        this.articleService = articleService;
        this.route = route;
        this.navService = navService;
        this.translate = translate;
        this.router = router;
        this.breadcrumbService = breadcrumbService;
        this.menuClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.langChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.lang = this.lang;
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.topicID = parseInt(_this.router.url.split('/')[2]);
                    _this.navService.triggerArticle(_this.lang, _this.topicID);
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.topicID = parseInt(_this.router.url.split('/')[2]);
                    _this.navService.triggerArticle(_this.lang, _this.topicID);
                });
            }
        });
    }
    ArticleComponent.prototype.ngOnInit = function () {
        this.articleData = this.articleService.getArticle();
        this.topicID = parseInt(this.router.url.split('/')[2]);
        this.navService.triggerArticle(this.lang, this.topicID);
    };
    ArticleComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    ArticleComponent.prototype.clickSideMenu = function (e) {
        var _getSubLabel = e.json_url.split('&');
        var _getSubID = _getSubLabel[1].split('=');
        var _getTopicID = parseInt(this.router.url.split('/')[2]);
        _getSubID = parseInt(_getSubID[1]);
        this.navService.getSubArticleUrl(_getTopicID, _getSubID, this.lang);
        this.router.navigate(['/subtopic', _getTopicID, _getSubID]);
        event.preventDefault();
    };
    ArticleComponent.prototype.triggerArticle = function (lang, topicID) {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) {
            return _this.navService.getArticleData(lang, topicID);
        })
            .subscribe(function (resSliderData) {
            _this.articles = resSliderData;
            _this.breadcrumb = _this.breadcrumbService.getBreadcrumb();
            _this.isValid = _this.breadcrumbService.isValid = true;
            _this.breadcrumb = _this.breadcrumb.name = '';
        });
    };
    ArticleComponent.prototype.checkImgData = function (e) {
        var chkData = e.search('<img');
        if (chkData != -1) {
            return true;
        }
        else {
            return false;
        }
    };
    return ArticleComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('textarea'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], ArticleComponent.prototype, "textarea", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ArticleComponent.prototype, "menuClick", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ArticleComponent.prototype, "langChange", void 0);
ArticleComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-article',
        template: __webpack_require__("../../../../../src/app/article/article.component.html"),
        styles: [__webpack_require__("../../../../../src/app/article/article.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__header_nav_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__header_nav_nav_service__["a" /* NavService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__header_breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__header_breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */]) === "function" && _g || Object])
], ArticleComponent);

var _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=article.component.js.map

/***/ }),

/***/ "../../../../../src/app/article/article.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArticleService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var ArticleService = (function () {
    function ArticleService(http, config, route, router) {
        this.http = http;
        this.config = config;
        this.router = router;
        this.menuClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.article = {
            name: 'hello'
        };
        this.articleUrl = this.config.urlArticle;
    }
    ArticleService.prototype.getArticle = function () {
        return this.article;
    };
    return ArticleService;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ArticleService.prototype, "menuClick", void 0);
ArticleService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _d || Object])
], ArticleService);

var _a, _b, _c, _d;
//# sourceMappingURL=article.service.js.map

/***/ }),

/***/ "../../../../../src/app/article/subarticle/subarticle.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".sideBarMenu--title {\r\n            font-size: 20px;\r\n            color: #333;\r\n            font-weight: 600;\r\n            margin-bottom: 20px;\r\n        }\r\n\r\n        .defaultColor{\r\n            color:#333;\r\n        }\r\n\r\n        .list-unstyled {\r\n            margin-top: -15px;\r\n        }\r\n\r\n        .list-unstyled > li > div {\r\n            margin: 10px 0px;\r\n            padding: 0px;\r\n        }\r\n\r\n        .list-unstyled > li > div > a {\r\n            color: #333;\r\n        }\r\n\r\n        .list-unstyled > li > div > a:hover{\r\n            /* color: #23527c; */\r\n            color: #1ebebc;\r\n            text-decoration: underline;\r\n        }\r\n\r\n        .intro-box {\r\n            background-color: #f9fafc;\r\n            border-top: 3px solid #1ebebc;\r\n            margin-bottom: 20px;\r\n            padding: 0px 15px 15px 15px;\r\n            height: auto !important;\r\n            min-height: 115px;\r\n            display: inline-block;\r\n            width: 100%;\r\n            color:#333;\r\n            overflow: hidden;\r\n            float: left;\r\n            text-decoration: none;\r\n        }\r\n\r\n        .intro-box:hover {\r\n            text-decoration: none;\r\n            border-top: 3px solid #e6436e;\r\n            background: #eaeaea;\r\n        }\r\n\r\n        .intro-box:hover h4 {\r\n            color: #1ebebc !important;\r\n        }\r\n\r\n        \r\n\r\n        .intro-box h4 {\r\n            color: #333;\r\n            font-weight: 700;\r\n            padding: 0px 0px 10px 0px;\r\n        }\r\n\r\n        .intro-box p {\r\n            padding: 0px;\r\n        }\r\n\r\n        .topic_bg_title {\r\n            margin-top: 100px;\r\n            cursor: default;\r\n            color: #fff;\r\n            position: relative;\r\n            /* background: #fff; */\r\n            padding: 10px;\r\n            background: #333;\r\n            background: linear-gradient(to right, #333 60%, transparent);\r\n        }\r\n\r\n        \r\n            .hr-custom2 {\r\n                margin-top: -5px;\r\n                margin-bottom: 0px;\r\n                border: 0;\r\n                border-top: 3px solid #918c79;\r\n                width: 8%;\r\n                float: left;\r\n            }\r\n\r\n            .list-inline{\r\n                margin-top: 25px;\r\n            }\r\n            \r\n            .list-inline li a:hover{\r\n                text-decoration:none;\r\n                color:#333;\r\n            }\r\n\r\n             .titleWObg{\r\n                color:#333;\r\n            }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/article/subarticle/subarticle.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SubarticleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__article_service__ = __webpack_require__("../../../../../src/app/article/article.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__header_nav_nav_service__ = __webpack_require__("../../../../../src/app/header/nav/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__header_breadcrumb_breadcrumb_service__ = __webpack_require__("../../../../../src/app/header/breadcrumb/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var SubarticleComponent = (function () {
    function SubarticleComponent(articleService, route, navService, translate, router, breadcrumbService) {
        var _this = this;
        this.articleService = articleService;
        this.route = route;
        this.navService = navService;
        this.translate = translate;
        this.router = router;
        this.breadcrumbService = breadcrumbService;
        this.menuClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.langChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.lang = this.lang;
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.topicID = parseInt(_this.router.url.split('/')[2]);
                    _this.subID = parseInt(_this.router.url.split('/')[3]);
                    _this.navService.triggerSubArticle(_this.topicID, _this.subID, _this.lang);
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.topicID = parseInt(_this.router.url.split('/')[2]);
                    _this.subID = parseInt(_this.router.url.split('/')[3]);
                    _this.navService.triggerSubArticle(_this.topicID, _this.subID, _this.lang);
                });
            }
        });
    }
    SubarticleComponent.prototype.handleClickMe = function (e) {
        console.log(e);
    };
    SubarticleComponent.prototype.ngOnInit = function () {
        this.articleData = this.articleService.getArticle();
        this.topicID = parseInt(this.router.url.split('/')[2]);
        this.subID = parseInt(this.router.url.split('/')[3]);
        //  console.log("from article "+ this.topicID)
        this.navService.triggerSubArticle(this.topicID, this.subID, this.lang);
        // this.triggerArticle(this.lang,this.topicID)
    };
    SubarticleComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    SubarticleComponent.prototype.clickSideMenu = function (e) {
        var _getSubLabel = e.json_url.split('&');
        var _getSubID = _getSubLabel[1].split('=');
        var _getTopicID = parseInt(this.router.url.split('/')[2]);
        _getSubID = parseInt(_getSubID[1]);
        this.navService.triggerSubArticle(_getTopicID, _getSubID, this.lang);
        this.router.navigate(['/subtopic', _getTopicID, _getSubID]);
        event.preventDefault();
    };
    SubarticleComponent.prototype.checkImgData = function (e) {
        var chkData = e.search('<img');
        if (chkData != -1) {
            return true;
        }
        else {
            return false;
        }
    };
    return SubarticleComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SubarticleComponent.prototype, "menuClick", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SubarticleComponent.prototype, "langChange", void 0);
SubarticleComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-article',
        template: __webpack_require__("../../../../../src/app/article/article.component.html"),
        styles: [__webpack_require__("../../../../../src/app/article/subarticle/subarticle.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__article_service__["a" /* ArticleService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__header_nav_nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__header_nav_nav_service__["a" /* NavService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__header_breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__header_breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */]) === "function" && _f || Object])
], SubarticleComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=subarticle.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AuthService = (function () {
    function AuthService() {
    }
    AuthService.prototype.registerCitizenForm = function (kad_pengenalan_my, nama_penuh) {
    };
    AuthService.prototype.loginUser = function (userName, password) {
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'Sridhar',
            lastName: 'Swaminathan'
        };
    };
    AuthService.prototype.isAuthenticated = function () {
        return !!this.currentUser;
    };
    AuthService.prototype.updateCurrentUser = function (firstName, lastName) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    };
    return AuthService;
}());
AuthService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], AuthService);

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/common/shared.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SharedPipe = (function () {
    function SharedPipe() {
    }
    SharedPipe.prototype.transform = function (value, args) {
        debugger;
        return null;
    };
    return SharedPipe;
}());
SharedPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'shared'
    })
], SharedPipe);

//# sourceMappingURL=shared.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/common/shared.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var SharedService = (function () {
    function SharedService(http, config, translate) {
        this.http = http;
        this.config = config;
        this.translate = translate;
        this.lang = this.lang;
        this.languageId = this.languageId;
        this.countryUrl = this.config.urlCountry;
        this.stateUrl = this.config.urlState;
        this.cityUrl = this.config.urlCity;
        this.genderUrl = this.config.urlGender;
        this.religionUrl = this.config.urlReligion;
        this.raceUrl = this.config.urlRace;
    }
    SharedService.prototype.getCountryData = function () {
        //  console.log(this.countryUrl);
        return this.http.get(this.countryUrl)
            .map(function (response) { return response.json().countryList; })
            .catch(this.handleError);
    };
    SharedService.prototype.getStateData = function () {
        //  console.log(this.countryUrl);
        return this.http.get(this.stateUrl)
            .map(function (response) { return response.json().stateList; })
            .catch(this.handleError);
    };
    SharedService.prototype.getCountrybyCode = function (code) {
        return this.http.get(this.countryUrl + '/code/' + code)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SharedService.prototype.getCitiesbyState = function (code) {
        return this.http.get(this.cityUrl + code)
            .map(function (response) { return response.json().cityList; })
            .catch(this.handleError);
    };
    SharedService.prototype.getReligion = function (langId) {
        return this.http.get(this.religionUrl + langId)
            .map(function (response) { return response.json().religionList; })
            .catch(this.handleError);
    };
    SharedService.prototype.getRace = function (langId) {
        return this.http.get(this.raceUrl + langId)
            .map(function (response) { return response.json().raceList; })
            .catch(this.handleError);
    };
    SharedService.prototype.getGender = function (langId) {
        return this.http.get(this.genderUrl + langId)
            .map(function (response) { return response.json().genderList; })
            .catch(this.handleError);
    };
    SharedService.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    SharedService.prototype.loadTranslate = function () {
        var _this = this;
        this.translate.onLangChange.subscribe(function (event) {
            var myLang = _this.translate.currentLang;
            if (myLang == 'en') {
                _this.translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.languageId = 1;
                });
            }
            if (myLang == 'ms') {
                _this.translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.languageId = 2;
                });
            }
        });
    };
    SharedService.prototype.handleError = function (error) {
        var msg = "Status code " + error.status + " on url " + error.url;
        console.error(msg);
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].throw(msg);
    };
    return SharedService;
}());
SharedService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]) === "function" && _c || Object])
], SharedService);

var _a, _b, _c;
//# sourceMappingURL=shared.service.js.map

/***/ }),

/***/ "../../../../../src/app/common/validate.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ValidateService = (function () {
    function ValidateService() {
    }
    ValidateService.prototype.validateCtrl = function (ctrl) {
        return ctrl.valid || ctrl.untouched;
    };
    ValidateService.prototype.getPattern = function (min, max) {
        return {
            'name': '^[a-zA-Z@&*()-+/\' ]{' + min + ',' + max + '}$',
            'passport': '^[a-zA-Z0-9]{' + min + ',' + max + '}$',
            'numberOnly': '^[0-9]{' + min + ',' + max + '}$',
            'alphaOnly': '^[a-zA-Z]{' + min + ',' + max + '}$',
            'alphaNumeric': '^[a-zA-Z0-9]{' + min + ',' + max + '}$',
            'email': '^[a-z0-9._]+@([a-z0-9]{2,})+\.[a-z.]{2,}$'
        };
    };
    ValidateService.prototype.getMask = function () {
        return {
            'telephone': [/[0-9]/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
            'telephonef': ['+', /[0-9]/, /\d/, '-', /\d/, '-', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
            'icno': [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            'postcode': [/\d/, /\d/, /\d/, /\d/, /\d/],
            'dateFormat': [/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
        };
    };
    return ValidateService;
}());
ValidateService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], ValidateService);

//# sourceMappingURL=validate.service.js.map

/***/ }),

/***/ "../../../../../src/app/config/app.config.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return APP_CONFIG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppConfig; });
/* unused harmony export APP_DI_CONFIG */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AppConfigModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var APP_CONFIG = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["InjectionToken"]('app.config');
var baseURL = 'http://10.1.17.12:3000/';
var uapURL = 'https://10.1.71.176/';
var registrationUrl = uapURL + 'registration/';
// common service
var portalBaseURL = 'http://localhost:8020/portal/';
var protectedBaseURL = uapURL + 'service-protected/';
var commonURL = uapURL + 'service/';
// backend service
var baseLocalURL = './app/apidata/';
var searchServiceURL = 'https://www.malaysia.gov.my/public/';
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());

var APP_DI_CONFIG = {
    apiEndpoint: '',
    urlMenu: './app/apidata/menudata',
    urlSlider: baseURL + 'slider',
    urlFooter: './app/apidata/footer',
    urlArticle: './app/apidata/topic',
    urlCountry: commonURL + 'country',
    urlState: commonURL + 'state',
    urlRace: commonURL + 'race/lang/',
    urlCity: commonURL + 'city/state/',
    urlReligion: commonURL + 'religion/lang/',
    urlLifeevent: './app/apidata/lifeevent',
    urlSubtopic: './app/apidata/subtopic',
    urlTopics: './app/apidata/articlemenu',
    urlHighlights: './app/apidata/highlightbox',
    urlGender: commonURL + '/gender/type/lang/',
    urlPoll: './app/apidata/poll',
    urlAnnouncement: './app/apidata/announcement',
    urlCalendar: './app/apidata/calendar',
    urlRegister: registrationUrl + 'register',
    urlFeedbackType: commonURL + 'feedback/type/lang/',
    urlFeedbackSubject: commonURL + 'feedback/subject/lang/',
    urlFeedback: commonURL + 'feedback',
    urlProfile: baseURL + 'profile',
    portalURL: portalBaseURL,
    urlDashboard: uapURL + 'portal-protected/dashboard/',
    protectedURL: protectedBaseURL,
    urlIntSearch: searchServiceURL + 'query/0/internal',
    urlUserType: uapURL + 'service/user/type/lang/',
    urlMail: commonURL + 'inbox/',
    urlUAP: uapURL,
    urlComplete: protectedBaseURL + 'user/complete/registration',
    urlGetUser: protectedBaseURL + 'user/detail',
    urlAppAgency: './app/apidata/appAgency',
    urlUapStaging: 'https://uapstaging.malaysia.gov.my/uap/validatesigncryption.jsp?language='
};
var AppConfigModule = (function () {
    function AppConfigModule() {
    }
    return AppConfigModule;
}());
AppConfigModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        providers: [{
                provide: APP_CONFIG,
                useValue: APP_DI_CONFIG
            }]
    })
], AppConfigModule);

//# sourceMappingURL=app.config.module.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid animated slideInDown\" style=\"background: #a7a495;\">\r\n    <div class=\"container\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n          <h1 style=\"margin-top: 10px;\" class=\"font-size-l\">{{'home.breadcrumb.dashboard' | translate}}</h1>\r\n          <hr class=\"hr-custom2\">\r\n          <ul class=\"list-inline\" style=\"clear:both;\">\r\n            <li>\r\n              <a class=\"font-size-s\" href=\"/index/\">\r\n                        {{'home.menu.home' | translate }}\r\n                    </a>\r\n            </li>\r\n            <li>/</li>\r\n            <li>\r\n              {{'home.breadcrumb.dashboard' | translate}}\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n<div class=\"container\">\r\n    <div class=\"col-md-3 padding-left-0\">\r\n        <gosg-sidenav-dashboard></gosg-sidenav-dashboard>\r\n    </div>\r\n    <div class=\"col-md-9\">\r\n  <h1>dashboard works!</h1>\r\n    </div>\r\n</div>\r\n  \r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var DashboardComponent = (function () {
    function DashboardComponent(activatedRoute, config) {
        this.activatedRoute = activatedRoute;
        this.config = config;
        this.portalURL = this.config.portalURL;
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.sendtoParent = function () {
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-dashboard',
        template: __webpack_require__("../../../../../src/app/dashboard/dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/dashboard/dashboard.component.css")]
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */]) === "function" && _b || Object])
], DashboardComponent);

var _a, _b;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/dialogs/confirm-dialog/confirm-dialog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/dialogs/confirm-dialog/confirm-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal fade\" bsModal #staticModal=\"bs-modal\" [config]=\"{backdrop: 'static', keyboard: false}\"\r\ntabindex=\"-1\" role=\"dialog\" aria-labelledby=\"mySmallModalLabel\" aria-hidden=\"true\">\r\n<div class=\"modal-dialog modal-md\">\r\n<div class=\"modal-content\">\r\n <div class=\"{{state | translate}}\">\r\n   <h2 class=\"modal-title text-center\"><i class='{{title | translate}}'></i></h2>\r\n </div>\r\n <div class=\"modal-body\">\r\n     <span *ngIf=\"isRegister\">\r\n            <div style=\"font-weight:bold;\">{{email}}</div> {{content | translate}}\r\n     </span>\r\n     <span *ngIf=\"!isRegister\">{{content | translate}} </span>\r\n   <div class=\"modal-body text-center\">\r\n     <button  *ngIf=\"isRegister\" type=\"button\" class=\"btn btn-success\" (click)=\"hide()\"><i class=\"fa fa-check\"></i> {{'common.buttons.yes' | translate}}</button>\r\n     <button *ngIf=\"link\" type=\"button\" class=\"btn btn-default\" (click)=\"confirm(link)\" >{{'common.buttons.yes' | translate}}</button>\r\n     \r\n     <button *ngIf=\"isReset\" type=\"button\" class=\"btn btn-success\" (click)=\"onSubmit($event)\"><i class=\"fa fa-check\"></i> {{'common.buttons.yes' | translate}}</button>\r\n     <button *ngIf=\"isReset\" type=\"button\" class=\"btn btn-danger\" (click)=\"hide()\"><i class=\"fa fa-times\"></i> {{'common.buttons.no' | translate}}</button>\r\n\r\n   </div>\r\n </div>\r\n</div>\r\n</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/dialogs/confirm-dialog/confirm-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConfirmDialogComponent = (function () {
    function ConfirmDialogComponent(modalService, router) {
        this.modalService = modalService;
        this.router = router;
        this.resetMethod = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    ConfirmDialogComponent.prototype.show = function () {
        this.staticModal.show();
    };
    ConfirmDialogComponent.prototype.hide = function () {
        this.staticModal.hide();
    };
    ConfirmDialogComponent.prototype.confirm = function (data) {
        this.router.navigate([data]);
    };
    ;
    ConfirmDialogComponent.prototype.onSubmit = function () {
        this.resetMethod.emit('complete');
        this.staticModal.hide();
    };
    return ConfirmDialogComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('staticModal'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["b" /* ModalDirective */]) === "function" && _a || Object)
], ConfirmDialogComponent.prototype, "staticModal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmDialogComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmDialogComponent.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmDialogComponent.prototype, "content2", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmDialogComponent.prototype, "link", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmDialogComponent.prototype, "state", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmDialogComponent.prototype, "email", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmDialogComponent.prototype, "isRegister", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmDialogComponent.prototype, "isReset", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfirmDialogComponent.prototype, "mailId", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], ConfirmDialogComponent.prototype, "resetMethod", void 0);
ConfirmDialogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-confirm-dialog',
        template: __webpack_require__("../../../../../src/app/dialogs/confirm-dialog/confirm-dialog.component.html"),
        styles: [__webpack_require__("../../../../../src/app/dialogs/confirm-dialog/confirm-dialog.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ngx_bootstrap_modal__["a" /* BsModalService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _d || Object])
], ConfirmDialogComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=confirm-dialog.component.js.map

/***/ }),

/***/ "../../../../../src/app/dialogs/dialogs.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__confirm_dialog_confirm_dialog_component__ = __webpack_require__("../../../../../src/app/dialogs/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DialogsService = (function () {
    function DialogsService(dialog) {
        this.dialog = dialog;
    }
    DialogsService.prototype.confirm = function (title, message) {
        var dialogRef;
        dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_1__confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */]);
        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        return dialogRef.afterClosed();
    };
    return DialogsService;
}());
DialogsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["h" /* MatDialog */]) === "function" && _a || Object])
], DialogsService);

var _a;
//# sourceMappingURL=dialogs.service.js.map

/***/ }),

/***/ "../../../../../src/app/error/error.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".errorMessage { \r\n    margin-top:150px; \r\n    font-size: 170px;\r\n    text-align: center; \r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/error/error.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <h1 class=\"errorMessage\">404</h1>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/error/error.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ErrorComponent = (function () {
    function ErrorComponent() {
    }
    ErrorComponent.prototype.ngOnInit = function () {
    };
    return ErrorComponent;
}());
ErrorComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-error',
        template: __webpack_require__("../../../../../src/app/error/error.component.html"),
        styles: [__webpack_require__("../../../../../src/app/error/error.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ErrorComponent);

//# sourceMappingURL=error.component.js.map

/***/ }),

/***/ "../../../../../src/app/feedback/feedback.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*IN GREY BANNER*/\r\n.hr-custom2 {\r\n\tmargin-top: -5px;\r\n\tmargin-bottom: 0px;\r\n\tborder: 0;\r\n\tborder-top: 3px solid #918c79;\r\n\twidth: 8%;\r\n\tfloat: left;\r\n}\r\n.list-inline{\r\n\tmargin-top: 25px;\r\n}\r\n\r\n/*form*/\r\n\r\n.title_feedback{\r\n\t/* font-size: 12px; */\r\n\tfont-weight: 600;\r\n}\r\n\r\nbutton:disabled{\r\n\tbackground: #a3a3a3\r\n}\r\n\r\n/* Toastr */\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/feedback/feedback.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid animated slideInDown\" style=\"background: #a7a495;\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <h1 style=\"margin-top: 10px;\" class=\"font-size-l\">{{'feedback.title' | translate}}</h1>\r\n                <hr class=\"hr-custom2\">\r\n                <ul class=\"list-inline\" style=\"clear:both;\">\r\n                    <li>\r\n                        <a class=\"font-size-s\" href=\"/index/\">\r\n                            {{'home.menu.home' | translate }}\r\n                        </a>\r\n                    </li>\r\n                    <li>/</li>\r\n                    <li>\r\n                        {{'home.breadcrumb.feedback' | translate}}\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"container animated flipInX\" breadcrumbtitle=\"World\" style=\"color:#1ebebc\">\r\n    <div class=\"row \">\r\n        <div class=\"col-md-12 formbg\">\r\n            <div class=\"form-group\">\r\n                <div class=\"col-md-12\">\r\n                    <h4 class=\"font-size-l title_feedback\">{{'home.breadcrumb.feedback' | translate}}</h4>\r\n                    <p class=\"font-size-s\" style=\"font-family: Roboto; color:black;\">{{'feedback.desc' | translate}}</p>\r\n                </div>\r\n            </div>\r\n\r\n            <form [formGroup]=\"feedbackFormgrp\" #fbForm=\"ngForm\" id=\"feedback-form\" role=\"form\" novalidate=\"novalidate\">\r\n                <div class=\"col-md-12\">\r\n                    <div class=\"col-sm-6\">\r\n                        <mat-form-field class=\"example-full-width\" style=\"width:100%\">\r\n                            <mat-select tabindex=\"1\" formControlName=\"feedbacktype\" placeholder=\"{{'feedback.label.type' | translate}}\" name=\"feedbacktype\" id=\"feedbacktype\"\r\n                                required>\r\n                                <mat-option *ngFor=\"let data of typeFb\" [value]=\"data.feedbackTypeId\">\r\n                                    {{data.feedbackTypeDescription}}\r\n                                </mat-option>\r\n                            </mat-select>\r\n                            <mat-error *ngIf=\"!validateCtrlChk(feedbacktype) && feedbackFormgrp.controls.feedbacktype.errors.required\">{{'feedback.err.drop' | translate }}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                    <div class=\"form-group col-sm-6 \">\r\n                        <mat-form-field class=\"example-full-width\" style=\"width:100%\">\r\n                            <mat-select tabindex=\"2\" formControlName=\"feedbacksubject\" placeholder=\"{{'feedback.label.subjek' | translate}}\" name=\"feedbacksubject\"\r\n                                id=\"feedbacksubject\" required>\r\n                                <mat-option *ngFor=\"let data of subjectFb\" [value]=\"data.feedbackSubjectId\">\r\n                                    {{data.feedbackSubjectDescription}}\r\n                                </mat-option>\r\n                            </mat-select>\r\n                            <mat-error *ngIf=\"!validateCtrlChk(feedbacksubject) && feedbackFormgrp.controls.feedbacksubject.errors.required\">{{'feedback.err.drop' | translate }}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-12\">\r\n                    <div class=\"form-group col-sm-6\">\r\n                        <mat-form-field class=\"example-full-width\" style=\"width:100%\" *ngIf=\"!isAdmin\">\r\n                            <input matInput #namep formControlName=\"nama_penuh\" id=\"nama_penuh\" tabindex=\"3\" class=\"ValonlyCharwithSpecial \" placeholder=\"{{'feedback.label.nameplh' | translate }}\"\r\n                                required>\r\n                            <mat-error *ngIf=\"!validateCtrlChk(nama_penuh) && feedbackFormgrp.controls.nama_penuh.errors.required\">{{'register.err.name' | translate }}\r\n                            </mat-error>\r\n                            <mat-error *ngIf=\"!validateCtrlChk(nama_penuh) && feedbackFormgrp.controls.nama_penuh.errors.pattern\">{{'register.pattern.name' | translate }}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                        <div *ngIf=\"isAdmin\" class=\"\">\r\n                                <label class=\"font-size-s\" for=\"fullname\">{{'feedback.label.nameplh' | translate }}</label>\r\n                                <p class=\" font-size-l\" for=\"fullname\">{{fullName}}</p>                             \r\n                        </div>\r\n                        <!-- <mat-form-field class=\"example-full-width\" style=\"width:100%\" *ngIf=\"isAdmin\">\r\n                            <input matInput placeholder=\"{{'feedback.label.nameplh' | translate }}\"\r\n                                [value]=\"fullName\" formControlName=\"nama_penuh\" readonly >\r\n                        </mat-form-field> -->\r\n                      \r\n\r\n\r\n                    </div>\r\n                    <div class=\"form-group col-sm-6\">\r\n                        <mat-form-field class=\"example-full-width\" style=\"width:100%\" *ngIf=\"!isAdmin\">\r\n                            <input matInput formControlName=\"email\" tabindex=\"4\" placeholder=\"{{'register.label.email' | translate }}\" required>\r\n                            <mat-error *ngIf=\"!validateCtrlChk(email) && feedbackFormgrp.controls.email.errors.required\">\r\n                                {{'register.err.email' | translate }}\r\n                            </mat-error>\r\n                            <mat-error *ngIf=\"!validateCtrlChk(email) &&  (feedbackFormgrp.controls.email.errors.required? !feedbackFormgrp.controls.email.errors.email : feedbackFormgrp.controls.email.errors.email)\">\r\n                                {{'register.pattern.email' | translate }}\r\n                            </mat-error>\r\n                        </mat-form-field>\r\n                        <div *ngIf=\"isAdmin\" class=\"\">\r\n                                <label class=\"font-size-s\" for=\"fullname\">{{'register.label.email' | translate }}</label>\r\n                                <p class=\" font-size-l\" for=\"fullname\">{{emaiL}}</p>                             \r\n                        </div>\r\n                        <!-- <mat-form-field class=\"example-full-width\" style=\"width:100%\" *ngIf=\"isAdmin\">\r\n                            <input matInput formControlName=\"email\" placeholder=\"{{'register.label.email' | translate }}\" [value]=\"emaiL\" readonly>\r\n                        </mat-form-field> -->\r\n\r\n                    </div>\r\n                </div>\r\n                <div ng-app class=\"form-group col-md-12\" style=\"padding: 0px 30px;\">\r\n                    <mat-form-field class=\"example-full-width\" style=\"width:100%\">\r\n                        <textarea matInput tabindex=\"5\" matTextareaAutosize #fbmsg formControlName=\"feedback_message\" maxLength=\"10000\" placeholder=\"{{'feedback.label.content' | translate }}\"\r\n                            required></textarea>\r\n                        <mat-hint align=\"end\">{{fbmsg.value?.length || 0}}/10000</mat-hint>\r\n                        <mat-error *ngIf=\"!validateCtrlChk(feedback_message) && feedbackFormgrp.controls.feedback_message.errors.required\">{{'feedback.err.drop' | translate }}</mat-error>\r\n                    </mat-form-field>\r\n\r\n                </div>\r\n                <div class=\"form-group col-md-12\">\r\n                    <div class=\"row\" style=\"margin:20px;\">\r\n                        <div class=\"col-md-12\" style=\"text-align: right;\">\r\n                            <button tabindex=\"6\" mat-raised-button color=\"warn\" type=\"button\" id=\"btnreset\" class=\"form-control btn btn-md btn-warning font-size-s\"\r\n                                style=\"width: 115px; font-family: Roboto;\" (click)=\"resetModal.show()\">\r\n                                <i class=\"fa fa-refresh\"></i> {{'feedback.label.reset' | translate }}</button>\r\n                            <button tabindex=\"7\" mat-raised-button type=\"button\" color=\"primary\" id=\"btnsubmit\" class=\"form-control btn btn-md btn-success font-size-s\"\r\n                                (click)=\"submitForm(feedbackFormgrp.value)\" style=\"width: 100px; font-family: Roboto; margin-left: 5px;\"\r\n                                [disabled]=\"feedbackFormgrp.invalid\">\r\n                                <i class=\"fa fa-check\"></i> {{'feedback.label.submit' | translate }}</button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>\r\n<app-confirm-dialog  #resetModal \r\n[title]=\"'common.icon.warn'\" \r\n[content]=\"'common.msg.reset'\"\r\n[state]=\"'common.state.warn'\"\r\n[isReset]=\"'true'\"\r\n(resetMethod)=\"resetMethod($event)\">\r\n</app-confirm-dialog>\r\n\r\n<gosg-confirm></gosg-confirm>"

/***/ }),

/***/ "../../../../../src/app/feedback/feedback.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dialogs_dialogs_service__ = __webpack_require__("../../../../../src/app/dialogs/dialogs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_portal_service__ = __webpack_require__("../../../../../src/app/services/portal.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_toastr__ = __webpack_require__("../../../../ngx-toastr/toastr.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__common_validate_service__ = __webpack_require__("../../../../../src/app/common/validate.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};













var FeedbackComponent = (function () {
    function FeedbackComponent(snackBar, dialogsService, vcr, translate, router, http, config, portalService, validateService, toastr) {
        var _this = this;
        this.snackBar = snackBar;
        this.dialogsService = dialogsService;
        this.translate = translate;
        this.router = router;
        this.http = http;
        this.config = config;
        this.portalService = portalService;
        this.validateService = validateService;
        this.toastr = toastr;
        this.isAdmin = false;
        this.languageId = this.languageId;
        this.resultdata = [];
        this.subjectFb = [];
        this.lang = this.lang;
        this.resetMsg = this.resetMsg;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.languageId = 1;
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.languageId = 2;
                });
            }
            _this.getSubType();
            _this.getTypenSubject();
        });
    }
    FeedbackComponent.prototype.ngOnInit = function () {
        this.languageId = 2;
        this.checkLog();
        this.getTypenSubject();
        this.feedback_message = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]),
            this.feedbacktype = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]),
            this.feedbacksubject = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required]),
            this.formCtrl();
        this.feedbackFormgrp = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            nama_penuh: this.nama_penuh,
            feedback_message: this.feedback_message,
            email: this.email,
            feedbacktype: this.feedbacktype,
            feedbacksubject: this.feedbacksubject,
        });
        // this.resetForm()
    };
    FeedbackComponent.prototype.validateCtrlChk = function (ctrl) {
        // return ctrl.valid || ctrl.untouched
        return this.validateService.validateCtrl(ctrl);
    };
    FeedbackComponent.prototype.formCtrl = function () {
        if (this.isAdmin == false) {
            this.nama_penuh = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(this.validateService.getPattern(2, 60).name)]),
                this.email = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].email]);
        }
        if (this.isAdmin == true) {
            this.nama_penuh = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](),
                this.email = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        }
    };
    FeedbackComponent.prototype.checkLog = function () {
        var value = localStorage.getItem('usrID');
        if (value != null) {
            this.isAdmin = true;
            this.fullName = localStorage.getItem('name');
            this.emaiL = localStorage.getItem('email');
            this.icNo = localStorage.getItem('icNo');
        }
        else {
            this.isAdmin = false;
        }
        // console.log(value);
    };
    FeedbackComponent.prototype.getSubType = function () {
        this.feedbacksubject.reset();
        this.feedbacktype.reset();
        this.resetForm();
    };
    FeedbackComponent.prototype.getTypenSubject = function () {
        var _this = this;
        this.portalService.feedbacktype(this.languageId).subscribe(function (data) {
            _this.typeFb = data;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('feedback.err.type'), '');
        });
        this.portalService.feedbacksubject(this.languageId).subscribe(function (data) {
            _this.subjectFb = data;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('feedback.err.subject'), '');
        });
    };
    FeedbackComponent.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 9000
        });
    };
    FeedbackComponent.prototype.submitForm = function (formValues) {
        var _this = this;
        var body = {
            "feedbackName": null,
            "feedbackEmail": null,
            "feedbackType": null,
            "feedbackMessage": null,
            "feedbackSubject": null,
            "language": null,
            "feedbackActionBy": null
        };
        body.feedbackName = formValues.nama_penuh;
        body.feedbackEmail = formValues.email;
        body.feedbackType = { "feedbackTypeId": formValues.feedbacktype };
        body.feedbackSubject = { "feedbackSubjectId": formValues.feedbacksubject };
        body.feedbackMessage = formValues.feedback_message;
        body.language = { "languageId": this.languageId };
        var datasend = JSON.stringify(body);
        if (this.isAdmin) {
            body.feedbackName = this.fullName;
            body.feedbackActionBy = { "id": this.icNo };
            body.feedbackEmail = this.emaiL;
            datasend = JSON.stringify(body);
            this.portalService.feedback(datasend).subscribe(function (data) {
                if (data.statusCode == "S001") {
                    console.log();
                    _this.resetForm();
                    _this.toastr.success(_this.translate.instant('feedback.msgsubmit'), '');
                }
                else {
                    _this.toastr.error(_this.translate.instant('feedback.err.submit'), '');
                }
            }, function (Error) {
                _this.toastr.error(_this.translate.instant('feedback.err.submit'), '');
            });
        }
        else {
            this.portalService.feedback(datasend).subscribe(function (data) {
                if (data.statusCode == "S001") {
                    console.log();
                    _this.resetForm();
                    _this.toastr.success(_this.translate.instant('feedback.msgsubmit'), '');
                }
                else {
                    _this.toastr.error(_this.translate.instant('feedback.err.submit'), '');
                }
            }, function (Error) {
                _this.toastr.error(_this.translate.instant('feedback.err.submit'), '');
            });
        }
    };
    FeedbackComponent.prototype.showResetMsg = function () {
        var _this = this;
        this.dialogsService
            .confirm('', this.translate.instant('feedback.reset'))
            .subscribe(function (data) {
            if (data) {
                _this.resetForm();
            }
        });
    };
    FeedbackComponent.prototype.resetForm = function () {
        this.nama_penuh.reset();
        this.feedback_message.reset();
        this.email.reset();
        this.feedbacksubject.reset();
        this.feedbacktype.reset();
        this.sendMsg = true;
    };
    FeedbackComponent.prototype.resetMethod = function (event) {
        this.resetForm();
    };
    return FeedbackComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], FeedbackComponent.prototype, "state", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], FeedbackComponent.prototype, "sendMsg", void 0);
FeedbackComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-feedback',
        template: __webpack_require__("../../../../../src/app/feedback/feedback.component.html"),
        styles: [__webpack_require__("../../../../../src/app/feedback/feedback.component.css")]
    }),
    __param(6, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__angular_material__["A" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__angular_material__["A" /* MatSnackBar */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__dialogs_dialogs_service__["a" /* DialogsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__dialogs_dialogs_service__["a" /* DialogsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__config_app_config_module__["b" /* AppConfig */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_10__services_portal_service__["a" /* PortalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__services_portal_service__["a" /* PortalService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_12__common_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__common_validate_service__["a" /* ValidateService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_11_ngx_toastr__["b" /* ToastrService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11_ngx_toastr__["b" /* ToastrService */]) === "function" && _k || Object])
], FeedbackComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=feedback.component.js.map

/***/ }),

/***/ "../../../../../src/app/firsttimelogin/firsttimelogin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/firsttimelogin/firsttimelogin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"loginfirst\" style=\"margin-top: 10%;\">\r\n  <div class=\"text-center\"><img src=\"assets/images/logo_ms.jpg\"></div>\r\n  <div class=\"text-center\" style=\"color: #000;\">\r\n      <h2>Selamat Datang ke portal MyGovernment</h2> \r\n      <p>\r\n        Segalanya bermula disini, Maklumat, Transaksi dan Urusan Kerajaan dalma satu gerbang tunggal.\r\n      </p> \r\n      <div style=\"margin-top: 2%;\">\r\n        <button class=\"btn btn-md btn-success\" (click)=\"getConfirmation()\">\r\n          Klik di sini\r\n        </button>\r\n      </div>\r\n  </div>\r\n  <hr>\r\n  <div class=\"text-center\"><img src=\"assets/images/logo_en.jpg\" style=\"margin-top: 3%;\"></div>\r\n  <div class=\"text-center\" style=\"color: #000;\">\r\n      <h2>Welcome to MyGovernment portal</h2> \r\n      <p>\r\n        Everything starts here, Information, Transactions and Government Services in one gateway.\r\n      </p> \r\n      <div style=\"margin-top: 2%;\">\r\n        <button class=\"btn btn-md btn-success\" (click)=\"getConfirmation()\">\r\n          Click here\r\n        </button>\r\n      </div>\r\n  </div>\r\n  \r\n</div>"

/***/ }),

/***/ "../../../../../src/app/firsttimelogin/firsttimelogin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirsttimeloginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_protected_service__ = __webpack_require__("../../../../../src/app/services/protected.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var FirsttimeloginComponent = (function () {
    function FirsttimeloginComponent(protectedservice, activatedRoute, router, config) {
        this.protectedservice = protectedservice;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.config = config;
    }
    FirsttimeloginComponent.prototype.ngOnInit = function () {
        this.rndNo = location.search.split('rnd=')[1];
        console.log(this.rndNo);
    };
    FirsttimeloginComponent.prototype.getRnd = function () {
        var url_string = location.href;
        var url = new URL(url_string);
        var rnd = url.searchParams.get("rnd");
        console.log(rnd);
    };
    FirsttimeloginComponent.prototype.getConfirmation = function () {
        var _this = this;
        var body = {
            "REMOTE_USER": this.rndNo
        };
        this.protectedservice.completeTran(this.rndNo, body)
            .subscribe(function (userData) {
            _this.getUserData = userData.userTypeList;
            window.location.href = _this.config.urlDashboard;
        }, function (Error) {
            //this.toastr.error(this.translate.instant('feedback.err.subject'), '');
        });
    };
    FirsttimeloginComponent.prototype.userIsLogged = function () {
        return true;
    };
    return FirsttimeloginComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], FirsttimeloginComponent.prototype, "loginfirst", void 0);
FirsttimeloginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-firsttimelogin',
        template: __webpack_require__("../../../../../src/app/firsttimelogin/firsttimelogin.component.html"),
        styles: [__webpack_require__("../../../../../src/app/firsttimelogin/firsttimelogin.component.css")],
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
    }),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_protected_service__["a" /* ProtectedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_protected_service__["a" /* ProtectedService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */]) === "function" && _d || Object])
], FirsttimeloginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=firsttimelogin.component.js.map

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".footer-heading {\r\n  color: #00bdbb;\r\n  font-weight: 700;\r\n  font-size: 18px;\r\n  text-align: left;\r\n  margin-left: -40px; }\r\n\r\n.footer-title-underline {\r\n  margin-top: 21px;\r\n  margin-bottom: 0%;\r\n  border: 0;\r\n  border-top: 2px solid #00bdbb;\r\n  width: 15%;\r\n  left: 3.5%;\r\n  position: absolute; }\r\n\r\n\r\n@media screen and (max-width: 760px) and (min-width: 320px) {\r\n  .loop1 {\r\n    margin-top: 20px;\r\n    position: relative; } }\r\n\r\n.address p {\r\n  position: relative;\r\n  margin-left: 0px; }\r\n\r\n.address p span {\r\n  border-radius: 50%;\r\n  padding: 5px;\r\n  background-color: #00bdbb;\r\n  position: absolute;\r\n  left: -30px;\r\n  top: -2px; }\r\n\r\n.footer-link ul {\r\n  list-style: none; }\r\n\r\n.footer-link ul li {\r\n  margin-left: -40px;\r\n  padding-bottom: 5px; }\r\n\r\n.footer-link ul li a {\r\n  text-decoration: none;\r\n  color: #fff;\r\n  cursor: pointer; }\r\n\r\na {\r\n  color: #fff;\r\n  text-decoration: none; }\r\n\r\n.info-box {\r\n  background-color: #9d9d9d;\r\n  border-radius: 5px;\r\n  text-align: center;\r\n  padding: 5px;\r\n  color: #fff;\r\n  margin: 0 15px 5px 0px;\r\n  height: 60px;\r\n  width: 60px; }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let data of footer\" class=\"animated fadeIn\">\r\n   <div class=\"primary col-md-12\" *ngIf=\"data.title=='sociallink'\" [style.background]=\"getTheme()\">\r\n      <div class=\"\" id=\"social-area\">\r\n         <div class=\"col-sm-12\" style=\"padding-bottom:10px;padding-top: 10px;text-align: center;\" id=\"social-icons\">\r\n            <div class=\"footersocial\">\r\n               <span *ngFor=\"let social_data of data.footer\">\r\n                  <a [routerLink]=\"[social_data.link]\" href=\"\" target=\"_blank\">\r\n                     <span class=\"social_icon_bg\" title=\"{{social_data.title}}\" data-toggle=\"tooltip\" data-original-title=\"Tooltip on top\">\r\n                        <span class=\"icon-social\" [style.color]=\"getTheme()\">\r\n                           <i ngClass= \"fa {{social_data.icon}}\" style=\"padding:5px 2px 0px 0px\"></i>\r\n                        </span>\r\n                     </span>\r\n                  </a>\r\n               </span>\r\n            </div>\r\n         </div>\r\n      </div>\r\n   </div>\r\n   <div class=\"container footer form-group\" *ngIf=\"data.title=='otherlink'\">  \r\n      <div class=\"footer-left\">\r\n         <div *ngFor=\"let otherlink of data.items\" class=\"col-md-4 loop1\">\r\n            <button [style.background-color]=\"getTheme()\" class=\"btn btn-sm footer-toggle fa fa-angle-down pull-right visible-xs\" (click)=\"showFooter(otherlink.sub_title)\">\r\n               <span class=\"sr-only\">{{otherlink.sub_title}}</span>\r\n            </button>\r\n            <h4 [style.color]=\"getTheme()\" class=\"footer-heading font-size-m warna_title_color\" style=\"padding-left: 40px; font-family: Roboto; color: rgb(0, 189, 187);\">\r\n                     {{otherlink.title}}\r\n               <span [style.border-color]=\"getTheme()\" class=\"footer-title-underline warna_border_color\" style=\"border-color: rgb(0, 189, 187);\"></span>\r\n            </h4> \r\n            <div *ngIf=\"showcontact && otherlink.sub_title=='contact'\" class=\"address footer\" style=\"margin-top: 0%; margin-left:30px; position:relative;\">\r\n                <div *ngFor=\"let eachitm of otherlink.footer\">\r\n                    <p class=\"font-size-s\" *ngIf=\"eachitm.icon\" style=\"font-family: Roboto;\">\r\n                    <span  [style.background-color]=\"getTheme()\" ngClass= \"{{eachitm.icon}}\" style=\"background-color: rgb(0, 189, 187);\"></span>\r\n                    </p>\r\n                    <div [innerHtml]=\"eachitm.title\" class=\"font-size-s addrloop2\" >\r\n                    </div>\r\n                </div>\r\n            </div>\r\n                  <!--CAPAIAN/ ACCESS PAGE-->\r\n            <div *ngIf=\"showaccess && otherlink.sub_title=='access'\">\r\n               <div class=\"address footer\" style=\"margin-top: 0%;\">\r\n                  <div class=\"sub-add\" >\r\n                     <ul style=\"columns: 2; list-style-type: none; padding-left: 3px;\">\r\n                        <li *ngFor=\"let eachitm of otherlink.footer\" class=\"eachloop2\" style=\"margin-bottom: 7px;\">\r\n                           <a [routerLink]=\"[eachitm.link]\" href=\"\" class=\"font-size-s\" [innerHtml]=\"eachitm.title\"></a>\r\n                        </li>\r\n                     </ul>\r\n                  </div> \r\n               </div>\r\n            </div>\r\n                  <!--Pautan luar/ External links-->\r\n            <div class=\"sub-add\" *ngIf=\"showextlinks && otherlink.sub_title=='extlinks'\">\r\n                <div *ngFor=\"let eachitm of otherlink.footer\" class=\"each loop2\">\r\n                    <div class=\"address footer\" style=\"margin-top: 0%;\">\r\n                     <a [routerLink]=\"[eachitm.link]\" href=\"\" target=\"_blank\" class=\"font-size-s col-xs-3 info-box\"\r\n                        data-toggle=\"tooltip\" title=\"eachitm.name\">\r\n                        <img src=\"{{ eachitm.icon }}\" alt=\"eachitm.name\" \r\n                        style=\"max-width:100%;\">\r\n                     </a>\r\n                  </div>\r\n               </div>\r\n            </div> \r\n                  <!--JUMLAH PELAWAT/ Visitor count-->\r\n            <div class=\"address footer\" *ngIf=\"showvisitor && otherlink.sub_title=='visitor'\" style=\"margin-top: 0%;\">\r\n                <div *ngFor=\"let eachitm of otherlink.footer\" class=\"each loop2\">\r\n                  <div class=\"col-xs-4\" *ngIf=\"eachitm.today\" style=\"padding:0px 0px 0px 3px;\">\r\n                     <div class=\"font-size-s\">{{eachitm.today}}</div>\r\n                     <h4 class=\"font-size-m\">{{eachitm.todayval}}</h4>\r\n                  </div>\r\n                  <div class=\"col-xs-4\" *ngIf=\"eachitm.month\" style=\"padding:0px 0px 0px 3px;\">\r\n                     <div class=\"font-size-s\">{{eachitm.month}}</div>\r\n                     <h4 class=\"font-size-m\">{{eachitm.monthval}}</h4>\r\n                  </div>\r\n                  <div class=\"col-xs-4\" *ngIf=\"eachitm.total\" style=\"padding:0px 0px 0px 3px;\">\r\n                     <div class=\"font-size-s\">{{eachitm.total}}</div>\r\n                     <h4 class=\"font-size-m\">{{eachitm.totalval}}</h4>\r\n                  </div>                        \r\n               </div>\r\n            </div>               \r\n         </div>\r\n      </div>\r\n   </div>\r\n   <div class=\"copyright\" *ngIf=\"data.title=='bottom' || data.title=='bottomlinks'\">\r\n         <div class=\"container\">      \r\n            <div class=\"padding-m\" *ngIf=\"data.title=='bottom'\">\r\n               <div *ngFor=\"let eachitm of data.items\" class=\"each loop2\">\r\n                  <div  class=\"col-md-4\">\r\n                     <p class=\"font-size-s\" style=\"margin-top: 4%; font-family: Roboto;\">\r\n                        {{eachitm.copyright}}\r\n                     </p>\r\n                  </div>\r\n                  <div class=\"col-md-8 text-right hidden-xs\">\r\n                     <p class=\"font-size-s\" style=\"font-family: Roboto;\">\r\n                           {{eachitm.update}} {{eachitm.update_date}}\r\n                     </p>\r\n                     <p class=\"font-size-s\" style=\"margin-top: -10px; font-family: Roboto;\">\r\n                        {{eachitm.note}}\r\n                     </p>                   \r\n                  </div>\r\n               </div>\r\n            </div>     \r\n            <div *ngIf=\"data.title=='bottomlinks'\" class=\"col-md-12 text-right hidden-xs loop1.1\">\r\n               <ul class=\"list-inline hidden-xs font-size-s\" style=\"font-family: Roboto;\">\r\n                  <li  *ngFor=\"let btmlink of data.items; let last = last\">\r\n                     <a [routerLink]=\"[btmlink.link]\" href=\"\">\r\n                        {{btmlink.name}} <span *ngIf=\"!last\">|</span>\r\n                     </a>\r\n                  </li>\r\n               </ul>\r\n            </div>\r\n         </div>\r\n   </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var FooterComponent = (function () {
    function FooterComponent(translate, router, http, config) {
        var _this = this;
        this.translate = translate;
        this.router = router;
        this.http = http;
        this.config = config;
        this.lang = this.lang;
        this.showcontact = true;
        this.showaccess = true;
        this.showextlinks = true;
        this.showvisitor = true;
        this.footerUrl = this.config.urlFooter;
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.getFooter(_this.lang);
                });
                // this.router.navigateByUrl('public')
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.getFooter(_this.lang);
                });
                // this.router.navigateByUrl('public')
            }
        });
    }
    FooterComponent.prototype.ngOnInit = function () {
        console.log('footer.comp.ts');
    };
    FooterComponent.prototype.getFooter = function (lang) {
        var _this = this;
        return this.http.get(this.footerUrl + '-' + lang + '.json')
            .map(function (response) { return response.json(); })
            .subscribe(function (resSliderData) {
            _this.footer = resSliderData;
        });
    };
    FooterComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    FooterComponent.prototype.showFooter = function (ele) {
        var temp = 'show' + ele;
        this[temp] = !this[temp];
    };
    FooterComponent.prototype.onResize = function (event) {
        // console.log(event.target.innerWidth);
        // console.log(event.target.innerHeight);
        if (event.target.innerWidth >= 767) {
            this.showcontact = true;
            this.showaccess = true;
            this.showextlinks = true;
            this.showvisitor = true;
        }
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-footer',
        template: __webpack_require__("../../../../../src/app/footer/footer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/footer/footer.component.css")],
        host: {
            '(window:resize)': 'onResize($event)'
        }
    }),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_http__["Http"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */]) === "function" && _d || Object])
], FooterComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "../../../../../src/app/header/breadcrumb/breadcrumb.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".xtra-space {\r\n    min-height:100px;\r\n    display:block;\r\n    position:relative;\r\n    background:#a7a495;\r\n}\r\n\r\n.xtra-space .breadCrumb {\r\n    padding-top:80px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/breadcrumb/breadcrumb.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"xtra-space container-fluid\">\r\n    <div class=\"container\">\r\n        <div class=\"breadCrumb\">\r\n        <h1 class=\"font-size-l\" *ngIf=\"!isValid\">{{breadcrumb.name}}</h1>\r\n        <h1 class=\"font-size-l\" *ngIf=\"isValid\">{{breadcrumb.name | translate}}</h1>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/header/breadcrumb/breadcrumb.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__ = __webpack_require__("../../../../../src/app/header/breadcrumb/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BreadcrumbComponent = (function () {
    function BreadcrumbComponent(breadcrumbService, translate) {
        var _this = this;
        this.breadcrumbService = breadcrumbService;
        this.translate = translate;
        this.lang = 'en';
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.getTitle();
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.getTitle();
                });
            }
        });
    }
    BreadcrumbComponent.prototype.ngOnInit = function () {
        this.breadcrumb = this.breadcrumbService.getBreadcrumb();
        this.isValid = this.breadcrumbService.getValid();
    };
    BreadcrumbComponent.prototype.getTitle = function () {
        this.breadcrumb = this.breadcrumbService.getBreadcrumb();
        this.isValid = this.breadcrumbService.getValid();
    };
    return BreadcrumbComponent;
}());
BreadcrumbComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-breadcrumb',
        template: __webpack_require__("../../../../../src/app/header/breadcrumb/breadcrumb.component.html"),
        styles: [__webpack_require__("../../../../../src/app/header/breadcrumb/breadcrumb.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__breadcrumb_service__["a" /* BreadcrumbService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]) === "function" && _b || Object])
], BreadcrumbComponent);

var _a, _b;
//# sourceMappingURL=breadcrumb.component.js.map

/***/ }),

/***/ "../../../../../src/app/header/breadcrumb/breadcrumb.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BreadcrumbService = (function () {
    function BreadcrumbService() {
    }
    BreadcrumbService.prototype.getBreadcrumb = function () {
        return breadcrumb;
    };
    BreadcrumbService.prototype.getValid = function () {
        return isValid;
    };
    return BreadcrumbService;
}());
BreadcrumbService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], BreadcrumbService);

var isValid = {
    value: false
};
var breadcrumb = {
    id: 1,
    name: '',
    url: ''
};
//# sourceMappingURL=breadcrumb.service.js.map

/***/ }),

/***/ "../../../../../src/app/header/nav/nav-router-activator.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavRouterActivator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__nav_service__ = __webpack_require__("../../../../../src/app/header/nav/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var NavRouterActivator = (function () {
    function NavRouterActivator(navService, router, translate) {
        var _this = this;
        this.navService = navService;
        this.router = router;
        this.translate = translate;
        this.lang = 'en';
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                });
            }
        });
    }
    NavRouterActivator.prototype.canActivate = function (route, state) {
        var eventExists = !!this.navService.triggerArticle(this.lang, +route.params['id']);
        if (!eventExists)
            this.router.navigate(['/404']);
        return eventExists;
    };
    return NavRouterActivator;
}());
NavRouterActivator = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__nav_service__["a" /* NavService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]) === "function" && _c || Object])
], NavRouterActivator);

var _a, _b, _c;
//# sourceMappingURL=nav-router-activator.service.js.map

/***/ }),

/***/ "../../../../../src/app/header/nav/nav.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#main-menu {\r\n  float: right;\r\n  clear: right; }\r\n\r\n#main-menu li .drop {\r\n  padding-right: 21px; }\r\n\r\n.nav.navbar-nav {\r\n  font-size: 15px;\r\n  padding: 10px 0px; }\r\n\r\nli.active > a {\r\n  color: #fff !important;\r\n  background: #00bdbb !important; }\r\n  li.active > a:hover {\r\n    color: #fff !important; }\r\n\r\n.nav > li {\r\n  position: static;\r\n  display: inline-block;\r\n  margin-top: -10px;\r\n  height: 60px; }\r\n\r\n#searchForm {\r\n  margin-right: 100px; }\r\n\r\n@media (max-width: 1200px) {\r\n  #searchForm {\r\n    display: none; } }\r\n\r\n.top-nav {\r\n  padding-top: 0px;\r\n  border-top: 4px solid #e6436e; }\r\n\r\n.navbar-default {\r\n  background: #fff;\r\n  height: 60px; }\r\n\r\n.navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > li > a:hover {\r\n  background: #00bdbb;\r\n  color: #fff; }\r\n\r\n.navbar-default .navbar-nav > li > a {\r\n  padding: 20px;\r\n  display: block;\r\n  color: #000;\r\n  padding: 0px 15px;\r\n  text-decoration: none;\r\n  height: 60px;\r\n  line-height: 60px; }\r\n  .navbar-default .navbar-nav > li > a:hover {\r\n    background: #00bdbb !important;\r\n    color: #fff !important; }\r\n\r\n.navbar-default .navbar-nav > li > a:hover {\r\n  background: #00bdbb !important;\r\n  color: #fff; }\r\n\r\n.navbar-default .navbar-nav > li > .active > a:hover {\r\n  background: #00bdbb !important;\r\n  color: #fff !important; }\r\n\r\n.navbar-brand {\r\n  float: left;\r\n  padding: 6px 0px;\r\n  font-size: 29px;\r\n  line-height: 40px;\r\n  height: 60px; }\r\n\r\n.dropdown_5columns {\r\n  margin: 0px auto;\r\n  float: left;\r\n  position: absolute;\r\n  left: -999em;\r\n  /* Hides the drop down */\r\n  text-align: left;\r\n  padding: 0px 5px 10px 20px;\r\n  border-top: none;\r\n  /* Gradient background */\r\n  background: #F4F4F4;\r\n  background: -moz-linear-gradient(top, #ffffff, #d6d6d6);\r\n  background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ffffff), to(#d6d6d6));\r\n  /* Rounded Corners  \r\n    -moz-border-radius: 0px 5px 5px 5px;  \r\n    -webkit-border-radius: 0px 5px 5px 5px;  \r\n    border-radius: 0px 5px 5px 5px; */ }\r\n\r\n#main-menu li:hover .dropdown_5columns {\r\n  left: 0px;\r\n  top: auto;\r\n  width: 100%;\r\n  border-top: 1px #1ebebc solid; }\r\n\r\n.col_1,\r\n.col_2,\r\n.col_3,\r\n.col_4,\r\n.col_5 {\r\n  display: inline;\r\n  float: left;\r\n  position: relative;\r\n  margin-left: 5px;\r\n  margin-right: 5px; }\r\n\r\n.col_1 {\r\n  width: 130px; }\r\n\r\n.col_2 {\r\n  width: 270px; }\r\n\r\n.col_3 {\r\n  width: 410px; }\r\n\r\n.col_4 {\r\n  width: 550px; }\r\n\r\n.col_5 {\r\n  width: 690px; }\r\n\r\n#main-menu .menu_right {\r\n  float: right;\r\n  margin-right: 0px; }\r\n\r\n#main-menu li .align_right {\r\n  /* Rounded Corners */\r\n  /*-moz-border-radius: 5px 0px 5px 5px;  \r\n    -webkit-border-radius: 5px 0px 5px 5px;  \r\n    border-radius: 5px 0px 5px 5px;*/ }\r\n\r\n#main-menu li:hover .align_right {\r\n  /* left:auto;\r\n    right:-1px;*/\r\n  top: auto; }\r\n\r\n#main-menu p, #main-menu h2, #main-menu h3, #main-menu ul li {\r\n  line-height: 21px;\r\n  font-size: 15px;\r\n  text-align: left;\r\n  text-shadow: 1px 1px 1px #FFFFFF; }\r\n\r\n#main-menu h2 {\r\n  font-size: 21px;\r\n  font-weight: 400;\r\n  letter-spacing: -1px;\r\n  margin: 7px 0 14px 0;\r\n  padding-bottom: 14px;\r\n  border-bottom: 1px solid #666666; }\r\n\r\n#main-menu h3 {\r\n  font-size: 14px;\r\n  margin: 7px 0 14px 0;\r\n  padding-bottom: 7px;\r\n  border-bottom: 1px solid #888888; }\r\n\r\n#main-menu p {\r\n  line-height: 18px;\r\n  margin: 0 0 10px 0; }\r\n\r\n#main-menu li:hover div a {\r\n  font-size: 15px;\r\n  color: #000; }\r\n\r\n#main-menu li:hover div a:hover {\r\n  color: #e6436e;\r\n  text-decoration: none; }\r\n\r\n.strong {\r\n  font-weight: bold; }\r\n\r\n.italic {\r\n  font-style: italic; }\r\n\r\n.imgshadow {\r\n  background: #FFFFFF;\r\n  padding: 4px;\r\n  border: 1px solid #777777;\r\n  margin-top: 5px;\r\n  box-shadow: 0px 0px 5px #666666; }\r\n\r\n.img_left {\r\n  /* Image sticks to the left */\r\n  width: auto;\r\n  float: left;\r\n  margin: 5px 15px 5px 5px; }\r\n\r\n#main-menu li .black_box {\r\n  background-color: #333333;\r\n  color: #eeeeee;\r\n  text-shadow: 1px 1px 1px #000;\r\n  padding: 4px 6px 4px 6px;\r\n  /* Rounded Corners */\r\n  border-radius: 5px;\r\n  /* Shadow */\r\n  box-shadow: inset 0 0 3px #000000; }\r\n\r\n#main-menu li ul {\r\n  list-style: none;\r\n  padding: 0;\r\n  margin: 0 0 12px 0; }\r\n\r\n#main-menu li ul li {\r\n  font-size: 16px;\r\n  padding: 14px 0px;\r\n  position: relative;\r\n  text-shadow: 1px 1px 1px #ffffff;\r\n  margin: 0;\r\n  float: left;\r\n  text-align: left; }\r\n\r\n#main-menu li ul li:hover {\r\n  background: none;\r\n  border: none; }\r\n\r\n#main-menu li .greybox li {\r\n  background: #F4F4F4;\r\n  border: 1px solid #bbbbbb;\r\n  margin: 0px 0px 4px 0px;\r\n  padding: 4px 6px 4px 6px;\r\n  width: 116px;\r\n  /* Rounded Corners */\r\n  border-radius: 5px; }\r\n\r\n#main-menu li .greybox li:hover {\r\n  background: #ffffff;\r\n  border: 1px solid #aaaaaa;\r\n  padding: 4px 6px 4px 6px;\r\n  margin: 0px 0px 4px 0px; }\r\n\r\nbutton.bgColorBtn {\r\n  padding: 5px 0px;\r\n  margin: 0px 2px; }\r\n\r\n.bgColor0 {\r\n  width: 20px;\r\n  height: 20px;\r\n  background: #00bdbb;\r\n  border: 1px solid #00bdbb;\r\n  margin: 0px;\r\n  padding: 0px; }\r\n\r\n.colorPaletteActive {\r\n  border-color: #fff !important; }\r\n\r\n.bgColor1 {\r\n  width: 20px;\r\n  height: 20px;\r\n  background: #5e7899;\r\n  border: 1px solid #5e7899;\r\n  margin: 0px;\r\n  padding: 0px; }\r\n\r\n.bgColor2 {\r\n  width: 20px;\r\n  height: 20px;\r\n  background: #e06000;\r\n  border: 1px solid #e06000;\r\n  margin: 0px;\r\n  padding: 0px; }\r\n\r\n.bgColor3 {\r\n  width: 20px;\r\n  height: 20px;\r\n  background: #4f81c5;\r\n  border: 1px solid #4f81c5;\r\n  margin: 0px;\r\n  padding: 0px; }\r\n\r\n.bgColor4 {\r\n  width: 20px;\r\n  height: 20px;\r\n  background: #982d57;\r\n  border: 1px solid #982d57;\r\n  margin: 0px;\r\n  padding: 0px; }\r\n\r\n.online_service_btn {\r\n  margin: 10px;\r\n  background-color: #e6436e;\r\n  border-color: #e6436e; }\r\n\r\n.h_search_btn {\r\n  padding: 0px 10px !important;\r\n  color: #333;\r\n  font-size: 20px; }\r\n  .h_search_btn:hover {\r\n    color: #e9406c !important; }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/nav/nav.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <div class=\"top-nav\">\r\n        <div class=\"navbar navbar-default\">\r\n            <div class=\"container-fluid\">\r\n                <div class=\"navbar-header\">\r\n                <a [routerLink]=\"['/index']\" class=\"navbar-brand\" ><img src=\"assets/images/{{imgSrc }}.jpg\" width=\"100%\"></a>\r\n                </div>\r\n                <div class=\"collapse navbar-collapse\">\r\n                <ul class=\"nav navbar-nav font-size-s\" id=\"main-menu\">\r\n                    <li [routerLinkActive]=\"['active']\"  [routerLinkActiveOptions]=\"{exact:true}\">\r\n                    <a [routerLink]=\"['/index']\"><i class=\"fa fa-home\"></i> {{ 'home.menu.home' | translate }}</a>\r\n                    </li>\r\n                    <!--<li><a [routerLink]=\"['public/new']\" routerLinkActive=\"active\">Create Event</a></li>-->\r\n                    <li *ngFor=\"let menu of menus\" [routerLinkActive]=\"['active']\"  [routerLinkActiveOptions]=\"{exact:true}\">\r\n                        <a class=\"drop\"  (mouseover)=\"changeStyle($event)\" (mouseout)=\"changeStyle($event)\" href=\"#\">{{menu.title}}\r\n                            <span class=\"caret\"></span>\r\n                        </a>\r\n                       \r\n                        <div class=\"dropdown_5columns\" [ngClass]=\"color\"><!-- Begin 5 columns container -->  \r\n                            <div class=\"col_6\">\r\n                                <ul>  \r\n                                    <li class=\"col-md-4\" *ngFor=\"let data of menu.data\">\r\n                                        <a  class=\"font-size-s\" href=\"\" (click)=\"handleClickMe(data.topic_id)\" [routerLink]=\"['topic', data.topic_id]\" ><i class=\"fa fa-arrow-circle-right\"></i> {{data.name}}</a>\r\n                                    </li>\r\n                                </ul>  \r\n                            </div>  \r\n                        </div>\r\n                    </li>\r\n                    <li>\r\n                        <button type=\"button\" class=\"btn btn-md online_service_btn\">{{'home.menu.onlineservice' | translate}}</button>\r\n                    </li>\r\n                    <li>\r\n                        <a href=\"\" (click)=\"searchfunc($event)\" class=\"h_search_btn\"><i class=\"fa fa-search\"></i></a>\r\n                    </li>\r\n                    \r\n                    \r\n             \r\n                </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<gosg-sidenavmain></gosg-sidenavmain>\r\n"

/***/ }),

/***/ "../../../../../src/app/header/nav/nav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__nav_service__ = __webpack_require__("../../../../../src/app/header/nav/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var NavComponent = (function () {
    function NavComponent(translate, config, http, navService) {
        var _this = this;
        this.translate = translate;
        this.config = config;
        this.http = http;
        this.navService = navService;
        this.menuClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.lang = 'en';
        this.active_color = 'blue';
        this.inactive_color = 'red';
        this.setUrl = 'portal';
        this.articleUrl = this.config.urlArticle;
        this.menuUrl = this.config.urlMenu;
        this.color = 'red';
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.imgSrc = 'logo_en';
                    _this.getMenu();
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.imgSrc = 'logo_ms';
                    _this.getMenu();
                });
            }
        });
    }
    NavComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.imgSrc = 'logo_ms';
        this.navService.getMenuData(this.lang)
            .subscribe(function (resMenuData) { return _this.menus = resMenuData; });
    };
    NavComponent.prototype.changeStyle = function ($event) {
        this.color = $event.type == 'mouseover' ? 'animated fadeIn' : '';
    };
    NavComponent.prototype.handleClickMe = function (e) {
        this.menuClick.emit(e);
        this.menuId = e;
        this.navService.triggerArticle(this.lang, e);
    };
    NavComponent.prototype.ngAfterViewInit = function () {
        __WEBPACK_IMPORTED_MODULE_5_jquery__(function () {
            __WEBPACK_IMPORTED_MODULE_5_jquery__('#main-menu > li > a').css({ 'backgroundColor': '#fff', 'color': '#000' });
            __WEBPACK_IMPORTED_MODULE_5_jquery__('#main-menu > li > a.active').css('background-color', localStorage.getItem('themeColor'));
        });
    };
    NavComponent.prototype.getMenu = function () {
        var _this = this;
        this.navService.getMenuData(this.lang)
            .subscribe(function (resMenuData) { return _this.menus = resMenuData; });
    };
    NavComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    NavComponent.prototype.getUrl = function () {
        return 'portal';
    };
    NavComponent.prototype.searchfunc = function (eveny) {
        alert('search');
        event.preventDefault();
    };
    return NavComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], NavComponent.prototype, "menuClick", void 0);
NavComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-nav',
        template: __webpack_require__("../../../../../src/app/header/nav/nav.component.html"),
        styles: [__webpack_require__("../../../../../src/app/header/nav/nav.component.css")]
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__nav_service__["a" /* NavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__nav_service__["a" /* NavService */]) === "function" && _d || Object])
], NavComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=nav.component.js.map

/***/ }),

/***/ "../../../../../src/app/header/nav/nav.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_switchMap__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/switchMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__article_article_service__ = __webpack_require__("../../../../../src/app/article/article.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__header_breadcrumb_breadcrumb_service__ = __webpack_require__("../../../../../src/app/header/breadcrumb/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








// Import RxJs required methods



var NavService = (function () {
    function NavService(http, config, route, router, breadcrumbService, articleService) {
        this.http = http;
        this.config = config;
        this.route = route;
        this.router = router;
        this.breadcrumbService = breadcrumbService;
        this.articleService = articleService;
        this.menuUrl = this.config.urlMenu;
        this.articleUrl = this.config.urlArticle;
        this.subUrl = this.config.urlSubtopic;
        this.topicStatus = true;
    }
    NavService.prototype.getMenuData = function (lang) {
        return this.http.get(this.menuUrl + '-' + lang + '.json')
            .map(function (response) { return response.json(); })
            .catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].throw(error.json().error || 'Server error'); });
    };
    NavService.prototype.getArticleData = function (lang, ID) {
        var _this = this;
        if (!isNaN(ID)) {
            return this.http.get(this.articleUrl + '-' + ID + '-' + lang + '.json')
                .take(1)
                .map(function (response) { return response.json(); })
                .catch(function (err, caught) {
                if (err !== undefined) {
                    _this.router.navigate(['/404']);
                    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].throw('The Web server (running the Web site) is currently unable to handle the HTTP request due to a temporary overloading or maintenance of the server.');
                }
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].throw(caught); // <-----
            });
        }
    };
    NavService.prototype.getSubArticleUrl = function (topicID, subID, lang) {
        var _this = this;
        if (!isNaN(subID)) {
            return this.http.get(this.subUrl + '-' + subID + '-' + lang + '.json')
                .take(1)
                .map(function (response) { return response.json(); })
                .catch(function (err, caught) {
                if (err !== undefined) {
                    _this.router.navigate(['/404']);
                    return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].throw('The Web server (running the Web site) is currently unable to handle the HTTP request due to a temporary overloading or maintenance of the server.');
                }
                return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["a" /* Observable */].throw(caught); // <-----
            });
        }
    };
    NavService.prototype.triggerSubArticle = function (topicID, subID, lang) {
        var _this = this;
        if (!isNaN(subID)) {
            return this.route.paramMap
                .switchMap(function (params) {
                return _this.getSubArticleUrl(topicID, subID, lang);
            })
                .subscribe(function (resSliderData) {
                _this.articleService.articles = resSliderData;
                _this.articles = resSliderData;
                _this.breadcrumb = _this.breadcrumbService.getBreadcrumb();
                _this.isValid = _this.breadcrumbService.isValid = true;
                _this.breadcrumb = _this.breadcrumb.name = '';
                //console.log(this.articleService.articles)
            });
        }
    };
    NavService.prototype.triggerArticle = function (lang, topicID) {
        var _this = this;
        if (!isNaN(topicID)) {
            return this.route.paramMap
                .switchMap(function (params) {
                return _this.getArticleData(lang, topicID);
            })
                .subscribe(function (resSliderData) {
                _this.articleService.articles = resSliderData;
                _this.articles = resSliderData;
                _this.breadcrumb = _this.breadcrumbService.getBreadcrumb();
                _this.isValid = _this.breadcrumbService.isValid = true;
                _this.breadcrumb = _this.breadcrumb.name = '';
                //console.log(this.articleService.articles)
            });
        }
    };
    return NavService;
}());
NavService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__header_breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__header_breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__article_article_service__["a" /* ArticleService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__article_article_service__["a" /* ArticleService */]) === "function" && _f || Object])
], NavService);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=nav.service.js.map

/***/ }),

/***/ "../../../../../src/app/header/topnav/topnav.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "a{\r\n            color : #ebebeb;\r\n        }\r\n        \r\n        .top-nav{\r\n            padding-top: 0px;\r\n        }\r\n        \r\n        .top-menu-list li a{\r\n            cursor:pointer;\r\n        }\r\n\r\n        .container {\r\n            padding-top: 10px;\r\n        }\r\n\r\n        .bgColorBtn {\r\n            padding: 5px 0px;\r\n            margin: 0px 2px;\r\n            -webkit-appearance: button; /* WebKit */\r\n            -moz-appearance: button; /* Mozilla */\r\n            -o-appearance: button; /* Opera */\r\n            -ms-appearance: button; /* Internet Explorer */\r\n            appearance: button; /* CSS3 */\r\n        }\r\n\r\n        .topactive{\r\n            text-decoration:underline;\r\n        }\r\n\r\n        .bgColor0 {\r\n        width: 20px;\r\n        height: 20px;\r\n        background: #00bdbb;\r\n        border: 1px solid #00bdbb;\r\n        margin: 0px;\r\n        padding: 0px; }\r\n\r\n        .colorPaletteActive {\r\n        border-color: #fff !important; }\r\n\r\n        .bgColor{\r\n        width: 20px;\r\n        height: 20px;\r\n        margin: 0px 5px;\r\n        padding: 0px;\r\n        top:6px;\r\n        position:relative\r\n         }\r\n\r\n        .bgColor2 {\r\n        width: 20px;\r\n        height: 20px;\r\n        background: #e06000;\r\n        border: 1px solid #e06000;\r\n        margin: 0px;\r\n        padding: 0px; }\r\n\r\n        .bgColor3 {\r\n        width: 20px;\r\n        height: 20px;\r\n        background: #4f81c5;\r\n        border: 1px solid #4f81c5;\r\n        margin: 0px;\r\n        padding: 0px; }\r\n\r\n        .bgColor4 {\r\n        width: 20px;\r\n        height: 20px;\r\n        background: #982d57;\r\n        border: 1px solid #982d57;\r\n        margin: 0px;\r\n        padding: 0px; }\r\n\r\n        \r\n/* below style added by sri */\r\n.font-size-l, .font-size-m, .font-size-s, .font-size-xl, .font-size-xxl {\r\n  font-weight: 500; }\r\n\r\n.font-size-s {\r\n  font-size: 14px; }\r\n\r\n.font-size-m {\r\n  font-size: 18px; }\r\n\r\n.font-size-l {\r\n  font-size: 24px; }\r\n\r\n.font-size-xl {\r\n  font-size: 38px; }\r\n\r\n.font-size-xxl {\r\n  font-size: 52px; }\r\n\r\n.themeColor {\r\n  background: #00bdbb; }\r\n\r\n.search_header {\r\n  font-weight: 100;\r\n  margin: 0px;\r\n  padding: 18px 0px; }\r\n\r\n#themeContainer {\r\n  bottom: 5px; }\r\n\r\nbody {\r\n  background-color: #fff; }\r\n\r\n.container.search {\r\n  color: #333; }\r\n\r\n.panel-body {\r\n  color: #fff; }\r\n\r\n.ngui-auto-complete > ul li {\r\n  padding: 2px 18px !important;\r\n  border-bottom: none !important;\r\n  text-align: left;\r\n  color: #333;\r\n  font-size: 20px; }\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/header/topnav/topnav.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<button (click)=\"topNavEvent()\">Click Here</button>-->\r\n<div class=\"container\">\r\n  <div class=\"top-nav\">\r\n    <!-- <div class=\"col-sm-6 hidden-xs\">\r\n      <ul class=\"list-inline font-size-s top-menu-list\">\r\n        <li>\r\n        <a routerLinkActive=\"topactive\" (click)=\"showConfBar()\">{{ 'home.menu.setting' | translate }} <i class=\"fa fa-caret-down\"></i></a>\r\n        </li>\r\n        <li>|</li>\r\n        <li>\r\n            <a routerLinkActive=\"topactive\" [routerLink]=\"['contact']\">{{ 'home.menu.contact' | translate }}</a> </li>\r\n        <li>|</li>\r\n        <li>\r\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['faq']\">{{ 'home.menu.faq' | translate }}</a>\r\n        </li>\r\n        <li>|</li>\r\n        <li>\r\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['manual']\">{{ 'home.menu.manual' | translate }}</a>\r\n        </li>\r\n        <li>|</li>\r\n        <li>\r\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['aboutus']\">{{ 'home.menu.aboutus' | translate }}</a>\r\n        </li>\r\n      </ul>\r\n    </div> -->\r\n    <div class=\"col-xs-12 visible-xs\"><i class=\"fa fa-bars\" aria-hidden=\"true\"></i></div>\r\n    <div id=\"menu_login\" class=\"col-sm-12 col-xs-12 text-right\">\r\n\r\n        <ul class=\"list-inline font-size-s\" *ngIf=\"state\">\r\n            <li>\r\n              <button (click)=\"toggle()\" class=\"btn btn-xs btn-default font-size-s hidden-xs visible-sm  visible-md visible-lg\"><i class=\"fa fa-language\"></i> {{ currlang }}</button>\r\n              <button (click)=\"toggle()\" class=\"btn btn-xs btn-default font-size-s visible-xs hidden-sm hidden-md hidden-lg\"><i class=\"fa fa-language\"></i> {{ currlangMOB }}</button>\r\n            </li>\r\n            <li>|</li>\r\n            <li>\r\n            </li>\r\n            <li>\r\n              <a class=\"hidden-xs visible-sm  visible-md visible-lg\">{{state}}</a>     \r\n              <!-- <a class=\"visible-xs hidden-sm hidden-md hidden-lg\" [routerLink]=\"['register']\"><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i></a>      -->\r\n            </li>\r\n            <li>\r\n              <button (click)=\"showProfileMenu()\" class=\"btn btn-sm btn-default\"><i style=\"font-size:16px;\" class=\"fa fa-user-circle\" aria-hidden=\"true\"></i></button>\r\n            </li>\r\n        </ul>\r\n        \r\n        <ul class=\"list-inline font-size-s\" *ngIf=\"!state\">\r\n            <li>\r\n              <button (click)=\"toggle()\" class=\"btn btn-xs btn-default font-size-s hidden-xs visible-sm  visible-md visible-lg\"><i class=\"fa fa-language\"></i> {{ currlang }}</button>\r\n              <button (click)=\"toggle()\" class=\"btn btn-xs btn-default font-size-s visible-xs hidden-sm hidden-md hidden-lg\"><i class=\"fa fa-language\"></i> {{ currlangMOB }}</button>\r\n            </li>\r\n            <li>|</li>\r\n            <li>\r\n              <a class=\"hidden-xs visible-sm  visible-md visible-lg\" [routerLink]=\"['register']\">{{ 'home.menu.register' | translate }}</a>     \r\n              <a class=\"visible-xs hidden-sm hidden-md hidden-lg\" [routerLink]=\"['register']\"><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i></a>     \r\n            </li>\r\n            <li>|</li>\r\n            <li>\r\n                <a class=\"hidden-xs visible-sm  visible-md visible-lg\" href=\"../portal-protected/\">Login</a>\r\n                <!-- <a class=\"visible-xs hidden-sm hidden-md hidden-lg\" *ngIf=\"!auth.isAuthenticated()\" [routerLink]=\"['portal/login']\"><i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i></a>\r\n                <a *ngIf=\"auth.isAuthenticated()\" [routerLink]=\"['user/profile']\">Welcome {{auth.currentUser.firstName}}</a> -->\r\n            </li>\r\n            <li>\r\n              |\r\n            </li>\r\n            <li>\r\n              <button (click)=\"showSidenavMenu()\" class=\"btn btn-sm btn-default\"><i style=\"font-size:16px;\" class=\"fa fa-cog\" aria-hidden=\"true\"></i></button>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <div class=\"row menu_botm container\" id=\"confBar\">\r\n      <div class=\"col-sm-12\" id=\"themeContainer\">\r\n        <ul class=\"list-inline hidden-xs font-size-s\">\r\n          <li>\r\n            Theme Color:\r\n               <input #colorPanel *ngFor=\"let color of colors; let i = index; let firstItem = first\" (click)=\"setClickedColor(i, firstItem)\"  [class.colorPaletteActive]=\"i == selectedRow ? true: false\" type=\"button\" name=\"bgColor\" [(ngModel)]=\"bgColor\" [ngStyle]=\"{'background': color.bgColor, 'border': '1px solid', 'border-color': color.bgColor}\"  class=\"bgColorBtn bgColor\" value=\"{{color.bgColor}}\">\r\n                <span><div (click)=\"resetBgColor()\" class=\"btn btn-xs btn-default\"><i class=\"fa fa-refresh\"></i></div></span>\r\n          </li>\r\n          \r\n          \r\n          <li class=\"fontResize\" style=\"margin-left: 70px\">\r\n            Font Size :\r\n            </li>\r\n          <li class=\"fontResize\"><button  [disabled]=\"minusBtn\" class=\"btn btn-default fontminus\" (click)=\"fontminus()\" style=\"border:1px solid white;padding: 3px; height: 25px; width: 28px; font-size:14px;\"><i class=\"fa fa-minus\"></i>A</button></li>\r\n          <li class=\"fontResize\"><button  [disabled]=\"plusBtn\" class=\"fontplus btn btn-default\"  (click)=\"fontplus()\" style=\"border:1px solid white;padding: 3px; height: 25px; width: 28px; font-size:14px;\"><i class=\"fa fa-plus\"></i>A</button></li>\r\n          <span><div class=\"fontreset btn btn-xs btn-default\" (click)=\"fontreset()\"><i class=\"fa fa-refresh\"></i></div></span>\r\n          <li style=\"margin-left: 20px\">\r\n            Font Type :\r\n              </li>\r\n            <li>\r\n                <label class=\"sr-only\" for=\"fontOpt\">Font Type</label>\r\n                <select #fontTy (change)=\"onChange($event, fontTy.value)\" id=\"fontOpt\" class=\"form-control\">\r\n                    <option class=\"fontOpt1\" value=\"Roboto\">Roboto</option>\r\n                    <option class=\"fontOpt2\" value=\"Arial\">Arial</option>\r\n                    <option class=\"fontOpt3\" value=\"Times New Roman\">Times New Roman</option>\r\n                </select>\r\n            </li>\r\n            <li>\r\n                <span><div (click)=\"resetFontStyle()\" id=\"resetFontStyle\" class=\"btn btn-xs btn-default\"><i class=\"fa fa-refresh\"></i></div></span>\r\n            </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>  \r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/header/topnav/topnav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopnavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__topnav_service__ = __webpack_require__("../../../../../src/app/header/topnav/topnav.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var num = 0;
var TopnavComponent = (function () {
    function TopnavComponent(translate, topnavservice) {
        this.translate = translate;
        this.topnavservice = topnavservice;
        this.minusBtn = false;
        this.plusBtn = false;
        this.langId = this.langId;
        this.edited = true;
        this.profileShow = true;
        this.sidenavShow = true;
        this.topNavClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.showProfile = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.showsidenav = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.isActive = true;
        this.currlang = this.currlang;
        this.currlangMOB = this.currlangMOB;
        translate.addLangs(['en', 'ms']);
        if (localStorage.getItem('langID') == "2") {
            translate.setDefaultLang('ms');
            translate.use('ms');
        }
        else {
            translate.setDefaultLang('en');
            translate.use('en');
        }
        if (translate.getDefaultLang() == 'ms') {
            this.currlang = 'English';
            this.currlangMOB = 'EN';
            this.langId = 2;
        }
        else {
            this.currlang = 'Bahasa Malaysia';
            this.currlangMOB = 'BM';
            this.langId = 1;
        }
    }
    TopnavComponent.prototype.ngAfterViewInit = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(function () {
            if (localStorage.getItem('themeColor') == '' || localStorage.getItem('themeColor') == null || localStorage.getItem('themeColor') == '#00bdbb') {
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#confBar li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
                localStorage.setItem('themeColor', '#00bdbb');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#confBar li > input.bgColorBtn:nth(0)').removeClass('colorPaletteActive');
            }
            if (localStorage.getItem('themeIndex') == '' || localStorage.getItem('themeIndex') == null || localStorage.getItem('themeIndex') == '0') {
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#confBar li > input.bgColorBtn').removeClass('colorPaletteActive');
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#confBar li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#confBar li > input.bgColorBtn').removeClass('colorPaletteActive');
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#confBar li > input.bgColorBtn:nth(' + localStorage.getItem('themeIndex') + ')').addClass('colorPaletteActive');
            }
        });
        if (localStorage.getItem('customFontType')) {
            __WEBPACK_IMPORTED_MODULE_1_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', localStorage.getItem('customFontType'));
            __WEBPACK_IMPORTED_MODULE_1_jquery__('#fontOpt option[value="' + localStorage.getItem('customFontType') + '"]').attr('selected', 'selected');
        }
        else {
            __WEBPACK_IMPORTED_MODULE_1_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', 'Roboto');
            __WEBPACK_IMPORTED_MODULE_1_jquery__('#fontOpt option[value="Roboto"]').attr('selected', 'selected');
        }
    };
    TopnavComponent.prototype.ngOnInit = function () {
        this.getLangID();
        console.log('topnav.comp.ts');
        this.colors = this.topnavservice.getColors();
        this.getUserProfile();
    };
    TopnavComponent.prototype.getLangID = function () {
        if (!localStorage.getItem('langID')) {
            localStorage.setItem('langID', this.langId);
        }
    };
    TopnavComponent.prototype.getUserProfile = function () {
        var getUsrID = localStorage.getItem('usrID');
        if (getUsrID) {
            this.admin = true;
        }
        else {
            this.admin = false;
        }
    };
    TopnavComponent.prototype.toggle = function () {
        this.isActive = !this.isActive;
        if (this.isActive) {
            this.currlang = 'English';
            this.currlangMOB = 'EN';
            this.translate.use('ms');
            this.langId = 2;
        }
        else {
            this.currlang = 'Bahasa Malaysia';
            this.currlangMOB = 'BM';
            this.langId = 1;
            this.translate.use('en');
        }
        localStorage.setItem('langID', this.langId);
    };
    TopnavComponent.prototype.showConfBar = function () {
        this.edited = !(this.edited);
        this.topNavClick.emit(this.edited);
    };
    TopnavComponent.prototype.showProfileMenu = function () {
        //this.profileShow = !(this.profileShow);
        this.showProfile.emit(this.profileShow);
    };
    TopnavComponent.prototype.showSidenavMenu = function () {
        this.showsidenav.emit(this.sidenavShow);
    };
    TopnavComponent.prototype.langEventChange = function (data) {
        console.log(data);
    };
    TopnavComponent.prototype.setClickedColor = function (index, firstItem) {
        localStorage.setItem('themeColor', this.colors[index].bgColor);
        localStorage.setItem('themeIndex', index);
        this.selectedRow = index;
        this.firstItem = firstItem;
    };
    TopnavComponent.prototype.resetBgColor = function () {
        localStorage.setItem('themeColor', '#00bdbb');
        localStorage.setItem('themeIndex', '0');
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#confBar li > input.bgColorBtn').removeClass('colorPaletteActive');
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#confBar li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
    };
    TopnavComponent.prototype.fontminus = function () {
        this.plusBtn = false;
        num = num - 1;
        this.fn_changeFont(num);
        if (num < -3) {
            this.minusBtn = true;
            this.plusBtn = false;
        }
        else if (num > -3) {
            this.minusBtn = false;
            //this.plusBtn = true
        }
    };
    TopnavComponent.prototype.fontplus = function () {
        this.minusBtn = false;
        num = num + 1;
        this.fn_changeFont(num);
        if (num > 3) {
            this.plusBtn = true;
            this.minusBtn = false;
        }
        else if (num < 3) {
            this.plusBtn = false;
            //this.minusBtn = true
        }
    };
    TopnavComponent.prototype.fontreset = function () {
        this.minusBtn = false;
        this.plusBtn = false;
        num = 0;
        this.fn_changeFont(num);
    };
    TopnavComponent.prototype.fn_changeFont = function (dynum) {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('.font-size-s').css('font-size', 14 + dynum + 'px');
    };
    TopnavComponent.prototype.onChange = function ($event, deviceValue) {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', deviceValue);
        localStorage.setItem('customFontType', deviceValue);
    };
    TopnavComponent.prototype.resetFontStyle = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#fontOpt').val('Roboto');
        __WEBPACK_IMPORTED_MODULE_1_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', 'Roboto');
        //$('#fontOpt option[value="Roboto"]').attr("selected", "selected");
        localStorage.setItem('customFontType', 'Roboto');
    };
    return TopnavComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopnavComponent.prototype, "edited", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopnavComponent.prototype, "profileShow", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], TopnavComponent.prototype, "sidenavShow", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], TopnavComponent.prototype, "state", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TopnavComponent.prototype, "topNavClick", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TopnavComponent.prototype, "showProfile", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], TopnavComponent.prototype, "showsidenav", void 0);
TopnavComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-topnav',
        template: __webpack_require__("../../../../../src/app/header/topnav/topnav.component.html"),
        styles: [__webpack_require__("../../../../../src/app/header/topnav/topnav.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__topnav_service__["a" /* TopnavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__topnav_service__["a" /* TopnavService */]) === "function" && _b || Object])
], TopnavComponent);

var _a, _b;
//# sourceMappingURL=topnav.component.js.map

/***/ }),

/***/ "../../../../../src/app/header/topnav/topnav.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopnavService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TopnavService = (function () {
    function TopnavService() {
    }
    TopnavService.prototype.getUserMenu = function () {
        return USERMENU;
    };
    TopnavService.prototype.getColors = function () {
        return COLORS;
    };
    TopnavService.prototype.getFonts = function () {
        return FONTS;
    };
    return TopnavService;
}());
TopnavService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], TopnavService);

var USERMENU = [{
        id: 1,
        name: 'My Profile',
        url: ''
    },
    {
        id: 2,
        name: 'InBox',
        url: ''
    }
];
var COLORS = [
    {
        bgColor: '#00bdbb'
    }, {
        bgColor: '#5e7899'
    },
    {
        bgColor: '#e06000'
    },
    {
        bgColor: '#4f81c5'
    },
    { bgColor: '#982d57'
    }
];
var FONTS = [
    'Roboto',
    'Arial',
    'Times New Roman'
];
//# sourceMappingURL=topnav.service.js.map

/***/ }),

/***/ "../../../../../src/app/highlightbox/highlightbox.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "        .articleBox {\r\n            padding: 10px 40px;\r\n            text-align: center;\r\n        }\r\n\r\n       .lifeEventBox, .articleBox span {\r\n            text-decoration: none;\r\n            display: block;\r\n            height: 400px;\r\n            overflow: hidden;\r\n            color: #333;\r\n        }\r\n\r\n        .popularArticle_bg {\r\n            \r\n            height: 100px;\r\n            background-size: cover;\r\n        }\r\n\r\n        .lifeEventBg {\r\n            background: #f1f1f1;\r\n            border-top: 3px solid #00bdbb;\r\n        }\r\n\r\n\r\n        .lifeEventBox-title {\r\n            text-transform: uppercase;\r\n        }\r\n        \r\n        .lifeEventBox-description {\r\n            padding: 0px 15px;\r\n            line-height: 24px;\r\n            text-align: left;\r\n        }\r\n\r\n         .lifeEventBox-description-peyertaan {\r\n            padding: 0px 15px;\r\n            line-height: 24px;\r\n            text-align: center;\r\n        }\r\n\r\n        .lifeEventBox-description-status{\r\n            padding: 0px 15px;\r\n            line-height: 24px;\r\n            text-align: center;\r\n        }\r\n\r\n        .lifeEventBg a:hover {\r\n            color: #00bdbb !important;\r\n            text-decoration: none;\r\n        }\r\n\r\n        a:hover {\r\n            color: #fff !important;\r\n        }\r\n\r\n        .btn-secondary{\r\n            color: white !important;\r\n        }\r\n\r\n        .btn-secondary:hover {\r\n            color: #fff;\r\n            background-color: #666666;\r\n            border-color: #666666;\r\n        }\r\n\r\n        .popular-article-box {\r\n            padding: 10px;\r\n            width: auto;\r\n        }\r\n\r\n        .lifeEventBg a {\r\n            color: #333;\r\n            text-decoration: none;\r\n        }\r\n\r\n        .font-size-s {\r\n            font-size: 14px;\r\n            font-weight: 400;\r\n        }\r\n\r\n        li {\r\n            display: list-item;\r\n            text-align: -webkit-match-parent;\r\n            list-style: none;\r\n        }\r\n\r\n        a btn:hover {\r\n            color: white;\r\n        }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/highlightbox/highlightbox.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container lifeEventContainer animated fadeIn\" style=\"background:#dedede;\">\r\n    <div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-4 articleBox\">\r\n                <span class=\"lifeEventBg warna_border_color\" style=\"border-color: rgb(0, 189, 187);\" [style.border-color]=\"getTheme()\">\r\n                    <img src=\"{{hotTopicImg}}\" style=\"height: 100px; width:100%;background-size: cover;\"/>\r\n                    <div class=\"lifeEventBox-title\"><h2 class=\"font-size-l\" style=\"font-family: Roboto;\">\r\n                          {{hotTopic}}\r\n\t\t\t\t\t\t\t</h2></div>\r\n                            <div class=\"popular-article-box lifeEventBox-description\">\r\n\t\t\t\t\t\t\t<ul class=\"col-xs-12\" *ngFor=\"let item of hotTopicContent\">\t\t\r\n\t\t\t\t\t\t\t\t<li style=\"border-bottom: 1px solid rgba(221, 221, 221, 0.58);\">\r\n\t\t\t\t\t\t\t\t\t<a class=\"pboxa font-size-s warna_font\" href=\"https://www.malaysia.gov.my/public/cms/article/page/396/\" style=\"font-family: Roboto; color: rgb(51, 51, 51);\">\r\n\t\t\t\t\t\t\t\t\t{{item.article_label}}\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t\t\t\t<p class=\"topic-textp font-size-s warna_title_color\" style=\"cursor: pointer; font-family: Roboto; color: rgb(0, 189, 187);\" onclick=\"window.location='https://www.malaysia.gov.my/public/cms/topic/9/sub_topic/118/'\" [style.color]=\"getTheme()\">\t\r\n\t\t\t\t\t\t\t\t\t{{item.topic_label}}\r\n\t\t\t\t\t\t\t\t\t</p>\r\n\t\t\t\t\t\t\t\t</li>\t\t\t\t\t\r\n\t\t\t\t\t\t\t</ul>\r\n\t\t\t\t\t\t</div>\r\n                </span>\r\n            </div>\r\n            <div class=\"col-md-4 articleBox\">\r\n                <span class=\"lifeEventBg warna_border_color\" style=\"border-color: rgb(0, 189, 187);\" [style.border-color]=\"getTheme()\">\t\t\t\t\t\r\n                    <img src=\"{{peyertaanImg}}\" style=\"height: 100px; width:100%;background-size: cover;\"/>\r\n                    <div class=\"lifeEventBox-title\"><h2 class=\"font-size-l\" style=\"font-family: Roboto;\">{{penyertaan}}</h2></div>\r\n                    <div class=\"lifeEventBox-description-peyertaan font-size-s\" style=\"font-family: Roboto;\">\t\t\t\t\t\t\r\n\t\t\t\t\t\t{{penyertaanContent}}\r\n                        <div class=\"form-group\">\r\n                                <button class=\"btn btn-secondary btn-block font-size-s warna_bg\" style=\"font-family: Roboto; background-color: rgb(0, 189, 187);\" [style.background-color]=\"getTheme()\">\r\n                                  {{penyertaanButton}}\r\n                                  </button>\r\n                              </div>\r\n\t\t\t\t\t</div>\t\t\r\n                </span>\r\n            </div>\r\n            <div class=\"col-md-4 articleBox\">\r\n                <span class=\"lifeEventBg warna_border_color\" style=\"border-color: rgb(0, 189, 187);\" [style.border-color]=\"getTheme()\">\r\n                      <img src=\"{{permohonanImg}}\" style=\"height: 100px; width:100%;background-size: cover;\"/>\r\n                    <div class=\"lifeEventBox-title\"><h2 class=\"font-size-l\" style=\"font-family: Roboto;\">{{statuslabel}}</h2></div>\r\n                    <div class=\"lifeEventBox-description-status\">\r\n                          <p class=\"font-size-s\" style=\"font-family: Roboto;\">\r\n                            {{statusContent}}\r\n                            </p>\r\n                            <form class=\"search-permohonan\">\r\n                              <div class=\"form-group\">\r\n                                <label class=\"sr-only\" for=\"noPermohonanCarian\">{{'home.applicationNum' | translate}}</label>                                 \r\n                                  <input type=\"text\" class=\"form-control\" id=\"noPermohonanCarian\" placeholder=\"{{'home.applicationNum' | translate}}\">                                                                \r\n                              </div>\r\n                              <div class=\"form-group\">\r\n                                <button class=\"btn btn-secondary btn-block font-size-s warna_bg\" style=\"font-family: Roboto; background-color: rgb(0, 189, 187);\" [style.background-color]=\"getTheme()\">\r\n                                  {{'home.check' | translate}}\r\n                                  </button>\r\n                              </div>\r\n                            </form>\r\n                            <div style=\"display: none; padding: 2px; font-family: Roboto;\" class=\"errMessage font-size-s\"></div>               \r\n                    </div>\r\n                </span>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/highlightbox/highlightbox.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HighlightboxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var HighlightboxComponent = (function () {
    function HighlightboxComponent(translate, http, config) {
        var _this = this;
        this.translate = translate;
        this.http = http;
        this.config = config;
        this.lang = 'en';
        this.filter = false;
        this.highlightUrl = this.config.urlHighlights;
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                _this.lang = 'en';
                _this.getData(_this.lang);
            }
            if (myLang == 'ms') {
                _this.lang = 'ms';
                _this.getData(_this.lang);
            }
        });
    }
    HighlightboxComponent.prototype.ngOnInit = function () {
        this.getData(this.lang);
    };
    HighlightboxComponent.prototype.getData = function (lang) {
        var _this = this;
        return this.http.get(this.highlightUrl + '-' + lang + '.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (eventData) {
            _this.highlightData = eventData;
            _this.hotTopic = eventData[0].label;
            _this.hotTopicContent = eventData[0].content;
            _this.hotTopicImg = eventData[0].url_image;
            _this.peyertaanImg = eventData[1].url_image;
            _this.permohonanImg = eventData[2].url_image;
            _this.penyertaan = eventData[1].label;
            _this.penyertaanContent = eventData[1].content;
            _this.penyertaanButton = eventData[1].button;
            _this.statuslabel = eventData[2].label;
            _this.statusContent = eventData[2].content;
        });
    };
    HighlightboxComponent.prototype.getUrl = function () {
        return this.hotTopicImg;
    };
    HighlightboxComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    return HighlightboxComponent;
}());
HighlightboxComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-highlightbox',
        template: __webpack_require__("../../../../../src/app/highlightbox/highlightbox.component.html"),
        styles: [__webpack_require__("../../../../../src/app/highlightbox/highlightbox.component.css")]
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */]) === "function" && _c || Object])
], HighlightboxComponent);

var _a, _b, _c;
//# sourceMappingURL=highlightbox.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<app-slider></app-slider>\r\n<app-search></app-search>\r\n<app-lifeevent></app-lifeevent>\r\n<!-- <app-topic-feature></app-topic-feature>  -->\r\n<app-highlightbox></app-highlightbox>   \r\n<app-poll></app-poll>\r\n<app-announcement></app-announcement>\r\n"

/***/ }),

/***/ "../../../../../src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__("../../../../../src/app/home/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/home.component.css")]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/lifeevent/lifeevent.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".font-size-1{\r\n                text-align: center;\r\n                font-family: Roboto;\r\n                color: rgb(0, 189, 187);\r\n                font-size: 24px;\r\n                font-weight: 500;\r\n                padding-bottom: 15px;\r\n            }\r\n\r\n            .customUnderLine{\r\n                margin-top: 35px;\r\n                margin-bottom: 0%;\r\n                border: 0;\r\n                border-top: 2px solid #1ebebc;\r\n                width: 15%;\r\n                right: 42%;\r\n                position: absolute;\r\n            }\r\n\r\n            .font-size-s{\r\n                color:black;\r\n            }\r\n\r\n            .lifeEventBox {\r\n                position: relative;\r\n                padding: 10px 40px;\r\n                text-align: center;\r\n            }\r\n\r\n            .lefteventlist{\r\n                text-align: left !important;\r\n                line-height: 25px;\r\n                padding-left: 15px;\r\n                font-size:14px;\r\n                font-weight:400;\r\n            }\r\n\r\n\r\n            .lifeEventBg {\r\n                display: block;\r\n                height: auto;\r\n                border-color: rgb(0, 189, 187);\r\n                background: #f1f1f1;\r\n                border-top: 3px solid rgb(0, 189, 187);\r\n            }\r\n\r\n            .overlay {\r\n                position: absolute;\r\n                bottom: 0;\r\n                left: 0;\r\n                right: 0;\r\n                width: 75%;\r\n                margin: 0 auto;\r\n                background-color: rgba(0,0,0, 0.7);\r\n                overflow: hidden;\r\n                height: 0;\r\n                transition: .5s ease;\r\n            }\r\n\r\n            .lifeEventBox:hover .overlay {\r\n                height: 95%;\r\n            }\r\n\r\n            .text {\r\n                white-space: nowrap;\r\n                color: white;\r\n                font-size: 20px;\r\n                position: absolute;\r\n                overflow: hidden;\r\n                top: 50%;\r\n                left: 50%;\r\n                -webkit-transform: translate(-50%, -50%);\r\n                        transform: translate(-50%, -50%);\r\n                -ms-transform: translate(-50%, -50%);\r\n            }\r\n\r\n            .lifeEventBox a {\r\n                text-decoration: none;\r\n                display: block;\r\n                height: 170px;\r\n                overflow: hidden;\r\n                color: #333;\r\n            }\r\n\r\n            .lifeEventBox-title{\r\n                color:rgb(0, 189, 187);\r\n                text-transform: uppercase;\r\n            }\r\n\r\n            .text button{\r\n                display:block; margin: 0 auto;\r\n            }\r\n\r\n            .text a{\r\n                width: 100%;\r\n                height: 40px;\r\n                padding:10px;\r\n                color:#fff;\r\n                text-transform: uppercase;\r\n                background: #fff;\r\n                border: 1px solid #000;\r\n                margin-bottom: 4px;\r\n                background-color: rgb(0, 189, 187)\r\n            }\r\n\r\n            .text a:hover{\r\n                background:#888 !important;\r\n                color:#fff !important;\r\n                border: 1px solid #888 !important;\r\n            }\r\n\r\n            .warna_border_color{\r\n                border: 0px solid #000 !important;\r\n            }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/lifeevent/lifeevent.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid lifeEventContainer animated fadeIn\">\r\n        <div class=\"container\" *ngFor=\"let leData of lifeEventData\" style=\"padding:0px;\">\r\n                <div>\r\n                        <h2 class=\"font-size-1\" style=\"text-align: center;\" [style.color]=\"getTheme()\">\r\n                                {{leData.title}}\r\n                        <span class=\"customUnderLine\" [style.border-color]=\"getTheme()\"></span>\r\n                        </h2>\r\n                        <p style=\"text-align: center;\" class=\"font-size-s\"> {{leData.description}}</p>\r\n                </div>\r\n                <div class=\"row\">\r\n                        <div class=\"col-md-3 col-sm-12 col-xs-12 lifeEventBox\" *ngFor=\"let getContent of leData.content\">\r\n                                <a href=\"\" class=\"lifeEventBg\" style=\"border-top:3px solid;\" [style.border-color]=\"getTheme()\">\r\n                                        <div class=\"lifeEventBox-title\">\r\n                                                <h2 class=\"font-size-l\" [style.color]=\"getTheme()\">{{getContent.name}}</h2>\r\n                                        </div>\r\n                                        <div class=\"lifeEventBox-description font-size-s lefteventlist\"  [innerHTML]=\"getContent.text\">               \r\n                                        </div>\r\n                                </a>\r\n                                <div class=\"overlay\">\r\n                                        <div class=\"text\" *ngFor=\"let getAction of leData.action\">\r\n                                                <a class=\"btn warna_bg warna_border_color\" [style.background-color]=\"getTheme()\" href=\"/public/cms/topic/44/sub_topic/315/\">{{getAction.button1}}</a>\r\n                                                <a class=\"btn warna_bg warna_border_color\" [style.background-color]=\"getTheme()\" href=\"/public/cms/topic/44/sub_topic/315/\">{{getAction.button2}}</a>\r\n                                        </div>\r\n                                </div>\r\n                        </div>\r\n                </div>\r\n        </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/lifeevent/lifeevent.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LifeeventComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var LifeeventComponent = (function () {
    function LifeeventComponent(translate, http, config) {
        var _this = this;
        this.translate = translate;
        this.http = http;
        this.config = config;
        this.lang = 'en';
        this.lifeEventUrl = this.config.urlLifeevent;
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                _this.lang = 'en';
                _this.getData(_this.lang);
            }
            if (myLang == 'ms') {
                _this.lang = 'ms';
                _this.getData(_this.lang);
            }
        });
    }
    LifeeventComponent.prototype.ngOnInit = function () {
        this.getData(this.lang);
    };
    LifeeventComponent.prototype.getData = function (lang) {
        var _this = this;
        return this.http.get(this.lifeEventUrl + '-' + lang + '.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (resSliderData) {
            _this.lifeEventData = resSliderData;
        });
    };
    LifeeventComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    return LifeeventComponent;
}());
LifeeventComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-lifeevent',
        template: __webpack_require__("../../../../../src/app/lifeevent/lifeevent.component.html"),
        styles: [__webpack_require__("../../../../../src/app/lifeevent/lifeevent.component.css")]
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */]) === "function" && _c || Object])
], LifeeventComponent);

var _a, _b, _c;
//# sourceMappingURL=lifeevent.component.js.map

/***/ }),

/***/ "../../../../../src/app/mailbox/mailbox.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    max-height: 500px;\r\n    min-width: 300px;\r\n  }\r\n  \r\n  .mat-table {\r\n    overflow: auto;\r\n    max-height: 500px;\r\n  }\r\n\r\n  .mat-column-subject{\r\n      max-width:70%;\r\n  }\r\n\r\n  .mat-column-position{\r\n      max-width:10%;\r\n  }\r\n\r\n  .mat-column-action{\r\n    max-width:20%;\r\n}\r\n\r\n.list-inline{\r\n\tmargin-top: 25px;\r\n}\r\n\r\n.list-inline li a:hover{\r\n\ttext-decoration:none;\r\n\tcolor:#333;\r\n}\r\n\r\n.table_row:hover{\r\n    background:#ddd;\r\n}\r\n\r\nmat-table{\r\n    height: 100%;\r\n    min-height: 100%;\r\n    max-height: 100% !important;\r\n}\r\n\r\n.table_row_height{\r\n    height:45px;\r\n}\r\n\r\n.deleteAllBtn{\r\n    float: right;\r\n    position: relative;\r\n    clear: both;\r\n    margin-top: 15px;\r\n}\r\n\r\n.mailContainer{\r\n    color: #000;\r\n    height: 250px;\r\n    overflow-y: scroll;\r\n    margin: 15px 0px;\r\n    border: 1px solid #ddd;\r\n    padding: 10px;\r\n}\r\n\r\n.mailContainer p{\r\n    margin:0px;\r\n}\r\n\r\n.mailContainer div{\r\n    margin-top:10px;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/mailbox/mailbox.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid animated slideInDown\" style=\"background: #a7a495;\">\r\n    <div class=\"container\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n          <h1 style=\"margin-top: 10px;\" class=\"font-size-l\">{{'home.breadcrumb.mailbox' | translate}}</h1>\r\n          <hr class=\"hr-custom2\">\r\n          <ul class=\"list-inline\" style=\"clear:both;\">\r\n            <li>\r\n              <a class=\"font-size-s\" href=\"/index/\">\r\n                        {{'home.menu.home' | translate }}\r\n                    </a>\r\n            </li>\r\n            <li>/</li>\r\n            <li>\r\n              {{'home.breadcrumb.mailbox' | translate}}\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"container\">\r\n      <div class=\"col-md-3 padding-left-0\">\r\n          <gosg-sidenav-dashboard></gosg-sidenav-dashboard>\r\n      </div>\r\n      <div class=\"col-md-9 mat-elevation-z8\" style=\"margin-top:15px;\">\r\n        <div class=\"deleteAllBtn\"><button [disabled]=\"!mailboxId.length > 0\" mat-raised-button color=\"warn\" (click)=\"deleteAllModal.show()\"><i class=\"fa fa-trash\"></i> {{'common.buttons.delete' | translate}}</button></div>\r\n        <div class=\"row\"></div>\r\n        <div class=\"row mailContainer\" *ngIf=\"mailContent?.message?.fromUser.email\" [style.display]=\"isMailContainerShow\">\r\n              <p class=\"font-size-s\">\r\n                From: {{mailContent?.message?.fromUser.email}} \r\n              </p>\r\n              <p class=\"font-size-s\">\r\n                Date: {{mailContent?.message?.submissionDate | date}}\r\n              </p>\r\n              <p class=\"font-size-s\">\r\n                Subject: {{mailContent?.message?.subject}} \r\n              </p>\r\n              <div class=\"font-size-m\">\r\n                {{mailContent?.message?.content}}\r\n              </div>\r\n        </div>\r\n        <table class=\"mat-table\" style=\"width:100%\">\r\n          <tr class=\"mat-header-row\" style=\"height:45px\">\r\n            <td width=\"5%\" class=\"mat-header-cell text-center\"></td>\r\n            <td width=\"30%\" class=\"mat-header-cell\">{{'mailbox.header.from' | translate}}</td>\r\n            <td class=\"mat-header-cell\">{{'mailbox.header.subject' | translate}}</td>\r\n            <td width=\"10%\" class=\"mat-header-cell\">{{'mailbox.header.date' | translate}}</td>\r\n            <td width=\"15%\" class=\"mat-header-cell text-center\">{{'mailbox.header.action' | translate}}</td>\r\n          </tr>\r\n          <tr class=\"mat-row table_row table_row_height\" *ngFor=\"let data of mailData?.messageList\" [style.font-weight]=\"data.read ? '' : 'bold'\">\r\n            <td class=\"mat-cell text-center\"><mat-checkbox [value]=\"data.messageId\"  (change)=\"isChecked($event);\"></mat-checkbox></td>\r\n            <td class=\"mat-cell\">{{data.fromUser.email}}</td>\r\n            <td class=\"mat-cell\">{{data.subject}}</td>\r\n            <td class=\"mat-cell\">{{data.submissionDate | date}}</td>\r\n            <td class=\"mat-cell text-center\"> \r\n              <button (click)=\"getMail($event, data.messageId)\" class=\"btn btn-sm btn-warning\"><i class=\"fa fa-eye font-size-s\"></i></button>\r\n              <button class=\"btn btn-sm btn-danger\" (click)=\"deleteModal.show()\"><i class=\"fa fa-trash font-size-s\"></i></button>\r\n            </td>\r\n            <app-confirm-dialog  #deleteModal \r\n            [title]=\"'common.icon.warn'\" \r\n            [content]=\"'common.msg.delete'\"\r\n            [state]=\"'common.state.warn'\"\r\n            [isReset]=\"'true'\"\r\n            (resetMethod)=\"resetMethod($event, data.messageId)\">\r\n            </app-confirm-dialog>\r\n\r\n          </tr>\r\n        </table>\r\n\r\n            <!-- <mat-paginator [length]=\"mailData?.length\">\r\n            </mat-paginator> -->\r\n            <mat-form-field style=\"width:50px;\">\r\n                <mat-select class=\"font-size-s\" value=\"10\" (change)=\"pageChange($event)\">\r\n                  <mat-option value=\"5\">5</mat-option>\r\n                  <mat-option value=\"10\">10</mat-option>\r\n                  <mat-option value=\"25\">25</mat-option>\r\n                  <mat-option value=\"50\">50</mat-option>\r\n                </mat-select>\r\n              </mat-form-field>\r\n              <div style=\"float:right; margin-top: 10px;\">\r\n                  <span style=\"color:#000; padding-right:20px;\">Pages <strong>{{mailData?.pageNumber}}</strong> of <strong>{{mailData?.totalPages}}</strong> in <strong>{{mailData?.totalElements}}</strong> mails</span>\r\n                  <button mat-mini-fab color=\"basic\" [disabled]=\"noPrevData\" (click)=\"paginatorL(mailData?.pageNumber)\"><i class=\"fa fa-angle-left\" aria-hidden=\"true\"></i></button>\r\n                  <button mat-mini-fab color=\"basic\" [disabled]=\"noNextData\"  (click)=\"paginatorR(mailData?.pageNumber, mailData?.totalPages)\"><i class=\"fa fa-angle-right\" aria-hidden=\"true\"></i></button>\r\n              </div>\r\n              \r\n              \r\n        </div>\r\n  </div>\r\n\r\n\r\n  <app-confirm-dialog  #deleteAllModal \r\n  [title]=\"'common.icon.warn'\" \r\n  [content]=\"'common.msg.delete'\"\r\n  [state]=\"'common.state.warn'\"\r\n  [isReset]=\"'true'\"\r\n  (resetMethod)=\"resetAllMethod()\">\r\n  </app-confirm-dialog>"

/***/ }),

/***/ "../../../../../src/app/mailbox/mailbox.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MailboxComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_protected_service__ = __webpack_require__("../../../../../src/app/services/protected.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_toastr__ = __webpack_require__("../../../../ngx-toastr/toastr.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_shared_service__ = __webpack_require__("../../../../../src/app/common/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dialogs_dialogs_service__ = __webpack_require__("../../../../../src/app/dialogs/dialogs.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MailboxComponent = (function () {
    function MailboxComponent(protectedService, dialogsService, cdRef, toastr, sharedService, translate) {
        this.protectedService = protectedService;
        this.dialogsService = dialogsService;
        this.cdRef = cdRef;
        this.toastr = toastr;
        this.sharedService = sharedService;
        this.translate = translate;
        this.mailboxId = [];
        this.mailPageSize = 10;
        this.mailPageCount = 1;
        this.noPrevData = true;
        this.noNextData = false;
        this.rerender = false;
        this.isMailContainerShow = 'block';
        this.languageId = this.languageId;
        this.lang = this.lang;
        sharedService.loadTranslate();
    }
    MailboxComponent.prototype.ngOnInit = function () {
        this.languageId = 2;
        this.getMails(this.mailPageCount, this.mailPageSize);
    };
    MailboxComponent.prototype.getMail = function (event, msgId) {
        var _this = this;
        event.target.parentElement.parentElement.parentElement.removeAttribute('style');
        this.protectedService.getMail(msgId).
            subscribe(function (data) {
            _this.isMailContainerShow = 'block';
            _this.mailContent = data;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('mailbox.err.failtoload'), '');
        });
    };
    MailboxComponent.prototype.getMails = function (page, size) {
        var _this = this;
        this.protectedService.getMails('930701055000', page, size).
            subscribe(function (data) {
            _this.mailData = data;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('mailbox.err.failtoload'), '');
        });
    };
    MailboxComponent.prototype.readMail = function (event, msgId) {
        event.stopPropagation();
    };
    MailboxComponent.prototype.pageChange = function (event) {
        this.getMails(this.mailPageCount, event.value);
        this.mailPageSize = event.value;
    };
    MailboxComponent.prototype.isChecked = function (event) {
        if (event.checked) {
            this.mailboxId.push(event.source.value);
        }
        else {
            var index = this.mailboxId.indexOf(event.source.value);
            this.mailboxId.splice(index, 1);
        }
        return false;
    };
    MailboxComponent.prototype.paginatorL = function (page) {
        this.getMails(page - 1, this.mailPageSize);
        this.noPrevData = page <= 2 ? true : false;
        this.noNextData = false;
    };
    MailboxComponent.prototype.paginatorR = function (page, totalPages) {
        this.noPrevData = page >= 1 ? false : true;
        var pageInc = page + 1;
        this.noNextData = pageInc === totalPages;
        this.getMails(page + 1, this.mailPageSize);
    };
    MailboxComponent.prototype.deleteMail = function (msgId) {
        var _this = this;
        this.protectedService.deleteMail(msgId).
            subscribe(function (success) {
            _this.getMails(_this.mailPageCount, _this.mailPageSize);
            _this.toastr.error(_this.translate.instant('mailbox.success.deletesuccess'), '');
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('mailbox.err.failtodelete'), '');
        });
    };
    MailboxComponent.prototype.showMailDelMsg = function (event, msgId) {
        event.stopPropagation();
        this.isMailContainerShow = 'none';
        this.deleteMail(msgId);
    };
    MailboxComponent.prototype.showMailsDelMsg = function () {
        event.stopPropagation();
        this.isMailContainerShow = 'none';
        this.deleteMails();
    };
    MailboxComponent.prototype.resetMethod = function (event, msgId) {
        this.isMailContainerShow = 'none';
        this.deleteMail(msgId);
    };
    MailboxComponent.prototype.resetAllMethod = function () {
        this.isMailContainerShow = 'none';
        this.deleteMails();
    };
    MailboxComponent.prototype.deleteMails = function () {
        var _this = this;
        this.protectedService.deleteMails(this.mailboxId).
            subscribe(function (success) {
            _this.getMails(_this.mailPageCount, _this.mailPageSize);
            _this.mailboxId = [];
            _this.toastr.error(_this.translate.instant('mailbox.success.deletesuccess_multi'), '');
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('mailbox.err.failtodelete'), '');
        });
    };
    return MailboxComponent;
}());
MailboxComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-mailbox',
        template: __webpack_require__("../../../../../src/app/mailbox/mailbox.component.html"),
        styles: [__webpack_require__("../../../../../src/app/mailbox/mailbox.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_protected_service__["a" /* ProtectedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_protected_service__["a" /* ProtectedService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6__dialogs_dialogs_service__["a" /* DialogsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__dialogs_dialogs_service__["a" /* DialogsService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ngx_toastr__["b" /* ToastrService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ngx_toastr__["b" /* ToastrService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__common_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__common_shared_service__["a" /* SharedService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */]) === "function" && _f || Object])
], MailboxComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=mailbox.component.js.map

/***/ }),

/***/ "../../../../../src/app/message/confirm.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".confirmbox{\r\n    top: 25%;\r\n    position: fixed;\r\n}\r\n\r\n.headerIcon {\r\n    width: 100%;\r\n    background-color: #1ebebc;\r\n    text-align: center;\r\n    padding: 5px;\r\n}\r\n\r\n.modal-title{\r\n    font-size: 45px;\r\n}\r\n/* .formMsgPopout {\r\n    top: 25%;\r\n    padding-bottom: 10px;\r\n    width: 35%;\r\n    z-index: 9999;\r\n    left: 50%;\r\n    text-align: center;\r\n    transform: translate(-50%, 0px);\r\n    position: fixed;\r\n    background: white;\r\n} */\r\n\r\n.modal-body{\r\n    background-color:whitesmoke;\r\n    text-align: center;\r\n    color: black;\r\n}\r\n\r\n.btn-popout {\r\n    color: #1ebebc;\r\n    background-color: white;\r\n    border: 2px solid #1ebebc;\r\n    margin-bottom: 10px;\r\n    width: 9em;\r\n    margin-right: 5px;\r\n}\r\n\r\n.btn:hover{\r\n    background-color: #1ebebc;\r\n    color:white;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/message/confirm.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<div *ngIf=\"ErrorMessageIsVisible ==  false\" class=\"modal fade hide in danger confirmbox formMsgPopout\" id=\"myModal\" role=\"dialog\">\r\n    <div class=\"modal-dialog\">\r\n\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header headerIcon\" style=\"background-color: rgb(0, 189, 187);\">\r\n                <!-- <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button> -->\r\n                <h4 class=\"modal-title\"><i class=\"fa fa-warning\"></i></h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <p>{{'feedback.msg' | translate }}</p>\r\n                <button type=\"button\" class=\"btn btn-popout btn-md btn-outline\" (click)=\"hideErrorMsg()\">Ya</button>\r\n                <button type=\"button\" class=\"btn btn-popout btn-md btn-outline\" (click)=\"hideErrorMsg()\">Tidak</button>\r\n            </div>  \r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/message/confirm.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ConfirmComponent = (function () {
    function ConfirmComponent() {
    }
    ConfirmComponent.prototype.ngOnInit = function () {
        this.ErrorMessageIsVisible = false;
        // this.show = this.showMsg.ErrorMessageIsVisible;
    };
    ConfirmComponent.prototype.showErrorMessage = function () {
        this.ErrorMessageIsVisible = true;
        console.log(this.ErrorMessageIsVisible);
        // this.ErrorMsg = msg;
        // this.ErrorMessageIsVisible = true;
    };
    ConfirmComponent.prototype.hideErrorMsg = function () {
        this.ErrorMessageIsVisible = false;
        console.log(this.ErrorMessageIsVisible);
    };
    return ConfirmComponent;
}());
ConfirmComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-confirm',
        template: __webpack_require__("../../../../../src/app/message/confirm.component.html"),
        styles: [__webpack_require__("../../../../../src/app/message/confirm.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ConfirmComponent);

//# sourceMappingURL=confirm.component.js.map

/***/ }),

/***/ "../../../../../src/app/poll/poll.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "       .row{\r\n           margin-left:0px;\r\n           margin-right: 0px;\r\n       }\r\n\r\n        .poll_radio_btn {\r\n            display: inline-block;\r\n            padding: 5px 30px;\r\n            background: #fff;\r\n            border: 1px solid #1ebebc;\r\n            width: 100%;\r\n        }\r\n\r\n        .padding {\r\n            padding: 20px;\r\n        }\r\n\r\n        .btn-secondary:hover {\r\n            color: #fff;\r\n            background-color: #666666;\r\n            border-color: #666666;\r\n        }\r\n\r\n        .customUnderLine {\r\n            margin-top: 35px;\r\n            margin-bottom: 0%;\r\n            border: 0;\r\n            border-top: 2px solid #1ebebc;\r\n            width: 15%;\r\n            right: 42%;\r\n            position: absolute;\r\n        }\r\n\r\n        input{\r\n              cursor: pointer;\r\n        }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/poll/poll.component.html":
/***/ (function(module, exports) {

module.exports = " <div class=\"container\">\r\n<div class=\"row poll container\" id=\"div_poll\">\r\n    <div class=\"col-md-12\">\r\n        <div id=\"polls_result_on_submit\" style=\"padding-bottom: 30px;\">\r\n        </div>\r\n        <div class=\"text-center\" id=\"polls_result\">\r\n            <h2 class=\"font-size-l warna_title_color\" style=\"font-family: Roboto; color: rgb(0, 189, 187);\" [style.color]=\"getTheme()\"><b>{{pollDataTitle}}</b>\r\n                <span class=\"customUnderLine warna_border_color\" style=\"border-color: rgb(0, 189, 187);\"  [style.border-color]=\"getTheme()\"></span>\r\n            </h2>\r\n            <h4 class=\"font-size-m warna_font\" style=\"margin-top: 2%; text-align: center; font-family: Roboto; color: rgb(51, 51, 51);\">{{pollDataQuestion}}</h4>\r\n            <div class=\"row padding\">\r\n                <div class=\"col-md-4 polls_padding\"  *ngFor=\"let item of pollDataAnswer\">\r\n                    <div class=\"custom-radio poll_radio_btn warna_border_color\" style=\"border-color: rgb(0, 189, 187);\" [style.border-color]=\"getTheme()\">\r\n                        <input type=\"radio\" name=\"undian\" id=\"radio1\" onclick=\"\">\r\n                        <label class=\"font-size-s warna_font\" for=\"radio1\" onclick=\"document.getElementById('radio1').onclick();\" style=\"cursor: pointer; font-family: Roboto; color: rgb(51, 51, 51);\"><span></span>{{item.answer}}</label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row padding\">\r\n                <h4 class=\"font-size-m warna_font\" style=\"margin-top: 2%; text-align: center; font-family: Roboto; color: rgb(51, 51, 51);\">{{pollDataComment}}</h4>\r\n                <div class=\"col-md-3\"></div>\r\n                <div class=\"col-md-6\">\r\n                    <label for=\"comment\" class=\"sr-only\">Comment</label>\r\n                    <textarea class=\"col-md-12\" style=\"height:50px;\" id=\"comment\"></textarea>\r\n                </div>\r\n                <div class=\"col-md-3\"></div>\r\n            </div>\r\n            <input type=\"hidden\" name=\"csrfmiddlewaretoken\" value=\"OHddydhq179vB8WObdhVsshzzi7mkJUOHTfRPKGPvEjgAb0mk0N3HVk1r0jlLO8f\">\r\n            <div class=\"row padding\">\r\n                <div id=\"polls_message\" class=\"col-md-4 col-md-offset-4\" style=\"padding-bottom: 0px; margin-top: -20px; color:red; font-weight: bold;\"></div>\r\n                <div class=\"col-md-4 col-md-offset-4\">\r\n                    <button id=\"submit\" type=\"submit\" class=\"btn btn-secondary btn-md font-size-s warna_bg\" style=\"padding: 10px 20px; font-family: Roboto; background-color: rgb(0, 189, 187);\"  [style.background-color]=\"getTheme()\"> {{'home.send' | translate}}</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/poll/poll.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PollComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var PollComponent = (function () {
    function PollComponent(translate, http, config) {
        var _this = this;
        this.translate = translate;
        this.http = http;
        this.config = config;
        this.lang = 'en';
        this.filter = false;
        this.pollUrl = this.config.urlPoll;
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                _this.lang = 'en';
                _this.getData(_this.lang);
            }
            if (myLang == 'ms') {
                _this.lang = 'ms';
                _this.getData(_this.lang);
            }
        });
    }
    PollComponent.prototype.ngOnInit = function () {
        this.getData(this.lang);
    };
    PollComponent.prototype.getData = function (lang) {
        var _this = this;
        return this.http.get(this.pollUrl + '-' + lang + '.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (eventData) {
            _this.pollDataTitle = eventData[0].title;
            _this.pollDataQuestion = eventData[0].question;
            _this.pollDataAnswer = eventData[0].answer;
            _this.pollDataComment = eventData[0].comment;
        });
    };
    PollComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    return PollComponent;
}());
PollComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-poll',
        template: __webpack_require__("../../../../../src/app/poll/poll.component.html"),
        styles: [__webpack_require__("../../../../../src/app/poll/poll.component.css")]
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */]) === "function" && _c || Object])
], PollComponent);

var _a, _b, _c;
//# sourceMappingURL=poll.component.js.map

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\ninput, .form-group {\r\n    color: #000;\r\n}\r\n\r\n\r\nem{\r\n      float:right; color: #000; padding-left:10px;\r\n  }\r\n/* .error input { background-color: #E3C3C5; }\r\n.error ::-webkit-input-placeholder { color: #999; }\r\n.error ::-moz-placeholder { color: #999; }\r\n.error :-moz-placeholder { color: #999; } \r\n.error :-ms-input-placeholder { color: #999; }  */\r\n\r\n\r\ninput[type=number]::-webkit-inner-spin-button:disabled, \r\ninput[type=number]::-webkit-outer-spin-button:disabled { \r\n  -webkit-appearance: none; \r\nmargin: 0; \r\n}\r\n\r\n/* input[type=text]::-webkit-input-placeholder,\r\ninput[type=text]::-moz-placeholder {\r\n  color: rgba(0,0,0,.42);\r\n} */\r\n\r\n.example-full-width {\r\nwidth: 100%;\r\n}\r\n\r\nbutton:disabled{\r\n  background: #a3a3a3\r\n}\r\n.staticLabel{\r\n  text-transform: capitalize;\r\n}\r\nul{\r\n  list-style:none;\r\n}\r\n\r\n.d-inline-block {\r\n  display: inline-block!important;\r\n}\r\n\r\n.mat-form-field {\r\n  color: rgb(255, 0, 0);\r\n}\r\n\r\n.list-inline{\r\n\tmargin-top: 25px;\r\n}\r\n\r\n.list-inline li a:hover{\r\n\ttext-decoration:none;\r\n\tcolor:#333;\r\n}\r\n\r\n.editBtn{\r\n  position: absolute;\r\n  right: 0px;\r\n  top:-20px;\r\n}\r\n\r\n.editBtn-active {\r\n  position: absolute;\r\n  background-color: rgb(109, 185, 38);\r\n  color: #FFF;\r\n  right: 0px;\r\n  top:-20px;\r\n}\r\n\r\n.formbg{    \r\n  border: 1px solid #dedede;\r\n  border-radius: 5px;\r\n  background: #fff;\r\n  background-color: #eeeeee;\t\r\n  color: #000;\r\n  padding: 13px 10px;\r\n  margin-top: 0px;\r\n  margin-bottom: 5%;\r\n  box-shadow: #eeeeee 0px 0px 10px 0px;\r\n}\r\n\r\n.formbg label{\r\n  color : rgb(0, 0, 0);\r\n  /* rgb(179, 179, 179); */\r\n  font-size: 13px;\r\n  font-weight: bold;\r\n}\r\n\r\n.mat-select-disabled, .mat-select-required {\r\n  color: red;\r\n}\r\n\r\n.copy-permaddress {\r\n  padding-left: 5px;\r\n  font-size: 12px;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid animated slideInDown\" style=\"background: #a7a495;\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <h1 style=\"margin-top: 10px;\" class=\"font-size-l\">{{'home.breadcrumb.profile' | translate}}</h1>\r\n        <hr class=\"hr-custom2\">\r\n        <ul class=\"list-inline\" style=\"clear:both;\">\r\n          <li>\r\n            <a class=\"font-size-s\" href=\"/index/\">\r\n                      {{'home.menu.home' | translate }}\r\n                  </a>\r\n          </li>\r\n          <li>/</li>\r\n          <li>\r\n            {{'home.breadcrumb.profile' | translate}}\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"container\">\r\n  <div class=\"col-md-12\">&nbsp;</div>\r\n  <div class=\"col-md-3 padding-left-0\">\r\n      <gosg-sidenav-dashboard></gosg-sidenav-dashboard>\r\n  </div>\r\n  <div class=\"col-md-9 formbg\">\r\n      <span class=\"pull-right editBtn\">\r\n        <button type=\"button\" mat-fab color=\"warn\" (click)=\"edit()\" [ngClass]=\"{ 'editBtn-active': isActive, 'editBtn': !isActive  }\">&nbsp;<i class=\"fa fa-edit font-size-l\"></i></button>\r\n      </span>\r\n      <!-- <p>Status(isActive): {{isActive}}</p> -->\r\n      <!-- <p>Status(isRegLocal): {{isRegLocal}}</p> -->\r\n      <!-- <p>Status(isLocal): {{isLocal}}</p>\r\n      <p>Status(isCorrsLocal): {{isCorrsLocal}}</p> -->\r\n      \r\n      <form [formGroup]=\"profileForm\" autocomplete=\"off\" (ngSubmit)=\"updateProfile(profileForm.value)\" role=\"form\" novalidate>\r\n          <div class=\"col-md-12\">\r\n            <input type=\"hidden\" value=\"\" class=\"rand_no\" name=\"rand_no\" id=\"rand_no\">\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-md-4\">\r\n                <label class=\"font-size-m\" for=\"fullname\">{{'profile.label.name' | translate}}</label>\r\n                <div class=\"staticLabel font-size-m boldText\" for=\"fullname\">{{ fullname }}</div>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <label class=\"font-size-m\" for=\"nationality\">{{'profile.label.nationality' | translate}}</label>\r\n                <div class=\"staticLabel font-size-m boldText\" for=\"nationality\">{{countryName?.country.countryName}}</div>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <label *ngIf=\"isRegLocal\" class=\"font-size-s\" for=\"icnumber\">{{'profile.label.icnumber' | translate}}</label>\r\n                <label *ngIf=\"!isRegLocal\" class=\"font-size-s\" for=\"icnumber\">{{'profile.label.passport' | translate}}</label>\r\n                <div class=\"staticLabel font-size-m boldText\" for=\"icnumber\">{{ idno }}</div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-md-4\">\r\n                <label class=\"font-size-m\" for=\"dob\">{{'profile.label.dateofbirth' | translate}}</label>\r\n                  <mat-form-field class=\"example-full-width font-size-m\" style=\"margin-top: -25px\">\r\n                    <div style=\"color:#333;\" class=\"font-size-m boldText\">{{dt | date:'dd/MM/yyyy' }}</div>\r\n                    <input placeholder=\"{{ dateFormatExample }}\" style=\"display: none\" matInput formControlName=\"dob\" #dob [matDatepicker]=\"dob\" (dateInput)=\"addEvent('input', $event)\" (dateChange)=\"addEvent('change', $event)\" [max]=\"maxDate\"  />\r\n                    <mat-datepicker-toggle matSuffix [for]=\"dob\" style=\"color:#333;\"></mat-datepicker-toggle>\r\n                    <mat-datepicker [disabled]=\"initial\" #dob></mat-datepicker>\r\n                  </mat-form-field>\r\n                  \r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <label class=\"font-size-m\" for=\"email\">{{'profile.label.email' | translate}}</label>\r\n                <div>\r\n                  <div class=\"font-size-m boldText\" for=\"email\">{{ regemail }}</div>\r\n                </div>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <label class=\"font-size-l\" for=\"regdate\">{{'profile.label.regisdate' | translate}}</label>\r\n                <br />\r\n                <div class=\"font-size-m boldText\" for=\"regdate\">{{ regdate | date:'dd/MM/yyyy' }}</div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <mat-select tabindex=\"1\" formControlName=\"gender\" placeholder=\"{{'profile.label.gender' | translate}}\" required>\r\n                      <mat-option *ngFor=\"let gender of genderData\" [value]=\"gender?.genderId\">{{ gender?.gender | translate }}</mat-option>\r\n                  </mat-select>\r\n                  <mat-error *ngIf=\"!validateCtrlChk(gender) && profileForm.controls.gender.errors.required\">\r\n                      {{'profile.err.gender' | translate }}\r\n                  </mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <mat-select *ngIf=\"!this.isOtherRace\" formControlName=\"race\" placeholder=\"{{'profile.label.race' | translate}}\">\r\n                      <mat-option *ngFor=\"let race of getRaceData\" [value]=\"race?.raceId\">{{race?.race}}</mat-option>\r\n                  </mat-select>\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <mat-select formControlName=\"religion\" placeholder=\"{{'profile.label.religion' | translate}}\">\r\n                      <mat-option *ngFor=\"let religion of getReligionData\" [value]=\"religion?.religionId\">{{religion?.religion}}</mat-option>\r\n                  </mat-select>\r\n                </mat-form-field>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-lg-12\" style=\"padding-top:15px;\">\r\n                <label class=\"font-size-s\" for=\"perAddress1\">{{'profile.label.peraddr' | translate}}</label>\r\n              </div>\r\n              <div class=\"form-group col-lg-12\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input matInput formControlName=\"perAddress1\" required type=\"text\" maxlength=\"30\" placeholder=\"{{ 'profile.label.peraddr' | translate }} 1\"\r\n                  />\r\n                  <mat-error *ngIf=\"!validateCtrlChk(perAddress1) && profileForm.controls.perAddress1.errors.required\">\r\n                      {{'profile.err.perAddress1' | translate }}\r\n                  </mat-error>\r\n                </mat-form-field>\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input matInput formControlName=\"perAddress2\" type=\"text\" maxlength=\"30\" placeholder=\"{{ 'profile.label.peraddr' | translate }} 2\"\r\n                  />\r\n                </mat-form-field>\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input matInput formControlName=\"perAddress3\" id=\"perAddress3\" type=\"text\" maxlength=\"30\" placeholder=\"{{ 'profile.label.peraddr' | translate }} 3\"\r\n                  />\r\n                </mat-form-field>\r\n              </div>\r\n            </div>\r\n      \r\n            <div class=\"row\">\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <mat-select formControlName=\"perCountry\" (change)=\"isMalaysian($event.value)\" placeholder=\"{{'profile.label.country' | translate}}\" required>\r\n                    <mat-option *ngFor=\"let country of countries\" [value]=\"country?.countryCode\">{{country?.countryName}}</mat-option>\r\n                  </mat-select>\r\n                  <mat-error *ngIf=\"!validateCtrlChk(perCountry) && profileForm.controls.perCountry.errors.required\">\r\n                      {{'profile.err.country' | translate }}\r\n                  </mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field *ngIf=\"isLocal\" class=\"example-full-width font-size-s\">\r\n                  <mat-select *ngIf=\"isLocal\" (change)=\"getCitiesByState($event)\" formControlName=\"perStateLocal\" placeholder=\"{{'profile.label.state' | translate}}\"  required=\"true ? isLocal : false\">\r\n                    <mat-option *ngFor=\"let state of getStateData\" [value]=\"state?.stateId\">{{ state?.stateName }}</mat-option>\r\n                  </mat-select>\r\n                  <!-- <mat-error *ngIf=\"!validateCtrlChk(perStateLocal) && profileForm.controls.perStateLocal.errors.required\">\r\n                    {{'profile.err.state' | translate }}\r\n                </mat-error> -->\r\n                </mat-form-field>\r\n                <mat-form-field *ngIf=\"!isLocal\" class=\"example-full-width font-size-s\">\r\n                  <input *ngIf=\"!isLocal\" (keyup)=\"isChanged()\" matInput formControlName=\"perStateNotLocal\" type=\"text\" placeholder=\"{{'profile.label.state' | translate}}\" required=\"true ? !isLocal : false\" />\r\n                  <!-- <mat-error *ngIf=\"!isLocal\" *ngIf=\"!validateCtrlChk(perStateNotLocal) && profileForm.controls.perStateNotLocal.errors.required\">\r\n                      {{'profile.err.state' | translate }}\r\n                  </mat-error> -->\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field *ngIf=\"isLocal\" class=\"example-full-width font-size-s\">\r\n                  <mat-select (change)=\"isChanged()\" formControlName=\"perCityLocal\" placeholder=\"{{'profile.label.city' | translate}}\" required=\"true ? isLocal : false\" >\r\n                    <mat-option *ngFor=\"let city of getPerCityData\" [value]=\"city?.cityId\">{{ city?.cityName }}</mat-option>\r\n                  </mat-select>\r\n                  <mat-error *ngIf=\"!validateCtrlChk(perCityLocal) && profileForm.controls.perCityLocal.errors.required\">\r\n                    {{'profile.err.city' | translate }}\r\n                </mat-error>\r\n                </mat-form-field>\r\n                <mat-form-field *ngIf=\"!isLocal\" class=\"example-full-width font-size-s\">\r\n                  <input (keyup)=\"isChanged()\" matInput formControlName=\"perCityNotLocal\" type=\"text\" placeholder=\"{{'profile.label.city' | translate}}\"  required=\"true ? !isLocal : false\" />\r\n                  <mat-error *ngIf=\"!validateCtrlChk(perCityNotLocal) && profileForm.controls.perCityNotLocal.errors.required\">\r\n                      {{'profile.err.city' | translate }}\r\n                  </mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\" placeholder=\"{{'profile.label.postcode' | translate}}\">\r\n                  <input matInput [textMask]=\"{mask: maskPostcode}\" (keyup)=\"isChanged()\" #perPost formControlName=\"perPostcode\" id=\"perPostcode\" type=\"text\"\r\n                    placeholder=\"Postcode\" required />\r\n                  <mat-error *ngIf=\"!validateCtrlChk(perPostcode) && profileForm.controls.perPostcode.errors.required\">\r\n                      {{'profile.err.postcode' | translate }}\r\n                  </mat-error>\r\n                  <mat-error *ngIf=\"!validateCtrlChk(perPostcode) && profileForm.controls.perPostcode.errors.pattern\">\r\n                    {{'profile.pattern.postcode' | translate }}\r\n                  </mat-error>\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input matInput formControlName=\"perTelephone\" (keyup)=\"isChanged()\" [textMask]=\"{mask: maskForeigner}\" id=\"perTelephone\" type=\"text\"\r\n                    placeholder=\"{{'profile.label.homeph' | translate}}\" />\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-lg-12\" style=\"padding-top:15px;\">\r\n                <label class=\"font-size-s\" for=\"corrsAddress1\">{{'profile.label.corrsaddr' | translate }}&nbsp;&nbsp;&nbsp;&nbsp;</label>\r\n                <mat-checkbox formControlName=\"checkboxValue\" (change)=\"isChecked($event)\"></mat-checkbox><span class=\"copy-permaddress\">{{'profile.label.copyperaddr' | translate }}</span>\r\n              </div>\r\n              <div class=\"form-group col-md-12\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input (keyup)=\"isChanged()\" matInput formControlName=\"corrsAddress1\" type=\"text\" maxlength=\"30\" placeholder=\"{{'profile.label.corrsaddr' | translate}} 1\"\r\n                  />\r\n                </mat-form-field>\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input (keyup)=\"isChanged()\" matInput formControlName=\"corrsAddress2\" type=\"text\" maxlength=\"30\" placeholder=\"{{'profile.label.corrsaddr' | translate}} 2\"\r\n                  />\r\n                </mat-form-field>\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input (keyup)=\"isChanged()\" matInput formControlName=\"corrsAddress3\" type=\"text\" maxlength=\"30\" placeholder=\"{{'profile.label.corrsaddr' | translate}} 3\"\r\n                  />\r\n                </mat-form-field>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <mat-select (change)=\"isMalaysianChk($event.value)\" formControlName=\"corrsCountry\" placeholder=\"{{'profile.label.country' | translate}}\">\r\n                      <mat-option *ngFor=\"let country of countries\" [value]=\"country.countryCode\">{{country.countryName}}</mat-option>\r\n                  </mat-select>\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field *ngIf=\"isCorrsLocal\" class=\"example-full-width font-size-s\">\r\n                  <mat-select (change)=\"getCitiesByState($event)\" formControlName=\"corrsState\" placeholder=\"{{'profile.label.state' | translate}}\">\r\n                    <mat-option *ngFor=\"let state of getStateData\" [value]=\"state?.stateId\">{{ state?.stateName }}</mat-option>\r\n                  </mat-select>\r\n                </mat-form-field>\r\n                <mat-form-field *ngIf=\"!isCorrsLocal\" class=\"example-full-width font-size-s\">\r\n                  <input (change)=\"isChanged()\" matInput formControlName=\"corrsState\" type=\"text\" placeholder=\"{{'profile.label.state' | translate}}\" />\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field *ngIf=\"isCorrsLocal\" class=\"example-full-width font-size-s\">\r\n                  <mat-select (change)=\"isChanged()\" formControlName=\"corrsCity\" placeholder=\"{{'profile.label.city' | translate}}\">\r\n                      <mat-option *ngFor=\"let city of getCorrsCityData\" [value]=\"city?.cityId\">{{ city?.cityName }}</mat-option>\r\n                  </mat-select>\r\n                </mat-form-field>\r\n                <mat-form-field *ngIf=\"!isCorrsLocal\" class=\"example-full-width font-size-s\">\r\n                  <input (change)=\"isChanged()\" matInput formControlName=\"corrsCity\" type=\"text\" placeholder=\"{{'profile.label.city' | translate}}\" />\r\n                </mat-form-field>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input matInput (keyup)=\"isChanged()\" #corsPost formControlName=\"corrsPostcode\" [textMask]=\"{mask: maskPostcode}\" type=\"text\"\r\n                    placeholder=\"{{'profile.label.postcode' | translate}}\" />\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input matInput (keyup)=\"isChanged()\" #corshomephone formControlName=\"corrsTelephone\" [textMask]=\"{mask: maskForeigner}\"\r\n                    type=\"text\" placeholder=\"{{'profile.label.homeph' | translate}}\" />\r\n                </mat-form-field>\r\n              </div>\r\n              <div class=\"form-group col-md-4\">\r\n                <mat-form-field class=\"example-full-width font-size-s\">\r\n                  <input matInput (keyup)=\"isChanged()\" #corsmobile formControlName=\"corrsMobile\" [textMask]=\"{mask: maskForeigner}\" type=\"text\"\r\n                    placeholder=\"{{'profile.label.mobile' | translate}}\" value=\"{{ mobileNo }}\" />\r\n                </mat-form-field>\r\n              </div>\r\n            </div>\r\n            <div class=\"form-group\" style=\"float: right;\">\r\n\r\n                <!-- <button mat-raised-button color=\"warn\" type=\"button\" id=\"btnreset\" class=\"form-control btn btn-md btn-warning font-size-s\"\r\n                style=\"width: 115px; font-family: Roboto;\" (click)=\"showResetMsg()\">\r\n                <i class=\"fa fa-refresh\"></i> {{'feedback.label.reset' | translate }}</button> -->\r\n                <button mat-raised-button type=\"button\" color=\"primary\" id=\"btnsubmit\" class=\"form-control btn btn-md btn-success font-size-s\"\r\n                (click)=\"updateProfile(profileForm.value);false\" style=\"width: 100px; font-family: Roboto; margin-left: 5px;\" [disabled]=\"profileForm.invalid || initial\">\r\n                <i class=\"fa fa-check\"></i> {{'profile.label.submit' | translate }}</button>\r\n            </div>\r\n          </div>\r\n        \r\n        </form>\r\n  </div>\r\n  \r\n</div>"

/***/ }),

/***/ "../../../../../src/app/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_shared_service__ = __webpack_require__("../../../../../src/app/common/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_validate_service__ = __webpack_require__("../../../../../src/app/common/validate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_protected_service__ = __webpack_require__("../../../../../src/app/services/protected.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_text_mask__ = __webpack_require__("../../../../angular2-text-mask/dist/angular2TextMask.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular2_text_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_angular2_text_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_toastr__ = __webpack_require__("../../../../ngx-toastr/toastr.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









// import { SlicePipe } from '@angular/common/src/pipes';
// import { ControlBase } from '../common/controlbase'
var ProfileComponent = (function () {
    // private myDatePickerOptions: IMyDpOptions = {
    //       // other options...
    //       // Initialized to specific date (09/10/2018).
    //       dateFormat: 'dd/mm/yyyy',
    // };
    function ProfileComponent(router, textMask, validateService, protectedService, sharedService, translate, elementRef, activatedRoute, toastr) {
        var _this = this;
        this.router = router;
        this.validateService = validateService;
        this.protectedService = protectedService;
        this.sharedService = sharedService;
        this.translate = translate;
        this.elementRef = elementRef;
        this.activatedRoute = activatedRoute;
        this.toastr = toastr;
        this.events = [];
        this.initial = true;
        this.isActive = false;
        this.date = new Date();
        this.lang = this.lang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                });
            }
            _this.getRace();
            _this.getReligion();
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.date = new Date();
        this.getRace();
        this.getGenderVal();
        this.getReligion();
        this.maskForeigner = this.validateService.getMask().telephonef;
        this.maskPostcode = this.validateService.getMask().postcode;
        this.maskDateFormat = this.validateService.getMask().dateFormat;
        this.getUserProfile();
        this.getCountry();
        this.dob = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.gender = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.race = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.religion = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perAddress1 = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perAddress2 = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perAddress3 = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perCountry = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perStateLocal = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perStateNotLocal = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perCityLocal = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perCityNotLocal = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perPostcode = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.perTelephone = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.corrsAddress1 = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.corrsAddress2 = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.corrsAddress3 = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.corrsCountry = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.corrsState = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.checkboxValue = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.corrsCity = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.corrsPostcode = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.corrsTelephone = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.corrsMobile = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"]();
        this.profileForm = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({
            dob: this.dob,
            gender: this.gender,
            race: this.race,
            religion: this.religion,
            perAddress1: this.perAddress1,
            perAddress2: this.perAddress2,
            perAddress3: this.perAddress3,
            perCountry: this.perCountry,
            perStateLocal: this.perStateLocal,
            perStateNotLocal: this.perStateNotLocal,
            perCityLocal: this.perCityLocal,
            perCityNotLocal: this.perCityNotLocal,
            perPostcode: this.perPostcode,
            perTelephone: this.perTelephone,
            corrsAddress1: this.corrsAddress1,
            corrsAddress2: this.corrsAddress2,
            corrsAddress3: this.corrsAddress3,
            corrsCountry: this.corrsCountry,
            corrsState: this.corrsState,
            checkboxValue: this.checkboxValue,
            corrsCity: this.corrsCity,
            corrsPostcode: this.corrsPostcode,
            corrsTelephone: this.corrsTelephone,
            corrsMobile: this.corrsMobile,
        });
        this.profileForm.disable();
    };
    ProfileComponent.prototype.getUserProfile = function () {
        var _this = this;
        var getUsrID = localStorage.getItem('usrID');
        var getUsrNationality = localStorage.getItem('userNationality');
        // console.log(getUsrNationality);
        // debugger;
        this.protectedService.getProfile(getUsrID).subscribe(function (data) {
            console.log(data);
            _this.fullname = data[0].fullname;
            _this.countryCode = data[0].permanent_country;
            _this.isMalaysian(_this.countryCode);
            _this.isMalaysianChk(data[0].corresponding_country);
            _this.getCountryByCode(getUsrNationality);
            _this.isUserRegLocal(getUsrNationality);
            _this.idno = data[0].ic_number;
            if (_this.isRegLocal == true)
                _this.maxDate = _this.getMinDobDate(_this.idno);
            _this.regemail = data[0].email;
            _this.regdate = data[0].date_joined;
            _this.mobileNo = data[0].mobile_phone;
            _this.profileForm.get('gender').setValue(data[0].gender);
            // this.profileForm.get('dob').setValue(data[0].dob);
            _this.profileForm.get('race').setValue(data[0].race);
            _this.profileForm.get('religion').setValue(data[0].religion);
            _this.profileForm.get('perAddress1').setValue(data[0].permanent_address1);
            _this.profileForm.get('perAddress2').setValue(data[0].permanent_address2);
            _this.profileForm.get('perAddress3').setValue(data[0].permanent_address3);
            _this.selectedCountry = data[0].permanent_country;
            _this.profileForm.get('perCountry').setValue(_this.selectedCountry);
            _this.profileForm.get('perPostcode').setValue(data[0].permanent_postcode);
            _this.profileForm.get('perTelephone').setValue(data[0].permanent_home_phone);
            if (data[0].permanent_state != null) {
                if (data[0].permanent_country == "MY") {
                    _this.getCitiesByStateP(data[0].permanent_state);
                    _this.profileForm.get('perStateLocal').setValue(data[0].permanent_state);
                    _this.selectedState = _this.profileForm.get('perStateLocal').value;
                    _this.profileForm.get('perCityLocal').setValue(data[0].permanent_city);
                    _this.selectedCity = _this.profileForm.get('perCityLocal').value;
                }
                else {
                    _this.profileForm.get('perStateNotLocal').setValue(data[0].permanent_state);
                    _this.selectedState = _this.profileForm.get('perStateNotLocal').value;
                    _this.profileForm.get('perCityNotLocal').setValue(data[0].permanent_city);
                    _this.selectedCity = _this.profileForm.get('perCityNotLocal').value;
                }
            }
            if (data[0].same_address != true) {
                _this.profileForm.get('corrsAddress1').setValue(data[0].corresponding_address1);
                _this.profileForm.get('corrsAddress2').setValue(data[0].corresponding_address2);
                _this.profileForm.get('corrsAddress3').setValue(data[0].corresponding_address3);
                _this.profileForm.get('corrsCountry').setValue(data[0].corresponding_country);
                _this.profileForm.get('corrsCity').setValue(data[0].corresponding_city);
                if (_this.isCorrsLocal)
                    _this.getCitiesByStateC(data[0].corresponding_state);
                _this.profileForm.get('corrsState').setValue(data[0].corresponding_state);
                _this.profileForm.get('corrsPostcode').setValue(data[0].corresponding_postcode);
                _this.profileForm.get('corrsMobile').setValue(data[0].mobile_phone);
                _this.profileForm.get('corrsTelephone').setValue(data[0].corresponding_home_phone);
            }
            else {
                _this.profileForm.get('checkboxValue').setValue(data[0].same_address);
                _this.profileForm.get('corrsTelephone').setValue(data[0].permanent_home_phone);
                _this.profileForm.get('corrsAddress1').setValue(data[0].permanent_address1);
                _this.profileForm.get('corrsAddress2').setValue(data[0].permanent_address2);
                _this.profileForm.get('corrsAddress3').setValue(data[0].permanent_address3);
                _this.profileForm.get('corrsCountry').setValue(data[0].permanent_country);
                _this.profileForm.get('corrsState').setValue(data[0].permanent_state);
                if (_this.isCorrsLocal)
                    _this.getCitiesByStateC(data[0].permanent_state);
                _this.profileForm.get('corrsCity').setValue(data[0].permanent_city);
                _this.profileForm.get('corrsPostcode').setValue(data[0].permanent_postcode);
                _this.profileForm.get('corrsMobile').setValue(data[0].mobile_phone);
            }
        }, function (error) {
            console.log(error);
        });
    };
    ProfileComponent.prototype.ngAfterViewInit = function () {
        this.maskForeigner = this.validateService.getMask().telephonef;
        this.maskPostcode = this.validateService.getMask().postcode;
        this.maskDateFormat = this.validateService.getMask().dateFormat;
    };
    ProfileComponent.prototype.isUserRegLocal = function (regCountry) {
        // console.log(regCountry);
        if (regCountry == "MY") {
            this.isRegLocal = true;
            this.dateFormatExample = " ";
        }
        else {
            this.isRegLocal = false;
            this.dateFormatExample = "dd/mm/yyyy";
        }
    };
    ProfileComponent.prototype.isMalaysian = function (val) {
        this.selectedCountry = val;
        // this.profileForm.get('perCountry').setValue(this.selectedCountry);
        this.isChanged();
        if (val == "MY") {
            this.isLocal = true;
            this.addLocalCtrl();
            // this.profileForm.get('perStateLocal').setValue("");
            // this.profileForm.get('perCityLocal').setValue("");
            // this.toastr.info(this.translate.instant('this.isLocal: '+this.isLocal), '');
            this.getState();
        }
        else {
            this.isLocal = false;
            this.RemoveLocalCtrl();
            // this.profileForm.get('perStateNotLocal').setValue("");
            // this.profileForm.get('perCityNotLocal').setValue("");
        }
    };
    ProfileComponent.prototype.isMalaysianChk = function (val) {
        // console.log(val);
        this.isChanged();
        if (val == "MY") {
            this.getState();
            this.isCorrsLocal = true;
        }
        else {
            this.isCorrsLocal = false;
            this.profileForm.get('corrsState').setValue("");
            this.profileForm.get('corrsCity').setValue("");
        }
        this.checkReqValues();
        // this.toastr.info(this.translate.instant('this.isCorrsLocal: '+this.isCorrsLocal), ''); 
    };
    ProfileComponent.prototype.getMinDobDate = function (ic) {
        ic = ic.split("-");
        var century;
        var res;
        var display;
        var firstDigit = ic[0].slice(0, 1);
        var year = ic[0].slice(0, 2);
        var month = ic[0].slice(2, 4);
        var day = ic[0].slice(4, 6);
        if (firstDigit != "0")
            century = "19";
        else
            century = "20";
        res = new Date(year, month - 1, day);
        year = century + year;
        display = month + "/" + day + "/" + year;
        // console.log(display);
        if (this.isRegLocal == true) {
            this.profileForm.get('dob').setValue(new Date(year, month - 1, day));
            this.dt = new Date(display).getTime();
        }
        return res;
    };
    ProfileComponent.prototype.getGenderVal = function () {
        var _this = this;
        var langID = localStorage.getItem('langID');
        this.sharedService.getGender(langID)
            .subscribe(function (resGenderData) {
            _this.genderData = resGenderData;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('Server is down!'), '');
        });
    };
    ProfileComponent.prototype.getCountry = function () {
        var _this = this;
        return this.sharedService.getCountryData()
            .subscribe(function (resCountryData) {
            _this.countries = resCountryData;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('Server is down!'), '');
        });
    };
    ProfileComponent.prototype.getCountryByCode = function (cntyCode) {
        var _this = this;
        return this.sharedService.getCountrybyCode(cntyCode)
            .subscribe(function (resCountryData) {
            _this.countryName = resCountryData;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('Server is down!'), '');
        });
    };
    ProfileComponent.prototype.getCitiesByState = function (e) {
        var _this = this;
        this.isStateChanged();
        this.selectedState = e.value;
        return this.sharedService.getCitiesbyState(e.value)
            .subscribe(function (resCityData) {
            if (e.source.ngControl.name == "perStateLocal") {
                _this.getPerCityData = resCityData;
            }
            else {
                _this.getCorrsCityData = resCityData;
            }
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('Server is down!'), '');
        });
    };
    ProfileComponent.prototype.getCitiesByStateP = function (e) {
        var _this = this;
        if (e) {
            return this.sharedService.getCitiesbyState(e)
                .subscribe(function (resCityData) {
                _this.getPerCityData = resCityData;
            }, function (Error) {
                _this.toastr.error(_this.translate.instant('Server is down!'), '');
            });
        }
    };
    ProfileComponent.prototype.getCitiesByStateC = function (e) {
        var _this = this;
        if (e) {
            return this.sharedService.getCitiesbyState(e)
                .subscribe(function (resCityData) {
                _this.getCorrsCityData = resCityData;
            }, function (Error) {
                _this.toastr.error(_this.translate.instant('Server is down!'), '');
            });
        }
    };
    ProfileComponent.prototype.getCity = function (e) {
        this.selectedCity = e.value;
    };
    ProfileComponent.prototype.getState = function () {
        var _this = this;
        return this.sharedService.getStateData()
            .subscribe(function (resStateData) {
            _this.getStateData = resStateData;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('Server is down!'), '');
        });
    };
    ProfileComponent.prototype.getReligion = function () {
        var _this = this;
        return this.sharedService.getReligion(localStorage.getItem('langID'))
            .subscribe(function (religionData) {
            _this.getReligionData = religionData;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('Server is down!'), '');
        });
    };
    ProfileComponent.prototype.getRace = function () {
        var _this = this;
        return this.sharedService.getRace(localStorage.getItem('langID'))
            .subscribe(function (raceData) {
            _this.getRaceData = raceData;
        }, function (Error) {
            _this.toastr.error(_this.translate.instant('Server is down!'), '');
        });
    };
    ProfileComponent.prototype.validateFirstName = function (obj) {
        return obj.valid || obj.untouched;
    };
    ProfileComponent.prototype.validateCtrlChk = function (ctrl) {
        // return ctrl.valid || ctrl.untouched
        return this.validateService.validateCtrl(ctrl);
    };
    ProfileComponent.prototype.isChanged = function () {
        if (this.profileForm.get('checkboxValue').value == true)
            this.profileForm.get('checkboxValue').setValue(false);
        this.checkReqValues();
    };
    ProfileComponent.prototype.isStateChanged = function () {
        this.isChanged();
        this.checkReqValues();
    };
    ProfileComponent.prototype.isChecked = function (e) {
        if (e.checked) {
            this.isCorrsLocal = this.isLocal;
            this.profileForm.get('corrsAddress1').setValue(this.perAddress1.value);
            this.profileForm.get('corrsAddress2').setValue(this.perAddress2.value);
            this.profileForm.get('corrsAddress3').setValue(this.perAddress3.value);
            this.profileForm.get('corrsCountry').setValue(this.perCountry.value);
            this.profileForm.get('corrsState').setValue(this.perStateLocal.value);
            if (this.isLocal)
                this.getCitiesByStateC(this.perStateLocal.value);
            this.profileForm.get('corrsCity').setValue(this.perCityLocal.value);
            this.profileForm.get('corrsPostcode').setValue(this.perPostcode.value);
            this.profileForm.get('corrsTelephone').setValue(this.perTelephone.value);
            // this.isMalaysianChk(this.countryCode);
        }
        else {
            this.profileForm.get('corrsAddress1').setValue("");
            this.profileForm.get('corrsAddress2').setValue("");
            this.profileForm.get('corrsAddress3').setValue("");
            this.profileForm.get('corrsCountry').setValue("");
            this.profileForm.get('corrsState').setValue("");
            this.profileForm.get('corrsCity').setValue("");
            this.profileForm.get('corrsPostcode').setValue("");
            this.profileForm.get('corrsTelephone').setValue("");
        }
        console.log(e.checked);
        this.checkReqValues();
    };
    ProfileComponent.prototype.addLocalCtrl = function () {
        this.profileForm.addControl('perStateLocal', this.perStateLocal);
        this.profileForm.addControl('perCityLocal', this.perCityLocal);
        if (this.isActive && this.isLocal) {
            this.profileForm.get('perStateLocal').enable();
            this.profileForm.get('perCityLocal').enable();
        }
        this.profileForm.removeControl('perStateNotLocal');
        this.profileForm.removeControl('perCityNotLocal');
        // this.resetCitizenCtrl();
    };
    ProfileComponent.prototype.RemoveLocalCtrl = function () {
        this.profileForm.removeControl('perStateLocal');
        this.profileForm.removeControl('perCityLocal');
        this.profileForm.addControl('perStateNotLocal', this.perStateLocal);
        this.profileForm.addControl('perCityNotLocal', this.perCityLocal);
        if (this.isActive && !this.isLocal) {
            this.profileForm.get('perStateNotLocal').enable();
            this.profileForm.get('perCityNotLocal').enable();
        }
    };
    ProfileComponent.prototype.addEvent = function (type, event) {
        this.events = [];
        this.events.push("" + event.value);
        this.dt = new Date(this.events[0]).getTime();
        this.dateFormatExample = "";
        // console.log(this.dt)
    };
    ProfileComponent.prototype.edit = function () {
        // debugger
        this.isActive = !this.isActive;
        if (this.isActive != false) {
            console.log("edit enabled");
            console.log(this.selectedCountry + " | " + this.selectedState + " | " + this.selectedCity);
            this.toastr.info(this.translate.instant('profile.msg.editbtnE'), '');
            // this.initial = false
            this.profileForm.enable();
            this.dob.enable();
            this.checkReqValues();
        }
        else {
            console.log(this.profileForm.value);
            // this.toastr.info(this.translate.instant('profile.msg.editbtnD'), '');
            this.initial = true;
            this.profileForm.disable();
            this.dob.disable();
        }
    };
    ProfileComponent.prototype.checkReqValues = function () {
        var gdr = this.profileForm.get('gender').value;
        var pAdd1 = this.profileForm.get('perAddress1').value;
        var pCountry = this.profileForm.get('perCountry').value;
        var pPCode = this.profileForm.get('perPostcode').value;
        var pState;
        var pCity;
        if (this.isLocal) {
            pState = this.profileForm.get('perStateLocal').value;
            pCity = this.profileForm.get('perCityLocal').value;
        }
        else {
            pState = this.profileForm.get('perStateNotLocal').value;
            pCity = this.profileForm.get('perCityNotLocal').value;
        }
        var reqVal = [gdr, pAdd1, pCountry, pState, pCity, pPCode];
        // if(gdr != null && pAdd1 != null && pCountry != null && pCity != null && pState != 0 && pPCode != null) {
        if (pCountry !== null) {
            if (this.isActive)
                this.initial = false;
        }
        else {
            // this.toastr.error(this.translate.instant('Country error!'), '');
            this.initial = true;
        }
        // if(this.isActive)
        //   console.log(reqVal);
    };
    ProfileComponent.prototype.updateProfile = function (formValues) {
        var _this = this;
        var getUsrID = localStorage.getItem('usrID');
        var body = {
            "date_joined": null,
            "fullname": null,
            "ic_number": null,
            "email": null,
            "dob": null,
            "gender": null,
            "race": null,
            "religion": null,
            "permanent_address1": null,
            "permanent_address2": null,
            "permanent_address3": null,
            "permanent_postcode": null,
            "permanent_city": null,
            "permanent_state": null,
            "permanent_country": null,
            "permanent_home_phone": null,
            "same_address": null,
            "corresponding_address1": null,
            "corresponding_address2": null,
            "corresponding_address3": null,
            "corresponding_postcode": null,
            "corresponding_country": null,
            "corresponding_state": null,
            "corresponding_city": null,
            "corresponding_home_phone": null,
            "mobile_phone": null,
            "dateTime": null,
            "lang": null,
            "citizenType": null,
            "user_id": null
        };
        body.date_joined = this.regdate;
        body.fullname = this.fullname;
        body.ic_number = this.idno;
        body.email = this.regemail;
        body.dob = new Date(formValues.dob).getTime();
        body.race = formValues.race;
        body.gender = formValues.gender;
        body.religion = formValues.religion;
        body.permanent_address1 = formValues.perAddress1;
        body.permanent_address2 = formValues.perAddress2;
        body.permanent_address3 = formValues.perAddress3;
        body.permanent_postcode = formValues.perPostcode;
        body.permanent_country = formValues.perCountry;
        if (this.isLocal) {
            body.permanent_state = formValues.perStateLocal;
            body.permanent_city = formValues.perCityLocal;
        }
        else {
            body.permanent_state = formValues.perStateNotLocal;
            body.permanent_city = formValues.perCityNotLocal;
        }
        body.permanent_home_phone = formValues.perTelephone;
        body.same_address = formValues.checkboxValue;
        body.corresponding_address1 = formValues.corrsAddress1;
        body.corresponding_address2 = formValues.corrsAddress2;
        body.corresponding_address3 = formValues.corrsAddress3;
        body.corresponding_country = formValues.corrsCountry;
        body.corresponding_state = formValues.corrsState;
        body.corresponding_city = formValues.corrsCity;
        body.corresponding_postcode = formValues.corrsPostcode;
        body.corresponding_home_phone = formValues.corrsTelephone;
        body.mobile_phone = formValues.corrsMobile;
        body.dateTime = new Date().getTime();
        body.user_id = localStorage.getItem('usrID');
        body.lang = localStorage.getItem("langID");
        this.checkReqValues();
        console.log(this.initial);
        console.log(this.profileForm.invalid);
        console.log(body);
        console.log(formValues);
        console.log(this.profileForm.value);
        this.protectedService.updateProfile(body)
            .subscribe(function (data) {
            _this.isActive = false;
            _this.initial = true;
            _this.profileForm.invalid;
            // this.toastr.success(this.translate.instant('profile.msg.updateSuccess'), '');
            _this.profileForm.disable();
        }, function (error) {
            _this.toastr.error(_this.translate.instant('profile.err.updateFail'), '');
        });
    };
    ProfileComponent.prototype.toFormGroup = function (data) {
        var group = {};
        data.forEach(function (itm) {
            group[itm.id] = itm.validation[0].required ? new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](itm.value || '', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required)
                : new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormControl"](itm.value || '');
        });
        return new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"](group);
    };
    return ProfileComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('perhomephone'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], ProfileComponent.prototype, "homephone", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('perPost'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], ProfileComponent.prototype, "perPost", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('corsPost'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _c || Object)
], ProfileComponent.prototype, "corsPost", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('corshomephone'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _d || Object)
], ProfileComponent.prototype, "corshomephone", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('corsmobile'),
    __metadata("design:type", typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _e || Object)
], ProfileComponent.prototype, "corsmobile", void 0);
ProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/profile/profile.component.html"),
        selector: 'myprofile',
        styles: [__webpack_require__("../../../../../src/app/profile/profile.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7_angular2_text_mask__["TextMaskModule"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_angular2_text_mask__["TextMaskModule"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__common_validate_service__["a" /* ValidateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__common_validate_service__["a" /* ValidateService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_6__services_protected_service__["a" /* ProtectedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_protected_service__["a" /* ProtectedService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_3__common_shared_service__["a" /* SharedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__common_shared_service__["a" /* SharedService */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_8_ngx_toastr__["b" /* ToastrService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_ngx_toastr__["b" /* ToastrService */]) === "function" && _p || Object])
], ProfileComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/protected-routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return protectedRoutes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search_result_search_result_component__ = __webpack_require__("../../../../../src/app/search/search-result/search-result.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__article_article_component__ = __webpack_require__("../../../../../src/app/article/article.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__article_subarticle_subarticle_component__ = __webpack_require__("../../../../../src/app/article/subarticle/subarticle.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__header_nav_nav_router_activator_service__ = __webpack_require__("../../../../../src/app/header/nav/nav-router-activator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__error_error_component__ = __webpack_require__("../../../../../src/app/error/error.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__staticpage_contact_component__ = __webpack_require__("../../../../../src/app/staticpage/contact.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__staticpage_faq_component__ = __webpack_require__("../../../../../src/app/staticpage/faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__staticpage_aboutus_component__ = __webpack_require__("../../../../../src/app/staticpage/aboutus.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__staticpage_manual_component__ = __webpack_require__("../../../../../src/app/staticpage/manual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__staticpage_dataprotection_component__ = __webpack_require__("../../../../../src/app/staticpage/dataprotection.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__profile_profile_component__ = __webpack_require__("../../../../../src/app/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__feedback_feedback_component__ = __webpack_require__("../../../../../src/app/feedback/feedback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__mailbox_mailbox_component__ = __webpack_require__("../../../../../src/app/mailbox/mailbox.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_management_app_management_component__ = __webpack_require__("../../../../../src/app/app-management/app-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__firsttimelogin_firsttimelogin_component__ = __webpack_require__("../../../../../src/app/firsttimelogin/firsttimelogin.component.ts");

















// 
// import { NavRouterActivator } from './header/nav/nav-router-activator.service'
// import { appRoutes } from './routes';
var protectedRoutes = [
    { path: '404', component: __WEBPACK_IMPORTED_MODULE_5__error_error_component__["a" /* ErrorComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_11__dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_12__profile_profile_component__["a" /* ProfileComponent */] },
    { path: 'appsmgmt', component: __WEBPACK_IMPORTED_MODULE_15__app_management_app_management_component__["a" /* AppManagementComponent */] },
    { path: 'index', component: __WEBPACK_IMPORTED_MODULE_0__home_home_component__["a" /* HomeComponent */] },
    { path: 'firsttime', component: __WEBPACK_IMPORTED_MODULE_16__firsttimelogin_firsttimelogin_component__["a" /* FirsttimeloginComponent */] },
    { path: 'search/searchResult', component: __WEBPACK_IMPORTED_MODULE_1__search_search_result_search_result_component__["a" /* SearchResultComponent */] },
    { path: 'topic/:id', component: __WEBPACK_IMPORTED_MODULE_2__article_article_component__["a" /* ArticleComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_4__header_nav_nav_router_activator_service__["a" /* NavRouterActivator */]] },
    { path: 'subtopic/:id1/:id2', component: __WEBPACK_IMPORTED_MODULE_3__article_subarticle_subarticle_component__["a" /* SubarticleComponent */] },
    { path: 'faq', component: __WEBPACK_IMPORTED_MODULE_7__staticpage_faq_component__["a" /* FaqComponent */] },
    { path: 'aboutus', component: __WEBPACK_IMPORTED_MODULE_8__staticpage_aboutus_component__["a" /* AboutusComponent */] },
    { path: 'manual', component: __WEBPACK_IMPORTED_MODULE_9__staticpage_manual_component__["a" /* ManualComponent */] },
    { path: 'dataprotection', component: __WEBPACK_IMPORTED_MODULE_10__staticpage_dataprotection_component__["a" /* DataprotectionComponent */] },
    { path: 'contact', component: __WEBPACK_IMPORTED_MODULE_6__staticpage_contact_component__["a" /* ContactComponent */] },
    { path: 'mailbox', component: __WEBPACK_IMPORTED_MODULE_14__mailbox_mailbox_component__["a" /* MailboxComponent */] },
    { path: 'feedback', component: __WEBPACK_IMPORTED_MODULE_13__feedback_feedback_component__["a" /* FeedbackComponent */] },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', component: __WEBPACK_IMPORTED_MODULE_5__error_error_component__["a" /* ErrorComponent */] }
    //{path: 'user', loadChildren: 'app/user/user.module#UserModule'}
];
//# sourceMappingURL=protected-routes.js.map

/***/ }),

/***/ "../../../../../src/app/protected.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProtectedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ngx_translate_http_loader__ = __webpack_require__("../../../../@ngx-translate/http-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngui_auto_complete__ = __webpack_require__("../../../../@ngui/auto-complete/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngui_auto_complete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__ngui_auto_complete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_accordion__ = __webpack_require__("../../../../ngx-bootstrap/accordion/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_buttons__ = __webpack_require__("../../../../ngx-bootstrap/buttons/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__protected_routes__ = __webpack_require__("../../../../../src/app/protected-routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_owl_carousel__ = __webpack_require__("../../../../ng2-owl-carousel/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_owl_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_owl_carousel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__dashboard_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__profile_profile_component__ = __webpack_require__("../../../../../src/app/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_protected_service__ = __webpack_require__("../../../../../src/app/services/protected.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__protected_protected_component__ = __webpack_require__("../../../../../src/app/protected/protected.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_text_mask__ = __webpack_require__("../../../../angular2-text-mask/dist/angular2TextMask.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_text_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_angular2_text_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__mailbox_mailbox_component__ = __webpack_require__("../../../../../src/app/mailbox/mailbox.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__sidenav_dashboard_sidenav_dashboard_component__ = __webpack_require__("../../../../../src/app/sidenav-dashboard/sidenav-dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_management_app_management_component__ = __webpack_require__("../../../../../src/app/app-management/app-management.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__sidenavprotected_sidenavprotected_component__ = __webpack_require__("../../../../../src/app/sidenavprotected/sidenavprotected.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__firsttimelogin_firsttimelogin_component__ = __webpack_require__("../../../../../src/app/firsttimelogin/firsttimelogin.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











// import { AppComponent } from './app.component';













function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_6__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var ProtectedModule = (function () {
    function ProtectedModule() {
    }
    return ProtectedModule;
}());
ProtectedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_21__app_management_app_management_component__["a" /* AppManagementComponent */],
            __WEBPACK_IMPORTED_MODULE_14__profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_17__protected_protected_component__["a" /* ProtectedComponent */],
            __WEBPACK_IMPORTED_MODULE_13__dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_19__mailbox_mailbox_component__["a" /* MailboxComponent */],
            __WEBPACK_IMPORTED_MODULE_20__sidenav_dashboard_sidenav_dashboard_component__["a" /* SidenavDashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_22__sidenavprotected_sidenavprotected_component__["a" /* SidenavprotectedComponent */],
            __WEBPACK_IMPORTED_MODULE_23__firsttimelogin_firsttimelogin_component__["a" /* FirsttimeloginComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_16__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_18_angular2_text_mask__["TextMaskModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                loader: {
                    provide: __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["a" /* TranslateLoader */],
                    useFactory: (HttpLoaderFactory),
                    deps: [__WEBPACK_IMPORTED_MODULE_3__angular_http__["Http"]]
                }
            }),
            __WEBPACK_IMPORTED_MODULE_10__config_app_config_module__["c" /* AppConfigModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["c" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_11__protected_routes__["a" /* protectedRoutes */]),
            __WEBPACK_IMPORTED_MODULE_7__ngui_auto_complete__["NguiAutoCompleteModule"],
            __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap_buttons__["a" /* ButtonsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_accordion__["a" /* AccordionModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_12_ng2_owl_carousel__["OwlModule"]
        ],
        schemas: [
            __WEBPACK_IMPORTED_MODULE_1__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_15__services_protected_service__["a" /* ProtectedService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_17__protected_protected_component__["a" /* ProtectedComponent */]]
    })
], ProtectedModule);

//# sourceMappingURL=protected.module.js.map

/***/ }),

/***/ "../../../../../src/app/protected/protected.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\r\n/* app css stylesheet */\r\n/*@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');*/\r\n\r\n\r\n@font-face {\r\n    font-family: 'Roboto';\r\n    src: url(" + __webpack_require__("../../../../../src/assets/fonts/Roboto/Roboto-Light.ttf") + ");\r\n   }\r\n   \r\n   \r\n   body{\r\n     font-family: 'Roboto', sans-serif !important;\r\n   }\r\n   \r\n   .hoverwell:hover {\r\n     background-color: #485563;\r\n     cursor: pointer;\r\n   }\r\n   \r\n   .pointable {\r\n     cursor: pointer;\r\n   }\r\n   \r\n   [hidden] {\r\n     display: none !important;\r\n   }\r\n   \r\n   .toast-success {\r\n     background-color: #51a351;\r\n   }\r\n   .toast-error {\r\n     background-color: #bd362f;\r\n   }\r\n   .toast-info {\r\n     background-color: #2f96b4;\r\n   }\r\n   .toast-warning {\r\n     background-color: #f89406;\r\n   }\r\n   \r\n   /* slider css */\r\n   \r\n   .bx-wrapper {\r\n       box-shadow: 0 0 0px #ccc;\r\n       border: 0px solid #fff;\r\n       background: #a7a495;\r\n       margin-bottom:0px;\r\n   }\r\n   \r\n   .bx-wrapper .bx-pager, .bx-wrapper .bx-controls-auto {\r\n       bottom: 8px;\r\n   }\r\n   \r\n   h1, h2, h3{\r\n     font-weight: 200;\r\n   }\r\n   \r\n   @media screen and (max-width:760px) and (min-width:320px){\r\n   \r\n     .bx-wrapper .bx-controls-direction a {\r\n         top: 95% !important;\r\n       }\r\n   }\r\n   \r\n   .top-nav-style{\r\n       width: 100% !important;\r\n       height:70px;\r\n       background: #1ebebc;\r\n       position: fixed  !important;\r\n       z-index: 10000;\r\n       -webkit-transition-property: height; /* Safari */\r\n       -webkit-transition-duration: 1s; /* Safari */\r\n       transition-property: height;\r\n       transition-duration: 1s;\r\n   }\r\n   footer{\r\n       background:#666666;\r\n   }\r\n   .nav-bar-style{\r\n       z-index: 10000;\r\n       position: fixed;\r\n       width: 100%;\r\n       top: 30px;\r\n       -webkit-transition-property: top; /* Safari */\r\n       -webkit-transition-duration: 1s; /* Safari */\r\n       transition-property: top;\r\n       transition-duration: 1s;\r\n   }\r\n\r\n   .showProfile{\r\n    position: fixed;\r\n    z-index: 999999;\r\n    min-width: 175px;\r\n    max-width: 200px;\r\n    height: auto;\r\n    margin: 0px 71.3%;\r\n    padding: 15px;\r\n    top: 13px;\r\n    list-style: none;\r\n    box-shadow: #7d7d7d 0px 10px 20px 0px;\r\n   }\r\n\r\n  .showProfile a {\r\n    color: #FFF;\r\n    text-decoration: none;\r\n  }\r\n   \r\n  .showProfile a:hover {\r\n    color: #333;\r\n    font-weight: bold;\r\n    text-decoration: none;\r\n  }\r\n   \r\n   \r\n   @media only screen and (max-width: 500px) {\r\n       .nav-bar-style{\r\n           top: 41px !important;\r\n       }\r\n   }\r\n   \r\n\r\n   .sidenav {\r\n    height: 100%;\r\n    width: 0;\r\n    position: fixed;\r\n    z-index: 100001;\r\n    top: 0;\r\n    right: 0;\r\n    background-color: #111;\r\n    overflow-x: hidden;\r\n    transition: 0.5s;\r\n    padding-top: 60px;\r\n}\r\n\r\n.sidenav a {\r\n    padding: 8px 8px 8px 32px;\r\n    text-decoration: none;\r\n    font-size: 25px;\r\n    text-align: left;\r\n    color: #818181;\r\n    display: block;\r\n    transition: 0.3s;\r\n}\r\n\r\n.sidenav a:hover {\r\n    color: #f1f1f1;\r\n}\r\n\r\n.sidenav .closebtn {\r\n    position: absolute;\r\n    top: 0;\r\n    right: 25px;\r\n    font-size: 36px;\r\n    margin-left: 50px;\r\n}\r\n\r\n@media screen and (max-height: 450px) {\r\n  .sidenav {padding-top: 15px;}\r\n  .sidenav a {font-size: 18px;}\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/protected/protected.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!isFirstLogin\">\r\n  <div [ngStyle]=\"{'min-height': clientHeight + 'px', 'margin-bottom': '-200px'}\">\r\n    <!-- <div *ngIf=\"isProfile\" (mouseleave)=\"isProfile = false\">\r\n      <ul class=\"showProfile font-size-s\" [style.background]=\"getTheme()\" style=\"color: #FFF\">\r\n        <li>\r\n          {{getUserName}}\r\n        </li>\r\n        <li>\r\n        <a href=\"\" [routerLink]=\"['profile']\">Profile</a> \r\n        </li>\r\n        <li>\r\n          <a href=\"\" [routerLink]=\"['mailbox']\">Inbox</a>\r\n        </li>\r\n        <li>\r\n          <a (click)=\"logout()\">Logout</a>\r\n        </li>\r\n      </ul>\r\n\r\n    </div> -->\r\n\r\n    <app-topnav [state]='getUserName' class=\"top-nav-style\" (showProfile)=\"showProfile($event)\" (topNavClick)=\"getExpand($event)\"\r\n      [style.background]=\"getTheme()\" [style.z-index]=\"this.zIndex\" [style.height]=\"this.bHeight\"></app-topnav>\r\n    <app-nav class=\"nav-bar-style\" [style.top]=\"this.bTop\"></app-nav>\r\n    <app-breadcrumb></app-breadcrumb>\r\n    <router-outlet [state]='getUserName'></router-outlet>\r\n    <div style=\"height: 200px\"></div>\r\n  </div>\r\n  <!-- <gosg-sidenavmain></gosg-sidenavmain> -->\r\n  <gosg-sidenavprotected></gosg-sidenavprotected>\r\n  <app-footer></app-footer>\r\n</div>\r\n\r\n<gosg-firsttimelogin [loginfirst]='isFirstLogin'></gosg-firsttimelogin>\r\n"

/***/ }),

/***/ "../../../../../src/app/protected/protected.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProtectedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_protected_service__ = __webpack_require__("../../../../../src/app/services/protected.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_distinctUntilChanged__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/distinctUntilChanged.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_skip__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/skip.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_portal_service__ = __webpack_require__("../../../../../src/app/services/portal.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var ProtectedComponent = (function () {
    function ProtectedComponent(activatedRoute, config, protectedService, router, portalService) {
        this.activatedRoute = activatedRoute;
        this.config = config;
        this.protectedService = protectedService;
        this.portalService = portalService;
        this.title = 'app';
        this.txtColor = '#333';
        this.zIndex = '10000';
        this.bHeight = '70px';
        this.bTop = '35px';
        this.isProfile = false;
        this.isProfileHide = false;
        this.clientHeight = window.innerHeight - 200;
    }
    ProtectedComponent.prototype.getExpand = function (data) {
        if (data) {
            this.zIndex = '10000';
            this.bHeight = '70px';
            this.bTop = '35px';
        }
        else {
            this.zIndex = '10000';
            this.bHeight = '105px';
            this.bTop = '85px';
        }
    };
    ProtectedComponent.prototype.logout = function () {
        localStorage.removeItem('usrID');
        location.href = this.config.urlUAP + 'uapsso/Logout';
    };
    ProtectedComponent.prototype.getUserRegData = function (name) {
        this.portalService.login(name).subscribe(function (data) {
            console.log(data);
            if (data.length != 0) {
                localStorage.setItem('userNationality', data[0].country);
            }
            else {
                alert('username not found');
            }
        }, function (error) {
            alert('error');
            //this.alertService.error(error);
            //this.loading = false;
        });
    };
    ProtectedComponent.prototype.showProfile = function (data) {
        console.log(this.isProfile);
        document.getElementById("mySidenavProtected").style.width = "250px";
        this.isProfile = data;
        console.log(this.isProfile);
    };
    ProtectedComponent.prototype.getUserData = function () {
        var _this = this;
        this.protectedService.getUser().subscribe(function (data) {
            _this.getUserName = data.user.fullName;
        }, function (error) {
            debugger;
            //location.href = this.config.urlUAP+'portal/index';
        });
    };
    ProtectedComponent.prototype.getProfileData = function (data) {
        var _this = this;
        this.protectedService.getProfile(data).subscribe(function (data) {
            if (data.length != 0) {
                _this.getUserName = data[0].fullname;
                localStorage.setItem('icNo', data[0].ic_number);
                localStorage.setItem('name', data[0].fullname);
                localStorage.setItem('email', data[0].email);
                localStorage.setItem('usrID', data[0].id);
                //this.getUserRegData(data[0].fullname);
            }
            else {
                debugger;
                //location.href = this.config.urlUAP+'portal/index';
            }
        }, function (error) {
            debugger;
            //location.href = this.config.urlUAP+'portal/index';
        });
    };
    ProtectedComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    ProtectedComponent.prototype.checkFirstTime = function () {
        if (location.href.search('firsttime') > 0) {
            this.isFirstLogin = true;
        }
        else {
            this.isFirstLogin = false;
        }
    };
    ProtectedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkFirstTime();
        var getUsrID = localStorage.getItem('usrID');
        var getUserID = localStorage.getItem('userId');
        var getUserCountry = localStorage.getItem('userNationality');
        console.log(this.userId);
        console.log(getUserCountry);
        this.getUserData();
        this.activatedRoute.queryParamMap.skip(1).subscribe(function (queryParams) {
            _this.userId = queryParams.get('id');
            if (_this.userId) {
                _this.getProfileData(_this.userId);
                console.log('got user id' + _this.userId);
            }
        });
        if (getUsrID) {
            console.log('no userid 1' + this.userId);
            this.getProfileData(getUsrID);
        }
        else {
            console.log('no userid 2' + this.userId);
        }
    };
    return ProtectedComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ProtectedComponent.prototype, "langChange", void 0);
ProtectedComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-protected',
        template: __webpack_require__("../../../../../src/app/protected/protected.component.html"),
        styles: [__webpack_require__("../../../../../src/app/protected/protected.component.css")]
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_protected_service__["a" /* ProtectedService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_protected_service__["a" /* ProtectedService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__services_portal_service__["a" /* PortalService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__services_portal_service__["a" /* PortalService */]) === "function" && _e || Object])
], ProtectedComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=protected.component.js.map

/***/ }),

/***/ "../../../../../src/app/search/search-result/search-result.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/search/search-result/search-result.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container search\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-3\">\r\n            <h3>Advance Search</h3>\r\n        </div>\r\n        <div class=\"col-md-9 hidden-xs\">\r\n          <h3>Search Result</h3>\r\n            <span class=\"btn btn-default pull-right font-size-s\" *ngIf=\"\">English</span>\r\n            <span class=\"btn btn-default pull-right font-size-s\" *ngIf=\"\">Bahasa Malaysia</span>\r\n        </div>\r\n    </div>\r\n    <div class=\"row\">\r\n        <div class=\"col-md-3\">\r\n            <div *ngIf=\"local\">\r\n                <div class=\"panel-group\" id=\"internal\">\r\n                    <div class=\"panel panel-default\">\r\n                      <div class=\"panel-heading\">\r\n                        <h4 class=\"panel-title\">\r\n                          <a data-toggle=\"collapse\" data-parent=\"#internal\" href=\"#keywordSetting\">Keyword Setting</a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"keywordSetting\" class=\"panel-collapse collapse in\">\r\n                        <div class=\"panel-body\">\r\n                            <div class=\"radio\" *ngFor=\"let k of keywordType\">\r\n                                <label><input type=\"radio\" name=\"setkeyword\"> {{k.nameMs}}</label>\r\n                                <div class=\"form-group\" >\r\n                                    <input class=\"form-control\" type=\"text\" placeholder=\"Selain perkataan\">\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"panel panel-default\">\r\n                      <div class=\"panel-heading\">\r\n                        <h4 class=\"panel-title\">\r\n                          <a data-toggle=\"collapse\" data-parent=\"#internal\" href=\"#specification\">Specification</a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"specification\" class=\"panel-collapse collapse\">\r\n                        <div class=\"panel-body\">\r\n                            <div class=\"checkbox\" *ngFor=\"let i of internalSpec\">\r\n                              <label><input type=\"checkbox\">{{i.nameMs}}</label>\r\n                            </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"panel panel-default\">\r\n                      <div class=\"panel-heading\">\r\n                        <h4 class=\"panel-title\">\r\n                          <a data-toggle=\"collapse\" data-parent=\"#internal\" href=\"#filter\">Filter</a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"filter\" class=\"panel-collapse collapse\">\r\n                        <div class=\"panel-body\">\r\n                            <div class=\"panel-group\" id=\"filterItem\">\r\n                                <div class=\"panel panel-default\">\r\n                                    <div class=\"panel-heading\">\r\n                                        <h4 class=\"panel-title\">\r\n                                            <a data-toggle=\"collapse\" data-parent=\"#filterItem\" href=\"#filterByDate\">Tarikh</a></h4>\r\n                                    </div>\r\n                                    <div id=\"filterByDate\" class=\"panel-collapse collapse\">\r\n                                        <div class=\"panel-body\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"panel panel-default\">\r\n                                    <div class=\"panel-heading\">\r\n                                        <h4 class=\"panel-title\">\r\n                                            <a data-toggle=\"collapse\" data-parent=\"#filterItem\" href=\"#filterByAuthor\">Author</a></h4>\r\n                                    </div>\r\n                                    <div id=\"filterByAuthor\" class=\"panel-collapse collapse\">\r\n                                        <div class=\"panel-body\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"panel panel-default\">\r\n                                    <div class=\"panel-heading\">\r\n                                        <h4 class=\"panel-title\">\r\n                                            <a data-toggle=\"collapse\" data-parent=\"#filterItem\" href=\"#filterByTopic\">Topic</a></h4>\r\n                                    </div>\r\n                                    <div id=\"filterByTopic\" class=\"panel-collapse collapse\">\r\n                                        <div class=\"panel-body\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"panel panel-default\">\r\n                                    <div class=\"panel-heading\">\r\n                                        <h4 class=\"panel-title\">\r\n                                            <a data-toggle=\"collapse\" data-parent=\"#filterItem\" href=\"#filterBySubTopic\">Sub Topic</a></h4>\r\n                                    </div>\r\n                                    <div id=\"filterBySubTopic\" class=\"panel-collapse collapse\">\r\n                                        <div class=\"panel-body\">\r\n                                        </div>\r\n                                    </div>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                </div> \r\n            </div>\r\n            <div *ngIf=\"os\">\r\n            </div>\r\n            <div *ngIf=\"global\">\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-9\">\r\n            <div class=\"input-group form-group\">\r\n                <input class=\"form-control\" type=text />\r\n                <span class=\"input-group-addon warna_bg\">\r\n                    <i class=\"fa fa-search\"></i> \r\n                    <span class=\"hidden-xs font-size-s\"></span> \r\n                </span>\r\n            </div>\r\n            <ul class=\"nav nav-tabs themeColor\">\r\n                  <li class=\"active\"><a class=\"font-size-s\" data-toggle=\"tab\" href=\"#local\">Internal</a></li>\r\n                  <li><a class=\"font-size-s\" data-toggle=\"tab\" href=\"#os\">Online Services</a></li>\r\n                  <li><a class=\"font-size-s\" data-toggle=\"tab\" href=\"#global\">Global</a></li>\r\n            </ul>\r\n            <div class=\"tab-content\">\r\n              <div id=\"local\" class=\"tab-pane fade in active\">\r\n                  <int-search></int-search>                            \r\n              </div>\r\n              <div id=\"os\" class=\"tab-pane fade\">\r\n                  Online Service Result\r\n              </div>\r\n              <div id=\"global\" class=\"tab-pane fade\">\r\n                  Global Result\r\n              </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n<!--\r\n<div class=\"container\">\r\n        \r\n\t\t<div class=\"row\">\r\n            \r\n            \r\n            <div class=\"col-md-3\" id=\"filterExt\">\r\n                <div class=\"searchFeature\">\r\n                    <h5 class=\"font-size-m warna_title_color\">\r\n                          Search Specification\r\n                          </h5>\r\n                    <div class=\"radio\">\r\n                        <label><input type=\"radio\" name=\"extSpec\" id=\"extGov\">gov.my</label>\r\n                    </div>\r\n                    <div class=\"radio\">\r\n                        <label><input type=\"radio\" name=\"extSpec\" id=\"extEdu\">edu.my</label>\r\n                    </div>\r\n                    <div class=\"radio\">\r\n                        <label><input type=\"radio\" name=\"extSpec\" id=\"extOrg\">org.my</label>\r\n                    </div>\r\n                    <div class=\"radio\">\r\n                        <label><input type=\"radio\" name=\"extSpec\" id=\"extMy\">.my</label>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        \r\n\t\t</div>\r\n\t</div>\r\n-->\r\n\r\n<!--\r\n<div id=\"emptyKey\" class=\"modalCust\">\r\n    <div class=\"modalCust-content\">\r\n        <div class=\"modalCust-header text-center padding-l warna_bg\">\r\n            <span class=\"close\" onclick=\"closeModal('emptyKey')\">&times;</span>\r\n            <i class=\"fa fa-warning\"></i>\r\n        </div>\r\n        <div class=\"modalCust-body text-center\">\r\n            <h4 class=\"padding-m\">\r\n              \r\n            </h4>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div id=\"userErrMsg\" class=\"modalCust\">\r\n    <div class=\"modalCust-content\">\r\n        <div class=\"modalCust-header text-center padding-l warna_bg\">\r\n            <span class=\"close\" onclick=\"closeModal('userErrMsg')\">&times;</span>\r\n            <i class=\"fa fa-warning\"></i>\r\n        </div>\r\n        <div class=\"modalCust-body text-center\">\r\n            <h4 class=\"padding-m\">\r\n              \r\n            </h4>\r\n        </div>\r\n        <div class=\"modalCust-footer text-center padding-bottom-l\">\r\n            <button class=\"btn btn-primary backToHome warna_bg\">\r\n              \r\n            </button>\r\n            <button class=\"btn btn-primary reloadPage warna_bg\">\r\n              \r\n            </button>\r\n        </div>\r\n    </div>\r\n</div>\r\n-->\r\n\r\n   \r\n  \r\n"

/***/ }),

/***/ "../../../../../src/app/search/search-result/search-result.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchResultComponent = (function () {
    function SearchResultComponent(router) {
        this.router = router;
        this.local = true;
        this.os = false;
        this.global = false;
        this.keywordType = [
            { id: 1, nameEn: 'Exact word', nameMs: 'Perkataan yang tepat' },
            { id: 2, nameEn: 'All word', nameMs: 'Semua dari perkataan' },
            { id: 3, nameEn: 'Any word', nameMs: 'Mana-mana dari perkataan' }
        ];
        this.internalSpec = [
            { id: 11, nameEn: 'Topics', nameMs: 'Topik' },
            { id: 12, nameEn: 'Sub Topics', nameMs: 'Sub Topik' },
            { id: 13, nameEn: 'Title', nameMs: 'Tajuk' },
            { id: 14, nameEn: 'Description', nameMs: 'Deskripsi' }
        ];
    }
    SearchResultComponent.prototype.ngOnInit = function () {
    };
    return SearchResultComponent;
}());
SearchResultComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search-result',
        template: __webpack_require__("../../../../../src/app/search/search-result/search-result.component.html"),
        styles: [__webpack_require__("../../../../../src/app/search/search-result/search-result.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], SearchResultComponent);

var _a;
//# sourceMappingURL=search-result.component.js.map

/***/ }),

/***/ "../../../../../src/app/search/search.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/search/search.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"background:#666666\">\r\n    <div class=\"container\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-5 text-center\">\r\n                <h3 class=\"font-size-l search_header\">\r\n                    {{ 'home.search.label' | translate }}\r\n                </h3>\r\n            </div>\r\n            <div class=\"col-md-7 text-center\">\r\n                <div class=\"input-group\" style=\"margin: 13px 0px;\">\r\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"keyword1\" (keyup.enter)=\"mainSearch(keyword1)\" \r\n                           ngui-auto-complete\r\n                           [source]=\"autoCompleteArr\"\r\n                           placeholder=\"Taipkan kata kunci carian di sini\">\r\n                    <span class=\"input-group-btn\">\r\n                        <button class=\"btn btn-secondary\" [style.background]=\"getTheme()\" type=\"button\"\r\n                                (click)=\"mainSearch(keyword1)\">\r\n                            <i class=\"fa fa-search\"></i> <span class=\"hidden-xs\">FIND</span>\r\n                        </button>\r\n                    </span>\r\n                </div>\r\n                <!--<div id=\"button_keyword_div\" class=\"input-group\" style=\"cursor:pointer;\">\r\n\r\n                    <span class=\"twitter-typeahead\" style=\"position: relative; display: inline-block;\"><span class=\"keyword1\"><label class=\"sr-only\" for=\"keyword1\">Keyword1</label><input type=\"text\" style=\"font-size: 16px; font-weight: 100; position: absolute; top: 0px; left: 0px; border-color: transparent; box-shadow: none; opacity: 1; background: none 0% 0% / auto repeat scroll padding-box border-box rgb(192, 190, 191);\" class=\"form-control typeahead tt-hint\" onkeypress=\"handleSearch(event, $('#keyword').val())\" readonly=\"\" autocomplete=\"off\" spellcheck=\"false\" tabindex=\"-1\" dir=\"ltr\" id=\"keyword1\"></span><span class=\"keyword2\"><label class=\"sr-only\" for=\"keyword\">Keyword</label><input type=\"text\" style=\"font-size: 16px; font-weight: 100; position: relative; vertical-align: top; background-color: transparent;\" class=\"form-control typeahead tt-input\" placeholder=\"Type a search keywords here\" id=\"keyword\" onkeypress=\"handleSearch(event, $('#keyword').val())\" autocomplete=\"off\" spellcheck=\"false\" dir=\"auto\"></span><pre aria-hidden=\"true\" style=\"position: absolute; visibility: hidden; white-space: pre; font-family: Roboto; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 100; word-spacing: 0px; letter-spacing: 0px; text-indent: 0px; text-rendering: auto; text-transform: none;\"></pre><div class=\"tt-menu\" style=\"position: absolute; top: 100%; left: 0px; z-index: 100; display: none;\"><div class=\"tt-dataset tt-dataset-arrAuto\"></div></div></span>\r\n\r\n                    <span class=\"input-group-addon warna_bg\" onclick=\"search($('#keyword').val())\" style=\"background-color: rgb(0, 189, 187);\"><i class=\"fa fa-search\"></i> <span class=\"hidden-xs\">\r\n                    FIND\r\n                    </span> </span>\r\n                </div>-->\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/search/search.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search_service__ = __webpack_require__("../../../../../src/app/search/search.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchComponent = (function () {
    function SearchComponent(router, searchService) {
        this.router = router;
        this.searchService = searchService;
        //autocomplete test data
        this.autoCompleteArr = ['lesen', 'pendidikan', 'myGovernment'];
    }
    SearchComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    SearchComponent.prototype.mainSearch = function (key) {
        this.router.navigate(['search/searchResult']);
        this.internal(key);
    };
    SearchComponent.prototype.internal = function (key) {
        var _this = this;
        var body = {
            size: 10,
            from: 0,
            responseFields: [
                'category_name',
                'topic_name',
                'article_name',
                'category_name_en',
                'topic_name_en',
                'article_name_en',
                'author_name',
                'article_insert_date',
                'idarticle',
                'article_text_clean',
                'article_text_en_clean'
            ],
            keywordMap: {
                exact: [key],
                fields: [
                    'article_text_clean',
                    'article_text_en_clean',
                    'article_name',
                    'article_name_en',
                    'category_name',
                    'category_name_en',
                    'topic_name',
                    'topic_name_en'
                ]
            },
            aggregations: [
                {
                    name: "category_name",
                    type: "terms",
                    field: "category_name.raw"
                },
                {
                    name: "topic_name",
                    type: "terms",
                    field: "topic_name.raw"
                },
                {
                    name: "category_name_en",
                    type: "terms",
                    field: "category_name_en.raw"
                },
                {
                    name: "topic_name_en",
                    type: "terms",
                    field: "topic_name_en.raw"
                },
                {
                    name: "author_name",
                    type: "terms",
                    field: "author_name.raw"
                },
                {
                    name: "histogram",
                    type: "dateHistogram",
                    field: "article_insert_date",
                    interval: "month"
                }
            ]
        };
        this.searchService.getInternal(JSON.stringify(body)).subscribe(function (data) {
            _this.searchService.setIntData(data);
        });
    };
    SearchComponent.prototype.ngOnInit = function () {
        console.log('search.comp.ts');
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search',
        template: __webpack_require__("../../../../../src/app/search/search.component.html"),
        styles: [__webpack_require__("../../../../../src/app/search/search.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__search_search_service__["a" /* SearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__search_search_service__["a" /* SearchService */]) === "function" && _b || Object])
], SearchComponent);

var _a, _b;
//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ "../../../../../src/app/search/search.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export obj */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/_esm5/BehaviorSubject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var obj = (function () {
    function obj() {
    }
    return obj;
}());

var SearchService = (function () {
    function SearchService(http, config) {
        this.http = http;
        this.config = config;
        this.intSource = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](obj);
        this.internalUrl = this.config.urlIntSearch;
    }
    SearchService.prototype.getInternal = function (data) {
        return this.http.post(this.internalUrl, data).map(function (response) { return response.json(); });
    };
    SearchService.prototype.setIntData = function (data) {
        this.intSource.next(data);
    };
    SearchService.prototype.getIntData = function () {
        return this.intSource.asObservable();
    };
    return SearchService;
}());
SearchService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */]) === "function" && _b || Object])
], SearchService);

var _a, _b;
//# sourceMappingURL=search.service.js.map

/***/ }),

/***/ "../../../../../src/app/search/searchInt.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchIntComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_search_service__ = __webpack_require__("../../../../../src/app/search/search.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchIntComponent = (function () {
    function SearchIntComponent(router, searchService) {
        this.router = router;
        this.searchService = searchService;
    }
    SearchIntComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    SearchIntComponent.prototype.getDataInt = function () {
        var _this = this;
        this.searchService.getIntData().subscribe(function (data) {
            _this.intData = data.data;
        });
    };
    SearchIntComponent.prototype.ngOnInit = function () {
        console.log('searchInt.comp.ts');
        this.getDataInt();
    };
    return SearchIntComponent;
}());
SearchIntComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'int-search',
        template: '<div *ngFor="let int of intData"><h4>{{int.article_name}}</h4><span class="label primary">{{int.category_name}}</span><p>{{int.article_text_clean | slice:0:100}}</p></div>'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__search_search_service__["a" /* SearchService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__search_search_service__["a" /* SearchService */]) === "function" && _b || Object])
], SearchIntComponent);

var _a, _b;
//# sourceMappingURL=searchInt.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/portal.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PortalService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var PortalService = (function () {
    function PortalService(http, config, translate) {
        var _this = this;
        this.http = http;
        this.config = config;
        this.translate = translate;
        this.lang = this.lang;
        this.langId = this.langId;
        this.registerUrl = this.config.urlRegister;
        this.feedbackUrl = this.config.urlFeedback;
        this.feedbacktypeUrl = this.config.urlFeedbackType;
        this.profileUrl = this.config.urlProfile;
        this.fbsubjectUrl = this.config.urlFeedbackSubject;
        this.usertypeUrl = this.config.urlUserType;
        this.AgencyAppUrl = this.config.urlAppAgency;
        this.statusAppUrl = this.config.urlAppAgency;
        this.dataAppUrl = this.config.urlAppAgency;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.langId = 1;
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.langId = 2;
                });
            }
        });
    }
    PortalService.prototype.getAgencyApp = function () {
        return this.http.get(this.AgencyAppUrl + '.json')
            .map(function (res) { return res.json(); });
    };
    PortalService.prototype.getStatusApp = function () {
        return this.http.get(this.statusAppUrl + '.json')
            .map(function (res) { return res.json(); });
    };
    PortalService.prototype.getDataApp = function () {
        return this.http.get(this.dataAppUrl + '.json')
            .map(function (res) { return res.json(); });
    };
    // searchApp(){
    //   return this.http.post()
    // }
    PortalService.prototype.create = function (user) {
        if (!this.langId) {
            this.langId = 1;
        }
        return this.http.post(this.registerUrl + "?languageId=" + localStorage.getItem('langID'), user)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PortalService.prototype.login = function (name) {
        return this.http.get(this.registerUrl + "/?fullName=" + name)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PortalService.prototype.feedback = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        return this.http.post(this.feedbackUrl, data, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PortalService.prototype.feedbacksubject = function (data) {
        return this.http.get(this.fbsubjectUrl + data)
            .map(function (response) { return response.json().feedbackSubjectList; })
            .catch(this.handleError);
    };
    PortalService.prototype.feedbacktype = function (data) {
        return this.http.get(this.feedbacktypeUrl + data)
            .map(function (response) { return response.json().feedbackTypeList; })
            .catch(this.handleError);
    };
    PortalService.prototype.createProfile = function (user) {
        return this.http.post(this.profileUrl, user)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PortalService.prototype.getUserType = function (data) {
        return this.http.get(this.usertypeUrl + data)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PortalService.prototype.handleError = function (error) {
        var msg = "Status code " + error.status + " on url " + error.url;
        console.error(msg);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].throw(msg);
    };
    PortalService.prototype.jwt = function () {
        // create authorization header with jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Authorization': 'Bearer ' + currentUser.token });
            return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: headers });
        }
    };
    return PortalService;
}());
PortalService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */]) === "function" && _c || Object])
], PortalService);

var _a, _b, _c;
//# sourceMappingURL=portal.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/protected.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProtectedService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var ProtectedService = (function () {
    function ProtectedService(http, config, translate) {
        var _this = this;
        this.http = http;
        this.config = config;
        this.translate = translate;
        this.lang = this.lang;
        this.langId = this.langId;
        this.profileUrl = this.config.urlProfile;
        this.mailUrl = this.config.urlMail;
        this.completeUrl = this.config.urlComplete;
        this.getUserUrl = this.config.urlGetUser;
        // private serviceUrl = 'https://jsonplaceholder.typicode.com/users';
        this.inboxUrl = this.mailUrl + "pages/";
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.langId = 1;
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.langId = 2;
                });
            }
        });
    }
    ProtectedService.prototype.createProfile = function (user) {
        return this.http
            .post(this.profileUrl, user).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProtectedService.prototype.getProfile = function (userId) {
        return this.http
            .get(this.profileUrl + "/?user_id=" + userId).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProtectedService.prototype.getUser = function () {
        return this.http
            .get(this.getUserUrl + "?langId=" + localStorage.getItem('langID')).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProtectedService.prototype.updateProfile = function (user) {
        return this.http
            .put(this.profileUrl + "/" + user.user_id, user).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProtectedService.prototype.getMails = function (icno, pages, size) {
        return this.http
            .get("" + this.inboxUrl + icno + "?page=" + pages + "&size=" + size)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProtectedService.prototype.deleteMail = function (msgId) {
        return this.http
            .delete(this.mailUrl + "delete/" + msgId).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProtectedService.prototype.deleteMails = function (msgId) {
        return this.http
            .delete(this.mailUrl + "delete/selected?id=" + msgId).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProtectedService.prototype.completeTran = function (rnd, header) {
        return this.http
            .put(this.completeUrl + "?randomNo=" + rnd + "&langId=" + localStorage.getItem('langID'), header).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProtectedService.prototype.getMail = function (msgId) {
        return this.http
            .get(this.mailUrl + "id/" + msgId).map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ProtectedService.prototype.handleError = function (error) {
        var msg = "Status code " + error.status + " on url " + error.url;
        console.error(msg);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["a" /* Observable */].throw(msg);
    };
    return ProtectedService;
}());
ProtectedService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */]) === "function" && _c || Object])
], ProtectedService);

var _a, _b, _c;
//# sourceMappingURL=protected.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/trans.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TransService = (function () {
    function TransService(translate) {
        this.translate = translate;
        this.lang = this.lang;
        this.lang = translate.currentLang;
    }
    TransService.prototype.getTranslate = function () {
        var _this = this;
        this.translate.onLangChange.subscribe(function (event) {
            var myLang = _this.translate.currentLang;
            if (myLang == 'en') {
                _this.translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    // this.topicID = parseInt(this.router.url.split('/')[3]);
                    // this.navService.triggerArticle(this.lang, this.topicID);
                });
            }
            if (myLang == 'ms') {
                _this.translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    // this.topicID = parseInt(this.router.url.split('/')[3]);
                    // this.navService.triggerArticle(this.lang, this.topicID);
                });
            }
        });
    };
    return TransService;
}());
TransService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object])
], TransService);

var _a;
//# sourceMappingURL=trans.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export HttpLoaderFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__ = __webpack_require__("../../../../@ngx-translate/http-loader/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_owl_carousel__ = __webpack_require__("../../../../ng2-owl-carousel/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_owl_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_owl_carousel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngui_auto_complete_dist__ = __webpack_require__("../../../../@ngui/auto-complete/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngui_auto_complete_dist___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__ngui_auto_complete_dist__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__header_topnav_topnav_service__ = __webpack_require__("../../../../../src/app/header/topnav/topnav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__staticpage_contact_component__ = __webpack_require__("../../../../../src/app/staticpage/contact.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__slider_slider_component__ = __webpack_require__("../../../../../src/app/slider/slider.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__slider_slider_service__ = __webpack_require__("../../../../../src/app/slider/slider.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__search_search_component__ = __webpack_require__("../../../../../src/app/search/search.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__search_searchInt_component__ = __webpack_require__("../../../../../src/app/search/searchInt.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__lifeevent_lifeevent_component__ = __webpack_require__("../../../../../src/app/lifeevent/lifeevent.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__staticpage_aboutus_component__ = __webpack_require__("../../../../../src/app/staticpage/aboutus.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__announcement_announcement_component__ = __webpack_require__("../../../../../src/app/announcement/announcement.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__staticpage_faq_component__ = __webpack_require__("../../../../../src/app/staticpage/faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__staticpage_manual_component__ = __webpack_require__("../../../../../src/app/staticpage/manual.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__staticpage_sidenav_component__ = __webpack_require__("../../../../../src/app/staticpage/sidenav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__staticpage_dataprotection_component__ = __webpack_require__("../../../../../src/app/staticpage/dataprotection.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__header_nav_nav_component__ = __webpack_require__("../../../../../src/app/header/nav/nav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__header_topnav_topnav_component__ = __webpack_require__("../../../../../src/app/header/topnav/topnav.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__header_breadcrumb_breadcrumb_service__ = __webpack_require__("../../../../../src/app/header/breadcrumb/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__common_shared_service__ = __webpack_require__("../../../../../src/app/common/shared.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__common_validate_service__ = __webpack_require__("../../../../../src/app/common/validate.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__search_search_result_search_result_component__ = __webpack_require__("../../../../../src/app/search/search-result/search-result.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__search_search_service__ = __webpack_require__("../../../../../src/app/search/search.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__topic_feature_topic_feature_component__ = __webpack_require__("../../../../../src/app/topic-feature/topic-feature.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__footer_footer_component__ = __webpack_require__("../../../../../src/app/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__highlightbox_highlightbox_component__ = __webpack_require__("../../../../../src/app/highlightbox/highlightbox.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__article_article_component__ = __webpack_require__("../../../../../src/app/article/article.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__error_error_component__ = __webpack_require__("../../../../../src/app/error/error.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__article_subarticle_subarticle_component__ = __webpack_require__("../../../../../src/app/article/subarticle/subarticle.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__poll_poll_component__ = __webpack_require__("../../../../../src/app/poll/poll.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__header_breadcrumb_breadcrumb_component__ = __webpack_require__("../../../../../src/app/header/breadcrumb/breadcrumb.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__dialogs_dialogs_service__ = __webpack_require__("../../../../../src/app/dialogs/dialogs.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__services_portal_service__ = __webpack_require__("../../../../../src/app/services/portal.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__auth_auth_service__ = __webpack_require__("../../../../../src/app/auth/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__article_article_service__ = __webpack_require__("../../../../../src/app/article/article.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__header_nav_nav_router_activator_service__ = __webpack_require__("../../../../../src/app/header/nav/nav-router-activator.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__header_nav_nav_service__ = __webpack_require__("../../../../../src/app/header/nav/nav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__home_home_component__ = __webpack_require__("../../../../../src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__services_trans_service__ = __webpack_require__("../../../../../src/app/services/trans.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__feedback_feedback_component__ = __webpack_require__("../../../../../src/app/feedback/feedback.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__message_confirm_component__ = __webpack_require__("../../../../../src/app/message/confirm.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49_ngx_toastr__ = __webpack_require__("../../../../ngx-toastr/toastr.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__sidenavmain_sidenavmain_component__ = __webpack_require__("../../../../../src/app/sidenavmain/sidenavmain.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__angular_cdk_a11y__ = __webpack_require__("../../../cdk/esm5/a11y.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__angular_cdk_bidi__ = __webpack_require__("../../../cdk/esm5/bidi.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__angular_cdk_overlay__ = __webpack_require__("../../../cdk/esm5/overlay.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__angular_cdk_platform__ = __webpack_require__("../../../cdk/esm5/platform.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__angular_cdk_portal__ = __webpack_require__("../../../cdk/esm5/portal.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__angular_cdk_scrolling__ = __webpack_require__("../../../cdk/esm5/scrolling.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__angular_cdk_stepper__ = __webpack_require__("../../../cdk/esm5/stepper.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__angular_cdk_table__ = __webpack_require__("../../../cdk/esm5/table.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__dialogs_confirm_dialog_confirm_dialog_component__ = __webpack_require__("../../../../../src/app/dialogs/confirm-dialog/confirm-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__common_shared_pipe__ = __webpack_require__("../../../../../src/app/common/shared.pipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























































// import { DialogsModule } from '../dialogs/dialogs.module';


function HttpLoaderFactory(http) {
    return new __WEBPACK_IMPORTED_MODULE_3__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/i18n/', '.json');
}
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_7_ng2_owl_carousel__["OwlModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["HttpModule"],
            __WEBPACK_IMPORTED_MODULE_48__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_49_ngx_toastr__["a" /* ToastrModule */].forRoot({
                preventDuplicates: true
            }),
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["e" /* MatCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["k" /* MatFormFieldModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["p" /* MatMenuModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["n" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["w" /* MatSelectModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["j" /* MatExpansionModule */],
            __WEBPACK_IMPORTED_MODULE_2__ngx_translate_core__["b" /* TranslateModule */],
            __WEBPACK_IMPORTED_MODULE_6__angular_router__["c" /* RouterModule */],
            __WEBPACK_IMPORTED_MODULE_8__angular_forms__["ReactiveFormsModule"],
            __WEBPACK_IMPORTED_MODULE_9__ngui_auto_complete_dist__["NguiAutoCompleteModule"],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["i" /* MatDialogModule */],
            // DialogsModule,
            __WEBPACK_IMPORTED_MODULE_50_ngx_bootstrap_modal__["c" /* ModalModule */].forRoot()
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_11__staticpage_contact_component__["a" /* ContactComponent */],
            __WEBPACK_IMPORTED_MODULE_14__search_search_component__["a" /* SearchComponent */],
            __WEBPACK_IMPORTED_MODULE_15__search_searchInt_component__["a" /* SearchIntComponent */],
            __WEBPACK_IMPORTED_MODULE_16__lifeevent_lifeevent_component__["a" /* LifeeventComponent */],
            __WEBPACK_IMPORTED_MODULE_12__slider_slider_component__["a" /* SliderComponent */],
            __WEBPACK_IMPORTED_MODULE_24__header_topnav_topnav_component__["a" /* TopnavComponent */],
            __WEBPACK_IMPORTED_MODULE_17__staticpage_aboutus_component__["a" /* AboutusComponent */],
            __WEBPACK_IMPORTED_MODULE_18__announcement_announcement_component__["a" /* AnnouncementComponent */],
            __WEBPACK_IMPORTED_MODULE_19__staticpage_faq_component__["a" /* FaqComponent */],
            __WEBPACK_IMPORTED_MODULE_23__header_nav_nav_component__["a" /* NavComponent */],
            __WEBPACK_IMPORTED_MODULE_20__staticpage_manual_component__["a" /* ManualComponent */],
            __WEBPACK_IMPORTED_MODULE_21__staticpage_sidenav_component__["a" /* SidenavComponent */],
            __WEBPACK_IMPORTED_MODULE_22__staticpage_dataprotection_component__["a" /* DataprotectionComponent */],
            __WEBPACK_IMPORTED_MODULE_28__search_search_result_search_result_component__["a" /* SearchResultComponent */],
            __WEBPACK_IMPORTED_MODULE_30__topic_feature_topic_feature_component__["a" /* TopicFeatureComponent */],
            __WEBPACK_IMPORTED_MODULE_31__footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_32__highlightbox_highlightbox_component__["a" /* HighlightboxComponent */],
            __WEBPACK_IMPORTED_MODULE_33__article_article_component__["a" /* ArticleComponent */],
            __WEBPACK_IMPORTED_MODULE_34__error_error_component__["a" /* ErrorComponent */],
            __WEBPACK_IMPORTED_MODULE_36__poll_poll_component__["a" /* PollComponent */],
            __WEBPACK_IMPORTED_MODULE_35__article_subarticle_subarticle_component__["a" /* SubarticleComponent */],
            __WEBPACK_IMPORTED_MODULE_37__header_breadcrumb_breadcrumb_component__["a" /* BreadcrumbComponent */],
            __WEBPACK_IMPORTED_MODULE_44__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_46__feedback_feedback_component__["a" /* FeedbackComponent */],
            __WEBPACK_IMPORTED_MODULE_47__message_confirm_component__["a" /* ConfirmComponent */],
            __WEBPACK_IMPORTED_MODULE_62__common_shared_pipe__["a" /* SharedPipe */],
            __WEBPACK_IMPORTED_MODULE_61__dialogs_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_51__sidenavmain_sidenavmain_component__["a" /* SidenavmainComponent */]
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_11__staticpage_contact_component__["a" /* ContactComponent */],
            __WEBPACK_IMPORTED_MODULE_14__search_search_component__["a" /* SearchComponent */],
            __WEBPACK_IMPORTED_MODULE_15__search_searchInt_component__["a" /* SearchIntComponent */],
            __WEBPACK_IMPORTED_MODULE_16__lifeevent_lifeevent_component__["a" /* LifeeventComponent */],
            __WEBPACK_IMPORTED_MODULE_12__slider_slider_component__["a" /* SliderComponent */],
            __WEBPACK_IMPORTED_MODULE_24__header_topnav_topnav_component__["a" /* TopnavComponent */],
            __WEBPACK_IMPORTED_MODULE_17__staticpage_aboutus_component__["a" /* AboutusComponent */],
            __WEBPACK_IMPORTED_MODULE_18__announcement_announcement_component__["a" /* AnnouncementComponent */],
            __WEBPACK_IMPORTED_MODULE_19__staticpage_faq_component__["a" /* FaqComponent */],
            __WEBPACK_IMPORTED_MODULE_23__header_nav_nav_component__["a" /* NavComponent */],
            __WEBPACK_IMPORTED_MODULE_20__staticpage_manual_component__["a" /* ManualComponent */],
            __WEBPACK_IMPORTED_MODULE_21__staticpage_sidenav_component__["a" /* SidenavComponent */],
            __WEBPACK_IMPORTED_MODULE_22__staticpage_dataprotection_component__["a" /* DataprotectionComponent */],
            __WEBPACK_IMPORTED_MODULE_28__search_search_result_search_result_component__["a" /* SearchResultComponent */],
            __WEBPACK_IMPORTED_MODULE_30__topic_feature_topic_feature_component__["a" /* TopicFeatureComponent */],
            __WEBPACK_IMPORTED_MODULE_31__footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_32__highlightbox_highlightbox_component__["a" /* HighlightboxComponent */],
            __WEBPACK_IMPORTED_MODULE_33__article_article_component__["a" /* ArticleComponent */],
            __WEBPACK_IMPORTED_MODULE_34__error_error_component__["a" /* ErrorComponent */],
            __WEBPACK_IMPORTED_MODULE_36__poll_poll_component__["a" /* PollComponent */],
            __WEBPACK_IMPORTED_MODULE_35__article_subarticle_subarticle_component__["a" /* SubarticleComponent */],
            __WEBPACK_IMPORTED_MODULE_37__header_breadcrumb_breadcrumb_component__["a" /* BreadcrumbComponent */],
            __WEBPACK_IMPORTED_MODULE_44__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_46__feedback_feedback_component__["a" /* FeedbackComponent */],
            __WEBPACK_IMPORTED_MODULE_47__message_confirm_component__["a" /* ConfirmComponent */],
            __WEBPACK_IMPORTED_MODULE_48__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_61__dialogs_confirm_dialog_confirm_dialog_component__["a" /* ConfirmDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["b" /* MatButtonModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["n" /* MatInputModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["k" /* MatFormFieldModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["w" /* MatSelectModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["e" /* MatCheckboxModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["i" /* MatDialogModule */],
            // DialogsModule,
            // CDK
            __WEBPACK_IMPORTED_MODULE_53__angular_cdk_a11y__["a" /* A11yModule */],
            __WEBPACK_IMPORTED_MODULE_54__angular_cdk_bidi__["a" /* BidiModule */],
            __WEBPACK_IMPORTED_MODULE_55__angular_cdk_overlay__["d" /* OverlayModule */],
            __WEBPACK_IMPORTED_MODULE_56__angular_cdk_platform__["b" /* PlatformModule */],
            __WEBPACK_IMPORTED_MODULE_57__angular_cdk_portal__["f" /* PortalModule */],
            __WEBPACK_IMPORTED_MODULE_58__angular_cdk_scrolling__["a" /* ScrollDispatchModule */],
            __WEBPACK_IMPORTED_MODULE_59__angular_cdk_stepper__["d" /* CdkStepperModule */],
            __WEBPACK_IMPORTED_MODULE_60__angular_cdk_table__["m" /* CdkTableModule */],
            // Material
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["a" /* MatAutocompleteModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["c" /* MatButtonToggleModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["d" /* MatCardModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["f" /* MatChipsModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["g" /* MatDatepickerModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["j" /* MatExpansionModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["l" /* MatGridListModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["m" /* MatIconModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["o" /* MatListModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["p" /* MatMenuModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["s" /* MatProgressBarModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["t" /* MatProgressSpinnerModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["u" /* MatRadioModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["v" /* MatRippleModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["x" /* MatSidenavModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["y" /* MatSlideToggleModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["z" /* MatSliderModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["B" /* MatSnackBarModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["D" /* MatStepperModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["E" /* MatTableModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["F" /* MatTabsModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["G" /* MatToolbarModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["H" /* MatTooltipModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["q" /* MatNativeDateModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["C" /* MatSortModule */],
            __WEBPACK_IMPORTED_MODULE_52__angular_material__["r" /* MatPaginatorModule */],
            __WEBPACK_IMPORTED_MODULE_62__common_shared_pipe__["a" /* SharedPipe */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_13__slider_slider_service__["a" /* SliderService */], __WEBPACK_IMPORTED_MODULE_50_ngx_bootstrap_modal__["a" /* BsModalService */], __WEBPACK_IMPORTED_MODULE_10__header_topnav_topnav_service__["a" /* TopnavService */], __WEBPACK_IMPORTED_MODULE_26__common_shared_service__["a" /* SharedService */], __WEBPACK_IMPORTED_MODULE_27__common_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_25__header_breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */], __WEBPACK_IMPORTED_MODULE_39__services_portal_service__["a" /* PortalService */], __WEBPACK_IMPORTED_MODULE_40__auth_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_41__article_article_service__["a" /* ArticleService */], __WEBPACK_IMPORTED_MODULE_42__header_nav_nav_router_activator_service__["a" /* NavRouterActivator */], __WEBPACK_IMPORTED_MODULE_43__header_nav_nav_service__["a" /* NavService */], __WEBPACK_IMPORTED_MODULE_45__services_trans_service__["a" /* TransService */], __WEBPACK_IMPORTED_MODULE_38__dialogs_dialogs_service__["a" /* DialogsService */], __WEBPACK_IMPORTED_MODULE_29__search_search_service__["a" /* SearchService */]]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "../../../../../src/app/sidenav-dashboard/sidenav-dashboard.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".side-menu-list{\r\n    list-style: none;\r\n    padding: 0px;\r\n    margin: 0px;\r\n}\r\n\r\n.side-menu-list li:hover{\r\n    background-color: #eee;\r\n}\r\n\r\n.side-menu-list li a:hover{\r\n    color: #000;\r\n}\r\n\r\n.side-menu-list li a{\r\n    text-decoration: none;\r\n    display: block;\r\n    color: #787878;\r\n    padding: 10px 8px;\r\n}\r\n\r\n.topactive{\r\n    background-color: #eee !important;\r\n    color: #000 !important;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sidenav-dashboard/sidenav-dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\r\n    <ul class=\"side-menu-list\">\r\n        <li>\r\n          <a routerLinkActive=\"topactive\"  href=\"\" [routerLink]=\"['/dashboard']\"><i class=\"fa fa-dashboard\"></i> Dashboard</a>\r\n        </li>\r\n        <li>\r\n            <a routerLinkActive=\"topactive\" href=\"\" [routerLink]=\"['/profile']\"><i class=\"fa fa-user\"></i> Profile</a>\r\n        </li>\r\n        <li>\r\n            <a routerLinkActive=\"topactive\" href=\"\" [routerLink]=\"['/mailbox']\"><i class=\"fa fa-envelope\"></i> Inbox</a>\r\n        </li>\r\n        <li>\r\n            <a routerLinkActive=\"topactive\" href=\"\" [routerLink]=\"['/appsmgmt']\"><i class=\"fa fa-file\"></i> Application Management</a>\r\n        </li>\r\n        <li>\r\n            <a routerLinkActive=\"topactive\" href=\"\"><i class=\"fa fa-building\"></i> Company Profile</a>\r\n        </li>\r\n      </ul>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/sidenav-dashboard/sidenav-dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidenavDashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SidenavDashboardComponent = (function () {
    function SidenavDashboardComponent() {
    }
    SidenavDashboardComponent.prototype.ngOnInit = function () {
    };
    return SidenavDashboardComponent;
}());
SidenavDashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-sidenav-dashboard',
        template: __webpack_require__("../../../../../src/app/sidenav-dashboard/sidenav-dashboard.component.html"),
        styles: [__webpack_require__("../../../../../src/app/sidenav-dashboard/sidenav-dashboard.component.css")]
    }),
    __metadata("design:paramtypes", [])
], SidenavDashboardComponent);

//# sourceMappingURL=sidenav-dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/sidenavmain/sidenavmain.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n.mat-expansion-panel-header {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: row;\r\n            flex-direction: row;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    padding: 0 10px !important;\r\n  }\r\n  .mat-expansion-panel {\r\n    background:none;\r\n  }\r\n  \r\n  .mat-expansion-panel-header {\r\n    font-size: 16px;\r\n  }\r\n  \r\n  .mat-expansion-panel-header-title {\r\n    color: rgb(129, 129, 129);\r\n  }\r\n\r\n  #themeContainer1 {\r\n    bottom: 5px; }\r\n\r\n  \r\n  .mat-expansion-panel:not([class*=mat-elevation-z]) {\r\n    box-shadow:none !important;\r\n  }\r\n\r\n  .bgColor {\r\n    width: 20px;\r\n    height: 20px;\r\n    margin: 0px 8px 0 0;\r\n    padding: 0px;\r\n    top: 6px;\r\n    position: relative;\r\n}\r\n\r\n.fontOption{\r\n    width: 80%;\r\n    float: left;\r\n}\r\n\r\n.settingLbl{\r\n    color:rgb(129, 129, 129);\r\n    padding: 0px 0px 10px 0px;\r\n}\r\n\r\n.settingBtm{\r\n    padding: 0px 0 15px 0;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sidenavmain/sidenavmain.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"mySidenav\" class=\"sidenav\">\n    <a href=\"javascript:void(0)\" class=\"closebtn\" (click)=\"closeNav()\"><i class=\"fa fa-times\"></i></a>\n    <ul>\n        \n        <li>\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['contact']\"><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> {{ 'home.menu.contact' | translate }}</a> </li>\n        <li>\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['faq']\"><i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i> {{ 'home.menu.faq' | translate }}</a>\n        </li>\n        <li>\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['manual']\"><i class=\"fa fa-book\" aria-hidden=\"true\"></i> {{ 'home.menu.manual' | translate }}</a>\n        </li>\n        <li>\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['aboutus']\"><i class=\"fa fa-globe\" aria-hidden=\"true\"></i> {{ 'home.menu.aboutus' | translate }}</a>\n        </li>\n        <li>\n            <mat-expansion-panel>\n                <mat-expansion-panel-header>\n                  <mat-panel-title>\n                      <i class=\"fa fa-cog\" aria-hidden=\"true\"></i>&nbsp;{{ 'home.menu.setting' | translate }}\n                  </mat-panel-title>\n                </mat-expansion-panel-header>\n                \n                <div class=\"menu_botm\" id=\"confBar1\">\n                    <div  id=\"themeContainer\">\n\n                      <div  class=\"settingLbl\">\n                          Theme Color:\n                      </div>\n                      <div class=\"settingBtm\">\n                          <input #colorPanel *ngFor=\"let color of colors; let i = index; let firstItem = first\" (click)=\"setClickedColor(i, firstItem)\"  [class.colorPaletteActive]=\"i == selectedRow ? true: false\" type=\"button\" name=\"bgColor\" [(ngModel)]=\"bgColor\" [ngStyle]=\"{'background': color.bgColor, 'border': '1px solid', 'border-color': color.bgColor}\"  class=\"bgColorBtn bgColor\" value=\"{{color.bgColor}}\">\n                          <span><div (click)=\"resetBgColor()\" class=\"btn btn-xs btn-default\"><i class=\"fa fa-refresh\"></i></div></span>\n                      </div>\n                      <div  class=\"settingLbl\">\n                          Font Size :\n                      </div>\n                      <div class=\"settingBtm\">\n                          <button  [disabled]=\"minusBtn\" class=\"btn btn-default fontminus\" (click)=\"fontminus()\" style=\"border:1px solid white;padding: 3px; height: 25px; width: 28px; font-size:14px;\"><i class=\"fa fa-minus\"></i>A</button>\n                          <button  [disabled]=\"plusBtn\" class=\"fontplus btn btn-default\"  (click)=\"fontplus()\" style=\"border:1px solid white;padding: 3px; height: 25px; width: 28px; font-size:14px;\"><i class=\"fa fa-plus\"></i>A</button>\n                          <span><div class=\"fontreset btn btn-xs btn-default\" (click)=\"fontreset()\"><i class=\"fa fa-refresh\"></i></div></span>\n                      </div>\n                      <div class=\"settingLbl\">\n                          Font Type :\n                      </div>\n                      <div class=\"settingBtm\">\n                          <select #fontTy (change)=\"onChange($event, fontTy.value)\" id=\"fontOptSideMenu2\" class=\"form-control fontOption\">\n                              <option class=\"fontOpt1\" value=\"Roboto\">Roboto</option>\n                              <option class=\"fontOpt2\" value=\"Arial\">Arial</option>\n                              <option class=\"fontOpt3\" value=\"Times New Roman\">Times New Roman</option>\n                          </select>\n                          <span style=\"clear:both;\"><div (click)=\"resetFontStyle()\" id=\"resetFontStyle\" class=\"btn btn-xs btn-default\" style=\"padding:10px;\"><i class=\"fa fa-refresh\"></i></div></span>\n                      </div>\n                    \n                    </div>\n                  </div>\n             \n              </mat-expansion-panel>\n        </li>\n    </ul>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/sidenavmain/sidenavmain.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidenavmainComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_topnav_topnav_service__ = __webpack_require__("../../../../../src/app/header/topnav/topnav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var num = 0;
var SidenavmainComponent = (function () {
    function SidenavmainComponent(topnavservice) {
        this.topnavservice = topnavservice;
        this.minusBtn = false;
        this.plusBtn = false;
        this.langId = this.langId;
        this.openSlide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SidenavmainComponent.prototype.ngOnInit = function () {
        this.colors = this.topnavservice.getColors();
    };
    SidenavmainComponent.prototype.openNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
    };
    SidenavmainComponent.prototype.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
    SidenavmainComponent.prototype.setClickedColor = function (index, firstItem) {
        localStorage.setItem('themeColor', this.colors[index].bgColor);
        localStorage.setItem('themeIndex', index);
        this.selectedRow = index;
        this.firstItem = firstItem;
    };
    SidenavmainComponent.prototype.ngAfterViewInit = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(function () {
            if (localStorage.getItem('themeColor') == '' || localStorage.getItem('themeColor') == null || localStorage.getItem('themeColor') == '#00bdbb') {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#confBar1 li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
                localStorage.setItem('themeColor', '#00bdbb');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#confBar1 li > input.bgColorBtn:nth(0)').removeClass('colorPaletteActive');
            }
            if (localStorage.getItem('themeIndex') == '' || localStorage.getItem('themeIndex') == null || localStorage.getItem('themeIndex') == '0') {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#confBar1 li > input.bgColorBtn').removeClass('colorPaletteActive');
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#confBar1 li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#confBar1 li > input.bgColorBtn').removeClass('colorPaletteActive');
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#confBar1 li > input.bgColorBtn:nth(' + localStorage.getItem('themeIndex') + ')').addClass('colorPaletteActive');
            }
        });
        if (localStorage.getItem('customFontType')) {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', localStorage.getItem('customFontType'));
            __WEBPACK_IMPORTED_MODULE_2_jquery__('#fontOptSideMenu2 option[value="' + localStorage.getItem('customFontType') + '"]').attr('selected', 'selected');
        }
        else {
            __WEBPACK_IMPORTED_MODULE_2_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', 'Roboto');
            __WEBPACK_IMPORTED_MODULE_2_jquery__('#fontOptSideMenu2 option[value="Roboto"]').attr('selected', 'selected');
        }
    };
    SidenavmainComponent.prototype.resetBgColor = function () {
        localStorage.setItem('themeColor', '#00bdbb');
        localStorage.setItem('themeIndex', '0');
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#confBar1 li > input.bgColorBtn').removeClass('colorPaletteActive');
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#confBar1 li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
    };
    SidenavmainComponent.prototype.fontminus = function () {
        this.plusBtn = false;
        num = num - 1;
        this.fn_changeFont(num);
        if (num < -3) {
            this.minusBtn = true;
            this.plusBtn = false;
        }
        else if (num > -3) {
            this.minusBtn = false;
            //this.plusBtn = true
        }
    };
    SidenavmainComponent.prototype.fontplus = function () {
        this.minusBtn = false;
        num = num + 1;
        this.fn_changeFont(num);
        if (num > 3) {
            this.plusBtn = true;
            this.minusBtn = false;
        }
        else if (num < 3) {
            this.plusBtn = false;
            //this.minusBtn = true
        }
    };
    SidenavmainComponent.prototype.fontreset = function () {
        this.minusBtn = false;
        this.plusBtn = false;
        num = 0;
        this.fn_changeFont(num);
    };
    SidenavmainComponent.prototype.fn_changeFont = function (dynum) {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('.font-size-s').css('font-size', 14 + dynum + 'px');
    };
    SidenavmainComponent.prototype.onChange = function ($event, deviceValue) {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', deviceValue);
        localStorage.setItem('customFontType', deviceValue);
    };
    SidenavmainComponent.prototype.resetFontStyle = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#fontOptSideMenu2').val('Roboto');
        __WEBPACK_IMPORTED_MODULE_2_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', 'Roboto');
        //$('#fontOpt option[value="Roboto"]').attr("selected", "selected");
        localStorage.setItem('customFontType', 'Roboto');
    };
    return SidenavmainComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], SidenavmainComponent.prototype, "openSlide", void 0);
SidenavmainComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-sidenavmain',
        template: __webpack_require__("../../../../../src/app/sidenavmain/sidenavmain.component.html"),
        styles: [__webpack_require__("../../../../../src/app/sidenavmain/sidenavmain.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__header_topnav_topnav_service__["a" /* TopnavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__header_topnav_topnav_service__["a" /* TopnavService */]) === "function" && _b || Object])
], SidenavmainComponent);

var _a, _b;
//# sourceMappingURL=sidenavmain.component.js.map

/***/ }),

/***/ "../../../../../src/app/sidenavprotected/sidenavprotected.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n.mat-expansion-panel-header {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: row;\r\n            flex-direction: row;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    padding: 0 10px !important;\r\n  }\r\n  .mat-expansion-panel {\r\n    background:none;\r\n  }\r\n  \r\n  .mat-expansion-panel-header {\r\n    font-size: 16px;\r\n  }\r\n  \r\n  .mat-expansion-panel-header-title {\r\n    color: rgb(129, 129, 129);\r\n  }\r\n\r\n  #themeContainer1 {\r\n    bottom: 5px; }\r\n\r\n  \r\n  .mat-expansion-panel:not([class*=mat-elevation-z]) {\r\n    box-shadow:none !important;\r\n  }\r\n\r\n  .bgColor {\r\n    width: 20px;\r\n    height: 20px;\r\n    margin: 0px 8px 0 0;\r\n    padding: 0px;\r\n    top: 6px;\r\n    position: relative;\r\n}\r\n\r\n.fontOption{\r\n    width: 80%;\r\n    float: left;\r\n}\r\n\r\n.settingLbl{\r\n    color:rgb(129, 129, 129);\r\n    padding: 0px 0px 10px 0px;\r\n}\r\n\r\n.settingBtm{\r\n    padding: 0px 0 15px 0;\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sidenavprotected/sidenavprotected.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"mySidenavProtected\" class=\"sidenav\">\n\n    <a href=\"javascript:void(0)\" class=\"closebtn\" (click)=\"closeNav()\"><i class=\"fa fa-times\"></i></a>\n\n    \n    <ul>\n\n      <li>\n          <a routerLinkActive=\"topactive\"  href=\"\" [routerLink]=\"['/dashboard']\"><i class=\"fa fa-dashboard\"></i> Dashboard</a>\n        </li>\n        <li>\n            <a routerLinkActive=\"topactive\" href=\"\" [routerLink]=\"['/profile']\"><i class=\"fa fa-user-circle\"></i> Profile</a>\n        </li>\n        <li>\n            <a routerLinkActive=\"topactive\" href=\"\" [routerLink]=\"['/mailbox']\"><i class=\"fa fa-envelope\"></i> Inbox</a>\n        </li>\n        <li>\n            <a routerLinkActive=\"topactive\" href=\"\" [routerLink]=\"['/appsmgmt']\"><i class=\"fa fa-file\"></i> Application Management</a>\n        </li>\n        <li>\n            <a routerLinkActive=\"topactive\" href=\"\"><i class=\"fa fa-building\"></i> Company Profile</a>\n        </li>\n        \n        <li>\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['contact']\"><i class=\"fa fa-map-marker\" aria-hidden=\"true\"></i> {{ 'home.menu.contact' | translate }}</a> </li>\n        <li>\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['faq']\"><i class=\"fa fa-question-circle\" aria-hidden=\"true\"></i> {{ 'home.menu.faq' | translate }}</a>\n        </li>\n        <li>\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['manual']\"><i class=\"fa fa-book\" aria-hidden=\"true\"></i> {{ 'home.menu.manual' | translate }}</a>\n        </li>\n        <li>\n          <a routerLinkActive=\"topactive\" [routerLink]=\"['aboutus']\"><i class=\"fa fa-globe\" aria-hidden=\"true\"></i> {{ 'home.menu.aboutus' | translate }}</a>\n        </li>\n        <li>\n            <a href=\"../uapsso/Logout\" (click)=\"logout()\"><i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i> {{ 'home.menu.logout' | translate }}</a>\n        </li>\n        <li>\n            <mat-expansion-panel>\n                <mat-expansion-panel-header>\n                  <mat-panel-title>\n                      <i class=\"fa fa-cog\" aria-hidden=\"true\"></i>&nbsp;{{ 'home.menu.setting' | translate }}\n                  </mat-panel-title>\n                </mat-expansion-panel-header>\n                \n                <div class=\"menu_botm\" id=\"confBar1\">\n                    <div  id=\"themeContainer1\">\n\n                      <div  class=\"settingLbl\">\n                          Theme Color:\n                      </div>\n                      <div class=\"settingBtm\">\n                          <input #colorPanel *ngFor=\"let color of colors; let i = index; let firstItem = first\" (click)=\"setClickedColor(i, firstItem)\"  [class.colorPaletteActive]=\"i == selectedRow ? true: false\" type=\"button\" name=\"bgColor\" [(ngModel)]=\"bgColor\" [ngStyle]=\"{'background': color.bgColor, 'border': '1px solid', 'border-color': color.bgColor}\"  class=\"bgColorBtn bgColor\" value=\"{{color.bgColor}}\">\n                          <span><div (click)=\"resetBgColor()\" class=\"btn btn-xs btn-default\"><i class=\"fa fa-refresh\"></i></div></span>\n                      </div>\n                      <div  class=\"settingLbl\">\n                          Font Size :\n                      </div>\n                      <div class=\"settingBtm\">\n                          <button  [disabled]=\"minusBtn\" class=\"btn btn-default fontminus\" (click)=\"fontminus()\" style=\"border:1px solid white;padding: 3px; height: 25px; width: 28px; font-size:14px;\"><i class=\"fa fa-minus\"></i>A</button>\n                          <button  [disabled]=\"plusBtn\" class=\"fontplus btn btn-default\"  (click)=\"fontplus()\" style=\"border:1px solid white;padding: 3px; height: 25px; width: 28px; font-size:14px;\"><i class=\"fa fa-plus\"></i>A</button>\n                          <span><div class=\"fontreset btn btn-xs btn-default\" (click)=\"fontreset()\"><i class=\"fa fa-refresh\"></i></div></span>\n                      </div>\n                      <div class=\"settingLbl\">\n                          Font Type :\n                      </div>\n                      <div class=\"settingBtm\">\n                          <select #fontTy (change)=\"onChange($event, fontTy.value)\" id=\"fontOptSideMenu1\" class=\"form-control fontOption\">\n                              <option class=\"fontOpt1\" value=\"Roboto\">Roboto</option>\n                              <option class=\"fontOpt2\" value=\"Arial\">Arial</option>\n                              <option class=\"fontOpt3\" value=\"Times New Roman\">Times New Roman</option>\n                          </select>\n                          <span style=\"clear:both;\"><div (click)=\"resetFontStyle()\" id=\"resetFontStyle\" class=\"btn btn-xs btn-default\" style=\"padding:10px;\"><i class=\"fa fa-refresh\"></i></div></span>\n                      </div>\n                    \n                    </div>\n                  </div>\n             \n              </mat-expansion-panel>\n        </li>\n        \n    </ul>\n  </div>"

/***/ }),

/***/ "../../../../../src/app/sidenavprotected/sidenavprotected.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidenavprotectedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__header_topnav_topnav_service__ = __webpack_require__("../../../../../src/app/header/topnav/topnav.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var num = 0;
var SidenavprotectedComponent = (function () {
    function SidenavprotectedComponent(topnavservice, config) {
        this.topnavservice = topnavservice;
        this.config = config;
        this.minusBtn = false;
        this.plusBtn = false;
        this.langId = this.langId;
        this.openSlide = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SidenavprotectedComponent.prototype.ngOnInit = function () {
        this.colors = this.topnavservice.getColors();
    };
    SidenavprotectedComponent.prototype.openNav = function () {
        document.getElementById("mySidenavProtected").style.width = "250px";
    };
    SidenavprotectedComponent.prototype.closeNav = function () {
        document.getElementById("mySidenavProtected").style.width = "0";
    };
    SidenavprotectedComponent.prototype.setClickedColor = function (index, firstItem) {
        localStorage.setItem('themeColor', this.colors[index].bgColor);
        localStorage.setItem('themeIndex', index);
        this.selectedRow = index;
        this.firstItem = firstItem;
    };
    SidenavprotectedComponent.prototype.logout = function (e) {
        e.preventDefault();
        location.href = this.config.urlUAP + 'uapsso/Logout';
    };
    SidenavprotectedComponent.prototype.ngAfterViewInit = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(function () {
            if (localStorage.getItem('themeColor') == '' || localStorage.getItem('themeColor') == null || localStorage.getItem('themeColor') == '#00bdbb') {
                __WEBPACK_IMPORTED_MODULE_3_jquery__('#confBar1 li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
                localStorage.setItem('themeColor', '#00bdbb');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_3_jquery__('#confBar1 li > input.bgColorBtn:nth(0)').removeClass('colorPaletteActive');
            }
            if (localStorage.getItem('themeIndex') == '' || localStorage.getItem('themeIndex') == null || localStorage.getItem('themeIndex') == '0') {
                __WEBPACK_IMPORTED_MODULE_3_jquery__('#confBar1 li > input.bgColorBtn').removeClass('colorPaletteActive');
                __WEBPACK_IMPORTED_MODULE_3_jquery__('#confBar1 li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_3_jquery__('#confBar1 li > input.bgColorBtn').removeClass('colorPaletteActive');
                __WEBPACK_IMPORTED_MODULE_3_jquery__('#confBar1 li > input.bgColorBtn:nth(' + localStorage.getItem('themeIndex') + ')').addClass('colorPaletteActive');
            }
        });
        if (localStorage.getItem('customFontType')) {
            __WEBPACK_IMPORTED_MODULE_3_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', localStorage.getItem('customFontType'));
            __WEBPACK_IMPORTED_MODULE_3_jquery__('#fontOptSideMenu1 option[value="' + localStorage.getItem('customFontType') + '"]').attr('selected', 'selected');
        }
        else {
            __WEBPACK_IMPORTED_MODULE_3_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', 'Roboto');
            __WEBPACK_IMPORTED_MODULE_3_jquery__('#fontOptSideMenu1 option[value="Roboto"]').attr('selected', 'selected');
        }
    };
    SidenavprotectedComponent.prototype.resetBgColor = function () {
        localStorage.setItem('themeColor', '#00bdbb');
        localStorage.setItem('themeIndex', '0');
        __WEBPACK_IMPORTED_MODULE_3_jquery__('#confBar1 li > input.bgColorBtn').removeClass('colorPaletteActive');
        __WEBPACK_IMPORTED_MODULE_3_jquery__('#confBar1 li > input.bgColorBtn:nth(0)').addClass('colorPaletteActive');
    };
    SidenavprotectedComponent.prototype.fontminus = function () {
        this.plusBtn = false;
        num = num - 1;
        this.fn_changeFont(num);
        if (num < -3) {
            this.minusBtn = true;
            this.plusBtn = false;
        }
        else if (num > -3) {
            this.minusBtn = false;
            //this.plusBtn = true
        }
    };
    SidenavprotectedComponent.prototype.fontplus = function () {
        this.minusBtn = false;
        num = num + 1;
        this.fn_changeFont(num);
        if (num > 3) {
            this.plusBtn = true;
            this.minusBtn = false;
        }
        else if (num < 3) {
            this.plusBtn = false;
            //this.minusBtn = true
        }
    };
    SidenavprotectedComponent.prototype.fontreset = function () {
        this.minusBtn = false;
        this.plusBtn = false;
        num = 0;
        this.fn_changeFont(num);
    };
    SidenavprotectedComponent.prototype.fn_changeFont = function (dynum) {
        __WEBPACK_IMPORTED_MODULE_3_jquery__('.font-size-s').css('font-size', 14 + dynum + 'px');
    };
    SidenavprotectedComponent.prototype.onChange = function ($event, deviceValue) {
        __WEBPACK_IMPORTED_MODULE_3_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', deviceValue);
        localStorage.setItem('customFontType', deviceValue);
    };
    SidenavprotectedComponent.prototype.resetFontStyle = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__('#fontOptSideMenu1').val('Roboto');
        __WEBPACK_IMPORTED_MODULE_3_jquery__('body, .font-size-s, .font-size-m, .font-size-l, .font-size-xl, .font-size-xxl').css('font-family', 'Roboto');
        //$('#fontOpt option[value="Roboto"]').attr("selected", "selected");
        localStorage.setItem('customFontType', 'Roboto');
    };
    return SidenavprotectedComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], SidenavprotectedComponent.prototype, "openSlide", void 0);
SidenavprotectedComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'gosg-sidenavprotected',
        template: __webpack_require__("../../../../../src/app/sidenavprotected/sidenavprotected.component.html"),
        styles: [__webpack_require__("../../../../../src/app/sidenavprotected/sidenavprotected.component.css")]
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__header_topnav_topnav_service__["a" /* TopnavService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__header_topnav_topnav_service__["a" /* TopnavService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__config_app_config_module__["b" /* AppConfig */]) === "function" && _c || Object])
], SidenavprotectedComponent);

var _a, _b, _c;
//# sourceMappingURL=sidenavprotected.component.js.map

/***/ }),

/***/ "../../../../../src/app/slider/slider.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".sliderBox {\r\n  position: absolute;\r\n  right: 20%;\r\n  min-width: 470px;\r\n  margin-right: 20px;\r\n  background: rgba(102, 102, 102, 0.85);\r\n  z-index: 999;\r\n  padding: 10px;\r\n  top: 25%;\r\n  max-width: 550px;\r\n}\r\n\r\n  .slider_img{\r\n      width:65% !important;\r\n  }\r\n\r\n   .btn-right{\r\n    position: absolute;\r\n    bottom: 100px;\r\n    right: 15px;\r\n    font-size: 30px;\r\n    z-index: 999;\r\n    color: #fff;\r\n    cursor: pointer;\r\n  }\r\n\r\n  .btn-left{\r\n    position: absolute;\r\n    bottom: 100px;\r\n    left: 15px;\r\n    font-size: 30px;\r\n    z-index: 999;\r\n    color: #fff;\r\n    cursor: pointer;\r\n  }\r\n\r\n@media screen and (max-width: 760px) and (min-width: 320px) {\r\n  .sliderBox {\r\n    top: 45%;\r\n    margin-right: 16px;\r\n    left: 6%;\r\n    min-width: 94%;\r\n    margin: 0px 10px; }\r\n  .sliderContainer:after {\r\n    background-image: linear-gradient(to bottom, transparent 34%, #a7a495 47%) !important;\r\n    background-image: -webkit-linear-gradient(to bottom, transparent 34%, #a7a495 47%) !important;\r\n    height: 320px !important; }\r\n    .slider_img{\r\n      width:110% !important;\r\n  }\r\n\r\n  .btn-right{\r\n    position: absolute;\r\n    bottom:0px;\r\n    right: 10px;\r\n    font-size: 30px;\r\n    z-index: 999;\r\n    color: #fff;\r\n    cursor: pointer;\r\n  }\r\n\r\n  .btn-left{\r\n    position: absolute;\r\n    bottom: 0px;\r\n    left: 10px;\r\n    font-size: 30px;\r\n    z-index: 999;\r\n    color: #fff;\r\n    cursor: pointer;\r\n  }\r\n    }\r\n\r\n.sliderBox h3 {\r\n  font-weight: 500;\r\n  margin-top: 10px;\r\n  text-transform: uppercase; }\r\n\r\n.sliderContainer:after {\r\n  display: block;\r\n  position: relative;\r\n  background-image: linear-gradient(to right, transparent 30%, #a7a495 58%), linear-gradient(to left, transparent 80%, #a7a495 95%);\r\n  background-image: -webkit-linear-gradient(to right, transparent 30%, #a7a495 58%), -webkit-linear-gradient(to left, transparent 80%, #a7a495 95%);\r\n  height: 500px;\r\n  width: 100%;\r\n  content: '';\r\n  margin-top: -43.8%; }\r\n\r\n \r\n\r\n.btn-left:hover, .btn-right:hover{\r\n    color: #333;\r\n}\r\n\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/slider/slider.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\" style=\"background:#a7a495; color:#fff; position:relative;\">\r\n    <owl-carousel  #owlElement [options]=\"{items: 1, dots: true, navigation: true, loop:true, autoplay:false}\" [items]=\"slides\"\r\n        [carouselClasses]=\"['owl-theme', 'row', 'sliding']\">\r\n        \r\n\r\n        \r\n        <div class=\"sliderContainer container item\" *ngFor=\"let data of slides; let i = index;\">\r\n            <div class=\"container\" style=\"margin: 0px auto; background-image: linear-gradient(to right, transparent 30%, #a7a495 58%), linear-gradient(to left, transparent 80%, #a7a495 95%);\">\r\n\r\n                <img [src]=\"data.image\" class=\"slider_img\">\r\n                <span class=\"sliderBox\">\r\n                        <h3 class=\"font-size-l\">{{data.title}}</h3>\r\n                        <p class=\"font-size-s\">{{data.description}}</p>\r\n                    </span>\r\n            </div>\r\n        </div>\r\n\r\n        \r\n\r\n    </owl-carousel>\r\n    <div class=\"container\" style=\"position:relative;\">\r\n        <a class=\"btn-left\" (click)=\"pre()\"><i class=\"fa fa-chevron-circle-left\"></i></a>\r\n        <a class=\"btn-right\" (click)=\"next()\"><i class=\"fa fa-chevron-circle-right\"></i></a>\r\n    </div>\r\n    \r\n</div>"

/***/ }),

/***/ "../../../../../src/app/slider/slider.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_owl_carousel__ = __webpack_require__("../../../../ng2-owl-carousel/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_owl_carousel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_owl_carousel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__header_breadcrumb_breadcrumb_service__ = __webpack_require__("../../../../../src/app/header/breadcrumb/breadcrumb.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var SliderComponent = (function () {
    function SliderComponent(translate, router, http, config, breadcrumbService) {
        var _this = this;
        this.translate = translate;
        this.router = router;
        this.http = http;
        this.config = config;
        this.breadcrumbService = breadcrumbService;
        this.langChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.lang = this.lang;
        this.sliderUrl = this.config.urlSlider;
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'en';
                    _this.getSlide(_this.lang);
                });
            }
            if (myLang == 'ms') {
                translate.get('HOME').subscribe(function (res) {
                    _this.lang = 'ms';
                    _this.getSlide(_this.lang);
                });
            }
        });
    }
    SliderComponent.prototype.ngOnInit = function () {
        console.log('slider.comp.ts');
        this.getSlide(this.lang);
        this.breadcrumb = this.breadcrumbService.getBreadcrumb();
        this.breadcrumb = this.breadcrumb.name = '';
        this.isValid = this.breadcrumbService.isValid = false;
    };
    SliderComponent.prototype.getSlide = function (lang) {
        var _this = this;
        return this.http.get(this.sliderUrl + '-' + lang)
            .map(function (res) { return res.json(); })
            .subscribe(function (resSliderData) {
            _this.slides = resSliderData;
        });
    };
    SliderComponent.prototype.next = function () {
        this.owlElement.next();
    };
    SliderComponent.prototype.pre = function () {
        this.owlElement.previous();
    };
    return SliderComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SliderComponent.prototype, "langChange", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('owlElement'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3_ng2_owl_carousel__["OwlCarousel"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_ng2_owl_carousel__["OwlCarousel"]) === "function" && _a || Object)
], SliderComponent.prototype, "owlElement", void 0);
SliderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-slider',
        template: __webpack_require__("../../../../../src/app/slider/slider.component.html"),
        styles: [__webpack_require__("../../../../../src/app/slider/slider.component.css")]
    }),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__config_app_config_module__["b" /* AppConfig */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__header_breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__header_breadcrumb_breadcrumb_service__["a" /* BreadcrumbService */]) === "function" && _f || Object])
], SliderComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=slider.component.js.map

/***/ }),

/***/ "../../../../../src/app/slider/slider.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SliderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// Import RxJs required methods


var SliderService = (function () {
    function SliderService() {
    }
    return SliderService;
}());
SliderService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], SliderService);

//# sourceMappingURL=slider.service.js.map

/***/ }),

/***/ "../../../../../src/app/staticpage/aboutus.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n<div class=\"row\">\r\n<div class=\"col-md-4\">\r\n    <sidenav></sidenav>\r\n</div>\r\n<div class=\"article-size warna_font col-md-6\" style=\"color: rgb(51, 51, 51);\">\r\n    <div class=\"row article-size warna_font font-size-s\" style=\"font-family: Roboto; color: rgb(51, 51, 51);\" >\r\n        <br>\r\n        <h4 class=\"font-size-m\" style=\"font-family: Roboto;font-weight: bold\">\r\n            Mengenai Kami <button (click)=\"speak('Mengenai Kami','')\">speak</button>\r\n        </h4>\r\n        <span class=\"article-size warna_font font-size-s article-highlight\" style=\"text-align: justify; font-family: Roboto; color: rgb(51, 51, 51);\">\r\n\t\t\t\t\t<div style=\"text-align: justify;\">MyGovernment ialah satu gerbang tunggal bagi semua perkhidmatan dalam talian kerajaan yang berkonsepkan&nbsp;<em>life event</em>&nbsp;yang berpaksikan rakyat.</div>\r\n                    <div style=\"text-align: justify;\">Tujuan Gerbang Dalam Talian Kerajaan ini adalah untuk meningkatkan kualiti penyampaian perkhidmatan kerajaan bagi memenuhi perkara berikut :</div>\r\n                    <div class=\"space10\" style=\"text-align: justify;\">&nbsp;</div>\r\n                    <ol class=\"oList\" style=\"text-align: justify;\">\r\n                        <li>Meningkatkan kepuasan pelanggan melalui inisiatif kerajaan untuk merakyatkan perkhidmatan awam.</li>\r\n                        <li>Memenuhi keperluan rakyat dengan perkhidmatan kerajaan yang lebih telus, berdaya saing dan kompeten.</li>\r\n                        <li>Meningkatkan aksesibiliti ke atas perkhidmatan dalam talian kerajaan dengan transformasi perkhidmatan alaf baru.</li>\r\n                        <li>Meningkatkan sistem penyampaian perkhidmatan di persada global.</li>\r\n                    </ol>\t\t\t\r\n\t\t</span>\r\n    </div>\r\n</div>\r\n<div class=\"col-md-2\"></div>\r\n</div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/staticpage/aboutus.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutusComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutusComponent = (function () {
    function AboutusComponent() {
        //this.speak('Jon likes Iced Tea!','');
    }
    // say a message
    AboutusComponent.prototype.speak = function (text, callback) {
        var u = new SpeechSynthesisUtterance();
        u.text = text;
        u.lang = 'en-US';
        u.onend = function () {
            if (callback) {
                callback();
            }
        };
        u.onerror = function (e) {
            if (callback) {
                callback(e);
            }
        };
        speechSynthesis.speak(u);
    };
    return AboutusComponent;
}());
AboutusComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/staticpage/aboutus.component.html"),
        styles: ["\n    "]
    }),
    __metadata("design:paramtypes", [])
], AboutusComponent);

//# sourceMappingURL=aboutus.component.js.map

/***/ }),

/***/ "../../../../../src/app/staticpage/contact.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <div class=\"row\" style=\"margin-top: 20px;margin-bottom: 20px;\">\r\n        <div class=\"col-md-4 address\">\r\n            <h4 class=\"font-size-m\" style=\"font-weight: bold;\" [style.color]=\"getTheme()\">\r\n                HUBUNGI KAMI\r\n            </h4>\r\n            <br>\r\n            <p style=\"margin-left:0px\">UNIT PEMODENAN TADBIRAN <br>DAN PERANCANGAN PENGURUSAN MALAYSIA</p>\r\n            <p><span [style.background]=\"getTheme()\" class=\"glyphicon glyphicon-home primary\"></span> Aras 6, Blok B2 <br>Kompleks Jabatan Perdana Menteri <br>\r\n            Pusat Pentadbiran Kerajaan Persekutuan <br> 62502 Putrajaya Malaysia\r\n            </p>\r\n            <p><span [style.background]=\"getTheme()\" class=\"glyphicon glyphicon-home primary\"></span> Bangunan MKN Embassy Techzone <br>\r\n            Blok B, No. 3200 <br>\r\n            Jalan Teknorat 2 <br>\r\n            63000 Cyberjaya, Sepang <br>\r\n            Selangor Darul Ehsan\r\n            </p>\r\n            <p><span [style.background]=\"getTheme()\" class=\"glyphicon glyphicon-map-marker primary\"></span> 2.937855, 101.65420\r\n            </p>\r\n            <p><span [style.background]=\"getTheme()\" class=\"glyphicon glyphicon-phone-alt primary\"></span> 603 8000 8000\r\n            </p>\r\n            <p><span [style.background]=\"getTheme()\" class=\"glyphicon glyphicon-print primary\"></span> 603 8888 3721\r\n            </p>\r\n            <p><span [style.background]=\"getTheme()\" class=\"glyphicon glyphicon-envelope primary\"></span> admin[at]mampu[dot]gov[dot]my\r\n            </p>\r\n        </div>\r\n        <div class=\"col-md-8\">\r\n            <div class=\"tabs-section\">\r\n                <div class=\"tab-content\" id=\"tab-1\">\r\n                    <div class=\"map-responsive\">\r\n                        <iframe class=\"mapstyle\" src=\"https://www.google.com/maps/d/u/0/embed?mid=1HCp_1z3uCoY6LbkzQxveYauOp8o\"></iframe>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/staticpage/contact.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ContactComponent = (function () {
    function ContactComponent() {
    }
    ContactComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/staticpage/contact.component.html"),
        styles: [
            "\n        .map-responsive {\n            border-top:2px solid #1ebebc;\n        }\n\n        p {\n          color:black;\n          font-size:14px;\n        }\n\n        .glyphicon{\n            color:white;\n        }\n\n        body {\n            font-family: Roboto, sans-serif;\n        }\n\n        .mapstyle {\n            width:100%;\n            height:400px;\n            frameborder:0;\n            border:0;\n        }\n\n        "
        ]
    })
], ContactComponent);

//# sourceMappingURL=contact.component.js.map

/***/ }),

/***/ "../../../../../src/app/staticpage/dataprotection.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <sidenav></sidenav>\r\n        </div>\r\n        <div class=\"article-size warna_font col-md-6\" style=\"color: rgb(51, 51, 51);\">\r\n            <div class=\"row article-size warna_font font-size-s\" style=\"font-family: Roboto; color: rgb(51, 51, 51);\">\r\n                <br>\r\n                <h4 class=\"font-size-m\" style=\"font-family: Roboto;font-weight: bold\">\r\n                    Akta Perlindungan Data Peribadi\r\n                </h4>\r\n                <span class=\"article-size warna_font font-size-s article-highlight\" style=\"text-align: justify; font-family: Roboto; color: rgb(51, 51, 51);\">\t\t\t\t\t\r\n\t\t\t\t<p><span>Jabatan Perlindungan Data Peribadi (JPDP) merupakan agensi di bawah Kementerian&nbsp;</span><span>Komunikasi dan Multimedia Malaysia (KKMM) yang ditubuhkan pada 16 Mei 2011 selepas&nbsp;</span><span>Parlimen meluluskan Rang Undang-undang berkaitan Akta Perlindungan Data Peribadi 2010&nbsp;</span><span>(APDP) iaitu Akta 709.</span></p>\r\n                <p><span>Tanggungjawab utama Jabatan ini ialah untuk mengawalselia pemprosesan data peribadi&nbsp;</span><span>individu yang terlibat dalam urus niaga komersial oleh Pengguna Data supaya tidak&nbsp;</span><span>disalahguna dan disalahpakai oleh pihak-pihak yang berkepentingan.</span></p>\r\n                <p><span>Keselamatan data peribadi pengguna perlu dilindungi bagi mencegah sebarang bentuk&nbsp;</span><span>penyalahgunaan terhadap penyimpanan atau pemprosesan data peribadi individu, awam&nbsp;</span><span>dan swasta di Malaysia secara transaksi komersial adalah termaktub di bawah APDP ini.</span></p>\r\n                <p><span>Dalam menguatkuasakan APDP, JPDP telah mensyaratkan kepada semua Golongan Pengguna&nbsp;</span><span>Data Peribadi yang terdiri daripada pihak individu mahupun swasta kecuali Kerajaan untuk&nbsp;</span><span>berdaftar secara rasmi bagi tujuan melindungi hak-hak pengguna dan awam.</span></p>\r\n                <p><span>JPDP diketuai oleh Ketua Pengarah dengan dibantu oleh seorang Timbalan Ketua Pengarah.&nbsp;</span><span>Manakala, terdapat tiga bahagian utama di JPDP iaitu Bahagian Pendaftaran dan Operasi,&nbsp;</span><span>Bahagian Pemantauan dan Bahagian Perundangan.</span></p>\r\n                <p>&nbsp;</p>\r\n                <p>Sila layari laman ini<br><a href=\"http://www.pdp.gov.my/index.php/my/\" target=\"_blank\">http://www.pdp.gov.my/index.php/my/</a></p>\r\n                </span>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-2\"></div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/staticpage/dataprotection.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataprotectionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var DataprotectionComponent = (function () {
    function DataprotectionComponent() {
    }
    return DataprotectionComponent;
}());
DataprotectionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/staticpage/dataprotection.component.html"),
        styles: ["\n     a {\n            color: #337ab7;\n            text-decoration: none;\n      }\n      a:hover, a:focus {\n        color: #1ebebc;\n        text-decoration: underline;\n      }\n    "]
    })
], DataprotectionComponent);

//# sourceMappingURL=dataprotection.component.js.map

/***/ }),

/***/ "../../../../../src/app/staticpage/faq.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col-md-3\"></div>\r\n    <div class=\"article-size warna_font col-md-6\" style=\"color: rgb(51, 51, 51);\">\r\n        <div class=\"row article-size warna_font font-size-s\" style=\"font-family: Roboto; color: rgb(51, 51, 51);font-size:14px\">\r\n            <br>\r\n            <h4 class=\"font-size-m\" style=\"font-family: Roboto;font-weight: bold\">\r\n                Soalan Lazim\r\n            </h4>\r\n            <!--p *ngFor=\"let item of faqList\">{{item}}</p>\r\n            <p *ngFor=\"let item of faqAnswer\">{{item}}</p>\r\n            <br-->\r\n            <span class=\"article-size warna_font font-size-s article-highlight\" style=\"text-align: justify; font-family: Roboto; color: rgb(51, 51, 51);\">\r\n                <p><strong>1. Apakah Gerbang Rasmi Kerajaan Malaysia MyGovernment?</strong></p>\r\n                <p><span>Gerbang Rasmi Kerajaan Malaysia MyGovernment ialah satu gerbang tunggal bagi semua maklumat perkhidmatan dalam talian kerajaan yang berkonsepkan&nbsp;</span><em>life event</em><span>&nbsp;yang berpaksikan rakyat.</span></p>\r\n            <br>\r\n            <p><strong>2. Apakah tujuan gerbang ini disediakan?</strong></p>\r\n            <p>Tujuan Gerbang Dalam Talian Kerajaan ini adalah untuk meningkatkan kualiti penyampaian perkhidmatan kerajaan\r\n                bagi memenuhi perkara berikut :</p>\r\n            <ol>\r\n                <li>Meningkatkan kepuasan pelanggan melalui inisiatif kerajaan untuk merakyatkan perkhidmatan awam.</li>\r\n                <li>Memenuhi keperluan rakyat dengan perkhidmatan kerajaan yang lebih telus, berdaya saing dan kompeten.</li>\r\n                <li>Meningkatkan aksesibiliti ke atas perkhidmatan dalam talian kerajaan dengan transformasi perkhidmatan alaf\r\n                    baru.</li>\r\n                <li>Meningkatkan sistem penyampaian perkhidmatan di persada global.</li>\r\n            </ol>\r\n            <br>\r\n            <p><strong>3. Bagaimanakah sekiranya saya ingin menggunakan perkhidmatan dalam talian?</strong></p>\r\n            <p><span>Anda perlu menjadi pengguna berdaftar terlebih dahulu. Untuk mendaftar anda perlu klik pada pautan Daftar dan buat pilihan antara warganegara dan bukan warganegara. Seterusnya isikan maklumat perihal diri anda dan klik butang Hantar.</span></p>\r\n            <br>\r\n            <p><strong>4. Bagaimanakah saya boleh mengetahui sekiranya pendaftaran berjaya dan akaun saya telah aktif?</strong></p>\r\n            <ol>\r\n                <li>Anda akan menerima notifikasi “Permohonan pendaftaran anda telah berjaya” selepas menghantar permohonan;</li>\r\n                <li>Anda akan menerima emel pengaktifan; &nbsp;</li>\r\n                <li>Semak emel dan klik pautan yang dihantar untuk mengaktifkan akaun;</li>\r\n                <li>Skrin pengaktifan akaun akan dipaparkan;</li>\r\n                <li>Masukkan alamat emel atau No. Kad Pengenalan/Pasport dan juga kata laluan yang telah didaftarkan;</li>\r\n                <li>Kemudian, klik pada butang ‘Log Masuk’.</li>\r\n            </ol>\r\n            <br>\r\n            <p><strong>5. Sekiranya saya terlupa kata laluan, apakah yang harus saya lakukan?</strong></p>\r\n            <p>1. Klik pautan ‘Gagal Akses Akaun?’pada skrin Log Masuk;<br>2. Klik pada ikon Kata Laluan;&nbsp;<br>3. Masukkan\r\n                Emel yang berdaftar dengan Gerbang Rasmi Kerajaan Malaysia MyGovernment;<br>4. Masukkan teks pengesahan yang\r\n                dipamerkan; dan\r\n                <br>5. Klik [<strong>SET SEMULA</strong>] untuk set semula kata laluan.</p>\r\n            <br>\r\n            <p><strong>6. Apakah jenis pelayar yang boleh digunakan untuk melayari Gerbang Rasmi Kerajaan Malaysia MyGovernment?</strong></p>\r\n            <p>Gerbang Rasmi Kerajaan Malaysia MyGovernment disokong oleh pelayar sesawang&nbsp;Google Chrome Versi 57.0 dan\r\n                Mozilla Firefox Versi 53.0 ke atas.</p>\r\n            <br>\r\n            <p><strong>7. Adakah saya boleh melayari Gerbang Rasmi Kerajaan Malaysia MyGovernment menggunakan telefon bimbit?</strong></p>\r\n            <p>Ya, anda boleh melayari Gerbang Rasmi Kerajaan Malaysia MyGovernmentversi mudah alih menerusi telefon pintar\r\n                atau&nbsp;tablet dengan hanya dengan klik pada ikon . Kemudian, imbas kod QR yang disediakan untuk melayari\r\n                Gerbang Rasmi Kerajaan Malaysia MyGovernment dalam versi mudah alih. &nbsp;</p>\r\n            <br>\r\n            <p><strong>8. Adakah saya boleh menukar bahasa yang digunakan di Gerbang Rasmi Kerajaan Malaysia MyGovernment?</strong></p>\r\n            <p>Ya, Gerbang Rasmi Kerajaan Malaysia MyGovernment menyediakan dua pilihan bahasa iaitu Bahasa Malaysia dan Bahasa\r\n                Inggeris.\r\n            </p>\r\n            <br>\r\n            <p><strong>9. Di manakah saya boleh menghantar sebarang maklum balas terhadap Gerbang Rasmi Kerajaan Malaysia MyGovernment?</strong></p>\r\n            <p>Sebarang aduan, pertanyaan, cadangan dan apa jua jenis soalan boleh disalurkan di pautan Aduan dan Pertanyaan.\r\n                Pautan Aduan dan Pertanyaan terletak di ruangan bawah pada laman utama. Lengkapkan borang maklum balas dan\r\n                pastikan ruangan mandatori (*) diisi. Seterusnya klik butang ‘Hantar'. Aduan dan Pertanyaan akan dibalas\r\n                dalam masa tiga (3) hari bekerja.</p>\r\n            <br>\r\n            <p><strong>10. Apakah faedah dan keistimewaan pengguna berdaftar?</strong></p>\r\n            <p>Hanya pengguna berdaftar sahaja boleh menggunakan aplikasi dalam talian yang telah disediakan di Gerbang Rasmi\r\n                Kerajaan Malaysia MyGovernment.</p>\r\n            <br>\r\n            <p><strong>11. Apakah yang terkandung di pautan ‘Topik’?</strong></p>\r\n            <p>‘Topik’ memaparkan informasi serta perkhidmatan dalam talian mengikut topik-topik terkini di Malaysia. Anda hanya\r\n                perlu klik pada pautan tersebut untuk mendapatkan informasi dan menggunakan perkhidmatan dalam talian yang\r\n                disediakan.</p>\r\n            <br>\r\n            <p><strong>12. Apakah yang terkandung di pautan ‘MyInfo’?</strong></p>\r\n            <p>Pautan ‘MyInfo’ memaparkan maklumat-maklumat berkaitan dengan Kerajaan Malaysia khasnya iaitu Yang Di-Pertuan\r\n                Agong, Perdana Menteri Malaysia, Kerajaan Malaysia, Kabinet Malaysia dan Maklumat Malaysia.</p>\r\n            <br>\r\n            <p><strong>13. Apakah yang terkandung di pautan ‘MyInisiatif’?</strong></p>\r\n            <p>Pautan ‘MyInisiatif’ mengandungi maklumat-maklumat berkaitan inisiatif yang telah dilaksanakan oleh Kerajaan\r\n                Malaysia bagi mentransformasi perkhidmatan awam yang berpaksikan rakyat untuk meningkatkan produktiviti,\r\n                kecekapan dan keberkesanan sistem penyampaian perkhidmatan Kerajaan. &nbsp;MyInisiatif meliputi&nbsp; 5&nbsp;<em>thematic area</em>&nbsp;iaitu\r\n                ‘Whole Of Government’, &nbsp;<a href=\"../../../../../public/cms/topic/36/\">Data Terbuka Kerajaan,&nbsp;</a>&nbsp;e-Penyertaan,&nbsp;\r\n                <a href=\"../../../../../public/cms/topic/69/\">Pelbagai saluran Perkhidmatan Penghantaran dan Mengembangkan penggunaan&nbsp;</a>&nbsp;dan&nbsp;\r\n                <a href=\"../../../../../public/cms/topic/70/\">Merapatkan Jurang Digital &amp; Memberi Tumpuan Kepada Golongan Rentan</a>.</p>\r\n            <br>\r\n            <p><strong>14. Bagaimana saya ingin menghubungi sekiranya saya mempunyai sebarang masalah?</strong></p>\r\n            <p>Anda boleh menghubungi pusat panggilan setempat 1Malaysia One Call Centre (1MOCC) di talian 03-8000 8000.</p>\r\n            <br>\r\n            </span>\r\n        </div>\r\n    </div>\r\n    <div class=\"col-md-3\"></div>\r\n\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/staticpage/faq.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__faq_service__ = __webpack_require__("../../../../../src/app/staticpage/faq.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/staticpage/faq.component.html"),
        styles: ["\n     a {\n            color: #337ab7;\n            text-decoration: none;\n      }\n      a:hover, a:focus {\n        color: #1ebebc;\n        text-decoration: underline;\n      }\n     "
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_1__faq_service__["a" /* FaqService */]]
    })
], FaqComponent);

//# sourceMappingURL=faq.component.js.map

/***/ }),

/***/ "../../../../../src/app/staticpage/faq.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/of.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Import RxJs required methods



var FaqService = (function () {
    function FaqService(http) {
        this.http = http;
    }
    FaqService.prototype.getFaqData = function () {
        return this.http.get('./app/apidata/faq-all.json')
            .map(function (res) { return res.json(); });
    };
    return FaqService;
}());
FaqService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], FaqService);

var _a;
//# sourceMappingURL=faq.service.js.map

/***/ }),

/***/ "../../../../../src/app/staticpage/manual.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-4\">\r\n            <sidenav></sidenav>\r\n        </div>\r\n        <div class=\"article-size warna_font col-md-6\" style=\"color: rgb(51, 51, 51);\">\r\n            <div class=\"row article-size warna_font font-size-s\" style=\"font-family: Roboto; color: rgb(51, 51, 51);\">\r\n                <br>\r\n                <h4 class=\"font-size-m\" style=\"font-family: Roboto;font-weight:bold\">\r\n                    Manual Pengguna\r\n                </h4>\r\n                <span class=\"article-size warna_font font-size-s article-highlight\" style=\"text-align: justify; font-family: Roboto; color: rgb(51, 51, 51);\">\t\t\t\r\n\t\t<p>Manual pengguna ini bertujuan memberikan bantuan kepada pengguna untuk menggunakan Gerbang Rasmi Kerajaan Malaysia ini</p>\r\n            <ol type=\"i\">\r\n            <li><a href=\"https://www.malaysia.gov.my/public/static/uploads/user_manual/Manual%20Pengguna%20-%20Portal%20MyGovernment.pdf\" target=\"_blank\">Manual Pengguna - Portal MyGovernment</a></li>\r\n            <li><a href=\"https://www.malaysia.gov.my/public/static/uploads/user_manual/Manual%20Pengguna%20-%20Pengurusan%20Akaun%20Pengguna.pdf\" target=\"_blank\">Manual Pengguna - Pengurusan Akaun Pengguna</a></li>\r\n            <li><a href=\"https://www.malaysia.gov.my/public/static/media/documents/Manual_Pengguna__Agensi_KPDNKK_QR3U20Q.pdf\" target=\"_blank\">Manual Pengguna - Agensi (KPDNKK)</a></li>\r\n            <li><a href=\"https://www.malaysia.gov.my/public/static/uploads/user_manual/Manual%20Pengguna%20%E2%80%93%20Agensi%20(PERHILITAN).pdf\" target=\"_blank\">Manual Pengguna - Agensi (PERHILITAN)</a></li>\r\n            </ol>\r\n\t\t</span>\r\n            </div>\r\n        </div>\r\n        <div class=\"col-md-2\"></div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/staticpage/manual.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManualComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ManualComponent = (function () {
    function ManualComponent() {
    }
    return ManualComponent;
}());
ManualComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/staticpage/manual.component.html"),
        styles: ["\n      a {\n            color: #337ab7;\n            text-decoration: none;\n      }\n      a:hover, a:focus {\n        color: #1ebebc;\n        text-decoration: underline;\n      }\n\n    "]
    })
], ManualComponent);

//# sourceMappingURL=manual.component.js.map

/***/ }),

/***/ "../../../../../src/app/staticpage/sidenav.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12\">\r\n    <br>\r\n    <h4 class=\"sideBarMenu--title padding-bottom-s warna_font font-size-m\" style=\"font-family: Roboto; color: rgb(51, 51, 51);\"><a class=\"headerLink warna_font font-size-m\" href=\"https://www.malaysia.gov.my/public/cms/topic/17/\" style=\"font-family: Roboto; color: rgb(51, 51, 51);\">\r\n      Mengenai Kami\r\n       <i class=\"fa fa-link\"></i>\r\n      </a>\r\n    </h4>\r\n    <ul class=\"menu_left_article\" style=\"list-style:none;\">\r\n        <li>\r\n            <div class=\"col-xs-12 col-md-12 col-sm-12 padding-bottom-l\">\r\n                <div class=\"\">\r\n                    <a routerLinkActive=\"topactive\" class=\"warna_font sideBarMenu--link font-size-s\" style=\"font-weight: 600; font-family: Roboto; color: rgb(51, 51, 51);\"\r\n                        [routerLink]=\"['/aboutus']\">\r\n                       {{ 'home.menu.aboutus' | translate }}\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </li>\r\n        <br>\r\n        <li>\r\n            <div class=\"col-xs-12 col-md-12 col-sm-12 padding-bottom-l\">\r\n                <div class=\"\">\r\n                    <a routerLinkActive=\"topactive\" class=\"warna_font sideBarMenu--link font-size-s\" style=\"font-weight: 600; font-family: Roboto; color: rgb(51, 51, 51);\"\r\n                         [routerLink]=\"['/dataprotection']\">\r\n                        Akta Perlindungan Data Peribadi\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </li>\r\n        <br>\r\n        <li>\r\n            <div class=\"col-xs-12 col-md-12 col-sm-12 padding-bottom-l\">\r\n                <div class=\"side_active\">\r\n                    <a routerLinkActive=\"topactive\" class=\"warna_font sideBarMenu--link font-size-s\" style=\"font-weight: 600; font-family: Roboto; color: rgb(51, 51, 51);\"\r\n                     [routerLink]=\"['/manual']\">\r\n                        <!--span style=\"color: rgb(0, 189, 187);\"-->\r\n                        {{ 'home.menu.manual' | translate }}\r\n                    </a>\r\n                </div>\r\n            </div>\r\n        </li>\r\n    </ul>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/staticpage/sidenav.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidenavComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SidenavComponent = (function () {
    function SidenavComponent() {
    }
    return SidenavComponent;
}());
SidenavComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'sidenav',
        template: __webpack_require__("../../../../../src/app/staticpage/sidenav.component.html"),
        styles: ["\n        h4 {\n            padding-left:55px;\n        }\n\n        a{\n            line-height:35px;\n        }\n\n        .headerLink{\n            line-height:0px;\n        }\n\n        .topactive{\n            text-decoration:underline;\n            font-weight:bold;\n        }\n\n    "]
    })
], SidenavComponent);

//# sourceMappingURL=sidenav.component.js.map

/***/ }),

/***/ "../../../../../src/app/topic-feature/topic-feature.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n            .read-more-state {\r\n                display: none;\r\n            }\r\n\r\n           .topicContainer{\r\n               max-height: none;\r\n               background-image: url(\"/assets/images/bg-topic.jpg\");\r\n               background-size: cover;\r\n           }\r\n\r\n           .topicBox {\r\n                padding: 10px 40px;\r\n                text-align: center;\r\n            }\r\n\r\n           .topicBox a {\r\n                text-decoration: none;\r\n                display: block;\r\n                height: 180px;\r\n                padding: 0px 20px;\r\n                overflow: hidden;\r\n            }\r\n\r\n            @-webkit-keyframes bounce1 {\r\n                0%, 20%, 60%, 100% {\r\n                    -webkit-transform: translateY(0);\r\n                    transform: translateY(0);\r\n\t            }\r\n\r\n                40% {\r\n                    -webkit-transform: translateY(-10px);\r\n                    transform: translateY(-10px);\r\n                }\r\n\r\n                80% {\r\n                    -webkit-transform: translateY(-10px);\r\n                    transform: translateY(-10px);\r\n                }\r\n            }\r\n\r\n            @keyframes bounce1 {\r\n                0%, 20%, 60%, 100% {\r\n                    -webkit-transform: translateY(0);\r\n                    transform: translateY(0);\r\n\t            }\r\n\r\n                40% {\r\n                    -webkit-transform: translateY(-10px);\r\n                    transform: translateY(-10px);\r\n                }\r\n\r\n                80% {\r\n                    -webkit-transform: translateY(-10px);\r\n                    transform: translateY(-10px);\r\n                }\r\n            }\r\n\r\n            .topicBox a:hover .topicBox-icon{\r\n                -webkit-animation: bounce1 1s;\r\n                animation: bounce1 1s;\r\n                color: #333;\r\n            }\r\n\r\n            .topicBox a:hover .topicBox-title h2{\r\n                color: #1ebebc;\r\n            }\r\n\r\n            .topicBox-title h2{\r\n                font-weight: 600;\r\n                color: #333333;\r\n                font-size: 25px;\r\n            }\r\n\r\n            .topicBox-icon {\r\n                font-size: 35px;\r\n                top: 18px;\r\n                position: relative;\r\n                color: #1ebebc;\r\n            }\r\n\r\n            .topicBox-description {\r\n                color: #666666;\r\n                height: 60px;\r\n                overflow: hidden;\r\n            }\r\n\r\n            .font-size-1{\r\n                text-align: center;\r\n                font-family: Roboto;\r\n                color: rgb(0, 189, 187);\r\n                font-size: 24px;\r\n                font-weight: 500;\r\n                padding-bottom: 15px;\r\n            }\r\n\r\n            .topicBox a:hover {\r\n                text-decoration: none;\r\n                background: #f3f3f3;\r\n                border-bottom: 1px #1ebebc solid;\r\n            }\r\n\r\n            .topicBox a {\r\n                text-decoration: none;\r\n                display: block;\r\n                height: 180px;\r\n                padding: 0px 20px;\r\n                overflow: hidden;\r\n            }\r\n\r\n                .font-size-s{\r\n                    color:black;\r\n                }\r\n          \r\n                a {\r\n                    color: #337ab7;\r\n                    text-decoration: none;\r\n                }\r\n                a:hover, a:focus {\r\n                    color: #1ebebc;\r\n                    text-decoration: underline;\r\n                }\r\n\r\n                .topicBox-title h2{\r\n                    font-weight: 600;\r\n                    color: #333333;\r\n                    font-size: 25px;\r\n                }\r\n\r\n\r\n                .btn{\r\n                    display: block;\r\n                    margin: 10px auto;\r\n                    width: 150px;\r\n                }\r\n\r\n                .read-more-target {\r\n                    opacity: 0;\r\n                    max-height: 0;\r\n                    font-size: 0;\r\n                    transition: .25s ease;\r\n                }\r\n\r\n                .read-more-state:checked ~ .read-more-wrap .read-more-target {\r\n                    opacity: 1;\r\n                    font-size: inherit;\r\n                    max-height: 999em;\r\n                }\r\n\r\n                .read-more-container{\r\n                    height: 50px;\r\n                    background: #fff;\r\n                    position: relative;\r\n                    text-align: center;\r\n                }\r\n\r\n                .read-more-trigger {\r\n                    z-index:9999;\r\n                    cursor: pointer;\r\n                    display: inline-block;\r\n                    padding: 0 .5em;\r\n                    line-height: 2;\r\n                    border: 1px solid #ddd;\r\n                }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/topic-feature/topic-feature.component.html":
/***/ (function(module, exports) {

module.exports = "<input type=\"checkbox\" class=\"read-more-state\" id=\"post-2\"  [(ngModel)]=\"filter\" (click)=\"filterData()\" />\r\n<div class=\"container topicContainer read-more-wrap\" >\r\n    <div class=\"row\"> \r\n        <div class=\"col-md-4 col-xs-12 col-sm-12 topicBox\" *ngFor=\"let topics of topicsData; let i = index\" [attr.data-index]=\"i\" [ngClass]=\"{'read-more-target': i >= 6}\">\r\n            <a href=\"\" [routerLink]=\"['/topic', topics.topic_id]\" [style.border-color]=\"getTheme()\">\r\n            <div class=\"topicBox-icon\"><i class=\"fa fa-{{topics.icon}}  warna_title_color\" aria-hidden=\"true\" style=\"color: rgb(0, 189, 187);\" [style.color]=\"getTheme()\"></i></div>\r\n            <div class=\"topicBox-title\"><h2 class=\"font-size-l\" style=\"font-family: Roboto;\">{{topics.name}}</h2></div>\r\n            <div class=\"topicBox-description font-size-s\" style=\"font-family: Roboto;\">{{topics.description}}</div>\r\n            </a>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"container read-more-container\">\r\n    <label for=\"post-2\" class=\"read-more-trigger btn btn-md\" [style.background]=\"getTheme()\">\r\n        {{filter ? ('home.expandButton.less' | translate) : ('home.expandButton.more' | translate) }} <i [ngClass]=\"filter ? 'fa fa-long-arrow-up' : 'fa fa-long-arrow-down'\"></i>\r\n    </label> \r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/topic-feature/topic-feature.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopicFeatureComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__ = __webpack_require__("../../../../@ngx-translate/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__ = __webpack_require__("../../../../../src/app/config/app.config.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var TopicFeatureComponent = (function () {
    function TopicFeatureComponent(translate, http, config) {
        var _this = this;
        this.translate = translate;
        this.http = http;
        this.config = config;
        this.lang = 'en';
        this.filter = false;
        this.topicUrl = this.config.urlTopics;
        this.lang = translate.currentLang;
        translate.onLangChange.subscribe(function (event) {
            var myLang = translate.currentLang;
            if (myLang == 'en') {
                _this.lang = 'en';
                _this.getData(_this.lang);
            }
            if (myLang == 'ms') {
                _this.lang = 'ms';
                _this.getData(_this.lang);
            }
        });
    }
    TopicFeatureComponent.prototype.ngOnInit = function () {
        console.log('topic-feature.comp.ts');
        this.getData(this.lang);
    };
    TopicFeatureComponent.prototype.getData = function (lang) {
        var _this = this;
        return this.http.get(this.topicUrl + '-' + lang + '.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (topicJsonData) {
            _this.topicsData = topicJsonData[0].data;
        });
    };
    TopicFeatureComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    TopicFeatureComponent.prototype.showMore = function () {
    };
    TopicFeatureComponent.prototype.filterData = function () {
        this.filter = !this.filter; // this will change value of it true and false
    };
    return TopicFeatureComponent;
}());
TopicFeatureComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-topic-feature',
        template: __webpack_require__("../../../../../src/app/topic-feature/topic-feature.component.html"),
        styles: [__webpack_require__("../../../../../src/app/topic-feature/topic-feature.component.css")]
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["a" /* APP_CONFIG */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngx_translate_core__["c" /* TranslateService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__config_app_config_module__["b" /* AppConfig */]) === "function" && _c || Object])
], TopicFeatureComponent);

var _a, _b, _c;
//# sourceMappingURL=topic-feature.component.js.map

/***/ }),

/***/ "../../../../../src/assets/fonts/Roboto/Roboto-Light.ttf":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "Roboto-Light.fc84e998bc29b297ea20.ttf";

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.protected.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_protected_module__ = __webpack_require__("../../../../../src/app/protected.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_hammerjs__);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_protected_module__["a" /* ProtectedModule */]);
//# sourceMappingURL=main.protected.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.protected.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map
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
var ContactComponent = (function () {
    function ContactComponent() {
    }
    ContactComponent.prototype.getTheme = function () {
        return localStorage.getItem('themeColor');
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    core_1.Component({
        templateUrl: './app/staticpage/contact.component.html',
        styles: [
            "\n        .map-responsive {\n            border-top:2px solid #1ebebc; \n        }\n        \n        p {\n          color:black;\n          font-size:14px;\n        }\n      \n        .glyphicon{\n            color:white;\n        }\n\n        body {\n            font-family: Roboto, sans-serif;\n        }\n\n        .mapstyle {\n            width:100%;\n            height:400px;\n            frameborder:0;\n            border:0;\n        }\n        \n        "
        ]
    }),
    __metadata("design:paramtypes", [])
], ContactComponent);
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map
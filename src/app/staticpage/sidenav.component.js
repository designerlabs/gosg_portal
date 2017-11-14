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
var SidenavComponent = (function () {
    function SidenavComponent() {
    }
    return SidenavComponent;
}());
SidenavComponent = __decorate([
    core_1.Component({
        selector: 'sidenav',
        templateUrl: "./app/staticpage/sidenav.component.html",
        styles: ["\n        h4 {\n            padding-left:55px;\n        }\n\n        a{\n            line-height:35px;\n        }\n\n        .headerLink{\n            line-height:0px;\n        }\n\n        .topactive{\n            text-decoration:underline;\n            font-weight:bold;\n        }\n\n    "]
    }),
    __metadata("design:paramtypes", [])
], SidenavComponent);
exports.SidenavComponent = SidenavComponent;
//# sourceMappingURL=sidenav.component.js.map
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
var phone_number_pipe_1 = require("../../pipes/phone-number/phone-number.pipe");
var PhoneNumberFormatterDirective = (function () {
    function PhoneNumberFormatterDirective(elementRef, phoneNumberPipe) {
        this.elementRef = elementRef;
        this.phoneNumberPipe = phoneNumberPipe;
        this.el = this.elementRef.nativeElement;
    }
    PhoneNumberFormatterDirective.prototype.ngOnInit = function () {
        var self = this;
        setTimeout(function () {
            self.el.value = self.phoneNumberPipe.transform(self.el.value);
        }, 500);
    };
    PhoneNumberFormatterDirective.prototype.onKeyPress = function (evt, value) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
        var regex = /[0-9]|\./;
        if (!regex.test(key) || (this.el.value + '').length > 13) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault)
                theEvent.preventDefault();
        }
    };
    PhoneNumberFormatterDirective.prototype.onKeyUp = function (evt, value) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
            this.el.value = this.phoneNumberPipe.transform(value);
        }
    };
    PhoneNumberFormatterDirective.prototype.onBlur = function (value) {
        this.el.value = this.phoneNumberPipe.transform(value);
    };
    return PhoneNumberFormatterDirective;
}());
__decorate([
    core_1.HostListener("keypress", ["$event", "$event.target.value"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PhoneNumberFormatterDirective.prototype, "onKeyPress", null);
__decorate([
    core_1.HostListener("keyup", ["$event", "$event.target.value"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], PhoneNumberFormatterDirective.prototype, "onKeyUp", null);
__decorate([
    core_1.HostListener("blur", ["$event.target.value"]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PhoneNumberFormatterDirective.prototype, "onBlur", null);
PhoneNumberFormatterDirective = __decorate([
    core_1.Directive({ selector: "[phoneNumberFormatter]" }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        phone_number_pipe_1.PhoneNumberPipe])
], PhoneNumberFormatterDirective);
exports.PhoneNumberFormatterDirective = PhoneNumberFormatterDirective;
//# sourceMappingURL=phone-number.directive.js.map
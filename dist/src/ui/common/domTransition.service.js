import { __decorate, __metadata } from "tslib";
import { fromEvent, Injectable } from "@plumejs/core";
let DomTransition = class DomTransition {
    transition = '';
    constructor() {
        this.whichTransitionEnd();
    }
    onTransitionEnd(element, callback, duration) {
        let called = false;
        let unSubscribeEvent = null;
        const _fn = () => {
            if (!called) {
                called = true;
                callback && callback();
                unSubscribeEvent();
                unSubscribeEvent = null;
            }
        };
        unSubscribeEvent = fromEvent(element, this.transition, () => {
            _fn();
        });
        setTimeout(_fn, duration);
    }
    animationsComplete(element) {
        return new Promise((resolve) => {
            if (element.getAnimations) {
                Promise.allSettled(element.getAnimations().map((animation) => animation.finished)).then(() => {
                    resolve(true);
                });
            }
            else {
                resolve(true);
            }
        });
    }
    whichTransitionEnd() {
        const element = document.createElement('div');
        const styleobj = element.style;
        const transitions = {
            transition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'otransitionend'
        };
        for (const t in transitions) {
            if (typeof styleobj[t] !== 'undefined') {
                this.transition = transitions[t];
                break;
            }
        }
    }
};
DomTransition = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], DomTransition);
export { DomTransition };

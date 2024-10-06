import { __decorate, __metadata } from "tslib";
import { Component, html, Input, signal } from '@plumejs/core';
import stepperStyles from './stepper.scss?inline';
let Stepper = class Stepper {
    currentStep = signal(1);
    stepperOptions = signal();
    render() {
        if (this.stepperOptions()) {
            return html `<div class="stepper" style="--step: ${this.currentStep()}">
        ${this.stepperOptions().steps.map(({ title, caption }, index) => {
                return html `<div class="step" data-completed="${this.currentStep() > index + 1 ? 'true' : 'false'}">
            <div class="title">${title}</div>
            ${caption ? html `<div class="caption">${caption}</div>` : ''}
          </div>`;
            })}
      </div>`;
        }
        else {
            return '';
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], Stepper.prototype, "currentStep", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], Stepper.prototype, "stepperOptions", void 0);
Stepper = __decorate([
    Component({
        selector: 'ui-stepper',
        styles: stepperStyles
    })
], Stepper);
export { Stepper };

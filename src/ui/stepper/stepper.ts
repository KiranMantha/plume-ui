import { Component, html, IHooks, Input, signal } from '@plumejs/core';
import { StepperOptions } from './stepper.model';
import stepperStyles from './stepper.scss?inline';

@Component({
  selector: 'ui-stepper',
  styles: stepperStyles
})
export class Stepper implements IHooks {
  @Input()
  currentStep = signal(1);

  @Input()
  stepperOptions = signal<StepperOptions>();

  render() {
    if (this.stepperOptions()) {
      return html`<div class="stepper" style="--step: ${this.currentStep()}">
        ${this.stepperOptions().steps.map(({ title, caption }, index) => {
          return html`<div class="step" data-completed="${this.currentStep() > index + 1 ? 'true' : 'false'}">
            <div class="title">${title}</div>
            ${caption ? html`<div class="caption">${caption}</div>` : ''}
          </div>`;
        })}
      </div>`;
    } else {
      return '';
    }
  }
}

import { IHooks } from '@plumejs/core';
import { StepperOptions } from './stepper.model';
export declare class Stepper implements IHooks {
    currentStep: import("@plumejs/core/dist/src").Signal<number>;
    stepperOptions: import("@plumejs/core/dist/src").Signal<StepperOptions>;
    render(): "" | DocumentFragment;
}

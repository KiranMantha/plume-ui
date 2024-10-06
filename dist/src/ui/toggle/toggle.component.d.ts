import { IHooks, Renderer } from '@plumejs/core';
export interface IToggleInput {
    onText?: string;
    offText?: string;
    isSelected?: boolean;
}
export declare class ToggleComponent implements IHooks {
    private renderer;
    toggleOptions: import("@plumejs/core/dist/src").Signal<IToggleInput>;
    private _id;
    constructor(renderer: Renderer);
    private toggleChange;
    render(): DocumentFragment;
}

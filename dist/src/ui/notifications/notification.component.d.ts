import { IHooks, Renderer } from '@plumejs/core';
import { Message } from './message';
export declare class NotificationMessage implements IHooks {
    private renderer;
    message: import("@plumejs/core/dist/src").Signal<Message>;
    constructor(renderer: Renderer);
    onPropertiesChanged(): void;
    onDismiss(e: Event): void;
    render(): DocumentFragment;
}

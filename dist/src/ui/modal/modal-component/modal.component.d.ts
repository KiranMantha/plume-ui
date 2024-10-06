import { IHooks } from '@plumejs/core';
import { Subject } from 'rxjs';
import { IModalData } from '../modal.interface';
import { DomTransition } from '../../common';
export declare class ModalComponent implements IHooks {
    private domSrvc;
    modalData: import("@plumejs/core/dist/src").Signal<IModalData>;
    onClose: Subject<void>;
    onOpen: Subject<void>;
    private modalContentRef;
    constructor(domSrvc: DomTransition);
    mount(): Promise<void>;
    unmount(): void;
    private _close;
    private _renderModalCloseButton;
    render(): DocumentFragment;
}

import { IHooks, Renderer } from '@plumejs/core';
import { DataGridOptions } from './dataGrid..model';
export declare class DataGrid implements IHooks {
    private renderer;
    private columnHeaders;
    private columnValues;
    private colGroup;
    private rowData;
    private rowActions;
    private tableClassName;
    private variant;
    gridOptions: import("@plumejs/core/dist/src").Signal<DataGridOptions>;
    constructor(renderer: Renderer);
    mount(): void;
    onPropertiesChanged(): void;
    renderRowActions(rowData: Record<string, string | number | boolean>): "" | DocumentFragment;
    render(): "" | DocumentFragment;
}

import { Component, html, IHooks, Input, Renderer, signal } from '@plumejs/core';
import toggleStyles from './toggle.component.scss?inline';

export interface IToggleInput {
  onText?: string;
  offText?: string;
  isSelected?: boolean;
}

const defaultToggleOptions: IToggleInput = {
  onText: 'ON',
  offText: 'OFF',
  isSelected: false
};

@Component({
  selector: 'ui-toggle-button',
  standalone: true,
  styles: toggleStyles,
  deps: [Renderer]
})
export class ToggleComponent implements IHooks {

  @Input()
  toggleOptions = signal<IToggleInput>({ ...defaultToggleOptions }, (_prevOptions, newOptions) => {
    return {
      ...defaultToggleOptions,
      ...newOptions
    }
  });

  private _id = Math.random();

  constructor(private renderer: Renderer) {}

  private toggleChange(e: Event) {
    const value = (e.target as any).checked;
    this.renderer.emitEvent('togglechange', value);
  }

  render() {
    return html`<div class="toggle-container" part="toggle-container">
      <span>${this.toggleOptions().offText.translate()}</span>
      <input
        type="checkbox"
        id="${this._id}"
        checked="${!!this.toggleOptions().isSelected}"
        onchange=${(e: Event) => {
          this.toggleChange(e);
        }}
      />
      <label for="${this._id}"></label>
      <span>${this.toggleOptions().onText.translate()}</span>
    </div>`;
  }
}

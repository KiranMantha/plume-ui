import { Component, html, IHooks, Input, Renderer, signal } from '@plumejs/core';
import notificationStyles from './notification.component.scss?inline';
import { NotificationType } from './notification.type';
import { Message } from './message';

@Component({
  selector: 'ui-notification-message',
  standalone: true,
  styles: notificationStyles,
  deps: [Renderer]
})
export class NotificationMessage implements IHooks {
  @Input()
  message = signal<Message>();

  constructor(private renderer: Renderer) {}

  onPropertiesChanged() {
    if(this.message().autoHide) {
      setTimeout(() => {
        this.renderer.emitEvent('dismiss', { index: this.message().index });
      }, 2000);
    }
  };

  onDismiss(e: Event) {
    e.preventDefault();
    this.renderer.emitEvent('dismiss', { index: this.message().index });
  }

  render() {
    if (this.message() && this.message().content) {
      return html`
        <div
          part="notification"
          class="notification ${this.message().type === NotificationType.Info
            ? 'is-info'
            : this.message().type === NotificationType.Danger
            ? 'is-danger'
            : ''}"
        >
          ${this.message().content}
          <button
            class="dismiss ${this.message().autoHide ? 'hide-notify' : ''}"
            onclick=${(e: Event) => {
              this.onDismiss(e);
            }}
          >
            &times;
          </button>
        </div>
      `;
    } else {
      return html``;
    }
  }
}

import { __decorate, __metadata } from "tslib";
import { Component, html, Input, Renderer, signal } from '@plumejs/core';
import notificationStyles from './notification.component.scss?inline';
import { NotificationType } from './notification.type';
let NotificationMessage = class NotificationMessage {
    renderer;
    message = signal();
    constructor(renderer) {
        this.renderer = renderer;
    }
    onPropertiesChanged() {
        if (this.message().autoHide) {
            setTimeout(() => {
                this.renderer.emitEvent('dismiss', { index: this.message().index });
            }, 2000);
        }
    }
    ;
    onDismiss(e) {
        e.preventDefault();
        this.renderer.emitEvent('dismiss', { index: this.message().index });
    }
    render() {
        if (this.message() && this.message().content) {
            return html `
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
            onclick=${(e) => {
                this.onDismiss(e);
            }}
          >
            &times;
          </button>
        </div>
      `;
        }
        else {
            return html ``;
        }
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NotificationMessage.prototype, "message", void 0);
NotificationMessage = __decorate([
    Component({
        selector: 'ui-notification-message',
        standalone: true,
        styles: notificationStyles,
        deps: [Renderer]
    }),
    __metadata("design:paramtypes", [Renderer])
], NotificationMessage);
export { NotificationMessage };

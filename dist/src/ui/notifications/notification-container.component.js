import { __decorate } from "tslib";
import { Component, html, signal } from '@plumejs/core';
import { Subject } from 'rxjs';
import notificationContainerStyles from './notification-container.component.scss?inline';
let NotificationContainerComponent = class NotificationContainerComponent {
    _notifications = signal([], (prevMessages, newMessages) => {
        return [...prevMessages, ...newMessages];
    });
    onDismiss = new Subject();
    setNotifications(message) {
        message.index = this._notifications().length;
        this._notifications.set([message]);
    }
    dismiss(index) {
        this._notifications.set(this._notifications().filter((m) => {
            if (m.index !== index)
                return m;
        }));
        this.onDismiss.next(this._notifications.length);
    }
    _renderNotifications() {
        if (this._notifications().length > 0) {
            const list = this._notifications().map((msg) => {
                return html `
          <ui-notification-message
            data-input=${{ message: msg }}
            ondismiss=${(e) => { this.dismiss(e.detail.index); }}
          ></ui-notification-message>
        `;
            });
            return list;
        }
        else {
            return html `<div></div>`;
        }
    }
    unmount() {
        this.onDismiss.unsubscribe();
    }
    render() {
        return html ` <div class="notifications_wrapper" part="notifications_wrapper">${this._renderNotifications()}</div> `;
    }
};
NotificationContainerComponent = __decorate([
    Component({
        selector: 'ui-notification-container',
        styles: notificationContainerStyles,
        standalone: true
    })
], NotificationContainerComponent);
export { NotificationContainerComponent };

import { Component, ComponentRef, html, IHooks, signal } from '@plumejs/core';
import { Subject } from 'rxjs';
import { Message } from './message';
import notificationContainerStyles from './notification-container.component.scss?inline';

@Component({
  selector: 'ui-notification-container',
  styles: notificationContainerStyles,
  standalone: true
})
export class NotificationContainerComponent implements IHooks {
  private _notifications = signal<Array<Message>>([], (prevMessages, newMessages) => {
    return [...prevMessages, ...newMessages];
  });
  
  onDismiss: Subject<number> = new Subject();

  setNotifications(message: Message) {
    message.index = this._notifications().length
    this._notifications.set([message]);
  }

  private dismiss(index: number) {
    this._notifications.set(this._notifications().filter((m) => {
      if (m.index !== index) return m;
    }));
    this.onDismiss.next(this._notifications.length);
  }

  // private _renderNotification(target: ComponentRef<NotificationMessage>, notification: INotification) {
  //   target.setProps({ notification });
  //   if (notification.message.autoHide) {
  //     setTimeout(() => {
  //       notification.dismiss();
  //     }, 2000);
  //   }
  // }

  _renderNotifications() {
    if (this._notifications().length > 0) {
      const list = this._notifications().map((msg: Message) => {
        return html`
          <ui-notification-message
            data-input=${{message: msg}}
            ondismiss=${(e) => {this.dismiss(e.detail.index)}}
          ></ui-notification-message>
        `;
      });
      return list;
    } else {
      return html`<div></div>`;
    }
  }

  unmount() {
    this.onDismiss.unsubscribe();
  }

  render() {
    return html` <div class="notifications_wrapper" part="notifications_wrapper">${this._renderNotifications()}</div> `;
  }
}

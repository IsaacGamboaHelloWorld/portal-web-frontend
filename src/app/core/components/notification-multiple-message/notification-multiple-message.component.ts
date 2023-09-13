import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationModel } from '@app/application.model';
import { INotificationMMState } from '@store/reducers/global/notification-multiple-message/notification-multiple-message.reducer';

@Component({
  selector: 'app-notification-mm',
  templateUrl: './notification-multiple-message.component.html',
  styleUrls: ['./notification-multiple-message.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationMMComponent implements OnInit {
  public message: string;

  constructor(private model: ApplicationModel) {}

  ngOnInit(): void {
    this.infoNotificationMM$.subscribe((data: INotificationMMState) => {
      this.message = '';
      if (!!data) {
        if (data.overwriteMessage !== '') {
          this.message = data.overwriteMessage;
        } else {
          if (data.firstMessage) {
            this.message = data.dataMessage.message;
          } else {
            this.message = data.dataMessage.secondary_message;
          }
        }
      }

      setTimeout(() => {
        this.notificationClosed();
      }, this._getTimer(this.message));
    });
  }

  get infoNotificationMM$(): Observable<INotificationMMState> {
    return this.model.notificationMM$;
  }

  public notificationClosed(): void {
    this.model.notificationClosed();
    setTimeout((_) => {
      this.model.notificationReset();
    }, 600);
  }

  private _getTimer(_data: string): number {
    if (!!_data) {
      const valLength = _data.length;
      return (valLength * 80) / 1000;
    }
    return 0;
  }
}

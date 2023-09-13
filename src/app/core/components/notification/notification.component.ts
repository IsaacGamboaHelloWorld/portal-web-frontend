import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

import { ApplicationModel } from '@app/application.model';
import { TIME_CLOSE_NOTIFICATION } from '@core/constants/notification';
import { INotificationState } from '@store/reducers/global/notification/notification.reducer';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class NotificationComponent implements OnInit {
  constructor(private model: ApplicationModel) {}

  ngOnInit(): void {
    this.infoNotification$.subscribe((data: INotificationState) => {
      if (data.autoClosed) {
        setTimeout(() => {
          this.notificationClosed();
        }, TIME_CLOSE_NOTIFICATION);
      }
    });
  }

  get infoNotification$(): Observable<INotificationState> {
    return this.model.notification$;
  }

  public notificationClosed(): void {
    this.model.notificationClosed();
    setTimeout((_) => {
      this.model.notificationReset();
    }, 600);
  }
}

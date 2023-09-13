import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { ApplicationState } from '@store/state/application.state';

@Injectable()
export class HomeModelDocuments {
  constructor(private store: Store<ApplicationState>) {}

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(message, autoClosed, typeNotification),
    );
  }
}

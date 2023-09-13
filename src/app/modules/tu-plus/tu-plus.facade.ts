import { Injectable } from '@angular/core';
import {
  NotificationClosedAction,
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../store/state/application.state';

@Injectable()
export class TuPlusSerivceFacade {
  constructor(private _store: Store<ApplicationState>) {}

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {
    this._store.dispatch(new NotificationResetAction());
    this._store.dispatch(
      new NotificationShowAction(message, autoClosed, typeNotification),
    );
  }

  public notificationClosed(): void {
    this._store.dispatch(new NotificationClosedAction());
  }
}

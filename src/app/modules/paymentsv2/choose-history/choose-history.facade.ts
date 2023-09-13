import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationState } from '@store/state/application.state';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '../../../store/actions/global/notification/notification.action';
import { ChooseHistoryLoad } from './store/actions/choose-history.actions';
import { IHistoricPayments } from './store/reducers/choose-history.reducer';
import { selectHistoricPayments } from './store/selectors/choose-history.selector';

@Injectable()
export class ChooseHistoryFacade {
  constructor(private store: Store<ApplicationState>) {}

  public historicPayments$: Observable<IHistoricPayments> = this.store.pipe(
    select(selectHistoricPayments),
  );

  public fetchHistoric(): void {
    this.store.dispatch(ChooseHistoryLoad());
  }

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

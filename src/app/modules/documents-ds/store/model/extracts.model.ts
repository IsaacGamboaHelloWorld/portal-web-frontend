import { Injectable } from '@angular/core';
import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { IStatementDs } from '@app/core/interfaces/statement/statement';
import { Product } from '@app/core/models/products/product';
import * as notificationAction from '@app/store/actions/global/notification/notification.action';
import { select, Store } from '@ngrx/store';

import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';

import * as periodsActions from '../actions/extracts-periods.actions';
import * as extractsActions from '../actions/extracts.actions';
import {
  selectExtracts,
  selectExtractsPeriods,
  selectProducts,
} from '../selectors/documents.selectors';

@Injectable()
export class ExtractsModel {
  constructor(private store: Store<ApplicationState>) {}

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public stateEstracts$: Observable<IPdfdata> = this.store.pipe(
    select(selectExtracts),
  );

  public statePeriodsEstracts$: Observable<IStatementDs> = this.store.pipe(
    select(selectExtractsPeriods),
  );

  public creationFail(errorMessage: string): void {
    this.store.dispatch(extractsActions.ExtractsFail({ errorMessage }));
  }

  public creationLoad(
    account: string,
    accountType: string,
    period: IPeriodItem,
  ): void {
    this.store.dispatch(
      extractsActions.ExtractsLoad({ account, accountType, period }),
    );
  }

  public creationReset(): void {
    this.store.dispatch(extractsActions.ExtractsReset());
  }

  public creationPeriodsFail(errorMessage: string): void {
    this.store.dispatch(periodsActions.ExtractsPeriodsFail({ errorMessage }));
  }

  public creationPeriodsLoad(account: string, accountType: string): void {
    this.store.dispatch(
      periodsActions.ExtractsPeriodsLoad({ account, accountType }),
    );
  }

  public reset(): void {
    this.store.dispatch(periodsActions.ExtractsPeriodsReset());
    this.store.dispatch(extractsActions.ExtractsReset());
  }

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
    hideClose: boolean = false,
    subMessage: string = '',
  ): void {
    this.store.dispatch(new notificationAction.NotificationResetAction());
    this.store.dispatch(
      new notificationAction.NotificationShowAction(
        message,
        autoClosed,
        typeNotification,
        hideClose,
        subMessage,
      ),
    );
  }

  public notificationClosed(): void {
    this.store.dispatch(new notificationAction.NotificationClosedAction());
  }

  public notificationReset(): void {
    this.store.dispatch(new notificationAction.NotificationResetAction());
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { IOrderPaymentAll } from '../../entities/order-of-payment';
import { OrderOfPaymentService } from '../../services/order-of-payment.service';
import * as OrdePaymentActions from '../actions/order-of-payment.actions';

@Injectable()
export class OrderOfPaymentEffects {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private orderOfPaymentService: OrderOfPaymentService,
  ) {}

  LoadOrderOfPayment: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdePaymentActions.OrderOfPaymentLoad),
      switchMap((action: any) => {
        return this.orderOfPaymentService.orderOfPayment().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IOrderPaymentAll) => {
            if (!!data && data.success) {
              this.orderOfPaymentService.addItems(data.payrollLoans);
              return OrdePaymentActions.OrderOfPaymentSuccess(data);
            }
            return OrdePaymentActions.OrderOfPaymentFail(data);
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(OrdePaymentActions.OrderOfPaymentFail({}));
          }),
        );
      }),
    ),
  );
}

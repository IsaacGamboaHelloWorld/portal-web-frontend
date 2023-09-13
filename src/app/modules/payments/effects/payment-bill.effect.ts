import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { ClassNotification } from '@app/core/constants/notification';
import { PaymentInterface } from '@app/core/interfaces/paymentObligation.interface';
import { Events } from '@core/constants/events';
import { Navigate, Titles } from '@core/constants/navigate';
import { EventsService } from '@core/services/tag_manager/events.service';
import * as fromPayment from '@store/actions/models/payment/payment-bills-public/payments-bills-public.action';
import { PaymentBillResponseInterface } from '../../../core/interfaces/paymentBills.interface';
import { PaymentModel } from '../payment.model';
import { PaymentBillService } from '../services/bills-payment/bill-payment.service';

@Injectable()
export class PaymentBillEffect {
  constructor(
    private actions$: Actions,
    private paymentService: PaymentBillService,
    private model: PaymentModel,
    private events: EventsService,
  ) {}

  @Effect()
  PayBill: Observable<Action> = this.actions$.pipe(
    ofType<fromPayment.PaymentBillsPublicLoadAction>(
      fromPayment.PAYMENT_BILLS_PUBLIC_LOAD,
    ),
    switchMap((action: fromPayment.PaymentBillsPublicLoadAction) => {
      return this.paymentService
        .publicBillPayment(
          action.originAccountId,
          action.originAccountType,
          action.amount,
          action.biller,
          action.billerId,
          action.billerName,
          action.billerNickName,
          action.contract,
          action.invoice,
          action.dueDate,
          action.scheduledDate,
          action.expirationDate,
          action.isScheduledPayment,
          action.isDonePayment,
          action.primaryBillerAmount,
          action.primaryBillerCurrencyCode,
          action.reference,
          action.secondaryBillerAmount,
          action.secondaryBillerCurrencyCode,
        )
        .pipe(
          map((res: PaymentBillResponseInterface) => {
            if (!isNullOrUndefined(res.success) && res.success) {
              this.events.event({
                event: Events.page_view,
                pagePath:
                  window.location.pathname + Navigate.payment_success_normal,
                pageTitle: Titles.payment_success_normal,
              });
              return new fromPayment.PaymentBillsPublicSuccessAction(res);
            }
            this.model.notificationOpen(
              res.errorMessage,
              true,
              ClassNotification.ERROR,
            );
            return new fromPayment.PaymentBillsPublicFailAction(
              res.errorMessage,
            );
          }),
          catchError((err: PaymentInterface) => {
            this.model.notificationOpen(
              err.errorMessage,
              true,
              ClassNotification.ERROR,
            );
            return of(
              new fromPayment.PaymentBillsPublicFailAction(err.errorMessage),
            );
          }),
        );
    }),
  );
}

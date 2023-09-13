import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as fromRecurring from '@store/actions/models/payment/recurring/recurring-payment.action';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ClassNotification } from '../../../core/constants/notification';
import { IRecurringPaymentResponse } from '../../../core/interfaces/paymentBills.interface';
import { PaymentModel } from '../payment.model';
import { RecurringPaymentService } from '../services/recurring/recurring-payment.service';

@Injectable()
export class RecurringPaymentEffect {
  constructor(
    private actions$: Actions,
    private destinationService: RecurringPaymentService,
    private model: PaymentModel,
  ) {}

  @Effect()
  SaveRecurring: Observable<Action> = this.actions$.pipe(
    ofType(fromRecurring.RecurringPaymentLoadAction),
    switchMap((action) => {
      return this.destinationService.saveRecurring(action.recurring).pipe(
        map((data: IRecurringPaymentResponse) => {
          if (!isNullOrUndefined(data) && data.success) {
            return fromRecurring.RecurringPaymentSuccessAction(data);
          }
          this.model.notificationOpen(
            data.errorMessage,
            true,
            ClassNotification.ERROR,
          );
          return fromRecurring.RecurringPaymentFailAction(data.errorMessage);
        }),
        catchError((err) => {
          this.model.notificationOpen(
            err.errorMessage,
            true,
            ClassNotification.ERROR,
          );
          return of(fromRecurring.RecurringPaymentFailAction(err.errorMessage));
        }),
      );
    }),
  );
}

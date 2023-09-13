import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import * as BanksActions from '@modules/paymentsv2/financial-ob/store/actions/banks.action';
import * as DeletePaymentActions from '@modules/paymentsv2/financial-ob/store/actions/delete-payment.action';
import * as AllPaymentsActions from '@modules/paymentsv2/financial-ob/store/actions/registered-bills.action';
import { ClassNotification } from '../../../../../core/constants/notification';
import { INextFOPaymentsResponse } from '../../entities/financial-op';
import { FinancialOpFacade } from '../../finantial-ob.facade';
import { FinancialOpService } from '../../services/financial-op.service';

@Injectable()
export class FinancialOpEffect {
  constructor(
    private actions$: Actions,
    private _service: FinancialOpService,
    private _facade: FinancialOpFacade,
  ) {}

  LoadAllFinancialOp: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllPaymentsActions.AllFinancialOpPaymentsLoad),
      switchMap((action) => {
        return this._service.allRegisteredFinancialOp().pipe(
          take(1),
          map((data: INextFOPaymentsResponse) => {
            if (!!data.success && data.success) {
              return AllPaymentsActions.AllFinancialOpPaymentsSuccess(
                data.registeredLoans,
              );
            }
            return AllPaymentsActions.AllFinancialOpPaymentsFail(
              data.errorMessage,
            );
          }),
          catchError((err) =>
            of(AllPaymentsActions.AllFinancialOpPaymentsFail(err.errorMessage)),
          ),
        );
      }),
    ),
  );

  LoadBank: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(BanksActions.BanksLoadAction),
      switchMap((action) => {
        return this._service.banks().pipe(
          take(1),
          map((resp) => {
            if (!!resp) {
              return BanksActions.BanksSuccessAction(resp);
            }
            return BanksActions.BanksFailAction(resp.errorMessage);
          }),
          catchError((err) => of(BanksActions.BanksFailAction(err))),
        );
      }),
    ),
  );

  DeletePayment: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(DeletePaymentActions.DeleteLoanLoad),
      switchMap((action) => {
        return this._service.doDelete(action.deleteData).pipe(
          take(1),
          map((data: any) => {
            if (!!data.success && data.success) {
              return DeletePaymentActions.DeleteLoanSuccess(data);
            }
            this._facade.notificationOpen(
              data.errorMessage,
              false,
              ClassNotification.ERROR,
            );
            return DeletePaymentActions.DeleteLoanFail(data.errorMessage);
          }),
          catchError((error) => {
            this._facade.notificationOpen(
              error,
              false,
              ClassNotification.ERROR,
            );
            return of(DeletePaymentActions.DeleteLoanFail(error.errorMessage));
          }),
        );
      }),
    ),
  );
}

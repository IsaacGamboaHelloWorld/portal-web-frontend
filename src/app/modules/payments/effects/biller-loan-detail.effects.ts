import { Injectable } from '@angular/core';
import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { IAnswerBillerLoanDetail } from '../entities/biller-loan-detail';
import { PaymentModel } from '../payment.model';
import { LoanDetailService } from '../services/loan-detail/loan-detail.service';
import * as LoanDetailActions from '../store/actions/biller-loan-detail.actions';

@Injectable()
export class BillerLoanDetailEffect {
  constructor(
    private actions$: Actions,
    private loanDetailService: LoanDetailService,
    private model: PaymentModel,
    private globalData: GlobalDataService,
  ) {}

  LoadLoanDetail: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LoanDetailActions.BillerLoanDetailLoad),
      switchMap((action: any) => {
        return this.loanDetailService.getLoanDetail(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerBillerLoanDetail) => {
            if (!!data && data.success) {
              return LoanDetailActions.BillerLoanDetailSuccess(data);
            }
            this.model.billerLoanDetailFail(data.errorMessage);
            return LoanDetailActions.BillerLoanDetailFail(data.errorMessage);
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(
              LoanDetailActions.BillerLoanDetailFail(error.errorMessage),
            );
          }),
        );
      }),
    ),
  );
}

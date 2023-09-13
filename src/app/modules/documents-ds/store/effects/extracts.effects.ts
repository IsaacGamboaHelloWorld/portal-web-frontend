import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { IStatmentState } from './../state/documents.state';

import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { TranslateService } from '@ngx-translate/core';

import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { StatementsService } from '@app/modules/detail-product/components/statements/services/statements.service';
import { isNullOrUndefined } from 'util';
import * as PeriodsActions from '../actions/extracts-periods.actions';
import * as ExtractsActions from '../actions/extracts.actions';
import { ExtractsModel } from '../model/extracts.model';

@Injectable()
export class ExtractsEffect {
  constructor(
    private actions$: Actions,
    private model: ExtractsModel,
    private globalData: GlobalDataService,
    private translate: TranslateService,
    private statementServices: StatementsService,
  ) {}

  Periods$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PeriodsActions.ExtractsPeriodsLoad),
      switchMap((action: any) => {
        return this.statementServices
          .getPeriods(action.account, action.accountType)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: IStatmentState) => {
              if (!!data && data.success) {
                return PeriodsActions.ExtractsPeriodsSuccess({
                  statement: data,
                });
              }
              this._showErrorToast(data.errorMessage);
              return PeriodsActions.ExtractsPeriodsFail({
                errorMessage: data.errorMessage,
              });
            }),
            catchError((_error) => {
              const error = errorMessage500;
              this._showErrorToast(error);
              return of(
                PeriodsActions.ExtractsPeriodsFail({ errorMessage: error }),
              );
            }),
          );
      }),
    ),
  );

  Extracts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ExtractsActions.ExtractsLoad),
      switchMap((action: any) => {
        return this.statementServices
          .getPdf(action.account, action.accountType, action.period)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: IPdfdata) => {
              if (!isNullOrUndefined(data.base64) && data.base64) {
                return ExtractsActions.ExtractsSuccess({ pdfData: data });
              }
              const error = this.translate.instant(
                'DOCUMENTS.EXTRACTS.DETAIL.ERROR_DOWNLOAD',
              );
              this._showErrorToast(error);
              return ExtractsActions.ExtractsFail({ errorMessage: error });
            }),
            catchError((_error) => {
              const errorMessage = errorMessage500;
              this._showErrorToast(errorMessage);
              return of(ExtractsActions.ExtractsFail({ errorMessage }));
            }),
          );
      }),
    ),
  );

  private _showErrorToast(errorMessage: string): void {
    this.model.notificationOpen(errorMessage, true, ClassNotification.ERROR);
  }
}

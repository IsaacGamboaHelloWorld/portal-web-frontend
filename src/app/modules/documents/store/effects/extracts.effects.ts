import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { TranslateService } from '@ngx-translate/core';

import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IStatement } from '@app/core/interfaces/statement/statement';
import { StatementsService } from '@app/modules/detail-product/components/statements/services/statements.service';
import { isNullOrUndefined } from 'util';
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

  Periods: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ExtractsActions.ExtractsPeriodsLoad),
      switchMap((action: any) => {
        return this.statementServices
          .getPeriods(action.account, action.accountType)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: IStatement) => {
              if (!!data && data.success) {
                return ExtractsActions.ExtractsPeriodsSuccess(data);
              }
              this.model.creationPeriodsFail(data['errorMessage']);
              return new NotificationShowAction(
                data['errorMessage'],
                true,
                ClassNotification.ERROR,
              );
            }),
            catchError((error) => {
              new NotificationShowAction('', true, ClassNotification.ERROR);
              return of(ExtractsActions.ExtractsPeriodsFail(''));
            }),
          );
      }),
    ),
  );
  Extracts: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ExtractsActions.ExtractsLoad),
      switchMap((action: any) => {
        return this.statementServices
          .getPdf(action.account, action.accountType, action.data)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: IPdfdata) => {
              if (!isNullOrUndefined(data.base64) && data.base64) {
                return ExtractsActions.ExtractsSuccess(data);
              }
              this.model.creationFail(
                this.translate.instant(
                  'DOCUMENTS.EXTRACTS.DETAIL.ERROR_DOWNLOAD',
                ),
              );
              return new NotificationShowAction(
                this.translate.instant(
                  'DOCUMENTS.EXTRACTS.DETAIL.ERROR_DOWNLOAD',
                ),
                true,
                ClassNotification.ERROR,
              );
            }),
            catchError((error) => {
              new NotificationShowAction('', true, ClassNotification.ERROR);
              return of(ExtractsActions.ExtractsFail(''));
            }),
          );
      }),
    ),
  );
}

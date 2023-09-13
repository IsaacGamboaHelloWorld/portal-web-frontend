import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { TranslateService } from '@ngx-translate/core';

import { DocumentsService } from '../../services/documents.service';
import {
  TributaryGmfFail,
  TributaryGmfLoad,
  TributaryGmfSuccess,
} from '../actions/tributary-gmf.actions';
import {
  TributaryIncomeTaxTCFail,
  TributaryIncomeTaxTCLoad,
  TributaryIncomeTaxTCSuccess,
} from '../actions/tributary-income-tc.actions';
import {
  TributaryRetentionFail,
  TributaryRetentionLoad,
  TributaryRetentionSuccess,
} from '../actions/tributary-retention.actions';
import { TributaryModel } from '../model/tributary.model';
import { ITributaryGmfState } from '../state/documents.state';

@Injectable()
export class TributaryEffect {
  constructor(
    private actions$: Actions,
    private documentServices: DocumentsService,
    private model: TributaryModel,
    private globalData: GlobalDataService,
    private translate: TranslateService,
  ) {}

  TributaryGmf$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TributaryGmfLoad),
      switchMap((action: any) => {
        return this.documentServices.generateCertificateGmf(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: ITributaryGmfState) => {
            if (!!data && data.success) {
              return TributaryGmfSuccess({ tributary: data });
            }
            this._showErrorToast(data.errorMessage);
            return TributaryGmfFail({ errorMessage: data.errorMessage });
          }),
          catchError((_error) => {
            const error = errorMessage500;
            this._showErrorToast(error);
            return of(TributaryGmfFail({ errorMessage: error }));
          }),
        );
      }),
    ),
  );

  TributaryRetention$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TributaryRetentionLoad),
      switchMap((action: any) => {
        return this.documentServices
          .generateCertificateIncome(action.data)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: any) => {
              if (!!data && data.success) {
                return TributaryRetentionSuccess({ tributary: data });
              }
              this._showErrorToast(data.errorMessage);
              return TributaryRetentionFail({
                errorMessage: data.errorMessage,
              });
            }),
            catchError((_error) => {
              const error = errorMessage500;
              this._showErrorToast(error);
              return of(TributaryRetentionFail({ errorMessage: error }));
            }),
          );
      }),
    ),
  );

  TributaryIncomeTaxTC$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TributaryIncomeTaxTCLoad),
      switchMap((action: any) => {
        return this.documentServices
          .generateCertificateIncomeTaxTC(action.data)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: any) => {
              if (!!data && data.success) {
                return TributaryIncomeTaxTCSuccess({ income: data });
              }
              const error = this.translate.instant(
                'DOCUMENTS.TRIBUTARY.DETAIL.ERROR',
              );
              this._showErrorToast(error);
              return TributaryIncomeTaxTCFail({
                errorMessage: data.errorMessage,
              });
            }),
            catchError((_error) => {
              const error = errorMessage500;
              this._showErrorToast(error);
              return of(TributaryIncomeTaxTCFail({ errorMessage: error }));
            }),
          );
      }),
    ),
  );

  private _showErrorToast(errorMessage: string): void {
    this.model.notificationOpen(errorMessage, true, ClassNotification.ERROR);
  }
}

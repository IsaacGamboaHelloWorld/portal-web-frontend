import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { TranslateService } from '@ngx-translate/core';

import { ITributary } from '../../entities/documents';
import { IincomeRac } from '../../entities/tributary';
import { DocumentsService } from '../../services/documents.service';
import * as TributaryActions from '../actions/tributary.actions';
import { TributaryModel } from '../model/tributary.model';

@Injectable()
export class TributaryEffect {
  constructor(
    private actions$: Actions,
    private documentServices: DocumentsService,
    private model: TributaryModel,
    private globalData: GlobalDataService,
    private translate: TranslateService,
  ) {}

  TributaryGmf: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TributaryActions.TributaryLoad),
      switchMap((action: any) => {
        return this.documentServices.generateCertificateGmf(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: ITributary) => {
            if (!!data && data.success) {
              return TributaryActions.TributarySuccess(data);
            }
            this.model.creationFail(data.errorMessage);
            return new NotificationShowAction(
              data.errorMessage,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(TributaryActions.TributaryFail(''));
          }),
        );
      }),
    ),
  );
  TributaryIncome: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TributaryActions.TributaryIncomeLoad),
      switchMap((action: any) => {
        return this.documentServices
          .generateCertificateIncome(action.data)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: any) => {
              if (!!data && data.success) {
                return TributaryActions.TributaryIncomeSuccess(data);
              }
              this.model.creationIncomeFail(data.errorMessage);
              return new NotificationShowAction(
                data.errorMessage,
                true,
                ClassNotification.ERROR,
              );
            }),
            catchError((error) => {
              new NotificationShowAction('', true, ClassNotification.ERROR);
              return of(TributaryActions.TributaryIncomeFail(''));
            }),
          );
      }),
    ),
  );

  TributaryIncomeTaxTC: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TributaryActions.TributaryIncomeTaxTCLoad),
      switchMap((action: any) => {
        return this.documentServices
          .generateCertificateIncomeTaxTC(action.data)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: any) => {
              if (!!data && data.success) {
                return TributaryActions.TributaryIncomeTaxTCSuccess(data);
              }
              this.model.creationIncomeTaxTCFail(data.errorMessage);
              return new NotificationShowAction(
                this.translate.instant('DOCUMENTS.TRIBUTARY.DETAIL.ERROR'),
                true,
                ClassNotification.ERROR,
              );
            }),
            catchError((error) => {
              new NotificationShowAction('', true, ClassNotification.ERROR);
              return of(TributaryActions.TributaryIncomeTaxTCFail(''));
            }),
          );
      }),
    ),
  );

  TributaryIncomeRac: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TributaryActions.TributaryIncomeRacLoad),
      switchMap((action: any) => {
        return this.documentServices.generateCertificateRac(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IincomeRac) => {
            if (!!data && data.success) {
              return TributaryActions.TributaryIncomeRacSuccess(data);
            }
            this.model.creationIncomeRacFail(data.errorMessage);
            return new NotificationShowAction(
              this.translate.instant('DOCUMENTS.TRIBUTARY.DETAIL.ERROR'),
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(TributaryActions.TributaryIncomeRacFail(''));
          }),
        );
      }),
    ),
  );
}

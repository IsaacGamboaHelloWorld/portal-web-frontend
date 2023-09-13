import { Injectable } from '@angular/core';
import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import * as nickNamesActions from '@app/modules/detail-product/store/actions/nicknames.actions';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { DetailProductModel } from '../detail-product.model';
import {
  IAnswerNicknamesCreate,
  IAnswerNicknamesDelete,
  IAnswerNicknamesUpdate,
  INicknamesAll,
} from '../entities/nicknames';
import { NicknamesService } from '../services/nicknames/nicknames.service';

@Injectable()
export class NicknamesEffect {
  constructor(
    private actions$: Actions,
    private nicknamesService: NicknamesService,
    private globalData: GlobalDataService,
    private _model: DetailProductModel,
    private translate: TranslateService,
  ) {}
  NicknamesAll: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(nickNamesActions.NicknamesAllLoad),
      switchMap((action: any) => {
        return this.nicknamesService.nicknamesAll().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: INicknamesAll) => {
            if (!!data && data.success) {
              return nickNamesActions.NicknamesAllSuccess(data);
            }
          }),
          catchError((error) => {
            new NotificationShowAction(
              String(error),
              true,
              ClassNotification.ERROR,
            );
            return of(nickNamesActions.NicknamesAllFail(String(error)));
          }),
        );
      }),
    ),
  );
  NicknamesCreate: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(nickNamesActions.NicknamesCreateLoad),
      switchMap((action: any) => {
        return this.nicknamesService.nicknamesCreate(action.request).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerNicknamesCreate) => {
            if (!!data && data.success) {
              return nickNamesActions.NicknamesCreateSuccess(data);
            }
            const error = this.translate.instant('DETAIL.NICKNAMES.ERROR');
            this._model.nicknamesCreateFail(error);
            return new NotificationShowAction(
              error,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction(
              String(error),
              true,
              ClassNotification.ERROR,
            );
            return of(nickNamesActions.NicknamesCreateFail(String(error)));
          }),
        );
      }),
    ),
  );
  NicknamesDelete: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(nickNamesActions.NicknamesDeleteLoad),
      switchMap((action: any) => {
        return this.nicknamesService.nicknamesDelete(action.request).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerNicknamesDelete) => {
            if (!!data && data.success) {
              return nickNamesActions.NicknamesDeleteSuccess(data);
            }
            const error = this.translate.instant('DETAIL.NICKNAMES.ERROR');
            this._model.nicknamesDeleteFail(error);
            return new NotificationShowAction(
              error,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction(
              String(error),
              true,
              ClassNotification.ERROR,
            );
            return of(nickNamesActions.NicknamesDeleteFail(String(error)));
          }),
        );
      }),
    ),
  );
  NicknamesUpdate: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(nickNamesActions.NicknamesUpdateLoad),
      switchMap((action: any) => {
        return this.nicknamesService.nicknamesUpdate(action.request).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerNicknamesUpdate) => {
            if (!!data && data.success) {
              return nickNamesActions.NicknamesUpdateSuccess(data);
            }
            const error = this.translate.instant('DETAIL.NICKNAMES.ERROR');
            this._model.nicknamesUpdateFail(error);
            return new NotificationShowAction(
              error,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction(
              String(error),
              true,
              ClassNotification.ERROR,
            );
            return of(nickNamesActions.NicknamesUpdateFail(String(error)));
          }),
        );
      }),
    ),
  );
}

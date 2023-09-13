import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { SecurityModel } from '@app/modules/security-ds/store/model/security.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ChannelResponse } from '../../entities/channel-response.interface';
import { ChannelLockService } from '../../services/channel-lock.service';
import {
  CudAccessControlCreate,
  CudAccessControlDelete,
  CudAccessControlFail,
  CudAccessControlSuccess,
  CudAccessControlUpdate,
} from '../actions/cud-access-control.actions';
import {
  GetAccessControlFail,
  GetAccessControlLoad,
  GetAccessControlSuccess,
} from '../actions/get-access-control.actions';
import { ICudChannel, IDataChannel } from '../state/access-control.state';

@Injectable()
export class AccessControlEffect {
  constructor(
    private actions$: Actions,
    private channelLockService: ChannelLockService,
    private model: SecurityModel,
    private translate: TranslateService,
  ) {}

  getAccessControl$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(GetAccessControlLoad),
      switchMap(() =>
        this.channelLockService.channelLockGet().pipe(
          map((resp: ChannelResponse) => {
            if (resp.success) {
              const { PB, MB } = resp;
              const data: IDataChannel = {
                PB,
                MB,
              };
              return GetAccessControlSuccess({ data });
            }
            const { errorMessage } = resp;
            return GetAccessControlFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(GetAccessControlFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  createAccessControl$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CudAccessControlCreate),
      switchMap((action: any) =>
        this.channelLockService.channelLockCreate(action.PB, action.MB).pipe(
          map((resp: ChannelResponse) => {
            if (resp.success) {
              const { statusCode, statusDescription } = resp;
              const data: ICudChannel = {
                operation: 'create',
                statusCode,
                statusDescription,
              };
              return CudAccessControlSuccess({ data });
            }
            this._errorNotification();
            const { errorMessage } = resp;
            return CudAccessControlFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(CudAccessControlFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  updateAccessControl$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CudAccessControlUpdate),
      switchMap((action: any) =>
        this.channelLockService.channelLockUpdate(action.PB, action.MB).pipe(
          map((resp: ChannelResponse) => {
            if (resp.success) {
              const { statusCode, statusDescription } = resp;
              const data: ICudChannel = {
                operation: 'update',
                statusCode,
                statusDescription,
              };
              return CudAccessControlSuccess({ data });
            }
            this._errorNotification();
            const { errorMessage } = resp;
            return CudAccessControlFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(CudAccessControlFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  deleteAccessControl$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CudAccessControlDelete),
      switchMap(() =>
        this.channelLockService.channelLockDelete().pipe(
          map((resp: ChannelResponse) => {
            if (resp.success) {
              const { statusCode, statusDescription } = resp;
              const data: ICudChannel = {
                operation: 'delete',
                statusCode,
                statusDescription,
              };
              return CudAccessControlSuccess({ data });
            }
            const { errorMessage } = resp;
            return CudAccessControlFail({ errorMessage });
          }),
          catchError((_err: any) =>
            of(CudAccessControlFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );

  private _errorNotification(title: string = '', subtitle: string = ''): void {
    this.model.notificationOpen(
      !!title
        ? title
        : this.translate.instant('SECURITY.ACCESS_CONTROL.LOCK_ERROR.TITLE'),
      true,
      ClassNotification.ERROR,
      false,
      !!subtitle
        ? subtitle
        : this.translate.instant(
            'SECURITY.ACCESS_CONTROL.LOCK_ERROR.DESCRIPTION',
          ),
    );
  }
}

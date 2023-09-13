import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import {
  IScheduleTransferCreate,
  IScheduleTransferDelete,
} from '../../entities/scheduledTransfer.interface';
import { OldTransferService } from '../../services/old-transfer/old-transfer.service';
import { TransferModel } from '../../transfer.model';
import * as fromScheduledTransferCreate from '../actions/scheduled-create-transfers.action';
import * as fromScheduledTransferDelete from '../actions/scheduled-delete-transfer.action';

@Injectable()
export class TransferScheduledEffect {
  constructor(
    private actions$: Actions,
    private oldTransferService: OldTransferService,
    private translate: TranslateService,
    private globalData: GlobalDataService,
    private _modelTransfer: TransferModel,
    private router: Router,
  ) {}

  get navigate(): INavigate {
    return Navigate;
  }

  ScheduledTransferCreate: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduledTransferCreate.ScheduledCreateLoad),
      switchMap((action: any) => {
        return this.oldTransferService
          .scheduledTransferCreate(
            action.formOne,
            action.amount,
            action.voucher,
            action.dueDate,
            action.description,
            action.isNew,
            action.scheduledTransfer,
            action.favorite,
            action.periodicity,
            action.numberRepeat,
            action.nickNameFrom,
            action.nickNameTo,
          )
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: IScheduleTransferCreate) => {
              if (!!data && data.success) {
                return fromScheduledTransferCreate.ScheduledCreateSuccess(data);
              }
              this.router.navigate([this.navigate.transfer]);
              this._modelTransfer.fetchScheduledCFail(data.errorMessage);
              const mapResponse = mapErrorReponse(data as any);
              return new NotificationShowAction(
                mapResponse[0],
                true,
                ClassNotification.ERROR,
                false,
                mapResponse[1],
              );
            }),
            catchError((error) => {
              return of(fromScheduledTransferCreate.ScheduledCreateFail(error));
            }),
          );
      }),
    ),
  );

  ScheduledTransferDelete: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromScheduledTransferDelete.ScheduledDeleteLoad),
      switchMap((action: any) => {
        return this.oldTransferService.scheduledTransferDelete(action.id).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IScheduleTransferDelete) => {
            if (!!data && data.success) {
              this._modelTransfer.notificationOpen(
                this.translate.instant('TRANSFER.SCHEDULED.CANCEL.SUCCESS'),
                true,
                ClassNotification.SUCCESS,
              );
              return fromScheduledTransferDelete.ScheduledDeleteSuccess(data);
            }
            this._modelTransfer.fetchScheduledDeleteFail(data.errorMessage);
            return new NotificationShowAction(
              data.errorMessage,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            return of(fromScheduledTransferDelete.ScheduledDeleteFail(error));
          }),
        );
      }),
    ),
  );
}

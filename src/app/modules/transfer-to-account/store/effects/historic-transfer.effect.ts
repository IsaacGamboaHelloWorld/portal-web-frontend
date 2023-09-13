import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { IRespHistoricTransfer } from '../../entities/historic';
import { IPendingTransfers } from '../../entities/pendingTransfer.interface';
import { IScheduledTransfersSearch } from '../../entities/scheduledTransfer.interface';
import { HistoricService } from '../../services/historic/historic.service';
import * as historic from '../actions/historic-transfer.action';
import * as pending from '../actions/pending-transfer.action';
import * as scheduled from '../actions/scheduled-transfers.action';

@Injectable()
export class HistoricTransferEffect {
  constructor(
    private actions$: Actions,
    private historicService: HistoricService,
  ) {}

  LoadPendingTransfer: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(pending.PendingLoad),
      switchMap((action) => {
        return this.historicService.pendingTransfer().pipe(
          map((items: IPendingTransfers) => {
            if (!isNullOrUndefined(items.success) && items.success) {
              return pending.PendingSuccess(items.pendingTransfers);
            }
            return pending.PendingFail(items.errorMessage);
          }),
          catchError((err: IPendingTransfers) => of(pending.PendingFail(''))),
        );
      }),
    ),
  );

  LoadHistoricTransfer: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(historic.HistoricLoad),
      switchMap((action) => {
        return this.historicService.historicTransfer().pipe(
          map((items: IRespHistoricTransfer) => {
            if (!isNullOrUndefined(items.success) && items.success) {
              return historic.HistoricSuccess(items.transfers);
            }
            return historic.HistoricFail(items.errorMessage);
          }),
          catchError((err: IPendingTransfers) => of(historic.HistoricFail(''))),
        );
      }),
    ),
  );

  LoadScheduledTransfer: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(scheduled.ScheduledSearchLoad),
      switchMap((action) => {
        return this.historicService.scheduledTransfer().pipe(
          map((items: IScheduledTransfersSearch) => {
            items.ip = items['request'] ? items['request']['ipAddress'] : '';
            if (!isNullOrUndefined(items.success) && items.success) {
              return scheduled.ScheduledSearchSuccess(items);
            }
            return scheduled.ScheduledSearchFail(items.errorMessage);
          }),
          catchError((err: IPendingTransfers) =>
            of(scheduled.ScheduledSearchFail('')),
          ),
        );
      }),
    ),
  );
}

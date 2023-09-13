import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { HomePocketsService } from '@modules/pockets/home-pockets/services/home-pockets.service';
import { ClassNotification } from '../../../../../core/constants/notification';
import { IMovePocketResp } from '../../entities/move-pockets';
import { MovePocketPocketsFacade } from '../../move-pockets.facade';
import { MoveMoneyPocketService } from '../../services/move-money.service';
import {
  MoveMoneyPocketsFail,
  MoveMoneyPocketsLoad,
  MoveMoneyPocketsSuccess,
} from '../actions/move-money.action';

@Injectable()
export class MoveMoneyPocketsEffect {
  constructor(
    private actions$: Actions,
    private pocketsService: HomePocketsService,
    private facade: MovePocketPocketsFacade,
    private moveMoneyPocketsService: MoveMoneyPocketService,
  ) {}

  MoveMoneyPockets: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(MoveMoneyPocketsLoad),
      switchMap((action) => {
        return this.moveMoneyPocketsService.moveMoneyPocket(action.data).pipe(
          take(1),
          map((data: IMovePocketResp) => {
            if (!!data.success && data.success) {
              return MoveMoneyPocketsSuccess(data);
            }
            this._notificationError(data);
            return MoveMoneyPocketsFail(data.errorMessage);
          }),
          catchError((error) => {
            this._notificationError(error);
            return of(MoveMoneyPocketsFail(error.errorMessage));
          }),
        );
      }),
    ),
  );

  private _notificationError(data: IMovePocketResp): void {
    this.facade.notificationOpen(
      data.errorMessage,
      true,
      ClassNotification.ERROR,
    );
  }
}

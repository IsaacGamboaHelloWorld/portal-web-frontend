import { Injectable } from '@angular/core';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { downloadFileWithJS } from '@app/shared/helpers/downloadFile.helpers';
import { Movement } from '@core/models/movement/movement';
import { MovementsService } from '@modules/detail-product/services/movements/movements.service';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as movementActions from '@store/actions/models/movements/movement.action';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { MovementsFileResponse } from '../entities/movements-file';
import {
  MovementsFileFail,
  MovementsFileLoad,
  MovementsFileSuccess,
} from '../store/actions/movements-file.action';

@Injectable()
export class MovementEffect {
  constructor(
    private actions$: Actions,
    private movementsService: MovementsService,
    private globalData: GlobalDataService,
  ) {}

  @Effect()
  MovementLoad: Observable<Action> = this.actions$.pipe(
    ofType<movementActions.MovementLoadAction>(movementActions.MOVEMENT_LOAD),
    switchMap((action: movementActions.MovementLoadAction) => {
      return this.movementsService
        .movements(action.typeAccount, action.accountId, action.from, action.to)
        .pipe(
          map((accountMovement: Movement) => {
            if (
              !isNullOrUndefined(accountMovement.success) &&
              accountMovement.success
            ) {
              return new movementActions.MovementSuccessAction(accountMovement);
            } else {
              return new movementActions.MovementFailAction(
                accountMovement.errorMessage,
              );
            }
          }),
          catchError((err: Movement) =>
            of(new movementActions.MovementFailAction(err.errorMessage)),
          ),
        );
    }),
  );

  MovementFileLoad: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(MovementsFileLoad),
      switchMap((action) => {
        return this.movementsService.movementsFile(action.request).pipe(
          takeUntil(this.globalData.cancel),
          map((fileResponse: MovementsFileResponse) => {
            if (!!fileResponse.success && fileResponse.success) {
              downloadFileWithJS(
                fileResponse.base64,
                fileResponse.name,
                'xlsx',
              );
              return MovementsFileSuccess(fileResponse);
            }
            return MovementsFileFail(fileResponse.errorMessage);
          }),
          catchError((err: Movement) =>
            of(MovementsFileFail(err.errorMessage)),
          ),
        );
      }),
    ),
  );
}

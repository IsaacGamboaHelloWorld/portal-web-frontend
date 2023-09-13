import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { ERROR_MESSAGE } from '../../constants/constants';
import { IResHistoricMovements } from '../../entities/historic-movements.interface';
import { YourPlusService } from '../../services/your-plus.service';
import {
  HistoricMovementsActionFail,
  HistoricMovementsActionLoad,
  HistoricMovementsActionSuccess,
} from '../actions/historic-movements.actions';
import { YourPlusModel } from '../models/your-plus.model';

@Injectable()
export class HistoricMovementsEffect {
  constructor(
    private _actions$: Actions,
    private _service: YourPlusService,
    private _model: YourPlusModel,
    private _translate: TranslateService,
  ) {}

  HistoricMovementsEffect: Observable<Action> = createEffect(() =>
    this._actions$.pipe(
      ofType(HistoricMovementsActionLoad),
      switchMap((action: any) => {
        return this._service
          .HistoricMovementsService(
            action.startDt,
            action.endDt,
            action.isPagination,
            action.numPage,
          )
          .pipe(
            take(1),
            map((data: IResHistoricMovements) => {
              if (!!data && data.success) {
                return HistoricMovementsActionSuccess({
                  data: data.ListTransactions,
                });
              }
              this._model.notificationOpen(
                this._translate.instant(data.errorMessage),
                true,
                ClassNotification.ERROR,
                true,
              );
              return HistoricMovementsActionFail({
                errorMessage: this._translate.instant(data.errorMessage),
                specificErrorMessage: this._translate.instant(
                  data.specificErrorMessage
                    ? data.specificErrorMessage
                    : errorMessage500,
                ),
                errorMessageCode: data.errorMessageCode
                  ? data.errorMessageCode
                  : ERROR_MESSAGE.DEFAULT_ERROR_CODE,
              });
            }),
            catchError((_error: any) => {
              return of(
                HistoricMovementsActionFail({
                  errorMessage: errorMessage500,
                  specificErrorMessage: errorMessage500,
                  errorMessageCode: ERROR_MESSAGE.DEFAULT_ERROR_CODE,
                }),
              );
            }),
          );
      }),
    ),
  );
}

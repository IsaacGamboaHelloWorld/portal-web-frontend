import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PfmMovimentsResponse } from '../../entities';
import { PfmProductDetailService } from '../../services/pfm-product-detail.service';
import {
  movimentsPfmFail,
  movimentsPfmLoad,
  movimentsPfmSuccess,
} from '../actions';

@Injectable()
export class PfmMovimentsEffects {
  constructor(
    private actions$: Actions,
    private pfmProductService: PfmProductDetailService,
  ) {}

  LoadPfmMoviments$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(movimentsPfmLoad),
      switchMap((action) =>
        this.pfmProductService.getPfmMovements(action.body).pipe(
          map((res: PfmMovimentsResponse) => {
            if (res.success) {
              return movimentsPfmSuccess({ data: res.data });
            }
            return movimentsPfmFail({
              errorMessage: res.errorMessage,
            });
          }),
          catchError((_error) =>
            of(
              movimentsPfmFail({
                errorMessage: errorMessage500,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}

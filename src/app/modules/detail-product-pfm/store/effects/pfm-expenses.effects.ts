import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PfmExpensesResponse } from '../../entities/detail-expense-pfm';
import { PfmProductDetailService } from '../../services/pfm-product-detail.service';
import {
  expensesPfmFail,
  expensesPfmLoad,
  expensesPfmSuccess,
} from '../actions/pfm-expenses.actions';

@Injectable()
export class PfmExpensesEffects {
  constructor(
    private actions$: Actions,
    private pfmProductService: PfmProductDetailService,
  ) {}

  LoadPfmExpenses$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(expensesPfmLoad),
      switchMap((action) =>
        this.pfmProductService
          .getPfmExpenses(
            action.month,
            action.year,
            action.type2,
            action.product_type,
          )
          .pipe(
            map((res: PfmExpensesResponse) => {
              if (res.success) {
                return expensesPfmSuccess({ expenses: res.data });
              }
              return expensesPfmFail({ errorMessage: res.errorMessage });
            }),
            catchError((_error) =>
              of(expensesPfmFail({ errorMessage: errorMessage500 })),
            ),
          ),
      ),
    ),
  );
}

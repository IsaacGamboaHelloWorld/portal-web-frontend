import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PfmCreditCardResponse } from '../../entities';
import { PfmProductDetailService } from '../../services/pfm-product-detail.service';
import {
  creditCardsPfmFail,
  creditCardsPfmLoad,
  creditCardsPfmSuccess,
} from '../actions';

@Injectable()
export class PfmCreditCardsEffects {
  constructor(
    private actions$: Actions,
    private pfmProductService: PfmProductDetailService,
  ) {}

  LoadPfmCreditCards$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(creditCardsPfmLoad),
      switchMap((action) =>
        this.pfmProductService
          .getPfmCreditCards(action.month, action.year)
          .pipe(
            map((res: PfmCreditCardResponse) => {
              if (res.success) {
                return creditCardsPfmSuccess({ data: res.data });
              }
              return creditCardsPfmFail({ errorMessage: res.errorMessage });
            }),
            catchError((_error) =>
              of(creditCardsPfmFail({ errorMessage: errorMessage500 })),
            ),
          ),
      ),
    ),
  );
}

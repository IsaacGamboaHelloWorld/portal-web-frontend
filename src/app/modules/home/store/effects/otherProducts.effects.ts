import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, take, takeUntil } from 'rxjs/operators';

import { IRespOtherProducts } from '@core/interfaces/products.interface';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { OtherProductsService } from '@modules/home/services/other-products.service';
import {
  otherProductFail,
  otherProductLoad,
  otherProductSuccess,
} from '@store/actions/models/products/other-products.action';
import { isNullOrUndefined } from 'util';

@Injectable()
export class OtherProductsEffects {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private otherProductsService: OtherProductsService,
  ) {}

  LoadOtherProduct: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(otherProductLoad),
      mergeMap((action) => {
        return this.otherProductsService.OtherProducts(action.nameBank).pipe(
          take(1),
          takeUntil(this.globalData.cancel),
          map((resp: IRespOtherProducts) => {
            if (
              !isNullOrUndefined(resp[action.nameBank]) &&
              resp[action.nameBank].success
            ) {
              return otherProductSuccess(
                resp[action.nameBank.toUpperCase()].products,
                action.nameBank,
              );
            }
            return otherProductFail(
              action.nameBank,
              resp[action.nameBank].errorMessage,
            );
          }),
          catchError((err) => of(otherProductFail(action.nameBank, ''))),
        );
      }),
    ),
  );
}

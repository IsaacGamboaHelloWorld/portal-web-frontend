import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PfmProductResponse } from '../../entities/detail-product-pfm';
import { PfmProductDetailService } from '../../services/pfm-product-detail.service';
import {
  detailProductPfmFail,
  detailProductPfmLoad,
  detailProductPfmSuccess,
} from './../actions/product-detail-pfm.actions';

@Injectable()
export class ProductDetailPfmEffects {
  constructor(
    private actions$: Actions,
    private pfmProductService: PfmProductDetailService,
  ) {}

  LoadPfmProducts: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(detailProductPfmLoad),
      switchMap((action) =>
        this.pfmProductService.getPfmProducts(action.month, action.year).pipe(
          map((res: PfmProductResponse) => {
            if (res.success) {
              return detailProductPfmSuccess({ pfmProducts: res.data });
            }
            return detailProductPfmFail({ errorMessage: res.errorMessage });
          }),
          catchError((_error) =>
            of(detailProductPfmFail({ errorMessage: errorMessage500 })),
          ),
        ),
      ),
    ),
  );
}

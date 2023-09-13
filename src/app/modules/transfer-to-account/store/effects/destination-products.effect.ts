import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { IProductAffiliation } from '../../entities/product-destination.interface';
import { AffiliationProductsService } from '../../services/affiliation-products/affiliation-products.service';
import * as fromDestination from '../actions/product-destination.action';

@Injectable()
export class DestinationProductsEffect {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private destinationService: AffiliationProductsService,
  ) {}

  DestinationProductsLoad: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromDestination.ProductDestinationLoad),
      switchMap((action) => {
        return this.destinationService
          .affiliationProducts(action.accountId, action.accountType)
          .pipe(
            take(1),
            takeUntil(this.globalData.cancel),
            map((items: IProductAffiliation) => {
              if (!!items.success && items.success) {
                return fromDestination.ProductDestinationSuccess(
                  items.productAffiliations,
                );
              }
              return fromDestination.ProductDestinationError(
                items.errorMessage,
              );
            }),
            catchError(() => of(fromDestination.ProductDestinationError(null))),
          );
      }),
    ),
  );
}

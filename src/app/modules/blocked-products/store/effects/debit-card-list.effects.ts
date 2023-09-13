import { Injectable } from '@angular/core';
import {
  DebitCardListFail,
  DebitCardListLoad,
  DebitCardListSuccess,
} from '@app/modules/blocked-products/store/actions/debit-cards.action';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { IDebitCardListResponse } from '../../entities/debit-cards-response';
import { DebitCardListService } from '../../services/debit-card-list.service';
import { BlockedProductsModel } from '../model/blocked-products.model';

@Injectable()
export class DebitCardListEffects {
  constructor(
    private actions$: Actions,
    private model: BlockedProductsModel,
    private globalData: GlobalDataService,
    private service: DebitCardListService,
  ) {}

  DebitCardList$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(DebitCardListLoad),
      switchMap((action) => {
        return this.service.loadDebitCards().pipe(
          takeUntil(this.globalData.cancel),
          map((data: IDebitCardListResponse) => {
            if (!isNullOrUndefined(data.success) && data.success) {
              return DebitCardListSuccess(data);
            }
            return DebitCardListFail(data.errorMessage);
          }),
          catchError((err) => {
            return of(DebitCardListFail(err.errorMessage));
          }),
        );
      }),
    ),
  );
}

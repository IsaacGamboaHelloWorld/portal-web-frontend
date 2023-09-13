import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PfmItemsResponse } from '../../entities';
import { PfmProductDetailService } from '../../services/pfm-product-detail.service';
import { itemsPfmFail, itemsPfmLoad, itemsPfmSuccess } from '../actions';

@Injectable()
export class PfmItemsEffects {
  constructor(
    private actions$: Actions,
    private pfmProductService: PfmProductDetailService,
  ) {}

  LoadPfmItems$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(itemsPfmLoad),
      switchMap((action) =>
        this.pfmProductService.getPfmItems(action.body).pipe(
          map((res: PfmItemsResponse) => {
            if (res.success) {
              return itemsPfmSuccess({ data: res.data.categories });
            }
            return itemsPfmFail({
              errorMessage: res.errorMessage,
            });
          }),
          catchError((_error) =>
            of(
              itemsPfmFail({
                errorMessage: errorMessage500,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}

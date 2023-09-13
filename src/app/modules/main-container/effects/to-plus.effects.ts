import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { IToPlus } from '@modules/main-container/constants/to-plus';
import { ToPlusService } from '@modules/main-container/services/to-plus.service';
import * as fromToPlus from '@store/actions/models/to-plus/to-plus.action';

@Injectable()
export class ToPlusEffects {
  constructor(
    private actions$: Actions,
    private toPlusService: ToPlusService,
    private globalData: GlobalDataService,
  ) {}

  LoadToPlus: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromToPlus.ToPlusLoad),
      switchMap(() => {
        return this.toPlusService.loadToPlus().pipe(
          take(1),
          takeUntil(this.globalData.cancel),
          map((data: IToPlus) => {
            if (!isNullOrUndefined(data.success) && data.success) {
              return fromToPlus.ToPlusSuccess(data);
            }
            return fromToPlus.ToPlusFail('');
          }),
          catchError(() => of(fromToPlus.ToPlusFail(''))),
        );
      }),
    );
  });
}

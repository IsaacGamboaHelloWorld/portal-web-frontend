import { Injectable } from '@angular/core';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { ResponseOptionModule } from './../../../core/interfaces/option-module.interface';
import {
  OptionModuleFailAction,
  OptionModuleLoadAction,
  OptionModuleSuccessAction,
} from './../../../store/actions/global/option-module/option-module.action';
import { OptionModuleService } from './../../dashboard/services/option-module.service';

@Injectable()
export class OptionModuleEffects {
  constructor(
    private actions$: Actions,
    private service: OptionModuleService,
    private globalData: GlobalDataService,
  ) {}

  LoadOptionModule: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(OptionModuleLoadAction),
      switchMap(() => {
        return this.service.getOptions().pipe(
          take(1),
          takeUntil(this.globalData.cancel),
          map((data: ResponseOptionModule) => {
            if (data && data.success) {
              return OptionModuleSuccessAction(data);
            }
            return OptionModuleFailAction({
              errorMessage: data.errorMessage,
              specificErrorMessage: data.specificErrorMessage,
            });
          }),
          catchError((err) =>
            of(
              OptionModuleFailAction({
                errorMessage: err,
                specificErrorMessage: '',
              }),
            ),
          ),
        );
      }),
    ),
  );
}

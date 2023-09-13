import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { ExperianService } from '../../services/experian.service';
import * as experianActions from '../actions/experian.actions';
import { CodeAuthModel } from '../model/code-auth.model';

@Injectable()
export class ExperianEffect {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private actions$: Actions,
    private experianService: ExperianService,
    private model: CodeAuthModel,
    private globalData: GlobalDataService,
    private translate: TranslateService,
    private router: Router,
  ) {}

  Flow: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(experianActions.ExperianFlowLoad),
      switchMap((action: any) => {
        return this.experianService.executeFlow(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: any) => {
            if (!!data && data.success) {
              return experianActions.ExperianFlowSuccess(data);
            }
            return experianActions.ExperianFlowFail(data);
          }),
          catchError((error: any) => {
            error['success'] = false;
            return of(experianActions.ExperianFlowFail(error));
          }),
        );
      }),
    ),
  );
}

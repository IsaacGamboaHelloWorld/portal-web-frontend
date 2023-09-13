import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { UserDataService } from '@core/services/user_data/user-data.service';
import * as userInfoActions from '@store/actions/global/user/user.action';

@Injectable()
export class UserInfoEffects {
  constructor(
    private actions$: Actions,
    private userDataService: UserDataService,
    private globalData: GlobalDataService,
  ) {}

  @Effect()
  Login: Observable<Action> = this.actions$.pipe(
    ofType<userInfoActions.UserLoadAction>(userInfoActions.USER_LOAD),
    switchMap((action: userInfoActions.UserLoadAction) => {
      return this.userDataService.userData().pipe(
        take(1),
        takeUntil(this.globalData.cancel),
        map((userInfo) => {
          return new userInfoActions.UserSuccessAction(userInfo);
        }),
        catchError((err) => {
          return of(new userInfoActions.UserFailAction());
        }),
      );
    }),
  );
}

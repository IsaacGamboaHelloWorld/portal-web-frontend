import { Injectable } from '@angular/core';
import { UserSecureDataService } from '@app/core/services/user_data/user-get-secure-data.service';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as userInfoActions from '@store/actions/global/user/user-get-secure-data-mdm.action';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

@Injectable()
export class UserSecureDataEffects {
  constructor(
    private actions$: Actions,
    private service: UserSecureDataService,
    private globalData: GlobalDataService,
  ) {}

  @Effect()
  SecureDataMdm: Observable<Action> = this.actions$.pipe(
    ofType<userInfoActions.UserSecureDataLoadAction>(
      userInfoActions.USER_SECURE_DATA_MDM_LOAD,
    ),
    switchMap((action: userInfoActions.UserSecureDataLoadAction) => {
      return this.service.getSecureData().pipe(
        take(1),
        takeUntil(this.globalData.cancel),
        map((userInfo) => {
          return new userInfoActions.UserSecureDataSuccessAction(userInfo);
        }),
        catchError((err) => {
          return of(new userInfoActions.UserSecureDataFailAction());
        }),
      );
    }),
  );
}

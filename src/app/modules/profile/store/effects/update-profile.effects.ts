import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { UpdateProfileResponse } from '../../entities/update-profile-response';
import { UpdateProfileService } from '../../services/update-profile.service';
import { PROFILE_ROUTES } from '../../util/routes';
import * as CustomerProfileUpdateActions from '../actions/update-profile.actions';
import { ProfileModel } from '../model/profile.model';

@Injectable()
export class UpdateCustomerProfileEffect {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private service: UpdateProfileService,
    private model: ProfileModel,
    private translate: TranslateService,
    private router: Router,
  ) {}

  LoadCustomerProfileUpdate: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerProfileUpdateActions.CustomerProfileUpdateLoad),
      switchMap((action: any) => {
        return this.service.updateProfile(action['data']).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: UpdateProfileResponse) => {
            if (!!data && data.success) {
              this.model.fetchUserData();
              this.router.navigate([
                Navigate.user_profile + '/' + PROFILE_ROUTES.view,
              ]);
              this.loadNotification(
                this.translate.instant(
                  'CUSTOMER_PROFILE.EDIT_PROFILE.UPDATE_OPERATION_SUCCESS',
                ),
                ClassNotification.SUCCESS,
              );
              return CustomerProfileUpdateActions.CustomerProfileUpdateSuccess(
                data,
              );
            }

            this.loadNotification(
              this.translate.instant(
                'CUSTOMER_PROFILE.EDIT_PROFILE.UPDATE_OPERATION_FAILED',
              ),
              ClassNotification.ERROR,
            );
            return CustomerProfileUpdateActions.CustomerProfileUpdateFailed(
              data.errorMessage,
            );
          }),
          catchError((error) => {
            this.loadNotification(
              this.translate.instant(
                'CUSTOMER_PROFILE.EDIT_PROFILE.UPDATE_OPERATION_FAILED',
              ),
              ClassNotification.ERROR,
            );
            return of(
              CustomerProfileUpdateActions.CustomerProfileUpdateFailed(''),
            );
          }),
        );
      }),
    ),
  );

  loadNotification(content: string, type: ClassNotification): void {
    setTimeout(() => this.model.notificationOpen(content, true, type), 1000);
  }
}

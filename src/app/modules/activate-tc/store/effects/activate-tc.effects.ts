import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { TranslateService } from '@ngx-translate/core';

import { IAnswerActivateTc } from '../../entities/activate-tc';
import { ActivateTcService } from '../../services/activate-tc.service';
import * as ActivateTcActions from '../actions/activate-tc.actions';
import { ActivateTcModel } from '../model/activate-tc.model';

@Injectable()
export class ActivateTcEffect {
  constructor(
    private actions$: Actions,
    private activateTcServices: ActivateTcService,
    private model: ActivateTcModel,
    private globalData: GlobalDataService,
    private translate: TranslateService,
  ) {}

  NewActivateTc: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivateTcActions.ActivateTcLoad),
      switchMap((action: any) => {
        return this.activateTcServices.creditCard(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerActivateTc) => {
            if (!!data && data.success) {
              return ActivateTcActions.ActivateTcSuccess(data);
            }
            this.model.creationFail(data);
            const notification = {
              text: this.translate.instant('ACTIVATE_TC.LIST_MSM.MSM_ERROR2'),
              class: ClassNotification.ERROR,
            };
            if (
              data.specificErrorMessage &&
              data.specificErrorMessage.indexOf('ACTIVATED') > 0
            ) {
              notification.text = this.translate.instant(
                'ACTIVATE_TC.LIST_MSM.MSM_INFO',
              );
              notification.class = ClassNotification.INFO;
            } else if (
              data.specificErrorMessage &&
              data.specificErrorMessage.indexOf('NOT FOUND') > 0
            ) {
              notification.text = this.translate.instant(
                'ACTIVATE_TC.LIST_MSM.MSM_ERROR1',
              );
              notification.class = ClassNotification.ERROR;
            }
            return new NotificationShowAction(
              notification.text,
              true,
              notification.class,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(ActivateTcActions.ActivateTcFail({}));
          }),
        );
      }),
    ),
  );
}

import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { errorMessage500 } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PfmRecategorizeResponse } from '../../entities';
import { PfmProductDetailService } from '../../services/pfm-product-detail.service';
import {
  recategorizePfmFail,
  recategorizePfmLoad,
  recategorizePfmSuccess,
} from '../actions';

@Injectable()
export class PfmRecategorizeEffects {
  constructor(
    private actions$: Actions,
    private pfmProductService: PfmProductDetailService,
    private appModel: ApplicationModel,
    private translate: TranslateService,
  ) {}

  LoadPfmRecategorize$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(recategorizePfmLoad),
      switchMap((action) =>
        this.pfmProductService.postPfmRecategorize(action.body).pipe(
          map((res: PfmRecategorizeResponse) => {
            if (res.success) {
              const messageSuccess = this.translate.instant(
                'PFM_RECATEGORIZATION.MESSAGE_SUCCESS',
              );
              this._showToast(messageSuccess, false);
              return recategorizePfmSuccess({ data: res.success });
            }
            const messageError = this.translate.instant(
              'PFM_RECATEGORIZATION.MESSAGE_ERROR',
            );
            this._showToast(messageError, true);
            return recategorizePfmFail({
              errorMessage: res.errorMessage,
              specificErrorMessage: res.specificErrorMessage,
            });
          }),
          catchError((_error) =>
            of(
              recategorizePfmFail({
                errorMessage: errorMessage500,
                specificErrorMessage: errorMessage500,
              }),
            ),
          ),
        ),
      ),
    ),
  );

  private _showToast(message: string, isError: boolean): void {
    this.appModel.notificationOpen(
      message,
      true,
      isError ? ClassNotification.ERROR : ClassNotification.SUCCESS,
    );
  }
}

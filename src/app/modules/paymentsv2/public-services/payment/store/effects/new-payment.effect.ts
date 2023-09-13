import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { ClassNotification } from '@core/constants/notification';
import { GlobalDataService } from '@core/services/global-data/global-data.service';

import { Router } from '@angular/router';
import { BLOCKED_ERRORS_CODE } from '@app/core/constants/global';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigatePayment } from '../../components/navigate/routes';
import { ISuccessServicePayment } from '../../entities/new-payment';
import { PaymentServiceFacade } from '../../payment.facade';
import { PaymentService } from '../../services/payment.service';
import * as SavePaymentActions from '../actions/newPayment.action';

@Injectable()
export class NewPaymentEffect {
  private codesProductBlocked: string[] = BLOCKED_ERRORS_CODE;

  constructor(
    private actions$: Actions,
    private _service: PaymentService,
    private globalData: GlobalDataService,
    private _facade: PaymentServiceFacade,
    private _translateService: TranslateService,
    private _modalService: ModalService,
    private _router: Router,
  ) {}

  NewPayment: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SavePaymentActions.CreatePaymentLoad),
      switchMap((action) => {
        this._loadTranslate();
        return this._service.publicBillPayment(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data) => {
            if (!!data && data.success) {
              return SavePaymentActions.CreatePaymentSuccess(data);
            }
            const isErrorBlocked = this._checkErrorIsBlocked(data);
            const mapError = mapErrorReponse(data);
            if (isErrorBlocked) {
              this._openModal(mapError);
            } else {
              this._goToHome(mapError);
            }
            return SavePaymentActions.CreatePaymentFail(
              data.errorMessage,
              data,
              data.specificErrorCode,
            );
          }),
          catchError((error) => {
            this._facade.notificationOpen(
              error.errorMessage,
              true,
              ClassNotification.ERROR,
            );
            return of(SavePaymentActions.CreatePaymentFail(error.errorMessage));
          }),
        );
      }),
    ),
  );

  private _loadTranslate(): void {
    this.codesProductBlocked = this._translateService.instant(
      'BLOCK_PRODS.POPUPS.TRANSFER_ERROR.STATUS_CODE_ERRORS',
    );
  }

  private _checkErrorIsBlocked(payment: ISuccessServicePayment): boolean {
    return !!this.codesProductBlocked.find(
      (code: string) =>
        !!payment.specificErrorCode && code === payment.specificErrorCode,
    );
  }

  private _goToHome(mapError: [string, string]): void {
    setTimeout(() => {
      this._facade.notificationOpen(
        mapError[0],
        true,
        ClassNotification.ERROR,
        false,
        mapError[1],
      );
    }, 10);
    this._router.navigate([NavigatePayment.home]);
  }

  private _openModal(mapError: [string, string]): void {
    this._modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(mapError), 10);
  }

  public _actionsModal(mapError: [string, string]): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = this._modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.img = '/essential-warning-6@3x.png';
      component.typeModal = 'warning';
      component.title = this._translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.TITLE`,
      );
      component.subtitle = this._translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.SUBTITLE`,
      );
      component.description = this._translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.MAIN_DESCRIPTION`,
      );
      component.btnAgree = this._translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.OK_BUTTON`,
      );

      const subs = component.actionAgree.subscribe(() => {
        this._modalService.close();
        this._goToHome(mapError);
        subs.unsubscribe();
      });
    }
  }
}

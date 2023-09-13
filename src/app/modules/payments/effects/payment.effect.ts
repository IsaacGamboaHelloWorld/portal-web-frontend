import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { Router } from '@angular/router';
import { BLOCKED_ERRORS_CODE } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { PaymentInterface } from '@app/core/interfaces/paymentObligation.interface';
import { NavigatePayment } from '@app/modules/paymentsv2/financial-ob/payment/components/navigate/routes';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Events } from '@core/constants/events';
import { Navigate, Titles } from '@core/constants/navigate';
import { EventsService } from '@core/services/tag_manager/events.service';
import { TranslateService } from '@ngx-translate/core';
import * as fromPayment from '@store/actions/models/payment/payment-account/payment-account-action';
import { PaymentModel } from '../payment.model';
import { PaymentService } from '../services/payment/payment.service';

@Injectable()
export class PaymentEffect {
  private codesProductBlocked: string[] = BLOCKED_ERRORS_CODE;

  constructor(
    private actions$: Actions,
    private paymentService: PaymentService,
    private events: EventsService,
    private model: PaymentModel,
    private _translateService: TranslateService,
    private _modalService: ModalService,
    private router: Router,
  ) {}

  @Effect()
  PayLoan: Observable<Action> = this.actions$.pipe(
    ofType<fromPayment.PaymentLoadAction>(fromPayment.PAYMENT_LOAD),
    switchMap((action: fromPayment.PaymentLoadAction) => {
      this._loadTranslate();
      return this.paymentService
        .accountPayment(
          action.ownershipIdType,
          action.ownershipIdNumber,
          action.originAccountId,
          action.originAccountType,
          action.destinationAccountId,
          action.destinationAccountType,
          action.destinationLoanName,
          action.destinationNewLoan,
          action.bank,
          action.amount,
          action.notes,
        )
        .pipe(
          map((res: PaymentInterface) => {
            if (!isNullOrUndefined(res.success) && res.success) {
              this.events.event({
                event: Events.page_view,
                pagePath:
                  window.location.pathname + Navigate.payment_success_public,
                pageTitle: Titles.payment_success_public,
              });
              return new fromPayment.PaymentSuccessAction(res);
            }
            const isErrorBlocked = this._checkErrorIsBlocked(res);
            const mapError = mapErrorReponse(res);
            if (isErrorBlocked) {
              this._openModal(mapError);
            } else {
              this._goToHome(mapError);
            }
            return new fromPayment.PaymentFailAction(
              res.errorMessage,
              res.specificErrorCode,
            );
          }),
          catchError((err: PaymentInterface) => {
            const message = isNullOrUndefined(err)
              ? ''
              : typeof err === 'string'
              ? err
              : err.errorMessage;
            this.model.notificationOpen(message, true, ClassNotification.ERROR);
            return of(new fromPayment.PaymentFailAction(err.errorMessage));
          }),
        );
    }),
  );

  private _checkErrorIsBlocked(payment: PaymentInterface): boolean {
    return !!this.codesProductBlocked.find(
      (code: string) =>
        !!payment.specificErrorCode && code === payment.specificErrorCode,
    );
  }

  private _goToHome(mapError: [string, string]): void {
    setTimeout(() => {
      this.model.notificationOpen(
        mapError[0],
        true,
        ClassNotification.ERROR,
        false,
        mapError[1],
      );
    }, 10);
    this.router.navigate([NavigatePayment.payment_type]);
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

  private _loadTranslate(): void {
    this.codesProductBlocked = this._translateService.instant(
      'BLOCK_PRODS.POPUPS.TRANSFER_ERROR.STATUS_CODE_ERRORS',
    );
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BLOCKED_ERRORS_CODE } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { IBillerDetailResponse } from '@app/modules/paymentsv2/public-services/payment/entities/new-payment';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import * as LoadDetailBillActions from '@modules/paymentsv2/public-services/store/actions/biller-detail.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import {
  IAnswerInformation,
  IAnswerPayRoll,
  PilaPaymentResponse,
} from '../../entities/pay-stack';
import { NavigatePayStack } from '../../entities/routes';
import { PayStackService } from '../../services/pay-stack.service';
import * as InformationActions from '../actions/information.actions';
import * as PayStackActions from '../actions/pay-stack.actions';
import * as PayrollActions from '../actions/payroll.actions';
import { PayStackModel } from '../model/pay-stack.model';

@Injectable()
export class PayStackEffect {
  private error: string;
  private codesProductBlocked: string[] = BLOCKED_ERRORS_CODE;

  constructor(
    private actions$: Actions,
    private payStackServices: PayStackService,
    private model: PayStackModel,
    private globalData: GlobalDataService,
    private router: Router,
    private _translateService: TranslateService,
    private _modalService: ModalService,
  ) {}

  LoadPayRoll: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PayrollActions.PayrollLoad),
      switchMap((action) => {
        return this.payStackServices.agreements(action.id).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerPayRoll) => {
            if (!!data && data.success) {
              return PayrollActions.PayrollSuccess(data);
            }
            this.error = data.errorMessage
              ? data.errorMessage
              : data['description'];
            return new NotificationShowAction(
              this.error,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(PayrollActions.PayrollFail(''));
          }),
        );
      }),
    ),
  );

  LoadInformation: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(InformationActions.InformationLoad),
      switchMap((action) => {
        return this.payStackServices.information(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerInformation) => {
            if (!!data && data.success) {
              return InformationActions.InformationSuccess(data);
            }
            this.error = data.errorMessage
              ? data.errorMessage
              : data['description'];
            this.model.failInformation(this.error);
            return new NotificationShowAction(
              this.error,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(InformationActions.InformationFail(''));
          }),
        );
      }),
    ),
  );

  LoadLoanDetail: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadDetailBillActions.BillerDetailLoad),
      switchMap((action: any) => {
        return this.payStackServices.getBillDetail(action.data).pipe(
          take(1),
          map((data: IBillerDetailResponse) => {
            if (!!data && data.success) {
              return LoadDetailBillActions.BillerDetailSuccess(data);
            }
            const error = data.errorMessage
              ? data.errorMessage
              : data.description;
            this.model.failInfoBill(error);
            return LoadDetailBillActions.BillerDetailFail(error);
          }),
          catchError((error) => {
            return of(
              LoadDetailBillActions.BillerDetailFail(error.errorMessage),
            );
          }),
        );
      }),
    ),
  );

  Payment: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PayStackActions.PayStackLoad),
      switchMap((action) => {
        this._loadTranslate();
        return this.payStackServices.payment(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: PilaPaymentResponse) => {
            if (!!data && data.success) {
              return PayStackActions.PayStackSuccess(data);
            }
            const isErrorBlocked = this._checkErrorIsBlocked(data);
            const mapError = mapErrorReponse(data);
            if (isErrorBlocked) {
              this._openModal(mapError);
            } else {
              this._goToHome(mapError);
            }
            return PayStackActions.PayStackFail(
              mapError[0],
              data.specificErrorCode,
            );
          }),
          catchError((_error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(PayStackActions.PayStackFail(''));
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

  private _checkErrorIsBlocked(amswer: PilaPaymentResponse): boolean {
    return !!this.codesProductBlocked.find(
      (code: string) =>
        !!amswer.specificErrorCode && code === amswer.specificErrorCode,
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
    this.router.navigate([NavigatePayStack.payment]);
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

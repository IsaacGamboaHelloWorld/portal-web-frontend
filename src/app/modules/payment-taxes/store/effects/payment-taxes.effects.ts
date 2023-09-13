import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { Router } from '@angular/router';
import { BLOCKED_ERRORS_CODE } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { TranslateService } from '@ngx-translate/core';
import {
  IAnswerPaymentTaxes,
  ICities,
  IReference,
  ITaxes,
} from '../../entities/payment-taxes';
import { NavigatePaymentTaxes } from '../../entities/routes';
import { PaymentTaxesService } from '../../services/payment-taxes.service';
import * as CitiesActions from '../actions/cities.actions';
import * as PaymentTaxesActions from '../actions/payment-taxes.actions';
import * as ReferenceActions from '../actions/reference.actions';
import * as TaxesActions from '../actions/taxes.actions';
import { PaymentTaxesModel } from '../model/payment-taxes.model';

@Injectable()
export class PaymentTaxesEffect {
  private codesProductBlocked: string[] = BLOCKED_ERRORS_CODE;

  constructor(
    private actions$: Actions,
    private paymentTaxesServices: PaymentTaxesService,
    private model: PaymentTaxesModel,
    private globalData: GlobalDataService,
    private translate: TranslateService,
    private router: Router,
    private _modalService: ModalService,
  ) {}

  LoadCities: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CitiesActions.CitiesLoad),
      switchMap((action) => {
        return this.paymentTaxesServices.paymentTaxesCities().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: ICities) => {
            if (!!data && data.success) {
              return CitiesActions.CitiesSuccess(data);
            }
            return new NotificationShowAction(
              data.errorMessage,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((_error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(CitiesActions.CitiesFail(''));
          }),
        );
      }),
    ),
  );

  LoadTaxes: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TaxesActions.TaxesLoad),
      switchMap((action: any) => {
        return this.paymentTaxesServices.loadTaxes(action.idCity).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: ITaxes) => {
            if (!!data && data.success) {
              return TaxesActions.TaxesSuccess(data);
            }
            return new NotificationShowAction(
              data.errorMessage,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((_error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(TaxesActions.TaxesFail(''));
          }),
        );
      }),
    ),
  );

  LoadReference: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceActions.ReferenceLoad),
      switchMap((action: any) => {
        return this.paymentTaxesServices
          .validReference(action.noReference, action.biller)
          .pipe(
            takeUntil(this.globalData.cancel),
            take(1),
            map((data: IReference) => {
              if (!!data && data.success) {
                return ReferenceActions.ReferenceSuccess(data);
              }
              const mapResponse = mapErrorReponse(data);
              this.model.failReference(mapResponse[0]);
              return new NotificationShowAction(
                mapResponse[0],
                true,
                ClassNotification.ERROR,
              );
            }),
            catchError((_error) => {
              new NotificationShowAction('', true, ClassNotification.ERROR);
              return of(ReferenceActions.ReferenceFail(''));
            }),
          );
      }),
    ),
  );

  NewPaymentTaxes: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(PaymentTaxesActions.PaymentTaxesLoad),
      switchMap((action: any) => {
        this._loadTranslate();
        return this.paymentTaxesServices.payment(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerPaymentTaxes) => {
            if (!!data && data.success) {
              return PaymentTaxesActions.PaymentTaxesSuccess(data);
            }
            this.model.creationFail(data.errorMessage, data.specificErrorCode);
            const isErrorBlocked = this._checkErrorIsBlocked(data);
            const mapResponse = mapErrorReponse(data);
            if (isErrorBlocked) {
              this._openModal();
            } else {
              this._goToHome();
            }
            return new NotificationShowAction(
              mapResponse[0],
              true,
              ClassNotification.ERROR,
              false,
              mapResponse[1],
            );
          }),
          catchError((_error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(PaymentTaxesActions.PaymentTaxesFail(''));
          }),
        );
      }),
    ),
  );

  private _loadTranslate(): void {
    this.codesProductBlocked = this.translate.instant(
      'BLOCK_PRODS.POPUPS.TRANSFER_ERROR.STATUS_CODE_ERRORS',
    );
  }

  private _checkErrorIsBlocked(payment: any): boolean {
    return !!this.codesProductBlocked.find(
      (code: string) =>
        !!payment.specificErrorCode && code === payment.specificErrorCode,
    );
  }

  private _goToHome(): void {
    this.router.navigate([NavigatePaymentTaxes.payment]);
    this.model.reset();
  }

  private _openModal(): void {
    this._modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(), 10);
  }

  public _actionsModal(): void {
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
      component.title = this.translate.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.TITLE`,
      );
      component.subtitle = this.translate.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.SUBTITLE`,
      );
      component.description = this.translate.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.MAIN_DESCRIPTION`,
      );
      component.btnAgree = this.translate.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.OK_BUTTON`,
      );

      const subs = component.actionAgree.subscribe(() => {
        this._modalService.close();
        this._goToHome();
        subs.unsubscribe();
      });
    }
  }
}

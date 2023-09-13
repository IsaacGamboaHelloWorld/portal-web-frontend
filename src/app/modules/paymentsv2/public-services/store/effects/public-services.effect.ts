import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import * as LoadDetailBillActions from '@modules/paymentsv2/public-services/store/actions/biller-detail.action';
import * as DeletePaymentActions from '@modules/paymentsv2/public-services/store/actions/delete-payment.action';
import * as DeleteRecurringActions from '@modules/paymentsv2/public-services/store/actions/delete-recurring-payment.action';
import * as NextPaymentsActions from '@modules/paymentsv2/public-services/store/actions/next-payments.actions';
import * as RecurringActions from '@modules/paymentsv2/public-services/store/actions/recurring-payment.action';
import * as AllPaymentsActions from '@modules/paymentsv2/public-services/store/actions/registered-bills.action';
import { TranslateService } from '@ngx-translate/core';
import { ClassNotification } from '../../../../../core/constants/notification';
import { checkNested } from '../../../../../shared/helpers/checkNested.helper';
import { ModalService } from '../../../../../shared/modal/services/modal.service';
import { ModalSuccessComponent } from '../../components/modal-success/modal-success.component';
import {
  INextPaymentsResponse,
  IRecurringPayment,
  IRecurringPaymentResponse,
} from '../../entities/public-services';
import { IBillerDetailResponse } from '../../payment/entities/new-payment';
import { PublicServicesFacade } from '../../public-services.facade';
import { PublicServicesService } from '../../services/public-services.service';

@Injectable()
export class PublicServicesEffect {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private actions$: Actions,
    private _service: PublicServicesService,
    private _facade: PublicServicesFacade,
    private _translate: TranslateService,
    private _modal: ModalService,
  ) {}

  NextPublicServicesPayments: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NextPaymentsActions.NextPublicServicesPaymentsLoad),
      switchMap((action) => {
        return this._service.loadNextPublicServicesPayments().pipe(
          take(1),
          map((data: INextPaymentsResponse) => {
            if (!!data.success && data.success) {
              return NextPaymentsActions.NextPublicServicesPaymentsSuccess(
                data.billerPayments,
              );
            }
            return NextPaymentsActions.NextPublicServicesPaymentsFail(
              data.errorMessage,
            );
          }),
          catchError((error) => {
            return of(
              NextPaymentsActions.NextPublicServicesPaymentsFail(
                error.errorMessage,
              ),
            );
          }),
        );
      }),
    ),
  );

  LoadAllPublicServices: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllPaymentsActions.AllPublicServicesPaymentsLoad),
      switchMap((action) => {
        return this._service.allRegisteredPublicServices().pipe(
          take(1),
          map((data: any) => {
            if (!!data.success && data.success) {
              return AllPaymentsActions.AllPublicServicesPaymentsSuccess(
                data.billers,
              );
            }
            return AllPaymentsActions.AllPublicServicesPaymentsFail(
              data.errorMessage,
            );
          }),
          catchError((error) => {
            return of(
              AllPaymentsActions.AllPublicServicesPaymentsFail(
                error.errorMessage,
              ),
            );
          }),
        );
      }),
    ),
  );

  DeletePayment: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(DeletePaymentActions.DeletePaymentPublicLoad),
      switchMap((action) => {
        return this._service.doDelete(action.deleteData).pipe(
          take(1),
          map((data: any) => {
            if (!!data.success && data.success) {
              return DeletePaymentActions.DeletePaymentPublicSuccess(data);
            }
            this._facade.notificationOpen(
              data.errorMessage,
              false,
              ClassNotification.ERROR,
            );
            return DeletePaymentActions.DeletePaymentPublicFail(
              data.errorMessage,
            );
          }),
          catchError((error) => {
            this._facade.notificationOpen(
              error,
              false,
              ClassNotification.ERROR,
            );
            return of(
              DeletePaymentActions.DeletePaymentPublicFail(error.errorMessage),
            );
          }),
        );
      }),
    ),
  );

  SaveRecurring: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RecurringActions.RecurringLoadAction),
      switchMap((action) => {
        return this._service.saveRecurring(action.recurring).pipe(
          map((data: IRecurringPaymentResponse) => {
            if (!!data && data.success) {
              this._openCloseModal();
              return RecurringActions.RecurringSuccessAction(data);
            }
            this._openCloseModal(true, data.errorMessage, data);
            return RecurringActions.RecurringFailAction(data.errorMessage);
          }),
          catchError((error) => {
            this._openCloseModal(true, error);
            return of(RecurringActions.RecurringFailAction(error.errorMessage));
          }),
        );
      }),
    ),
  );

  DeleteRecurring: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteRecurringActions.DeleteRecurringLoadAction),
      switchMap((action) => {
        return this._service.deleteRecurring(action.recurring).pipe(
          map((data: IRecurringPaymentResponse) => {
            if (!!data && data.success) {
              this._notificationSuccess(
                this._translate.instant(
                  'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.NOT_RECURRING_SUCCESS',
                ),
              );
              return DeleteRecurringActions.DeleteRecurringSuccessAction(data);
            }
            this._facade.notificationOpen(
              data.errorMessage,
              false,
              ClassNotification.ERROR,
            );
            return DeleteRecurringActions.DeleteRecurringFailAction(
              data.errorMessage,
            );
          }),
          catchError((error) => {
            this._facade.notificationOpen(
              error,
              false,
              ClassNotification.ERROR,
            );
            return of(
              DeleteRecurringActions.DeleteRecurringFailAction(
                error.errorMessage,
              ),
            );
          }),
        );
      }),
    ),
  );

  LoadLoanDetail: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadDetailBillActions.BillerDetailLoad),
      switchMap((action: any) => {
        return this._service.getBillDetail(action.data).pipe(
          take(1),
          map((data: IBillerDetailResponse) => {
            if (!!data && data.success) {
              return LoadDetailBillActions.BillerDetailSuccess(data);
            }
            return LoadDetailBillActions.BillerDetailFail(data.errorMessage);
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

  private _notificationSuccess(
    message: string,
    autoClose: boolean = true,
  ): void {
    this._facade.notificationOpen(
      message,
      autoClose,
      ClassNotification.SUCCESS,
    );
  }

  private _notificationError(
    message: string,
    autoClose: boolean = false,
  ): void {
    this._facade.notificationOpen(message, autoClose, ClassNotification.ERROR);
  }

  private _openCloseModal(
    showError: boolean = false,
    message: string = '',
    data: any = null,
  ): void {
    this._modal.open(
      ModalSuccessComponent,
      true,
      `${SMALL_WIDTH} not-button-close only-accept btn-resp`,
    );
    setTimeout(() => this._actionsModal(showError, message, data), 10);
  }

  private _actionsModal(
    showError: boolean,
    message: string = '',
    data: any,
  ): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modal._dialogComponentRef,
      )
    ) {
      const component = this._modal._dialogComponentRef.instance.componentRef
        .instance;

      if (showError) {
        this._setupForError(component, message, data);
      } else {
        this._setupForSuccess(component);
      }
    }
  }

  private _setupForSuccess(component: any): void {
    component.title =
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.RECURRING_SUCCESS';
    component.desc =
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.RECURRING_SUCCESS_TEXT';
    component.img = '/idea.png';
    component.btnAgree =
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.RECURRING_SUCCESS_BTN';

    component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
      this._modal.close();

      this._notificationSuccess(
        this._translate.instant(
          'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.NOT_RECURRING_SUCCESS',
        ),
      );
    });
  }

  private _setupForError(component: any, message: string, data: any): void {
    component.isError = true;
    component.title =
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.PAYMENT.STEPS.STEP_SUCCESS.PROGRAMMED.MODAL.ERROR_TITLE';
    component.desc =
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.PAYMENT.STEPS.STEP_SUCCESS.PROGRAMMED.MODAL.ERROR_DESCRIPTION';
    component.img = '/error-icon.png';
    component.btnAgree =
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.PAYMENT.STEPS.STEP_SUCCESS.PROGRAMMED.MODAL.BUTTON_RETRY';
    component.btnCancel =
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.PAYMENT.STEPS.STEP_SUCCESS.PROGRAMMED.MODAL.BUTTON_CLOSE';

    component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
      if (!!data && !!data.request && !!data.request.biller) {
        this._retrySave(data);
      }
    });

    component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
      this._modal.close();
    });

    this._notificationError(message);
  }

  private _retrySave(info: any): void {
    const payInfo = info.request.biller;
    const data: IRecurringPayment = {
      billerId: payInfo.billerId,
      billerNickname: payInfo.billerNickname,
      contract: payInfo.contract,
      reference: payInfo.reference,
      paymentType: 'X_DAYS_BEFORE_DUE_DATE',
      maxAmount: !!payInfo.maxAmount ? payInfo.maxAmount : payInfo.amount,
      daysBeforeAfterExpiration: payInfo.daysBeforeAfterExpiration,
      originAccountId: payInfo.originAccountId,
      originAccountType: payInfo.originAccountType,
      editMode: payInfo.editMode,
    };
    this._facade.setRecurrent(data);
    this._modal.close();
  }
  // tslint:disable-next-line:max-file-line-count
}

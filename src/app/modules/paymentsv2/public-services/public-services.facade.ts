import { Injectable } from '@angular/core';
import { Product } from '@app/core/models/products/product';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '../../../store/actions/global/notification/notification.action';
import {
  IDeleteServiceRequest,
  IEditRecurring,
  IPublicService,
  IRecurringPayment,
} from './entities/public-services';
import { IBillerDetailRequest } from './payment/entities/new-payment';
import {
  InfoPaymentUtilResetError,
  InfoPaymentUtilSetError,
  InfoPaymentUtilSetIsBill,
} from './registered-sp/store/actions/info-payments.actions';
import { getInfoPayments } from './registered-sp/store/selectors/info-payments.selectors';
import { IInfoPayments } from './registered-sp/store/state/registered-sp-module.state';
import {
  BillerDetailLoad,
  BillerDetailReset,
} from './store/actions/biller-detail.action';
import {
  DeletePaymentPublicLoad,
  DeletePaymentPublicReset,
} from './store/actions/delete-payment.action';
import { DeleteRecurringLoadAction } from './store/actions/delete-recurring-payment.action';
import { EnabledAgreementsLoad } from './store/actions/enabled-agreements-on-scheduled-payment.action';
import {
  NextPublicServicesPaymentsLoad,
  NextPublicServicesPaymentsReset,
} from './store/actions/next-payments.actions';
import { RecurringLoadAction } from './store/actions/recurring-payment.action';
import {
  AllPublicServicesPaymentsLoad,
  AllPublicServicesPaymentsReset,
} from './store/actions/registered-bills.action';
import {
  SelectPaymentLoad,
  SelectPaymentReset,
} from './store/actions/select-payment.action';
import {
  SelectRecurringLoad,
  SelectRecurringReset,
} from './store/actions/select-recurring.action';
import { SetPublicServicesPaymentsLoad } from './store/actions/set-to-payment.action';
import { SetStepSp } from './store/actions/step.actions';
import { BillerDetailState } from './store/reducers/biller-detail.reducer';
import { IDeletePublicServicePayments } from './store/reducers/delete-payment.reducer';
import { EnabledAgreementsState } from './store/reducers/enabled-agreements.reducer';
import { INextPublicServicesPayments } from './store/reducers/next-payments.reducer';
import { IRecurringPaymentState } from './store/reducers/recurring-payment.reducer';
import { IAllPublicServicesPayments } from './store/reducers/registered-bills.reducer';
import { IEditRecurringState } from './store/reducers/selected-recurring.reducer';
import {
  getActiveNotdataPaymentState,
  getActivePaymentState,
  getDeleteRecurringPaymentState,
  getRecurringPaymentState,
  selectActiveNotDataPayment,
  selectActivePayment,
  selectAllPayments,
  selectDeletePayment,
  selectDeleteRecurringPayment,
  selectEditRecurringPayment,
  selectEnabledAgreementsOnPaymentSchedule,
  selectNextToPayments,
  selectProducts,
  selectRecurringPayment,
  selectStep,
} from './store/selectors/public-services.selector';
import { StepLineTime } from './store/state/public-services-module.state';

@Injectable()
export class PublicServicesFacade {
  constructor(private store: Store<ApplicationState>) {}

  public nextPayments$: Observable<
    INextPublicServicesPayments
  > = this.store.pipe(select(selectNextToPayments));

  public allPayments$: Observable<IAllPublicServicesPayments> = this.store.pipe(
    select(selectAllPayments),
  );

  public deletePayment$: Observable<
    IDeletePublicServicePayments
  > = this.store.pipe(select(selectDeletePayment));

  public selectedPayment$: Observable<BillerDetailState> = this.store.pipe(
    select(selectActivePayment),
  );

  public selectedNotDataPayment$: Observable<IPublicService> = this.store.pipe(
    select(selectActiveNotDataPayment),
  );

  public selectedProductsOrigin$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public selectRecurring$: Observable<IRecurringPaymentState> = this.store.pipe(
    select(selectRecurringPayment),
  );

  public getActiveNotdataPaymentState$: Observable<
    IPublicService
  > = this.store.pipe(select(getActiveNotdataPaymentState));

  public selectEnabledAgreements$: Observable<
    EnabledAgreementsState
  > = this.store.pipe(select(selectEnabledAgreementsOnPaymentSchedule));

  public selectEditRecurring$: Observable<
    IEditRecurringState
  > = this.store.pipe(select(selectEditRecurringPayment));

  public selectDeleteRecurring$: Observable<
    IRecurringPaymentState
  > = this.store.pipe(select(selectDeleteRecurringPayment));

  public getRecurringPaymentState$: Observable<
    IRecurringPaymentState
  > = this.store.pipe(select(getRecurringPaymentState));

  public getDeleteRecurringPaymentState$: Observable<
    IRecurringPaymentState
  > = this.store.pipe(select(getDeleteRecurringPaymentState));

  public getActivePaymentState$: Observable<
    BillerDetailState
  > = this.store.pipe(select(getActivePaymentState));

  public getInfoPayments$: Observable<IInfoPayments> = this.store.pipe(
    select(getInfoPayments),
  );

  public step$: Observable<StepLineTime> = this.store.pipe(select(selectStep));

  public setStep(step: StepLineTime): void {
    setTimeout(() => {
      this.store.dispatch(SetStepSp(step));
    }, 1);
  }

  public fetchNextPayments(): void {
    this.store.dispatch(NextPublicServicesPaymentsLoad());
  }

  public fetchAllPayments(): void {
    this.store.dispatch(AllPublicServicesPaymentsLoad());
  }

  public clearAllPayments(): void {
    this.store.dispatch(AllPublicServicesPaymentsReset());
  }

  public clearEditRecurring(): void {
    this.store.dispatch(SelectRecurringReset());
  }

  public clearAllData(): void {
    this.store.dispatch(AllPublicServicesPaymentsReset());
    this.store.dispatch(NextPublicServicesPaymentsReset());
    this.store.dispatch(SelectPaymentReset());
    this.store.dispatch(BillerDetailReset());
  }

  public clearNextPayments(): void {
    this.store.dispatch(NextPublicServicesPaymentsReset());
  }

  public selectPayment(data: IPublicService): void {
    this.store.dispatch(SelectPaymentLoad(data));
  }

  public clearSelectPayment(): void {
    this.store.dispatch(SelectPaymentReset());
  }

  public deleteSelectedPayment(_data: IDeleteServiceRequest): void {
    this.store.dispatch(DeletePaymentPublicLoad(_data));
  }

  public clearDeletePayment(): void {
    this.store.dispatch(DeletePaymentPublicReset());
  }

  public setPayment(_data: IPublicService): void {
    this.store.dispatch(SetPublicServicesPaymentsLoad(_data));
  }

  public setRecurrent(_data: IRecurringPayment): void {
    this.store.dispatch(RecurringLoadAction(_data));
  }

  public setEditRecurrent(_data: IEditRecurring): void {
    this.store.dispatch(SelectRecurringLoad(_data));
  }

  public setDeleteRecurrent(_data: IRecurringPayment): void {
    this.store.dispatch(DeleteRecurringLoadAction(_data));
  }

  public getInfoBill(_data: IBillerDetailRequest): void {
    this.store.dispatch(BillerDetailLoad(_data));
  }

  public clearInfoBill(): void {
    this.store.dispatch(BillerDetailReset());
  }

  public fetchAvailableAgreements(): void {
    this.store.dispatch(EnabledAgreementsLoad());
  }

  public setErrorInfoPaymentUtil(error: boolean, message: string): void {
    this.store.dispatch(InfoPaymentUtilSetError(error, message));
  }

  public resetErrorInfoPaymentUtil(): void {
    this.store.dispatch(InfoPaymentUtilResetError());
  }

  public setIsBillPaymentUtil(isBill: boolean): void {
    this.store.dispatch(InfoPaymentUtilSetIsBill(isBill));
  }

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(message, autoClosed, typeNotification),
    );
  }
}

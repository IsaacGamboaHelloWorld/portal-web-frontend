import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';
import { ApplicationState } from '@store/state/application.state';
import { Product } from '../../../core/models/products/product';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '../../../store/actions/global/notification/notification.action';
import { ResetProductActive } from '../../../store/actions/models/product-active/product-active.action';
import { IDeleteLoanRequest, IFinancialOp } from './entities/financial-op';
import {
  DeleteLoanLoad,
  DeleteLoanReset,
} from './store/actions/delete-payment.action';
import { setFreeDestinationFlowAction } from './store/actions/navigate.actions';
import { PaymentHistoryLoad } from './store/actions/payment-history.actions';
import {
  AllFinancialOpPaymentsLoad,
  AllFinancialOpPaymentsReset,
} from './store/actions/registered-bills.action';
import {
  SelectPaymentLoad,
  SelectPaymentReset,
} from './store/actions/select-payment.action';
import { SetStepOb } from './store/actions/step.actions';
import { IDeleteLoanPayments } from './store/reducers/delete-payment.reducer';
import { IHistoricPayments } from './store/reducers/payment-history.reducer';
import { IAllFinancialOpPayments } from './store/reducers/registered-bills.reducer';
import { IActiveFinancialOpPaymentPayments } from './store/reducers/selected-payment.reducer';
import {
  selectActivePayment,
  selectAllPayments,
  selectDeletePayment,
  selectHistoricPayments,
  selectIsFreeDestinationFlow,
  selectNextToPayments,
  selectStep,
} from './store/selectors/financial-op.selector';
import { StepLineTime } from './store/state/financial-op-module.state';

@Injectable()
export class FinancialOpFacade {
  constructor(private store: Store<ApplicationState>) {}

  public allPayments$: Observable<IAllFinancialOpPayments> = this.store.pipe(
    select(selectAllPayments),
  );

  public nextPayments$: Observable<Product[]> = this.store.pipe(
    select(selectNextToPayments),
  );

  public selectedPayment$: Observable<
    IActiveFinancialOpPaymentPayments
  > = this.store.pipe(select(selectActivePayment));

  public productActive$: Observable<IProductActive> = this.store.pipe(
    select((store) => store.models.productActive),
  );

  public step$: Observable<StepLineTime> = this.store.pipe(select(selectStep));

  public selectIsFreeDestinationFlow$: Observable<boolean> = this.store.pipe(
    select(selectIsFreeDestinationFlow),
  );

  public deletePayment$: Observable<IDeleteLoanPayments> = this.store.pipe(
    select(selectDeletePayment),
  );

  public historicPayments$: Observable<IHistoricPayments> = this.store.pipe(
    select(selectHistoricPayments),
  );

  public setStep(step: StepLineTime): void {
    setTimeout(() => {
      this.store.dispatch(SetStepOb(step));
    }, 1);
  }

  public setFlowFreeDestination(isFreeDestination: boolean): void {
    this.store.dispatch(setFreeDestinationFlowAction({ isFreeDestination }));
  }

  public fetchAllPayments(): void {
    this.store.dispatch(AllFinancialOpPaymentsLoad());
  }

  public clearAllPayments(): void {
    this.store.dispatch(AllFinancialOpPaymentsReset());
  }

  public clearActivePayment(): void {
    this.store.dispatch(ResetProductActive());
  }

  public selectPayment(data: IFinancialOp): void {
    this.store.dispatch(SelectPaymentLoad(data));
  }

  public clearSelectPayment(): void {
    this.store.dispatch(SelectPaymentReset());
  }

  public deleteSelectedPayment(_data: IDeleteLoanRequest): void {
    this.store.dispatch(DeleteLoanLoad(_data));
  }

  public clearDeletePayment(): void {
    this.store.dispatch(DeleteLoanReset());
  }

  public fetchHistoric(): void {
    this.store.dispatch(PaymentHistoryLoad());
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

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../core/models/products/product';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '../../../../store/actions/global/notification/notification.action';
import { ApplicationState } from '../../../../store/state/application.state';
import { ResetStepThreePayment } from '../../financial-ob/payment/store/actions/formThree.action';
import { ISetPayment } from '../entities/public-services';
import {
  IPaymentFormOne,
  IPaymentFormTwo,
  IServicePublicRequest,
  ISuccessServicePayment,
} from './entities/new-payment';
import { SetBackHome } from './store/actions/back-home.action';
import {
  ResetStepOnePayment,
  SetStepOnePayment,
} from './store/actions/formOne.action';
import {
  ResetStepTwoPayment,
  SetStepTwoPayment,
} from './store/actions/formTwo.action';
import {
  CreatePaymentLoad,
  CreatePaymentReset,
} from './store/actions/newPayment.action';
import {
  getActiveProduct,
  getBackHomeState,
  setNewPaymentOne,
  setNewPaymentTwo,
  setPaymentBill,
  setPaymentProducts,
} from './store/selectors/new-payment.selector';

@Injectable()
export class PaymentServiceFacade {
  constructor(private store: Store<ApplicationState>) {}

  public selectAllProducts$: Observable<Product[]> = this.store.pipe(
    select(setPaymentProducts),
  );

  public selectActiveProduct$: Observable<ISetPayment> = this.store.pipe(
    select(getActiveProduct),
  );

  public getStepOne$: Observable<IPaymentFormOne> = this.store.pipe(
    select(setNewPaymentOne),
  );

  public getStepTwo$: Observable<IPaymentFormTwo> = this.store.pipe(
    select(setNewPaymentTwo),
  );

  public paymentBill$: Observable<ISuccessServicePayment> = this.store.pipe(
    select(setPaymentBill),
  );
  public backHome$: Observable<boolean> = this.store.pipe(
    select(getBackHomeState),
  );

  public setPayment(_data: IServicePublicRequest): void {
    this.store.dispatch(CreatePaymentLoad(_data));
  }

  public setFormOne(_data: IPaymentFormOne): void {
    this.store.dispatch(SetStepOnePayment(_data));
  }

  public setFormTwo(_data: IPaymentFormTwo): void {
    this.store.dispatch(SetStepTwoPayment(_data));
  }

  public clear(): void {
    this.store.dispatch(ResetStepOnePayment());
    this.store.dispatch(ResetStepTwoPayment());
    this.store.dispatch(ResetStepThreePayment());
    this.store.dispatch(CreatePaymentReset());
  }

  public clearPayment(): void {
    this.store.dispatch(CreatePaymentReset());
  }

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
    hideClose: boolean = false,
    subMessage: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(
        message,
        autoClosed,
        typeNotification,
        hideClose,
        subMessage,
      ),
    );
  }
  public setBackHome(state: boolean): void {
    this.store.dispatch(SetBackHome(state));
  }
}

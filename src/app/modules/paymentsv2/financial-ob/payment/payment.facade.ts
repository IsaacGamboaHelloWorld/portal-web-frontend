import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../../../core/models/products/product';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '../../../../store/actions/global/notification/notification.action';
import { IProductActive } from '../../../../store/reducers/models/product-active/product-active.reducer';
import { ApplicationState } from '../../../../store/state/application.state';
import { ISetPayment } from '../entities/financial-op';
import {
  IFinancialObRequest,
  IPaymentFormOne,
  IPaymentFormThree,
  IPaymentFormTwo,
  ISuccessFinancialOb,
} from './entities/new-payment';
import { SetBackHome } from './store/actions/back-home.action';
import { SetStepOnePayment } from './store/actions/formOne.action';
import { SetStepThreePayment } from './store/actions/formThree.action';
import { SetStepTwoPayment } from './store/actions/formTwo.action';
import { CreateFOPaymentLoad } from './store/actions/newPayment.action';
import { SetStepPayment } from './store/actions/step.action';
import {
  getActiveProduct,
  getBackHomeState,
  selectStep,
  setActivePayment,
  setNewPaymentOne,
  setNewPaymentThree,
  setNewPaymentTwo,
  setPaymentBill,
  setPaymentProducts,
} from './store/selectors/new-payment.selector';

@Injectable()
export class PaymentObligationsFacade {
  constructor(private store: Store<ApplicationState>) {}

  public selectAllProducts$: Observable<Product[]> = this.store.pipe(
    select(setPaymentProducts),
  );

  public selectActiveProduct$: Observable<ISetPayment> = this.store.pipe(
    select(getActiveProduct),
  );

  public selectActivePayment$: Observable<IProductActive> = this.store.pipe(
    select(setActivePayment),
  );

  public getStepOne$: Observable<IPaymentFormOne> = this.store.pipe(
    select(setNewPaymentOne),
  );

  public getStepTwo$: Observable<IPaymentFormTwo> = this.store.pipe(
    select(setNewPaymentTwo),
  );

  public getStepThree$: Observable<IPaymentFormThree> = this.store.pipe(
    select(setNewPaymentThree),
  );

  public paymentBill$: Observable<ISuccessFinancialOb> = this.store.pipe(
    select(setPaymentBill),
  );

  public step$: Observable<number> = this.store.pipe(select(selectStep));

  public backHome$: Observable<boolean> = this.store.pipe(
    select(getBackHomeState),
  );
  public setBackHome(state: boolean): void {
    this.store.dispatch(SetBackHome(state));
  }

  public setPayment(_data: IFinancialObRequest): void {
    this.store.dispatch(CreateFOPaymentLoad(_data));
  }

  public setFormOne(_data: IPaymentFormOne): void {
    this.store.dispatch(SetStepOnePayment(_data));
  }

  public setFormTwo(_data: IPaymentFormTwo): void {
    this.store.dispatch(SetStepTwoPayment(_data));
  }

  public setFormThree(_data: IPaymentFormThree): void {
    this.store.dispatch(SetStepThreePayment(_data));
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

  public setStep(step: number): void {
    setTimeout(() => {
      this.store.dispatch(SetStepPayment(step));
    }, 1);
  }
}

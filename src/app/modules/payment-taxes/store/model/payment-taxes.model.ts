import { Injectable } from '@angular/core';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { select, Store } from '@ngrx/store';

import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';
import { Product } from '../../../../core/models/products/product';

import {
  IAnswerPaymentTaxes,
  ICities,
  IDatePaymentTaxes,
  INewPaymentTaxesModuleState,
  IPaymentTaxesFormOne,
  IReference,
  ISendPaymentTaxes,
  ITaxes,
  StepLineTime,
} from '../../entities/payment-taxes';
import { CitiesLoad } from '../actions/cities.actions';
import {
  ResetStepOnePaymentTaxes,
  SetDatePaymentTaxes,
  SetStepOnePaymentTaxes,
} from '../actions/formOne.action';
import {
  PaymentTaxesFail,
  PaymentTaxesLoad,
  PaymentTaxesReset,
} from '../actions/payment-taxes.actions';
import {
  ReferenceFail,
  ReferenceLoad,
  ReferenceReset,
} from '../actions/reference.actions';
import { ResetStepTaxes, SetStepTaxes } from '../actions/step.actions';
import { TaxesLoad, TaxesReset } from '../actions/taxes.actions';
import {
  selectCities,
  selectDate,
  selectInfoPaymentTaxes,
  selectProducts,
  selectReference,
  selectStatePayment,
  selectStep,
  selectStepOne,
  selectTaxes,
} from '../selectors/payment-taxes.selector';
@Injectable()
export class PaymentTaxesModel {
  constructor(private store: Store<ApplicationState>) {}

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );
  public cities$: Observable<ICities> = this.store.pipe(select(selectCities));
  public taxes$: Observable<ITaxes> = this.store.pipe(select(selectTaxes));
  public step$: Observable<StepLineTime> = this.store.pipe(select(selectStep));
  public stepOne$: Observable<IPaymentTaxesFormOne> = this.store.pipe(
    select(selectStepOne),
  );
  public date$: Observable<IDatePaymentTaxes> = this.store.pipe(
    select(selectDate),
  );
  public statePayment$: Observable<IAnswerPaymentTaxes> = this.store.pipe(
    select(selectStatePayment),
  );

  public statePaymentTaxes: Observable<
    INewPaymentTaxesModuleState
  > = this.store.pipe(select(selectInfoPaymentTaxes));

  public reference: Observable<IReference> = this.store.pipe(
    select(selectReference),
  );

  public getCities(): void {
    this.store.dispatch(CitiesLoad());
  }
  public getTaxes(idCity: string): void {
    this.store.dispatch(TaxesLoad(idCity));
  }
  public ifValidReference(noReference: number, biller: string): void {
    this.store.dispatch(ReferenceLoad(noReference, biller));
  }

  public creationFail(_data: string, specificErrorCode: string = ''): void {
    this.store.dispatch(PaymentTaxesFail(_data, specificErrorCode));
  }

  public creationSucces(_data?: ISendPaymentTaxes): void {
    this.store.dispatch(PaymentTaxesLoad(_data));
  }

  public resetReference(): void {
    this.store.dispatch(ReferenceReset());
  }
  public failReference(_data: string): void {
    this.store.dispatch(ReferenceFail(_data));
  }

  public setStep(step: StepLineTime): void {
    setTimeout(() => {
      this.store.dispatch(SetStepTaxes(step));
    }, 1);
  }
  public setFormOne(_data: IPaymentTaxesFormOne): void {
    this.store.dispatch(SetStepOnePaymentTaxes(_data));
  }
  public setDate(_data: IDatePaymentTaxes): void {
    this.store.dispatch(SetDatePaymentTaxes(_data));
  }

  public resetTaxes(): void {
    this.store.dispatch(TaxesReset());
  }

  public reset(): void {
    this.store.dispatch(ResetStepOnePaymentTaxes());
    this.store.dispatch(PaymentTaxesReset());
    this.store.dispatch(ReferenceReset());
    this.store.dispatch(ResetStepTaxes());
    this.store.dispatch(TaxesReset());
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
}

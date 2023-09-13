import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  IAnswerPaymentTaxes,
  ISendPaymentTaxes,
} from '@app/modules/payment-taxes/entities/payment-taxes';
import { Product } from '@core/models/products/product';

@Injectable()
export class PaymentTaxesModelMock {
  private innerOneData?: object = null;

  get geInnerOneData(): object {
    return this.innerOneData;
  }

  set setInnerOneData(data: object) {
    this.innerOneData = data;
    this.stepOne$.next(data);
  }

  private innerStatePaymentData?: IAnswerPaymentTaxes = null;

  get geInnerStatePaymentData(): IAnswerPaymentTaxes {
    return this.innerStatePaymentData;
  }

  set setInnerStatePaymentData(data: IAnswerPaymentTaxes) {
    this.innerOneData = data;
    this.statePayment$.next(data);
  }

  public homePockets$: BehaviorSubject<object> = new BehaviorSubject({});
  public productsOrigin$: BehaviorSubject<object> = new BehaviorSubject({});
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public pockets$: BehaviorSubject<object> = new BehaviorSubject({});
  public pocketAnswer$: BehaviorSubject<object> = new BehaviorSubject({});
  public categories$: BehaviorSubject<object> = new BehaviorSubject({});
  public activeProduct$: BehaviorSubject<object> = new BehaviorSubject({});
  public firstStep$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepOne$: BehaviorSubject<object> = new BehaviorSubject(
    this.innerOneData,
  );
  public stepTwo$: BehaviorSubject<object> = new BehaviorSubject({});
  public navigate: BehaviorSubject<object> = new BehaviorSubject({});
  public step$: BehaviorSubject<number> = new BehaviorSubject(1);
  public statePayment$: BehaviorSubject<
    IAnswerPaymentTaxes
  > = new BehaviorSubject(this.innerStatePaymentData);

  public viewSucces: BehaviorSubject<string> = new BehaviorSubject('');
  public imgTicket: BehaviorSubject<string> = new BehaviorSubject('');
  public textBtn: BehaviorSubject<string> = new BehaviorSubject('');

  public fetchHome(): void {}
  public resetPocket(): void {}
  public getCategories(): void {}
  public createPocket(): void {}
  public setFormOne(): void {}
  public setFormTwo(): void {}
  public setFormThree(): void {}
  public creationFail(): void {}
  public clearCompanyActive(): void {}
  public reset(): void {}
  public setStep(step: number = 0): void {}
  public creationSucces(_data?: ISendPaymentTaxes): void {}

  public submitData(): void {}
  public init(): void {}
  public _setStep(step: number = 0): void {}
}

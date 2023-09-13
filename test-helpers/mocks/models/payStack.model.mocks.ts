import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  IDatePayStack,
  PilaPaymentRequest,
  PilaPaymentResponse,
} from '@app/modules/pay-stack/entities/pay-stack';
import { Product } from '@core/models/products/product';

@Injectable()
export class PayStackModelMock {
  private innerOneData?: object = null;

  get geInnerOneData(): object {
    return this.innerOneData;
  }

  set setInnerOneData(data: object) {
    this.innerOneData = data;
    this.stepOne$.next(data);
  }

  private innerStatePaymentData?: PilaPaymentResponse = null;

  get geInnerStatePaymentData(): PilaPaymentResponse {
    return this.innerStatePaymentData;
  }

  set setInnerStatePaymentData(data: PilaPaymentResponse) {
    this.innerOneData = data;
    this.statePayment$.next(data);
  }

  private innerDateData?: IDatePayStack = null;

  get geInnerDateData(): IDatePayStack {
    return this.innerDateData;
  }

  set setInnerDateData(data: IDatePayStack) {
    this.innerDateData = data;
    this.date$.next(data);
  }

  public homePockets$: BehaviorSubject<object> = new BehaviorSubject({});
  public productsOrigin$: BehaviorSubject<object> = new BehaviorSubject({});
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public pockets$: BehaviorSubject<object> = new BehaviorSubject({});
  public pocketAnswer$: BehaviorSubject<object> = new BehaviorSubject({});
  public categories$: BehaviorSubject<object> = new BehaviorSubject({});
  public activeProduct$: BehaviorSubject<object> = new BehaviorSubject({});
  public firstStep$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepOne$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepTwo$: BehaviorSubject<object> = new BehaviorSubject({});
  public navigate: BehaviorSubject<object> = new BehaviorSubject({});
  public date$: BehaviorSubject<IDatePayStack> = new BehaviorSubject(
    this.innerDateData,
  );
  public step$: BehaviorSubject<number> = new BehaviorSubject(1);
  public statePayment$: BehaviorSubject<
    PilaPaymentResponse
  > = new BehaviorSubject(null);

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
  public cleanOnBackAction(): void {}
  public creationSucces(_data?: PilaPaymentRequest): void {}

  public submitData(): void {}
  public init(): void {}
  public _setStep(_step: number = 0): void {}
  public setDate(_data: any): void {}
}

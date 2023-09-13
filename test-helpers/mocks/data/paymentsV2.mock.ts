import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepLineTime } from '../../../src/app/modules/paymentsv2/financial-ob/store/state/financial-op-module.state';
import { responseOptionsModuleMock } from './options-modules.mock';
import { PaymentsHistoricalErrorsMock } from './payment.mock';
import {
  billersPaymentsMock,
  recurringDeleteStateMock,
} from './payments-sp.mock';
import { ProductsMock } from './products.mock';
@Injectable()
export class PaymentsV2ModelMock {
  private innerSelectedPayment?: any = {
    activePayment: {
      accountId: '101010',
      accountType: 'DESPOSIT_ACCOUNT',
      bank: 'POPULAR',
      loanName: 'Pago de deuda',
      bankName: 'banco popular',
      newLoan: true,
    },
  };
  get getInnerSelectedPayment(): any {
    return this.innerSelectedPayment;
  }
  set setInnerSelectedPayment(data: any) {
    this.innerSelectedPayment = data;
    this.selectedPayment$.next(data);
  }

  private innerAllPayments?: any = ProductsMock.DEPOSIT_ACCOUNT;
  get getInnerAllPayments(): any {
    return this.innerAllPayments;
  }
  set setInnerAllPayments(data: any) {
    this.innerAllPayments = data;
    this.allPayments$.next(data);
  }

  private innerNextPayments?: any = ProductsMock.DEPOSIT_ACCOUNT;
  get getInnerNextPayments(): any {
    return this.innerNextPayments;
  }
  set setInnerNextPayments(data: any) {
    this.innerNextPayments = data;
    this.nextPayments$.next(data);
  }

  private innerSelectProductsOrigin?: any = ProductsMock.DEPOSIT_ACCOUNT;
  get getInnerSelectProductsOrigin(): any {
    return this.innerSelectProductsOrigin;
  }
  set setInnerSelectProductsOrigin(data: any) {
    this.innerSelectProductsOrigin = data;
    this.selectProductsOrigin$.next(data);
  }

  private innerSelectedProductsOrigin?: any = ProductsMock.DEPOSIT_ACCOUNT;
  get getInnerSelectedProductsOrigin(): any {
    return this.innerSelectedProductsOrigin;
  }
  set setInnerSelectedProductsOrigin(data: any) {
    this.innerSelectedProductsOrigin = data;
    this.selectedProductsOrigin$.next(data);
  }

  public selectedPayment$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerSelectedPayment,
  );

  public allPayments$: BehaviorSubject<object> = new BehaviorSubject(
    this.innerAllPayments,
  );

  public nextPayments$: BehaviorSubject<object> = new BehaviorSubject(
    this.innerNextPayments,
  );

  private innerSelectAllProducts?: any = ProductsMock.DEPOSIT_ACCOUNT;
  get getInnerSelectAllProducts(): any {
    return this.innerSelectAllProducts;
  }
  set setInnerSelectAllProducts(data: any) {
    this.innerSelectAllProducts = data;
    this.selectAllProducts$.next(data);
  }

  private innerDeletePayment?: any = recurringDeleteStateMock;
  get getInnerDeletePayment(): any {
    return this.innerDeletePayment;
  }
  set setInnerDeletePayment(data: any) {
    this.innerDeletePayment = data;
    this.deletePayment$.next(data);
  }

  private innerHistoryPayment?: any = PaymentsHistoricalErrorsMock;
  get getInnerHistoryPayment(): any {
    return this.innerHistoryPayment;
  }
  set setInnerHistoryPayment(data: any) {
    this.innerHistoryPayment = data;
    this.historicPayments$.next(data);
  }

  private innerStepOne?: any = {
    account_origin: ProductsMock.DEPOSIT_ACCOUNT[0],
    loan_destination: {
      activePayment: {
        newLoan: true,
      },
    },
    service_destination: billersPaymentsMock.billerPayments[0],
  };
  get getInnerStepOne(): any {
    return this.innerStepOne;
  }
  set setInnerStepOne(data: any) {
    this.innerStepOne = data;
    this.getStepOne$.next(data);
  }

  public selectAllProducts$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerSelectAllProducts,
  );

  public step$: BehaviorSubject<object> = new BehaviorSubject({});
  public selectIsFreeDestinationFlow$: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);
  public historicPayments$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerHistoryPayment,
  );
  public companyList$: BehaviorSubject<object> = new BehaviorSubject({});
  public companies$: BehaviorSubject<object> = new BehaviorSubject({});
  public companyActive$: BehaviorSubject<object> = new BehaviorSubject({});
  public serviceAdded$: BehaviorSubject<object> = new BehaviorSubject({});
  public selectActiveProduct$: BehaviorSubject<object> = new BehaviorSubject(
    {},
  );
  public productsTC$: BehaviorSubject<object> = new BehaviorSubject({});
  public deletePayment$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerDeletePayment,
  );
  public hasNextBills$: BehaviorSubject<object> = new BehaviorSubject({});
  public hasAllBills$: BehaviorSubject<object> = new BehaviorSubject({});
  public allNextpayments$: BehaviorSubject<object> = new BehaviorSubject({});
  public selectedProductsOrigin$: BehaviorSubject<object> = new BehaviorSubject(
    this.innerSelectedProductsOrigin,
  );
  public selectProducts$: BehaviorSubject<object> = new BehaviorSubject({});
  public selectProductsOrigin$: BehaviorSubject<object> = new BehaviorSubject(
    this.innerSelectProductsOrigin,
  );
  public selectRecurring$: BehaviorSubject<any> = new BehaviorSubject({});
  public recurring$: BehaviorSubject<object> = new BehaviorSubject({});
  public activePayment$: BehaviorSubject<object> = new BehaviorSubject({});
  public hasActivePayment$: BehaviorSubject<object> = new BehaviorSubject({});
  public productsOrigin$: BehaviorSubject<object> = new BehaviorSubject({});
  public savedAggrement$: BehaviorSubject<object> = new BehaviorSubject({});
  public selectDeleteRecurring$: BehaviorSubject<object> = new BehaviorSubject(
    {},
  );
  public selectedNotDataPayment$: BehaviorSubject<any> = new BehaviorSubject(
    {},
  );
  public selectEditRecurring$: BehaviorSubject<any> = new BehaviorSubject({});
  public infoPayment$: BehaviorSubject<any> = new BehaviorSubject({});
  public getStepOne$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerStepOne,
  );
  public getStepTwo$: BehaviorSubject<any> = new BehaviorSubject({});
  public getStepThree$: BehaviorSubject<any> = new BehaviorSubject({});
  public paymentBill$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepThree$: BehaviorSubject<any> = new BehaviorSubject({});
  public payment$: BehaviorSubject<object> = new BehaviorSubject({});
  public optionsModule$$: BehaviorSubject<object> = new BehaviorSubject(
    responseOptionsModuleMock,
  );
  public selectEnabledAgreements$: BehaviorSubject<
    object
  > = new BehaviorSubject({});
  public backHome$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public setStep(step: StepLineTime): void {}
  public fetchNextPayments(): void {}
  public fetchAllPayments(): void {}
  public clearAllPayments(): void {}
  public clearAllData(): void {}
  public clearNextPayments(): void {}
  public selectPayment(): void {}
  public clearSelectPayment(): void {}
  public deleteSelectedPayment(): void {}
  public searchData(): void {}
  public fetchCompanyActive(): void {}
  public clearCompanyActive(): void {}
  public clearServiceSaved(): void {}
  public clearDelete(): void {}
  public fetchHistoric(): void {}
  public fetchNewService(): void {}
  public notificationOpen(): void {}
  public deletePayment(): void {}
  public clearDeletePayment(): void {}
  public setPayment(): void {}
  public setFormOne(): void {}
  public setFormTwo(): void {}
  public setFormThree(_data: any): void {}
  public setRecurrent(): void {}
  public setDeleteRecurrent(): void {}
  public setEditRecurrent(): void {}
  public clearEditRecurring(): void {}
  public getInfoBill(): void {}
  public clearInfoBill(): void {}
  public clear(): void {}
  public clearPayment(): void {}
  public resetProduct(): void {}
  public setFlowFreeDestination(): void {}
  public resetFlowFreeDestination(): void {}
  public fetchAvailableAgreements(): void {}
  public setBackHome(state: boolean): void {}
  public optionModuleLoad(): void {}
}

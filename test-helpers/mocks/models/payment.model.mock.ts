import { Injectable } from '@angular/core';
import { IBanks } from '@app/store/reducers/models/banks/banks.reducer';
import { BehaviorSubject } from 'rxjs';

import { Product } from '@core/models/products/product';
import { responseOptionsModuleMock } from '../data/options-modules.mock';
import { PaymentOneForm } from '../data/PaymentOneFrom.mock';
import { ProductsMock } from '../data/products.mock';

@Injectable()
export class PaymentModelMock {
  private innerLoansBanks?: IBanks = {
    data: [
      {
        value: '002',
        name: 'POPULAR',
      },
      {
        value: '003',
        name: 'AVVILLAS',
      },
    ],
    loading: false,
    loaded: true,
    error: false,
  };
  get getInnerLoansBanks(): any {
    return this.innerLoansBanks;
  }
  set setInnerLoansBanks(data: any) {
    if (!!data) {
      this.innerLoansBanks = data;
      this.loans_banks$.next(data);
    }
  }

  public loans_banks$: BehaviorSubject<object> = new BehaviorSubject(
    this.innerLoansBanks,
  );

  public step$: BehaviorSubject<number> = new BehaviorSubject(1);
  public previousStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  public formOne$: BehaviorSubject<object> = new BehaviorSubject(
    PaymentOneForm,
  );
  public formTwo$: BehaviorSubject<object> = new BehaviorSubject({});
  public isLoadingPayment$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  public errorPayment$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public loadedPayment$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public successPayment$: BehaviorSubject<object> = new BehaviorSubject({});
  public isLoadingDestination$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  public isLoadedDestination$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  public isLoadedDestinationBills$: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);
  public isErrorDestination$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );
  public productsDestination$: BehaviorSubject<object[]> = new BehaviorSubject(
    [],
  );
  public payment$: BehaviorSubject<object> = new BehaviorSubject({});
  public bank_loans$: BehaviorSubject<object[]> = new BehaviorSubject([]);

  public textLoaded$: BehaviorSubject<string> = new BehaviorSubject('');
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject(
    ProductsMock.DEPOSIT_ACCOUNT.concat(ProductsMock.CURRENT_ACCOUNT),
  );
  public userInfo$: BehaviorSubject<string> = new BehaviorSubject('');
  public paymentT$: BehaviorSubject<any> = new BehaviorSubject('');
  public productsDestinationBills$: BehaviorSubject<any> = new BehaviorSubject(
    '',
  );
  public productsPaymentBill$: BehaviorSubject<any> = new BehaviorSubject('');
  public hasPaymentData$: BehaviorSubject<any> = new BehaviorSubject('');
  public hasPaymentBillData$: BehaviorSubject<any> = new BehaviorSubject('');
  public recurring$: BehaviorSubject<any> = new BehaviorSubject('');

  private innerOptionModule: any = responseOptionsModuleMock;
  set setInnerOptionModule(data: any) {
    this.innerOptionModule = data;
    this.optionModule$.next(data);
  }
  get getInnerOptionModule(): any {
    return this.innerOptionModule;
  }
  public optionModule$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerOptionModule,
  );

  public fetchPayment(): void {}
  public fetchPaymentBill(): void {}
  public fetchPaymentType(): void {}
  public resetPayment(): void {}
  public resetProduct(): void {}
  public resetLoansDestination(): void {}
  public fetchLoansProducts(): void {}
  public fetchBillsDestination(): void {}
  public resetDestination(): void {}
  public fetchDestinationProducts(): void {}

  public setStep(step: number = 1): void {}
  public setPreviousStep(): void {}
  public setFormOne(): void {}
  public setFormTwo(): void {}
  public resetFormOne(): void {}
  public resetFormTwo(): void {}
  public fetchBanks(): void {}
  public resetBillsDestination(): void {}
  public paymentType(): void {}
  public fetchHistoric(): void {}
  public searchAllRegistered(): void {}
  public clearCompanyActive(): void {}
  public clearServiceSaved(): void {}
  public fetchBankLoans(): void {}
  public resetBankLoans(): void {}
  public close(): void {}
  public searchData(_data: any): void {}
  public fetchCompanyActive(_company: any): void {}
  public fetchNewService(_data: any): void {}
}

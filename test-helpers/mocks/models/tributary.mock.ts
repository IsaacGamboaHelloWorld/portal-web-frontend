import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductAllMock } from './../data/products-all.mock';

@Injectable()
export class TributaryModelMock {
  public categories$: BehaviorSubject<object> = new BehaviorSubject({});
  public activeProduct$: BehaviorSubject<object> = new BehaviorSubject({});
  public firstStep$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepOne$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepTwo$: BehaviorSubject<object> = new BehaviorSubject({});
  public navigate: BehaviorSubject<object> = new BehaviorSubject({});
  public step$: BehaviorSubject<number> = new BehaviorSubject(1);
  public viewSucces: BehaviorSubject<string> = new BehaviorSubject('');
  public imgTicket: BehaviorSubject<string> = new BehaviorSubject('');
  public textBtn: BehaviorSubject<string> = new BehaviorSubject('');

  public stateEstracts$: BehaviorSubject<string> = new BehaviorSubject('');

  private _statePeriodsExtracts: any = {
    account: {},
    data: '',
    base64: '',
    name: '',
    type: '',
    accountInformation: {},
    success: true,
    loading: false,
    loaded: false,
    errorMessage: '',
    specificErrorMessage: '',
  };

  public opt: any = {
    OPTIONS: [
      {
        ID: '1',
        TEXT: 'Retención en la fuente',
        STATUS: 'TRUE',
      },
      {
        ID: '2',
        TEXT: '4 x 1000',
        STATUS: 'FALSE',
      },
    ],
  };

  public statePeriodsEstracts$: BehaviorSubject<any> = new BehaviorSubject(
    this._statePeriodsExtracts,
  );

  public options$: BehaviorSubject<any> = new BehaviorSubject(this.opt);

  private _stateCertificate: any = {
    account: {},
    data: '',
    base64: '',
    name: '',
    type: '',
    accountInformation: {},
    success: true,
    loading: false,
    loaded: false,
    errorMessage: '',
    specificErrorMessage: '',
  };

  public stateCertificate$: BehaviorSubject<any> = new BehaviorSubject(
    this._stateCertificate,
  );

  public products$: BehaviorSubject<any> = new BehaviorSubject(
    ProductAllMock.productList,
  );

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

  public submitData(): void {}
  public init(): void {}
  public creationReset(): void {}
  public _setStep(step: number = 0): void {}
  public creationPeriodsLoad(_account: string, _accountType: string): void {}
  public creationLoad(
    _account: string,
    _accountType?: string,
    _period?: any,
  ): void {}
}

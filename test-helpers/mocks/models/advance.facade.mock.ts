import { Injectable } from '@angular/core';
import * as faker from 'faker';
import { BehaviorSubject } from 'rxjs';

const TC = {
  accountInformation: {
    accountIdentifier: faker.random.number(),
    productType: 'CREDIT_CARD',
    bank: faker.lorem.text(),
    currencyCode: '',
  },
  status: 'ACTIVE',
  openedDate: '',
  closedDate: '',
  dueDate: '',
  minimumPayment: 12,
  overDraftDays: '',
  term: {
    units: '',
    count: '',
  },
  periodicityOfPayment: '',
  capacity: 123,
  couldHavePockets: true,
  productAccountBalances: {
    pago_total_pesos: {
      amount: 3770084.79,
      currencyCode: 'COP',
      rate: null,
    },
    cupo_disponible_avances_pesos: {
      amount: 6229915.21,
      currencyCode: 'COP',
      rate: null,
    },
    saldo_mora_pesos: {
      amount: 3134112.21,
      currencyCode: 'COP',
      rate: null,
    },
    saldo_actual: {
      amount: 3770084.79,
      currencyCode: 'COP',
      rate: null,
    },
    cupo_disponible_compras_pesos: {
      amount: 6229915.21,
      currencyCode: 'COP',
      rate: null,
    },
    valor_pago_minimo: {
      amount: 635972.58,
      currencyCode: 'COP',
      rate: null,
    },
    cupo_total: {
      amount: 10000000,
      currencyCode: 'COP',
      rate: null,
    },
  },
  pocketsInformation: {
    totalSavedOnPockets: '',
  },
  success: true,
  errorMessage: '',
  didAthCall: false,
  loading: false,
  loaded: true,
  error: false,
  id: '1234354657',
  typeAccount: 'CREDIT_CARD',
};

@Injectable()
export class AdvanceFacadeMock {
  public formGlobal$: BehaviorSubject<object> = new BehaviorSubject<object>({
    origin: TC,
    destination: TC,
    description: '',
    date: '',
    amount: 1234,
    year: '1223',
    month: '12',
    fees: 1,
  });

  public transferAdvance$: BehaviorSubject<object> = new BehaviorSubject<
    object
  >({
    data: null,
    loaded: false,
    loading: false,
    error: false,
    errorMessage: null,
  });

  public products$: BehaviorSubject<object[]> = new BehaviorSubject<object[]>([
    TC,
  ]);

  public setToWho(): void {}
  public setHowMuch(): void {}
  public setWhen(): void {}
  public setFormReset(): void {}
  public fetchAdvance(): void {}
  public advanceReset(): void {}
}

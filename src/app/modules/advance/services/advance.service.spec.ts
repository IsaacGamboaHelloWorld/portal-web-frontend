import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { AdvanceService } from './advance.service';

describe('AdvanceService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [AdvanceService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );

  it('should be created', () => {
    const service: AdvanceService = TestBed.get(AdvanceService);
    const PRODUCT = {
      accountInformation: {
        accountIdentifier: '12345675',
        productType: 'CREDIT_CARD',
        bank: '',
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

    service
      .advanceTransfer({
        origin: PRODUCT as any,
        destination: PRODUCT as any,
        description: '',
        date: '',
        amount: 1234,
        year: '1223',
        month: '12',
        fees: 1,
      })
      .subscribe();
    expect(service).toBeTruthy();
  });
});

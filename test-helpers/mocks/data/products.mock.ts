import * as faker from 'faker';

const productsMock = {
  DEPOSIT_ACCOUNT: [],
  CREDIT_CARD: [],
  CURRENT_ACCOUNT: [],
  CERTIFIED_DEPOSIT_TERM: [],
  CREDIT: [],
};

for (let i = 0; i < 3; i++) {
  productsMock.DEPOSIT_ACCOUNT.push({
    accountInformation: {
      accountIdentifier: i === 0 ? '101010' : faker.random.number(),
      productType: 'DEPOSIT_ACCOUNT',
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
      saldo_disponible: {
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
    loading: true,
    loaded: false,
    error: false,
    id: faker.random.number(),
    typeAccount: 'DEPOSIT_ACCOUNT',
  });
  productsMock.CREDIT_CARD.push({
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
    id: faker.random.number(),
    typeAccount: 'CREDIT_CARD',
  });
  productsMock.CURRENT_ACCOUNT.push({
    accountInformation: {
      accountIdentifier: faker.random.number(),
      productType: 'CURRENT_ACCOUNT',
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
    loaded: false,
    error: true,
    id: faker.random.number(),
    typeAccount: 'CURRENT_ACCOUNT',
  });
  productsMock.CERTIFIED_DEPOSIT_TERM.push({
    accountInformation: {
      accountIdentifier: faker.random.number(),
      productType: 'CERTIFIED_DEPOSIT_TERM',
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
    loading: true,
    loaded: false,
    error: false,
    id: faker.random.number(),
    typeAccount: 'CERTIFIED_DEPOSIT_TERM',
  });
}

export const ProductsMock = productsMock;

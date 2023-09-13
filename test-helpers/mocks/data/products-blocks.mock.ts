export const blockCreditCardMock = [
  {
    errorStatusCode: null,
    approvalId: null,
    errorMessage: '',
    specificErrorMessage: null,
    accountInformation: {
      accountIdentifier: '5201897302970640',
      bank: 'BANCO_POPULAR',
      currencyCode: null,
      productName: 'Tarjeta de Crédito',
      productType: 'CREDIT_CARD',
    },
    status: null,
    openedDate: null,
    closedDate: null,
    dueDate: '2021-03-30T17:32:25.887617',
    lastTransactionDate: null,
    overDraftDays: null,
    term: null,
    periodicityOfPayment: null,
    productAccountBalances: null,
    couldHavePockets: false,
    capacity: null,
    didAthCall: false,
    enabled: true,
    success: true,
    id: '5201897302970640',
    typeAccount: 'CREDIT_CARD',
    loading: false,
    loaded: true,
    error: false,
  },
  {
    errorStatusCode: null,
    approvalId: null,
    errorMessage: '',
    specificErrorMessage: null,
    accountInformation: {
      accountIdentifier: '4544769920667610',
      bank: 'BANCO_POPULAR',
      currencyCode: null,
      productName: 'Tarjeta de Crédito',
      productType: 'CREDIT_CARD',
    },
    status: null,
    openedDate: null,
    closedDate: null,
    dueDate: '2021-03-30T17:32:25.887636',
    lastTransactionDate: null,
    overDraftDays: null,
    term: null,
    periodicityOfPayment: null,
    productAccountBalances: null,
    couldHavePockets: false,
    capacity: null,
    didAthCall: false,
    enabled: true,
    success: true,
    id: '4544769920667610',
    typeAccount: 'CREDIT_CARD',
    loading: false,
    loaded: true,
    error: false,
  },
];

export const productDebitCardMock = {
  account: {
    accountId: '21004000721177',
    accountType: 'DEPOSIT_ACCOUNT',
    bank: 'BANCO_POPULAR',
  },
  card: { cardId: '227323763487', cardType: 'DEBIT_CARD' },
};

export const productDebitCardListMock = {
  specificErrorMessage: null,
  debitCards: [
    {
      account: {
        accountId: '**********6787',
        bank: 'BANCO_POPULAR',
        accountType: 'DEPOSIT_ACCOUNT',
      },
      card: {
        cardId: '227323763289',
        cardType: 'DEBIT_CARD',
      },
    },
    {
      account: {
        accountId: '**********6829',
        bank: 'BANCO_POPULAR',
        accountType: 'DEPOSIT_ACCOUNT',
      },
      card: {
        cardId: '227323765201',
        cardType: 'DEBIT_CARD',
      },
    },
  ],
  success: true,
  errorMessage: null,
  errorStatusCode: null,
  approvalId: null,
};

export const debitCardListStateDataMock = {
  data: {
    debitCards: [
      {
        account: {
          accountId: '**********6787',
          bank: 'BANCO_POPULAR',
          accountType: 'DEPOSIT_ACCOUNT',
        },
        card: {
          cardId: '227323763289',
          cardType: 'DEBIT_CARD',
        },
      },
      {
        account: {
          accountId: '**********6829',
          bank: 'BANCO_POPULAR',
          accountType: 'DEPOSIT_ACCOUNT',
        },
        card: {
          cardId: '227323765201',
          cardType: 'DEBIT_CARD',
        },
      },
    ],
  },
  error: false,
  loading: false,
  loaded: true,
  success: true,
};

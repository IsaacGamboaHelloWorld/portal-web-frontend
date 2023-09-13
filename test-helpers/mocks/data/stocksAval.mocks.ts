export const stocksAvalAllMock = {
  stocksAval: [
    {
      balanceDescription: 'Dividendos liquidados',
      amount: '4000.30',
      date: '2019-09-01T00:00:00.000-05:00',
      dateDescription: 'Fecha de corte de liquidaciÃ³n de dividendos',
      numberBaseStocks: null,
    },
    {
      balanceDescription: 'Dividendos liquidados',
      amount: '4000.30',
      date: '2019-09-01T00:00:00.000-05:00',
      dateDescription: 'Fecha de corte de liquidaciÃ³n de dividendos',
      numberBaseStocks: null,
    },
    {
      balanceDescription: 'Valor de los ajustes realizados',
      amount: '14.30',
      date: '2019-09-01T00:00:00.000-05:00',
      dateDescription: 'corte de liquidaciÃ³n de los ajustes',
      numberBaseStocks: null,
    },
    {
      balanceDescription: 'Valor de las novedades',
      amount: '239.03',
      date: '2019-09-01T00:00:00.000-05:00',
      dateDescription: 'Fecha de corte de liquidaciÃ³n de las novedades',
      numberBaseStocks: null,
    },
    {
      balanceDescription: 'Total de dividendos pagados',
      amount: '60024.03',
      date: '2019-09-01T00:00:00.000-05:00',
      dateDescription: 'Fecha de corte de las acciones',
      numberBaseStocks: '101',
    },
  ],
  dividends: [
    {
      channelCode: '1',
      accountId: '*************2111',
      accountType: 'SDA',
      bankId: '0002',
      amount: '$1,002.00',
    },
  ],
  errorMessage: null,
  success: true,
  code: '',
};

export const stocksAvalWitoutStocksMock = {
  stocksAval: [],
  dividends: [
    {
      channelCode: '1',
      accountId: '*************2111',
      accountType: 'SDA',
      bankId: '0002',
      amount: '$1,002.00',
    },
  ],
  errorMessage: null,
  success: false,
  code: '55',
};

export const stocksAvalWitoutDatasMock = {
  stocksAval: null,
  dividends: null,
  errorMessage:
    'No encontramos información de tus acciones en el periodo seleccionado.',
  success: false,
  code: '55',
};

export const stocksAvalErrorMock = {
  stocksAval: null,
  dividends: null,
  errorMessage:
    'Tenemos problemas técnicos en este momento, pero estamos corriendo para solucionarlos.',
  success: false,
  code: '',
};

export const stocksAvalTypeMock = {
  errorMessage: null,
  stockTypes: [
    {
      id: 'ORDINARY',
      value: 'Ordinarias',
    },
    {
      id: 'PREFERENTIALS',
      value: 'Preferenciales',
    },
  ],
  success: true,
};

export const stocksAvalPeriodsMock = {
  periods: [
    {
      id: '2020-11',
      value: '1604505408982',
    },
    {
      id: '2020-10',
      value: '1601827008982',
    },
  ],
  success: true,
};

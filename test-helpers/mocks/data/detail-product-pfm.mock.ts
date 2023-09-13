// api/pfm-api/products
export const productsPfmMockSuccess = {
  dateTime: '2022-06-28T11:53:58.611',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    month: '10',
    year: '2021',
    customerId:
      'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    ipAddress: '3.13.132.40',
    id: 'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: '',
  data: {
    savings: {
      beforeSavings: 0,
      currentSavings: 0,
    },
    products: [
      {
        incomes: '20818002.7',
        balance: '20612185.7',
        overdraft: 0,
        idProduct: '0000',
        totalIncomes: '30660003.65',
        accountNumber: '',
        type: 'ALL',
        expenses: '-10047817.950000001',
        previousBalance: '9842000.950000001',
      },
      {
        incomes: 5585000,
        balance: '3621278.7500000005',
        overdraft: 0,
        idProduct: '500800395378',
        totalIncomes: '6428000.4',
        accountNumber: '500800395378',
        type: 'CA',
        expenses: '-2806721.65',
        previousBalance: '843000.4',
      },
      {
        incomes: '5404002.1',
        balance: '3932949.51',
        overdraft: 0,
        idProduct: '500800471302',
        totalIncomes: '5958002.1',
        accountNumber: '500800471302',
        type: 'CA',
        expenses: '-2025052.59',
        previousBalance: 554000,
      },
      {
        incomes: '5129000.6',
        balance: '9927959.94',
        overdraft: 0,
        idProduct: '500800340873',
        totalIncomes: '12274000.75',
        accountNumber: '500800340873',
        type: 'CA',
        expenses: '-2346040.81',
        previousBalance: '7145000.15',
      },
      {
        incomes: 4700000,
        balance: '3129997.5000000005',
        overdraft: 0,
        idProduct: '500800958439',
        totalIncomes: '6000000.4',
        accountNumber: '500800958439',
        type: 'CA',
        expenses: '-2870002.9',
        previousBalance: '1300000.4',
      },
    ],
  },
  success: true,
  errorMessage: '',
};

// api/pfm-api/expenses
export const incomesPfmMockSuccess = {
  dateTime: '2022-06-28T11:55:21.897',
  request: {
    companyId: 'BANCO_POPULAR',
    product_type: 'CA',
    idType: 'CC',
    month: '10',
    year: '2021',
    customerId:
      'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    ipAddress: '3.13.132.40',
    id: 'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    customerIdType: 'CC',
    type: 'C',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: '',
  data: {
    products: [
      {
        incomes: {
          total: '20818002.7',
          categories: [
            {
              code: '10007',
              color: '#666633',
              name: 'Ahorro e inversiones',
              value: 2485000,
            },
            {
              code: '410001',
              color: '#007fbd',
              name: 'Otros Ingresos',
              value: 700000,
            },
            {
              code: '10006',
              color: '#253458',
              name: 'Desembolsos y avances',
              value: '7307000.8',
            },
            {
              code: '310001',
              color: '#0331a1',
              name: 'Depósitos',
              value: '9226001.9',
            },
            {
              code: '10005',
              color: '#1A237E',
              name: 'Abono transferencia entre mis cuentas',
              value: 1100000,
            },
          ],
          previousTotal: '15689002.1',
        },
        idProduct: '0000',
        accountNumber: 'ALL',
        expenses: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
      },
      {
        incomes: {
          total: 4700000,
          categories: [
            {
              code: '10007',
              color: '#666633',
              name: 'Ahorro e inversiones',
              value: 500000,
            },
            {
              code: '410001',
              color: '#007fbd',
              name: 'Otros Ingresos',
              value: 700000,
            },
            {
              code: '10006',
              color: '#253458',
              name: 'Desembolsos y avances',
              value: 2400000,
            },
            {
              code: '10005',
              color: '#1A237E',
              name: 'Abono transferencia entre mis cuentas',
              value: 1100000,
            },
          ],
          previousTotal: 4700000,
        },
        idProduct: '500800958439',
        accountNumber: '500800958439',
        expenses: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
      },
      {
        incomes: {
          total: 5585000,
          categories: [
            {
              code: '10007',
              color: '#666633',
              name: 'Ahorro e inversiones',
              value: 1985000,
            },
            {
              code: '10006',
              color: '#253458',
              name: 'Desembolsos y avances',
              value: 2900000,
            },
            {
              code: '310001',
              color: '#0331a1',
              name: 'Depósitos',
              value: 700000,
            },
          ],
          previousTotal: 5585000,
        },
        idProduct: '500800395378',
        accountNumber: '500800395378',
        expenses: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
      },
      {
        incomes: {
          total: '5129000.6',
          categories: [
            {
              code: '310001',
              color: '#0331a1',
              name: 'Depósitos',
              value: '5129000.6',
            },
          ],
          previousTotal: 0,
        },
        idProduct: '500800340873',
        accountNumber: '500800340873',
        expenses: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
      },
      {
        incomes: {
          total: '5404002.1',
          categories: [
            {
              code: '10006',
              color: '#253458',
              name: 'Desembolsos y avances',
              value: '2007000.8',
            },
            {
              code: '310001',
              color: '#0331a1',
              name: 'Depósitos',
              value: '3397001.3',
            },
          ],
          previousTotal: '5404002.1',
        },
        idProduct: '500800471302',
        accountNumber: '500800471302',
        expenses: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
      },
    ],
  },
  success: true,
  errorMessage: '',
};

export const expensesPfmMockSuccess = {
  dateTime: '2022-06-28T11:57:16.612',
  request: {
    companyId: 'BANCO_POPULAR',
    product_type: 'CA',
    idType: 'CC',
    month: '10',
    year: '2021',
    customerId:
      'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    ipAddress: '3.13.132.40',
    id: 'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    customerIdType: 'CC',
    type: 'D',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: '',
  data: {
    products: [
      {
        incomes: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
        idProduct: '0000',
        accountNumber: 'ALL',
        expenses: {
          total: '10047817.95',
          categories: [
            {
              code: '180001',
              color: '#666633',
              name: 'Servicios y Asesorías',
              value: '1890000.09',
            },
            {
              code: '90001',
              color: '#20696a',
              name: 'Impuestos',
              value: 226000,
            },
            {
              code: '20001',
              color: '#fcaf1e',
              name: 'Avances',
              value: 1276000,
            },
            {
              code: '40001',
              color: '#008cff',
              name: 'Educación',
              value: 1110000,
            },
            {
              code: '160001',
              color: '#ed4c90',
              name: 'Salud',
              value: '230040.72',
            },
            {
              code: '80001',
              color: '#880e4f',
              name: 'Hogar',
              value: '350000.9',
            },
            {
              code: '200001',
              color: '#1B5E20',
              name: 'Transporte',
              value: '155000.9',
            },
            {
              code: '50001',
              color: '#ffd200',
              name: 'Entretenimiento',
              value: '194000.09',
            },
            {
              code: '100001',
              color: '#2ba1ac',
              name: 'Obligaciones Financieras',
              value: '371051.6',
            },
            {
              code: '10002',
              color: '#20696A',
              name: 'Transferencias a mis cuentas',
              value: 400000,
            },
            {
              code: '150001',
              color: '#a17d33',
              name: 'Ropa y Calzado',
              value: '874000.65',
            },
            {
              code: '10001',
              color: '#fc6500',
              name: 'Alimentación',
              value: '530001.4',
            },
            {
              code: '210001',
              color: '#4caf50',
              name: 'Viajes',
              value: '885000.6',
            },
            {
              code: '170001',
              color: '#0D113F',
              name: 'Servicios Públicos',
              value: '721320.5',
            },
            {
              code: '190001',
              color: '#1a237e',
              name: 'Tecnología',
              value: '835400.5',
            },
          ],
          previousTotal: '9376828.83',
        },
      },
      {
        incomes: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
        idProduct: '500800958439',
        accountNumber: '500800958439',
        expenses: {
          total: '2870002.9',
          categories: [
            {
              code: '200001',
              color: '#1B5E20',
              name: 'Transporte',
              value: '155000.9',
            },
            {
              code: '20001',
              color: '#fcaf1e',
              name: 'Avances',
              value: 900000,
            },
            {
              code: '10002',
              color: '#20696A',
              name: 'Transferencias a mis cuentas',
              value: 400000,
            },
            {
              code: '210001',
              color: '#4caf50',
              name: 'Viajes',
              value: '885000.6',
            },
            {
              code: '10001',
              color: '#fc6500',
              name: 'Alimentación',
              value: '530001.4',
            },
          ],
          previousTotal: '2870002.9',
        },
      },
      {
        incomes: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
        idProduct: '500800395378',
        accountNumber: '500800395378',
        expenses: {
          total: '2806721.65',
          categories: [
            {
              code: '20001',
              color: '#fcaf1e',
              name: 'Avances',
              value: 376000,
            },
            {
              code: '150001',
              color: '#a17d33',
              name: 'Ropa y Calzado',
              value: '874000.65',
            },
            {
              code: '170001',
              color: '#0D113F',
              name: 'Servicios Públicos',
              value: '721320.5',
            },
            {
              code: '190001',
              color: '#1a237e',
              name: 'Tecnología',
              value: '835400.5',
            },
          ],
          previousTotal: '2806721.65',
        },
      },
      {
        incomes: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
        idProduct: '500800340873',
        accountNumber: '500800340873',
        expenses: {
          total: '2346040.81',
          categories: [
            {
              code: '180001',
              color: '#666633',
              name: 'Servicios y Asesorías',
              value: '1890000.09',
            },
            {
              code: '90001',
              color: '#20696a',
              name: 'Impuestos',
              value: 226000,
            },
            {
              code: '160001',
              color: '#ed4c90',
              name: 'Salud',
              value: '230040.72',
            },
          ],
          previousTotal: 0,
        },
      },
      {
        incomes: {
          total: 0,
          categories: null,
          previousTotal: 0,
        },
        idProduct: '500800471302',
        accountNumber: '500800471302',
        expenses: {
          total: '2025052.59',
          categories: [
            {
              code: '80001',
              color: '#880e4f',
              name: 'Hogar',
              value: '350000.9',
            },
            {
              code: '40001',
              color: '#008cff',
              name: 'Educación',
              value: 1110000,
            },
            {
              code: '50001',
              color: '#ffd200',
              name: 'Entretenimiento',
              value: '194000.09',
            },
            {
              code: '100001',
              color: '#2ba1ac',
              name: 'Obligaciones Financieras',
              value: '371051.6',
            },
          ],
          previousTotal: '3700104.28',
        },
      },
    ],
  },
  success: true,
  errorMessage: '',
};

// api/pfm-api/movements
export const movimentsPfmMockSuccess = {
  dateTime: '2022-06-28T11:59:53.061',
  request: {
    idType: 'CC',
    navigationId: 16,
    year: '2021',
    ipAddress: '3.13.132.40',
    deviceId: '*************************t%3D',
    idCategory: '40001',
    total: 1110000,
    companyId: 'BANCO_POPULAR',
    month: '10',
    customerId:
      'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    idProduct: '500800471302',
    id: 'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    customerIdType: 'CC',
  },
  specificErrorMessage: '',
  data: {
    movements: [
      {
        date: 1633669200000,
        description: 'Semestre colegio',
        id: 'e07e82d7289b2d6643bddda6fc1a266cd222c13cf47f2192a7602f0b685b8047',
        value: 400000,
      },
      {
        date: 1633582800000,
        description: 'Semestre universidad',
        id: 'c7f14052981efb19b4988d4a10f2fcc29c287b5f9ddea29a3599646a3e6c2d07',
        value: 710000,
      },
    ],
    type: 'D',
  },
  success: true,
  errorMessage: '',
};

// api/pfm-api/items
export const itemsPfmMockSuccess = {
  dateTime: '2022-06-28T12:01:40.558',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    ipAddress: '3.13.132.40',
    id: 'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    customerIdType: 'CC',
    type: 'D',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: '',
  data: {
    categories: [
      {
        code: '100001',
        color: '#2ba1ac',
        name: 'Obligaciones Financieras',
      },
      {
        code: '10001',
        color: '#fc6500',
        name: 'Alimentación',
      },
      {
        code: '10002',
        color: '#20696A',
        name: 'Transferencias a mis cuentas',
      },
      {
        code: '10003',
        color: '#0D113F',
        name: 'Donaciones',
      },
      {
        code: '10004',
        color: '#666633',
        name: 'Ahorro e inversiones',
      },
      {
        code: '110001',
        color: '#253458',
        name: 'Otros Gastos',
      },
      {
        code: '120001',
        color: '#7C3CBB',
        name: 'Compras',
      },
      {
        code: '130001',
        color: '#0062FF',
        name: 'Pagos',
      },
      {
        code: '140001',
        color: '#41d0de',
        name: 'Retiros',
      },
      {
        code: '150001',
        color: '#a17d33',
        name: 'Ropa y Calzado',
      },
      {
        code: '160001',
        color: '#ed4c90',
        name: 'Salud',
      },
      {
        code: '170001',
        color: '#0D113F',
        name: 'Servicios Públicos',
      },
      {
        code: '180001',
        color: '#666633',
        name: 'Servicios y Asesorías',
      },
      {
        code: '190001',
        color: '#1a237e',
        name: 'Tecnología',
      },
      {
        code: '200',
        color: '',
        name: 'Reversiones',
      },
      {
        code: '200001',
        color: '#1B5E20',
        name: 'Transporte',
      },
      {
        code: '20001',
        color: '#fcaf1e',
        name: 'Avances',
      },
      {
        code: '210001',
        color: '#4caf50',
        name: 'Viajes',
      },
      {
        code: '220001',
        color: '#0D113F',
        name: 'Intereses',
      },
      {
        code: '230001',
        color: '#666633',
        name: 'Seguros',
      },
      {
        code: '240001',
        color: '#2BA1AC',
        name: 'Cuota de manejo',
      },
      {
        code: '250001',
        color: '#253458',
        name: 'Gastos administrativos',
      },
      {
        code: '260001',
        color: '#41D0DE',
        name: 'Ajustes y novedades',
      },
      {
        code: '30001',
        color: '#6a1b9a',
        name: 'Belleza',
      },
      {
        code: '40001',
        color: '#008cff',
        name: 'Educación',
      },
      {
        code: '50001',
        color: '#ffd200',
        name: 'Entretenimiento',
      },
      {
        code: '60001',
        color: '#105e86',
        name: 'Comisiones Financieras',
      },
      {
        code: '70001',
        color: '#7ecb40',
        name: 'Giros y Transferencias',
      },
      {
        code: '80001',
        color: '#880e4f',
        name: 'Hogar',
      },
      {
        code: '90001',
        color: '#20696a',
        name: 'Impuestos',
      },
    ],
  },
  success: true,
  errorMessage: '',
};

// api/pfm-api/recategorize
export const recategorizarionPfmMockError = {
  dateTime: '2022-06-28T11:48:45.090',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    ipAddress: '3.13.132.40',
    id: 'a345abc899351cb4b58651b2b24bf346da5eb914c8e6917144b9405da60dcac5',
    customerIdType: 'CC',
    transactions: [
      {
        id: 'e07e82d7289b2d6643bddda6fc1a266cd222c13cf47f2192a7602f0b685b8047',
      },
    ],
    deviceId: '*************************t%3D',
    idCategory: '80001',
  },
  specificErrorMessage: '',
  success: false,
  errorMessage:
    'One or more ID of transactions were not found in the database.',
  // tslint:disable-next-line:max-file-line-count
};

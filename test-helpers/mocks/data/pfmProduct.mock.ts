// /pfm-api/products
export const PfmProductMock = {
  success: true,
  errorMessage: '',
  specificErrorMessage: '',
  data: {
    products: [
      {
        accountNumber: '',
        idProduct: '0000',
        type: 'ALL',
        incomes: 8194317.619999999,
        expenses: -8186036.199999998,
        balance: 108281.42000000086,
        previousBalance: 100000,
        overdraft: 0,
      },
      {
        accountNumber: '8633120000007618',
        idProduct: '8633120000007618',
        type: 'CA',
        incomes: 8194317.619999999,
        expenses: -8186036.199999998,
        balance: 108281.42000000086,
        previousBalance: 100000,
        overdraft: 0,
      },
      {
        accountNumber: '230066022989',
        idProduct: '230066022989',
        type: 'CA',
        incomes: 8194317.619999999,
        expenses: -8186036.199999998,
        balance: 108281.42000000086,
        previousBalance: 100000,
        overdraft: 0,
      },
    ],
    savings: {
      beforeSavings: 0,
      currentSavings: 0,
    },
  },
  request: {
    id: '72007618',
    idType: 'CC',
    month: '11',
    year: '2020',
    customerId: '72007618',
    customerIdType: 'CC',
    deviceId: 'versionexpt%3D',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-02T15:48:00.075',
};

export const PfmProductErrorMock = {
  success: false,
  errorMessage: 'el cliente no cumple las condiciones necesarias',
  specificErrorMessage: '',
  data: { products: null, savings: { beforeSavings: 0, currentSavings: 0 } },
  request: {
    month: '5',
    year: '2021',
    requestId: 1623164595,
    id: '19122111',
    idType: 'CC',
    customerId: '19122111',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3Dmo',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-08T10:03:20.114',
};

// 	/api/pfm-api/expenses
export const PfmExpensesV1Mock = {
  success: true,
  errorMessage: '',
  specificErrorMessage: '',
  data: {
    expenses: [
      {
        accountNumber: 'ALL',
        idProduct: '0000',
        expenses: 2241870.24,
        categories: [
          {
            code: '90001',
            name: 'Impuestos',
            value: 410720.08999999997,
            color: '#20696a',
          },
          {
            code: '20001',
            name: 'Avances',
            value: 565090,
            color: '#fcaf1e',
          },
          {
            code: '110001',
            name: 'Otros Gastos',
            value: 81000,
            color: '#253458',
          },
          {
            code: '100001',
            name: 'Obligaciones Financieras',
            value: 144050,
            color: '#2ba1ac',
          },
          {
            code: '10002',
            name: 'Transferencias a mis cuentas',
            value: 122009.69,
            color: '#20696A',
          },
          {
            code: '10001',
            name: 'Alimentación',
            value: 575000,
            color: '#fc6500',
          },
          {
            code: '10004',
            name: 'Ahorro e inversiones',
            value: 133000.4,
            color: '#666633',
          },
          {
            code: '10003',
            name: 'Donaciones',
            value: 211000.06,
            color: '#0D113F',
          },
        ],
      },
      {
        accountNumber: '500800941411',
        idProduct: '500800941411',
        expenses: 756000,
        categories: [
          {
            code: '110001',
            name: 'Otros Gastos',
            value: 81000,
            color: '#253458',
          },
          {
            code: '10001',
            name: 'Alimentación',
            value: 575000,
            color: '#fc6500',
          },
          {
            code: '10003',
            name: 'Donaciones',
            value: 100000,
            color: '#0D113F',
          },
        ],
      },
      {
        accountNumber: '500800471302',
        idProduct: '500800471302',
        expenses: 1485870.2399999998,
        categories: [
          {
            code: '90001',
            name: 'Impuestos',
            value: 410720.08999999997,
            color: '#20696a',
          },
          {
            code: '20001',
            name: 'Avances',
            value: 565090,
            color: '#fcaf1e',
          },
          {
            code: '100001',
            name: 'Obligaciones Financieras',
            value: 144050,
            color: '#2ba1ac',
          },
          {
            code: '10002',
            name: 'Transferencias a mis cuentas',
            value: 122009.69,
            color: '#20696A',
          },
          {
            code: '10004',
            name: 'Ahorro e inversiones',
            value: 133000.4,
            color: '#666633',
          },
          {
            code: '10003',
            name: 'Donaciones',
            value: 111000.06,
            color: '#0D113F',
          },
        ],
      },
    ],
  },
  request: {
    month: '10',
    year: '2021',
    type: 'D',
    product_type: 'CA',
    id: '19122111',
    idType: 'CC',
    customerId: '19122111',
    customerIdType: 'CC',
    deviceId:
      // tslint:disable-next-line:max-line-length
      'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28macintosh%3B%20intel%20mac%20os%20x%2010%5F15%5F7%29%20applewebkit%2F537%2E36%20%28khtml%2C%20like%20gecko%29%20chrome%2F92%2E0%2E4515%2E159%20safari%2F537%2E36%7C5%2E0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010%5F15%5F7%29%20AppleWebKit%2F537%2E36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F92%2E0%2E4515%2E159%20Safari%2F537%2E36%7CMacIntel%26pm%5Ffpsc%3D30%7C1680%7C1050%7C1050%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D5%26pm%5Ffpln%3Dlang%3Des%2D419%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3Dinternal%2Dpdf%2Dviewer%7Cmhjfbmdgcfjbbpaeojofohoefgiehjai%7Cinternal%2Dnacl%2Dplugin%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D1680%26pm%5Ffpspd%3D30%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DMac%26pm%5Fbrmjv%3D92%26pm%5Fbr%3DChrome%26pm%5Finpt%3D%26pm%5Fexpt%3D',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2022-01-27T10:43:03.104',
};

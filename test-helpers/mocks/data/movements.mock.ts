export const MovementMock = {
  accountInformation: {
    accountId: '123456',
    accountType: 'ESTEBAN',
  },
  operations: [
    {
      transactionInformation: {
        transactionType: 'TRANSFERENCIA CR AVALNET',
        transactionName: '',
        transactionDate: '2018-12-26T15:18:25',
        transactionProvider: '0286125854',
      },
      amountsWithOperationType: {
        TICKET: '0',
        OUTCOME: '0',
        INCOME: '20000',
        CASH: '20000',
      },
      officeInformation: {
        officeName: '',
        officeId: '',
      },
    },
    {
      transactionInformation: {
        transactionType: 'TRANSFERENCIA CR AVALNET',
        transactionName: '',
        transactionDate: '2018-12-26T15:18:25',
        transactionProvider: '0286125854',
      },
      amountsWithOperationType: {
        TICKET: '0',
        OUTCOME: '0',
        INCOME: '20000',
        CASH: '20000',
      },
      officeInformation: {
        officeName: '',
        officeId: '',
      },
    },
    {
      transactionInformation: {
        transactionType: 'TRANSFERENCIA CR AVALNET',
        transactionName: '',
        transactionDate: '2018-12-26T15:18:25',
        transactionProvider: '0286125854',
      },
      amountsWithOperationType: {
        TICKET: '0',
        OUTCOME: '0',
        INCOME: '20000',
        CASH: '20000',
      },
      officeInformation: {
        officeName: '',
        officeId: '',
      },
    },
  ],
  creditCardMovements: [
    {
      fees: '0',
      rate: '0',
      debits: '0',
      credits: '10000',
      description: 'PAGO ATH CANALES ELECTRONICOS',
      transactionDate: '2019-02-21T00:00:00',
    },
    {
      fees: '0',
      rate: '0',
      debits: '0',
      credits: '10000',
      description: 'PAGO ATH CANALES ELECTRONICOS',
      transactionDate: '2019-02-14T00:00:00',
    },
    {
      fees: '0',
      rate: '0',
      debits: '0',
      credits: '10000',
      description: 'PAGO ATH CANALES ELECTRONICOS',
      transactionDate: '2019-02-13T00:00:00',
    },
  ],
};

export const MovementsStateMock = {
  account: {
    approvalId: '',
    errorMessage: '',
    specificErrorMessage: '',
    success: true,
    accountInformation: {
      accountId: '230066021825',
      accountType: 'DEPOSIT_ACCOUNT',
    },
    operations: [
      {
        transactionInformation: {
          transactionType: 'TRANSFERENCIA DB AVALNET',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2021-01-15T08:30:02',
        },
        officeInformation: { officeName: 'CAJEROS ATH', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '12600.00',
          INCOME: '0',
          TICKET: '0',
          CASH: '12600.00',
        },
      },
      {
        transactionInformation: {
          transactionType: 'N.C. INTERESES',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2020-12-29T08:30:02',
        },
        officeInformation: { officeName: 'AVENIDA CHILE', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '0',
          INCOME: '6587.13',
          TICKET: '0',
          CASH: '6587.13',
        },
      },
      {
        transactionInformation: {
          transactionType: 'N.D. RETENCION EN LA FUENTE',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2020-12-29T08:30:02',
        },
        officeInformation: { officeName: 'AVENIDA CHILE', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '461.10',
          INCOME: '0',
          TICKET: '0',
          CASH: '461.10',
        },
      },
      {
        transactionInformation: {
          transactionType: 'N.D. GMF AUTOMATICO',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2020-12-29T08:30:02',
        },
        officeInformation: { officeName: 'AVENIDA CHILE', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '1.84',
          INCOME: '0',
          TICKET: '0',
          CASH: '1.84',
        },
      },
      {
        transactionInformation: {
          transactionType: 'N.D. RETENCION EN LA FUENTE',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2020-12-28T08:30:02',
        },
        officeInformation: { officeName: 'AVENIDA CHILE', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '461.09',
          INCOME: '0',
          TICKET: '0',
          CASH: '461.09',
        },
      },
      {
        transactionInformation: {
          transactionType: 'N.D. GMF AUTOMATICO',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2020-12-28T08:30:02',
        },
        officeInformation: { officeName: 'AVENIDA CHILE', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '1.84',
          INCOME: '0',
          TICKET: '0',
          CASH: '1.84',
        },
      },
      {
        transactionInformation: {
          transactionType: 'N.C. INTERESES',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2020-12-28T08:30:02',
        },
        officeInformation: { officeName: 'AVENIDA CHILE', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '0',
          INCOME: '6586.96',
          TICKET: '0',
          CASH: '6586.96',
        },
      },
      {
        transactionInformation: {
          transactionType: 'N.C. INTERESES',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2020-12-27T08:30:02',
        },
        officeInformation: { officeName: 'AVENIDA CHILE', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '0',
          INCOME: '6586.80',
          TICKET: '0',
          CASH: '6586.80',
        },
      },
      {
        transactionInformation: {
          transactionType: 'N.D. RETENCION EN LA FUENTE',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2020-12-27T08:30:02',
        },
        officeInformation: { officeName: 'AVENIDA CHILE', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '461.08',
          INCOME: '0',
          TICKET: '0',
          CASH: '461.08',
        },
      },
      {
        transactionInformation: {
          transactionType: 'N.D. GMF AUTOMATICO',
          transactionProvider: '',
          transactionName: '',
          transactionDate: '2020-12-27T08:30:02',
        },
        officeInformation: { officeName: 'AVENIDA CHILE', officeId: '' },
        amountsWithOperationType: {
          OUTCOME: '1.84',
          INCOME: '0',
          TICKET: '0',
          CASH: '1.84',
        },
      },
    ],
    creditCardMovements: [
      {
        fees: '0',
        rate: '0',
        debits: '0',
        credits: '10000',
        description: 'PAGO ATH CANALES ELECTRONICOS',
        transactionDate: '2019-02-21T00:00:00',
      },
      {
        fees: '0',
        rate: '0',
        debits: '0',
        credits: '10000',
        description: 'PAGO ATH CANALES ELECTRONICOS',
        transactionDate: '2019-02-14T00:00:00',
      },
      {
        fees: '0',
        rate: '0',
        debits: '0',
        credits: '10000',
        description: 'PAGO ATH CANALES ELECTRONICOS',
        transactionDate: '2019-02-13T00:00:00',
      },
    ],
    request: {
      accountId: '230066021825',
      accountType: 'DEPOSIT_ACCOUNT',
      currency: 'COP',
      requestId: 1611667796,
      companyId: 'BANCO_POPULAR',
      dateMovementsFrom: '',
      dateMovementsTo: '',
      id: '19122111',
      idType: 'CC',
      customerId: '19122111',
      customerIdType: 'CC',
      deviceId:
        // tslint:disable-next-line:max-line-length
        'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28macintosh%3B%20intel%20mac%20os%20x%2010%5F14%5F6%29%20applewebkit%2F537%2E36%20%28khtml%2C%20like%20gecko%29%20chrome%2F87%2E0%2E4280%2E141%20safari%2F537%2E36%7C5%2E0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010%5F14%5F6%29%20AppleWebKit%2F537%2E36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F87%2E0%2E4280%2E141%20Safari%2F537%2E36%7CMacIntel%26pm%5Ffpsc%3D24%7C1680%7C1050%7C1050%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D5%26pm%5Ffpln%3Dlang%3Des%2D419%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3Dinternal%2Dpdf%2Dviewer%7Cmhjfbmdgcfjbbpaeojofohoefgiehjai%7Cinternal%2Dnacl%2Dplugin%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D1680%26pm%5Ffpspd%3D24%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DMac%26pm%5Fbrmjv%3D87%26pm%5Fbr%3DChrome%26pm%5Finpt%3D%26pm%5Fexpt%3D',
      ipAddress: '3.13.132.40',
    },
    dateTime: '2021-01-26T08:30:03.584',
  },
  loading: false,
  loaded: true,
  error: false,
  errorMessage: '',
};

export const MovementsStateOnlyCreditCardMock = {
  account: {
    approvalId: '',
    errorMessage: '',
    specificErrorMessage: '',
    success: true,
    accountInformation: {
      accountId: '230066021825',
      accountType: 'DEPOSIT_ACCOUNT',
    },
    operations: null,
    creditCardMovements: [
      {
        fees: '0',
        rate: '0',
        debits: '0',
        credits: '10000',
        description: 'PAGO ATH CANALES ELECTRONICOS',
        transactionDate: '2019-02-21T00:00:00',
      },
      {
        fees: '0',
        rate: '0',
        debits: '0',
        credits: '10000',
        description: 'PAGO ATH CANALES ELECTRONICOS',
        transactionDate: '2019-02-14T00:00:00',
      },
      {
        fees: '0',
        rate: '0',
        debits: '0',
        credits: '10000',
        description: 'PAGO ATH CANALES ELECTRONICOS',
        transactionDate: '2019-02-13T00:00:00',
      },
    ],
    request: {
      accountId: '230066021825',
      accountType: 'DEPOSIT_ACCOUNT',
      currency: 'COP',
      requestId: 1611667796,
      companyId: 'BANCO_POPULAR',
      dateMovementsFrom: '',
      dateMovementsTo: '',
      id: '19122111',
      idType: 'CC',
      customerId: '19122111',
      customerIdType: 'CC',
      deviceId:
        // tslint:disable-next-line:max-line-length
        'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3Dmozilla%2F5%2E0%20%28macintosh%3B%20intel%20mac%20os%20x%2010%5F14%5F6%29%20applewebkit%2F537%2E36%20%28khtml%2C%20like%20gecko%29%20chrome%2F87%2E0%2E4280%2E141%20safari%2F537%2E36%7C5%2E0%20%28Macintosh%3B%20Intel%20Mac%20OS%20X%2010%5F14%5F6%29%20AppleWebKit%2F537%2E36%20%28KHTML%2C%20like%20Gecko%29%20Chrome%2F87%2E0%2E4280%2E141%20Safari%2F537%2E36%7CMacIntel%26pm%5Ffpsc%3D24%7C1680%7C1050%7C1050%26pm%5Ffpsw%3D%26pm%5Ffptz%3D%2D5%26pm%5Ffpln%3Dlang%3Des%2D419%7Csyslang%3D%7Cuserlang%3D%26pm%5Ffpjv%3D0%26pm%5Ffpco%3D1%26pm%5Ffpasw%3Dinternal%2Dpdf%2Dviewer%7Cmhjfbmdgcfjbbpaeojofohoefgiehjai%7Cinternal%2Dnacl%2Dplugin%26pm%5Ffpan%3DNetscape%26pm%5Ffpacn%3DMozilla%26pm%5Ffpol%3Dtrue%26pm%5Ffposp%3D%26pm%5Ffpup%3D%26pm%5Ffpsaw%3D1680%26pm%5Ffpspd%3D24%26pm%5Ffpsbd%3D%26pm%5Ffpsdx%3D%26pm%5Ffpsdy%3D%26pm%5Ffpslx%3D%26pm%5Ffpsly%3D%26pm%5Ffpsfse%3D%26pm%5Ffpsui%3D%26pm%5Fos%3DMac%26pm%5Fbrmjv%3D87%26pm%5Fbr%3DChrome%26pm%5Finpt%3D%26pm%5Fexpt%3D',
      ipAddress: '3.13.132.40',
    },
    dateTime: '2021-01-26T08:30:03.584',
  },
  loading: false,
  loaded: true,
  error: false,
  errorMessage: '',
  // tslint:disable-next-line:max-file-line-count
};

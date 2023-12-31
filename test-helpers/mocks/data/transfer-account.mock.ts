import { AccountTransferInterface } from '@core/interfaces/accountTransfer.interface';

export const TransferMock: AccountTransferInterface = {
  success: true,
  request: {
    ipAddress: '1.1.1.1',
    transactionInformation: {
      amount: 1000,
    },
  },
  dateTime: '2020-12-10T16:31:23.942',
};

// "api/api/affiliation-products/available-banks"
export const availableBanksMock = {
  errorStatusCode: null,
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  banks: [
    { value: '0001', name: 'Banco de BogotÃ¡' },
    { value: '0002', name: 'Banco Popular' },
    { value: '0006', name: 'ItaÃº antes Corpbanca' },
    { value: '0007', name: 'Bancolombia' },
    { value: '0009', name: 'Banco Citibank' },
    { value: '0012', name: 'Banco GNB Sudameris' },
    { value: '0013', name: 'BBVA Banco Ganadero' },
    { value: '0014', name: 'ItaÃº' },
    { value: '0019', name: 'Banco Scotiabank Colpatria' },
    { value: '0023', name: 'Banco de Occidente' },
    { value: '0031', name: 'BancÃ³ldex S.A.' },
    { value: '0032', name: 'Banco Caja Social' },
    { value: '0040', name: 'Banco Agrario de Colombia' },
    { value: '0042', name: 'BNP Paribas S.A' },
    { value: '0051', name: 'Banco Davivienda' },
    { value: '0052', name: 'Banco AV Villas' },
    { value: '0058', name: 'Banco ProCredit Colombia' },
    { value: '0059', name: 'BancamÃ­a' },
    { value: '0060', name: 'Banco Pichincha' },
    { value: '0061', name: 'Bancoomeva' },
    { value: '0062', name: 'Banco Falabella S.A.' },
    { value: '0063', name: 'Banco Finandina S.A.' },
    { value: '0064', name: 'Banco Multibank S.A.' },
    { value: '0065', name: 'Banco Santander de Neg' },
    { value: '0066', name: 'Banco Cooperativo Coopcentral' },
    { value: '0067', name: 'Banco Compartir S.A' },
    { value: '0121', name: 'CompaÃ±Ã­a de Financiamiento Juriscoop' },
    { value: '0283', name: 'Cooperativa Financiera de Antioquia' },
    { value: '0289', name: 'Cotrafa Cooperativa Financiera' },
    { value: '0292', name: 'Confiar S.A.' },
    { value: '0370', name: 'Coltefinanciera S.A' },
    { value: '0507', name: 'Banco Nequi' },
  ],
  success: true,
  request: {},
  dateTime: '2021-06-01T16:54:00.762',
};

// "api/api/transfers-schedule/search"
export const transferScheduleSearchMock = {
  errorStatusCode: '09',
  approvalId: '0',
  errorMessage: 'No hay transferencias programadas.',
  specificErrorMessage: null,
  specificErrorCode: null,
  request: {
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm',
    companyId: 'BANCO_POPULAR',
    ipAddress: '161.69.121.36',
  },
  transfers: [],
  success: false,
  dateTime: '2021-06-01T16:54:00.906',
};

// "api/api/transfers-history"
export const transferHistoryMock = {
  errorStatusCode: null,
  approvalId: '0',
  errorMessage: null,
  specificErrorMessage: null,
  specificErrorCode: null,
  request: {
    companyId: 'BANCO_POPULAR',
    itemsPerPage: 1000,
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3',
    ipAddress: '161.69.121.36',
  },
  companyId: null,
  id: null,
  idType: null,
  transfers: [
    {
      ipAddress: '181.54.142.219',
      requestId: null,
      notes: 'patty',
      date: '2021-05-24T18:59:22.122Z',
      accountFromInformation: {
        accountIdentifier: '500801042121',
        productType: 'DEPOSIT_ACCOUNT',
        bank: null,
        bankName: null,
        name: null,
        identificationType: null,
        identificationNumber: null,
        isFavorite: null,
      },
      accountToInformation: {
        accountIdentifier: '500801486848',
        productType: 'DEPOSIT_ACCOUNT',
        bank: '0002',
        bankName: '',
        name: 'Armando Puentes ACEVEDO',
        identificationType: 'CC',
        identificationNumber: '33210989',
        isFavorite: null,
      },
      transferInformation: { amount: 10000.0 },
      invoiceNumber: '',
      approvalId: '619N21AK4N010077',
      errorMessage: '',
      statusCode: 0,
      app: 'PB',
      success: true,
    },
    {
      ipAddress: '181.54.142.219',
      requestId: null,
      notes: 'pruebas nn',
      date: '2021-05-20T17:36:45.693Z',
      accountFromInformation: {
        accountIdentifier: '500801043012',
        productType: 'DEPOSIT_ACCOUNT',
        bank: null,
        bankName: null,
        name: null,
        identificationType: null,
        identificationNumber: null,
        isFavorite: null,
      },
      accountToInformation: {
        accountIdentifier: '428846733',
        productType: 'DEPOSIT_ACCOUNT',
        bank: '0052',
        bankName: '',
        name: 'BLANCA Armando Puentes ACAVEDO',
        identificationType: 'CC',
        identificationNumber: '33210989',
        isFavorite: null,
      },
      transferInformation: { amount: 100000.0 },
      invoiceNumber: '',
      approvalId: '0',
      errorMessage:
        'Lo sentimos, estamos teniendo problemas tÃ©cnicos al intentar realizar la transacciÃ³n.',
      statusCode: 6220,
      app: 'PB',
      success: false,
    },
  ],
  success: true,
  dateTime: '2021-06-01T16:54:01.100',
};

// "api/api/favorite-transfers/all"
export const transferFavoriteAllMock = {
  errorStatusCode: null,
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  specificErrorCode: null,
  request: {
    companyId: 'BANCO_POPULAR',
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%',
    ipAddress: '161.69.121.36',
  },
  favoriteTransfers: [
    {
      companyId: 'BANCO_POPULAR',
      id: '33210989',
      idType: 'CC',
      ipAddress: '186.81.103.58',
      currentSystemDate: 1622584441181,
      notes: 'TRANF BANCOLOMBIA',
      dueDate: null,
      accountFromInformation: {
        accountIdentifier: '500801042042',
        productType: 'DEPOSIT_ACCOUNT',
        bank: null,
        bankName: null,
        name: null,
        identificationType: null,
        identificationNumber: null,
        isFavorite: null,
      },
      accountToInformation: {
        accountIdentifier: '57452821212',
        productType: 'DEPOSIT_ACCOUNT',
        bank: '0007',
        bankName: 'Bancolombia',
        name: 'Armando Puentes',
        identificationType: 'CC',
        identificationNumber: 'Armando Puentes',
        isFavorite: true,
      },
      transferInformation: { amount: 10000.0 },
      invoiceNumber: '7 SEPT',
      requestId: '1599485906',
      transactionCost: null,
      approvedChallenge: false,
    },
  ],
  success: true,
  dateTime: '2021-06-01T16:54:01.183',
};

// api/api/v2/affiliation-products/all
export const affiliationProductsAllMock = {
  errorStatusCode: null,
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  productAffiliations: [
    {
      originAccountId: null,
      originAccountType: null,
      destinationAccountId: '000611112233',
      destinationAccountType: 'DEPOSIT_ACCOUNT',
      customerId: '2041234',
      customerIdType: 'CC',
      customerName: 'PEPITO PEREZ',
      email: 'CORREO1@HOTMAIL.COM',
      bankId: '0001',
      bankName: 'Banco de BogotÃ¡',
    },
    {
      originAccountId: null,
      originAccountType: null,
      destinationAccountId: '500800332211',
      destinationAccountType: 'DEPOSIT_ACCOUNT',
      customerId: '1049614321',
      customerIdType: 'CC',
      customerName: 'EL JUANCHO',
      email: 'CORREO2@HOTMAIL.COM',
      bankId: '0002',
      bankName: 'Banco Popular',
    },
    {
      originAccountId: null,
      originAccountType: null,
      destinationAccountId: '57452778899',
      destinationAccountType: 'DEPOSIT_ACCOUNT',
      customerId: '5289876',
      customerIdType: 'CC',
      customerName: 'ARMANDO PUENTES',
      email: 'CORREO3@HOTMAIL.COM',
      bankId: '0007',
      bankName: 'Bancolombia',
    },
    {
      originAccountId: null,
      originAccountType: null,
      destinationAccountId: '015500034519',
      destinationAccountType: 'DEPOSIT_ACCOUNT',
      customerId: '23339264',
      customerIdType: 'CC',
      customerName: 'FLOR DEL CAMPO',
      email: '',
      bankId: '0040',
      bankName: 'Banco Agrario de Colombia',
    },
  ],
  success: true,
  request: {
    accountId: '500801488797',
    accountType: 'DEPOSIT_ACCOUNT',
    requestId: 1622584473,
    companyId: 'BANCO_POPULAR',
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-01T16:54:36.727',
};

// "api/api/transfers/cost"
export const transferCostMock = {
  errorStatusCode: null,
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  specificErrorCode: null,
  request: {
    accountFromInformation: {
      accountIdentifier: '500801488797',
      productType: 'DEPOSIT_ACCOUNT',
    },
    accountToInformation: {
      accountIdentifier: '57452821234',
      bank: '0007',
      productType: 'DEPOSIT_ACCOUNT',
    },
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  cost: '$2.100 + IVA',
  success: true,
  dateTime: '2021-06-01T16:54:47.325',
};

// "api/api/transfers/transfer"
export const transferMock = {
  errorStatusCode: '6220',
  approvalId: '0',
  errorMessage:
    'Lo sentimos, estamos teniendo problemas técnicos al intentar realizar la transacción.',
  specificErrorMessage:
    'AC-FWENT002::Error al pasar la entrada de cuenta. Fondos insuficientes en la cuenta del cliente',
  specificErrorCode: '02',
  request: {
    requestId: 1622584590,
    companyId: 'BANCO_POPULAR',
    notes: 'Pruebas ',
    invoiceNumber: '',
    accountFromInformation: {
      accountIdentifier: '500801488797',
      productType: 'DEPOSIT_ACCOUNT',
    },
    accountToInformation: {
      accountIdentifier: '57452821234',
      productType: 'DEPOSIT_ACCOUNT',
      bank: '0007',
      bankName: 'Bancolombia',
      identificationType: 'CC',
      identificationNumber: '7777777',
      isNewAccount: false,
      name: 'armando puentes',
      isFavorite: false,
    },
    transferInformation: { amount: '50000' },
    scheduledTransfer: false,
    dueDate: null,
    transactionCost: '$2.100 + IVA',
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%',
    ipAddress: '3.13.132.40',
  },
  success: true,
  dateTime: '2021-06-01T16:56:33.364',
  // tslint:disable-next-line:max-file-line-count
};

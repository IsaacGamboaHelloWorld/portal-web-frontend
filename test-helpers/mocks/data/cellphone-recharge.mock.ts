// api/api/cell-phone-recharge
export const rechargeErrorMock = {
  rechargeInfo: {
    accountId: '500801487829',
    accountType: 'DEPOSIT_ACCOUNT',
    phoneNumber: '3118203817',
    amount: '50000',
    operatorCode: '215',
    operatorName: 'Claro',
    idType: 'CC',
    id: '52814730',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  approvalId: '',
  errorMessage:
    'Ha ocurrido un error inesperado. Por favor intenta mas tarde o comunÃ­cate con el administrador.',
  specificErrorMessage: 'an error occurred trying to recharge',
  success: false,
  request: {
    accountId: '500801488797',
    accountType: 'DEPOSIT_ACCOUNT',
    phoneNumber: '3118203817',
    amount: '50000',
    operatorCode: '215',
    operatorName: 'Claro',
    currentSystemDate: 1622584825409,
    transactionCost: '$0',
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-01T17:00:30.139',
};

// api/api/cell-phone-recharge/operators-name
export const operatorsMock = {
  success: true,
  mobileOperators: [
    { id: 'tigo', code: '290', name: 'Tigo' },
    { id: 'virgin_mobile', code: '383', name: 'Virgin Mobile' },
    { id: 'movistar', code: '211', name: 'Movistar' },
    { id: 'claro', code: '215', name: 'Claro' },
  ],
  request: {},
  dateTime: '2021-06-01T16:59:44.110',
};

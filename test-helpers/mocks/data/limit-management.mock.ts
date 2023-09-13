// /administration-limits-api/get-transfers-limits
export const limitManagementGetWithoutData = {
  dateTime: '2022-03-29T10:00:34.666',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    channel: 'PB',
    customerId:
      '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    ipAddress: '3.13.132.40',
    id: '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: '',
  statusDescription: '',
  success: true,
  errorMessage: 'Record not found',
  statusCode: '404',
};

// /administration-limits-api/get-transfers-limits
export const limitManagementGetWithData = {
  firstTime: false,
  dateTime: '2022-03-31T14:30:46.736',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    channel: 'PB',
    customerId:
      '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    ipAddress: '3.13.132.40',
    id: '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
  },
  success: true,
  transfersLimits: {
    lastUpdateDate: '',
    maxAmountTransfersByDayAnotherBank: 0,
    maxAmountTransactionAnotherBank: 0,
    maxAmountTransfersByDay: 0,
    maxAmountTransaction: 0,
  },
  channel: 'PB',
  transfersLimitsBank: {
    lastUpdateDate: '',
    maxAmountTransfersByDayAnotherBank: 10000000,
    maxAmountTransactionAnotherBank: 1000000,
    maxAmountTransfersByDay: 10000000,
    maxAmountTransaction: 1000000,
  },
};

// /administration-limits-api/create-transfers-limits
export const limitManagementCreateSuccess = {
  dateTime: '2022-03-29T10:58:28.474',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    transfersLimits: {
      maxAmountByMonth: 1000000,
      currentAmountByMonth: 500000,
      maxTransfersByMonthAnotherBank: 1000000,
      currentTransfersByDay: 500000,
      currentTransfersByMonth: 500000,
      maxTransfersByMonth: 1000000,
      maxAmountTransaction: 1000000,
      currentTransfersByMonthAnotherBank: 500000,
      maxAmountByMonthAnotherBank: 1000000,
      currentAmountByDayAnotherBank: 500000,
      currentTransfersByDayAnotherBank: 500000,
      maxAmountByDay: 1000000,
      maxAmountByDayAnotherBank: 1000000,
      maxTransfersByDayAnotherBank: 1000000,
      maxAmountTransactionAnotherBank: 1000000,
      maxTransfersByDay: 1000000,
      currentAmountByDay: 500000,
      currentAmountByMonthAnotherBank: 500000,
    },
    channel: 'PB',
    customerId:
      '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    ipAddress: '3.13.132.40',
    id: '5b904123b983835d9b0b678e78d3418469757f9198e0fcbaf41d90cbd42f790a',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: '',
  statusDescription: 'Record saved correctly',
  success: true,
  errorMessage: '',
  statusCode: '200',
};

// api/api/otp/enrollment
export const optAthGenerateSuccess = {
  dateTime: '2022-06-15T11:16:34.472',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      '143705b2daf4782f008a1fc7aedddf3ee66e8b42d295cf07cdc015ab93b90be9',
    ipAddress: '3.13.132.40',
    id: '143705b2daf4782f008a1fc7aedddf3ee66e8b42d295cf07cdc015ab93b90be9',
    customerIdType: 'CC',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: null,
  otpData: {
    amount: null,
    currency: null,
    transactionRqUID: 'f04a785f-f9d0-4fd0-a77f-7b5373c3d617',
  },
  success: true,
  errorMessage: null,
  errorStatusCode: null,
  approvalId: null,
  specificErrorCode: null,
};

// api/otp/enrollment/validate
export const otpAthValidateSuccessMock = {
  dateTime: '2022-06-15T11:17:10.077',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      '143705b2daf4782f008a1fc7aedddf3ee66e8b42d295cf07cdc015ab93b90be9',
    ipAddress: '3.13.132.40',
    otpValue: '****3517',
    id: '143705b2daf4782f008a1fc7aedddf3ee66e8b42d295cf07cdc015ab93b90be9',
    customerIdType: 'CC',
    transactionRqUID: 'f04a785f-f9d0-4fd0-a77f-7b5373c3d617',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: null,
  validateOtpData: {
    amount: '0.0',
    currency: 'COP',
  },
  success: true,
  errorMessage: null,
  errorStatusCode: null,
  approvalId: null,
  specificErrorCode: null,
};

export const otpAthValidateErrorMock = {
  dateTime: '2022-06-15T13:57:47.552',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      '143705b2daf4782f008a1fc7aedddf3ee66e8b42d295cf07cdc015ab93b90be9',
    ipAddress: '3.13.132.40',
    otpValue: '****1111',
    id: '143705b2daf4782f008a1fc7aedddf3ee66e8b42d295cf07cdc015ab93b90be9',
    customerIdType: 'CC',
    transactionRqUID: '7310eea3-093a-454b-a47f-30b485c72a28',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: 'Authorization Failed',
  validateOtpData: null,
  success: false,
  errorMessage:
    'La respuesta del autorizador es fallida (No corresponde el desafÃ­o)',
  errorStatusCode: null,
  approvalId: null,
  specificErrorCode: '25',
};

export const otpAthValidateUserBlockedMock = {
  dateTime: '2022-06-15T13:57:54.192',
  request: {
    companyId: 'BANCO_POPULAR',
    idType: 'CC',
    customerId:
      '143705b2daf4782f008a1fc7aedddf3ee66e8b42d295cf07cdc015ab93b90be9',
    ipAddress: '3.13.132.40',
    otpValue: '****1111',
    id: '143705b2daf4782f008a1fc7aedddf3ee66e8b42d295cf07cdc015ab93b90be9',
    customerIdType: 'CC',
    transactionRqUID: '7310eea3-093a-454b-a47f-30b485c72a28',
    deviceId: '*************************t%3D',
  },
  specificErrorMessage: 'USER BLOCKED',
  validateOtpData: null,
  success: false,
  errorMessage: 'Usuario bloqueado no puede operar',
  errorStatusCode: null,
  approvalId: null,
  specificErrorCode: '9',
};

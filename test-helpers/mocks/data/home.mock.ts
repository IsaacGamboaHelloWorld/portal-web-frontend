// api/api/loyalty/balance
export const loyaltyBalanceMock = {
  status: 'Activo',
  totalPoints: 12677,
  partnerId: '1-GLJ-158',
  programId: '1-OVSI',
  programName: 'Puntos AVAL',
  points: {
    BANCO_DE_BOGOTA: 0,
    BANCO_POPULAR: 8367,
    BANCO_OCCIDENTE: 0,
    BANCO_AV_VILLAS: 4310,
  },
  errorMessage: '',
  specificErrorMessage: '',
  success: true,
  request: {
    companyId: 'BANCO_POPULAR',
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-01T16:59:33.708',
};

// "api/api/customer/preferences/all"
export const preferenceAllMock = {
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  preferences: {
    firstTimeNewsOnboarding: 'false',
    menuOptionPayment: 'false',
    firstTimeNewsOnboarding1: 'false',
    menuOptionPayment1: 'false',
    firstTimePocketsOnboarding: 'false',
    pocketOnBoarding: 'true',
    firstTimeDocuments: 'false',
    opt_documents: 'false',
    undefined: 'false',
  },
  success: true,
  request: {
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5Ffpua%3Dm',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-01T16:59:34.378',
};

// "api/api/customer/preferences/save"
export const preferenceSaveMock = {
  approvalId: null,
  errorMessage: null,
  specificErrorMessage: null,
  success: true,
  request: {
    preferences: { undefined: false },
    id: '33210989',
    idType: 'CC',
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%5',
    companyId: 'BANCO_POPULAR',
    ipAddress: '3.13.132.40',
  },
  dateTime: '2021-06-01T16:59:33.648',
};

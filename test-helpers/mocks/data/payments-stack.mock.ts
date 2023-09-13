// "api/api/pila/information"
export const stackInformationMock = {
  requestId: '200123003030',
  ipAddress: '192.168.0.2',
  id: '800075762',
  idType: 'NI',
  pilaInformation: {
    id: '80208352',
    idType: 'CC',
    agreementId: '00001130',
    referenceType: 'PERIODO',
    referenceId: '201911',
  },
};

// api/api/v2/payments/payment/pila
export const stackPaymentMock = {
  errorMessage: '',
  specificErrorMessage: '',
  invoiceNumber: '9420495410',
  nie: '79104177',
  amount: '259000.00',
  success: true,
  request: {
    id: '33210989',
    idType: 'CC',
    pilaInformation: {
      id: '79104177',
      idType: 'CC',
      referenceType: 'PERIODO',
      agreementId: '00001506',
      referenceId: '202105',
    },
    customerId: '33210989',
    customerIdType: 'CC',
    deviceId: 'version%3D3%2E4%2E1%2E0%5F1%26pm%',
    companyId: 'BANCO_POPULAR',
    ipAddress: '161.69.121.36',
  },
  dateTime: '2021-06-01T16:52:57.163',
};

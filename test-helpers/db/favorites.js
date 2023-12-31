const favoritesMock = {
  success: true,
  errorMessage: '',
  favoriteTransfers: [
    {
      client: '0002CC45617',
      content: {
        companyId: 'BANCO_POPULAR',
        id: '45617',
        idType: 'CC',
        ipAddress: '192.168.0.1',
        requestId: '20190827001',
        notes: 'string',
        accountFromInformation: {
          accountIdentifier: '280480037662',
          productType: 'DEPOSIT_ACCOUNT',
          isNewAccount: false,
          isFavorite: false,
        },
        accountToInformation: {
          accountIdentifier: '500800001711',
          productType: 'DEPOSIT_ACCOUNT',
          bank: '0002',
          bankName: 'Banco popular',
          name: 'Universidad',
          identificationType: 'CC',
          identificationNumber: '19800203',
          isNewAccount: false,
          isFavorite: true,
        },
        transferInformation: { amount: 2.0e8 },
        scheduledTransfer: false,
      },
      fromAccountIdentifier: '280480037662',
      fromProductType: 'SDA',
      key: 'CC45617SDA280480037662SDA500800001711Universidad',
      toAccountIdentifier: '500800001711',
      toProductType: 'SDA',
    },
    {
      client: '0002CC45617',
      content: {
        companyId: 'BANCO_POPULAR',
        id: '45617',
        idType: 'CC',
        ipAddress: '192.168.0.1',
        requestId: '20190827001',
        notes: 'string',
        accountFromInformation: {
          accountIdentifier: '280480037662',
          productType: 'DEPOSIT_ACCOUNT',
          isNewAccount: false,
          isFavorite: false,
        },
        accountToInformation: {
          accountIdentifier: '500800001711',
          productType: 'DEPOSIT_ACCOUNT',
          bank: '0002',
          bankName: 'Banco popular',
          name: 'Universidad',
          identificationType: 'CC',
          identificationNumber: '19800203',
          isNewAccount: false,
          isFavorite: true,
        },
        transferInformation: { amount: 2.0e8 },
        scheduledTransfer: false,
      },
      fromAccountIdentifier: '280480037662',
      fromProductType: 'SDA',
      key: 'CC45617SDA280480037662SDA500800001711Universidad',
      toAccountIdentifier: '500800001711',
      toProductType: 'SDA',
    },
  ],
};
module.exports = favoritesMock;

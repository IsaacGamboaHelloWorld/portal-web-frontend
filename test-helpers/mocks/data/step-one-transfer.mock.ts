import { ProductsMock } from './products.mock';

export const TransferOneForm = {
  account_origin: ProductsMock.CREDIT_CARD[0],
  account_destination: {
    originAccountId: '',
    originAccountType: '',
    destinationAccountId: '',
    destinationAccountType: '',
    customerId: '',
    customerIdType: '',
    customerName: '',
    email: '',
    bankId: '',
    bankName: '',
  },
  productType: '',
  bank: {
    value: '',
    name: '',
  },
  accountIdentifier: '',
  name: '',
  identificationType: '',
  identificationNumber: '',
};

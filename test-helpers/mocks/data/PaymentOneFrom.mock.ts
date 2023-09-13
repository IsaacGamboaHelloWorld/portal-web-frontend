import { ProductsMock } from './products.mock';

export const PaymentOneForm = {
  ownership: '',
  ownershipIdType: '',
  ownershipIdNumber: '',
  origin: ProductsMock.CREDIT_CARD[0],
  destination: {
    accountId: '',
    accountType: '',
    bank: '',
    loanName: '',
    newLoan: '',
    billerNickName: '',
    billerName: '',
    amount: '',
  },
  bank: {
    value: '',
    name: '',
  },
  productType: '',
  loanType: '',
  accountIdentifier: '',
  name: '',
  isNew: false,
};

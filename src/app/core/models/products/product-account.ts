export interface ProductAccount {
  errorStatusCode: string;
  approvalId: string;
  errorMessage: string;
  specificErrorMessage: string;
  accountInformation: {
    accountIdentifier: string;
    bank: string;
    currencyCode: string;
    productName: string;
    productType: string;
  };
  status: string;
  openedDate: string;
  closedDate: string;
  dueDate: string;
  lastTransactionDate: string;
  overDraftDays: string;
  term: string;
  periodicityOfPayment: string;
  productAccountBalances: any;
  couldHavePockets: boolean;
  capacity: string;
  didAthCall: boolean;
  enabled: boolean;
  success: boolean;
  id: string;
  typeAccount: string;
  loading: boolean;
  loaded: boolean;
  error: boolean;
}

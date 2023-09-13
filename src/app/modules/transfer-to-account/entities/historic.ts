export interface AccountFromInformation {
  accountIdentifier: string;
  productType: string;
  bank?: any;
  bankName?: any;
  name?: any;
  identificationType?: any;
  identificationNumber?: any;
  isNewAccount?: any;
  isFavorite?: any;
}

export interface AccountToInformation {
  accountIdentifier: string;
  productType: string;
  bank: string;
  bankName: string;
  name: string;
  identificationType: string;
  identificationNumber: string;
  isNewAccount: boolean;
  isFavorite: boolean;
}

export interface TransferInformation {
  amount: number;
}

export interface IHistoricTransfer {
  companyId: string;
  id: string;
  idType: string;
  ipAddress: string;
  requestId: string;
  notes: string;
  date?: any;
  accountFromInformation: AccountFromInformation;
  accountToInformation: AccountToInformation;
  transferInformation: TransferInformation;
  scheduledTransfer: boolean;
  invoiceNumber: string;
  approvedChallenge: boolean;
  success?: boolean;
  errorMessage?: any;
  approvalId?: string;
}

export interface IRespHistoricTransfer {
  transfers: IHistoricTransfer[];
  id: string;
  idType: string;
  errorMessage?: string;
  success: boolean;
}

export interface IPendingTransfers {
  pendingTransfers: IPendingTransfer[];
  success: boolean;
  errorMessage: string;
}

export interface IPendingTransfer {
  id: string;
  idType: string;
  requestId: string;
  ipAddress: string;
  companyId: string;
  notes: string;
  dueDate: Date;
  accountFromInformation: IAccountFromInformation;
  accountToInformation: IAccountToInformation;
  transferInformation: ITransferInformation;
}

export interface IAccountFromInformation {
  accountIdentifier: string;
  productType: string;
}

export interface IAccountToInformation {
  accountIdentifier: string;
  productType: string;
  bank: string;
  bankName: string;
  identificationType: string;
  identificationNumber: string;
  isNewAccount: boolean;
  name: string;
}

export interface ITransferInformation {
  amount: number;
}

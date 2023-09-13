export interface IRespFavorite {
  favoriteTransfers: IFavorite[];
  success: boolean;
  errorMessage: string;
}

export interface IFavorite {
  companyId: string;
  id: string;
  idType: string;
  ipAddress: string;
  requestId: string;
  notes: string;
  accountFromInformation: {
    accountIdentifier: string;
    productType: string;
    isNewAccount: boolean;
    isFavorite: boolean;
  };
  accountToInformation: {
    accountIdentifier: string;
    productType: string;
    bank: string;
    bankName: string;
    name: string;
    identificationType: string;
    identificationNumber: string;
    isNewAccount: boolean;
    isFavorite: boolean;
    email: string;
  };
  transferInformation: {
    amount: number;
  };
  scheduledTransfer: boolean;
  approvedChallenge: boolean;
}

export interface IHomePocketsRecord {
  pocketId: string;
  pocketType: string;
  pocketName: string;
  savingGoal: string;
  amountPeriodicSavings: string;
  amountSaved: string;
  pendingAmount: string;
  category: string;
  pocketPeriod?: string;
  pocketPeriodDescription?: string;
}

export interface IHomePocketAccount {
  parent?: {
    accountIdentifier: string;
    productType: string;
  };
  pockets: IHomePocketsRecord[];
  totalSavedOnPockets: string;
  success: boolean;
  errorMessage?: string;
}

export interface IRespondHomePockets {
  currentPocketsByProduct: IHomePocketAccount[];
  success: boolean;
  errorMessage: string;
}

export interface IPocketToSearch {
  pocketId: string;
  pocketType: string;
  parentAccountId: string;
  parentAccountType: string;
}

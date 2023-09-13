import { AccountType } from '@app/core/models/products/accountType';

export class DebitCardListStateData {
  data: IDebitCardListResponse;
  error: boolean;
  loading: boolean;
  loaded: boolean;
  success: boolean;
}

export interface IDebitCardListResponse {
  debitCards: DebitCard[];
  success: boolean;
  errorMessage: string;
}

export interface DebitCard {
  account: AccountInformation;
  card: DebitCardInformation;
  accountInformation: AccountType;
}
export interface AccountInformation {
  accountId: string;
  accountType: string;
  bank: string;
}

export interface DebitCardInformation {
  cardId: string;
  cardType: string;
}

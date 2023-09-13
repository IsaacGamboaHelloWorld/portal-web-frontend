import { Pocket } from './pocket';

export class AccountType {
  accountIdentifier: string;
  productType: string;
  bank?: string;
  currencyCode?: string;
}

export class PocketsByProduct {
  parent?: AccountType;
  pockets?: Pocket[];
  totalSavedOnPockets?: number;
  success?: boolean;
  errorMessage?: string;
}

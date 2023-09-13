import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';

// FC -> Ahorros : 500, 280, 260, 240, 230, 210 -> Corrientes: 550
// SFB -> Ahorros: 220 -> Corrientes: 110
export const REGEX_FLEXCUBE_DEPOSIT = '^(500|280|260|240|230|210)';
export const REGEX_FLEXCUBE_DEPOSIT_PFM = '^(500|230)';
export const REGEX_FLEXCUBE_CURRENT = '^()$';
export const REGEX_SFB_DEPOSIT = '^(220)';
export const REGEX_SFB_CURRENT = '^(110|550)';

export function isAccountSFB(accountId: string, typeAccount: string): boolean {
  const validator = new RegExp(
    typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT
      ? REGEX_SFB_DEPOSIT
      : REGEX_SFB_CURRENT,
  );
  return validator.test(accountId);
}

export function isAccountFC(
  accountId: string,
  typeAccount: TYPE_ACCOUNTS | string,
  isPfm: boolean = false,
): boolean {
  const validator = new RegExp(
    typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT
      ? isPfm
        ? REGEX_FLEXCUBE_DEPOSIT_PFM
        : REGEX_FLEXCUBE_DEPOSIT
      : REGEX_FLEXCUBE_CURRENT,
  );
  return validator.test(accountId);
}

export function filterByFC(
  product: Product[],
  enableDeposite: boolean = true,
  enableCurrent: boolean = true,
): Product[] {
  return product.filter(
    (data) =>
      (enableDeposite &&
        data.accountInformation.productType === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT &&
        isAccountFC(
          data.accountInformation.accountIdentifier,
          TYPE_ACCOUNTS.DEPOSIT_ACCOUNT,
        )) ||
      (enableCurrent &&
        data.accountInformation.productType === TYPE_ACCOUNTS.CURRENT_ACCOUNT &&
        isAccountFC(
          data.accountInformation.accountIdentifier,
          TYPE_ACCOUNTS.CURRENT_ACCOUNT,
        )),
  );
}

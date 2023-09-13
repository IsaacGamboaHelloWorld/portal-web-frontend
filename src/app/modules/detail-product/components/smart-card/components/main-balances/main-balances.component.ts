import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { isNullOrUndefined } from 'util';
import { Product } from '../../../../../../core/models/products/product';

@Component({
  selector: 'app-main-balances',
  templateUrl: './main-balances.component.html',
  styleUrls: ['./main-balances.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class MainBalancesComponent {
  @Input() info: Product;

  constructor() {}

  get neededToPay(): boolean {
    return Product.getMinimumPayment(this.info) > 0;
  }

  get T_DA(): string {
    return TYPE_ACCOUNTS.DEPOSIT_ACCOUNT;
  }

  get T_CA(): string {
    return TYPE_ACCOUNTS.CURRENT_ACCOUNT;
  }

  get T_CC(): string {
    return TYPE_ACCOUNTS.CREDIT_CARD;
  }

  get typeProduct(): string {
    return !isNullOrUndefined(this.info) &&
      !isNullOrUndefined(this.info.accountInformation)
      ? this.info.accountInformation.productType
      : '';
  }

  get hasOverDraftDays(): boolean {
    return Number(this.info.overDraftDays) > 0 ? true : false;
  }
}

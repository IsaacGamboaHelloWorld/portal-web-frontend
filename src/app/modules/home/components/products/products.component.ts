import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { TypeProduct } from '@core/interfaces/product_type.interface';
import { Product } from '@core/models/products/product';
import { isNullOrUndefined } from 'util';
import { BANKS } from '../../../../core/constants/banks';
import { HomeModel } from '../../home.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  @Input() type_account: string;
  @Input() products: Product[];

  public account: TypeProduct = TYPE_ACCOUNTS;

  constructor(private model: HomeModel, private router: Router) {}

  get hasProducts(): boolean {
    return (
      !isNullOrUndefined(this.products) &&
      this.products.length > 0 &&
      this._validateProduct(this.type_account)
    );
  }

  get quantityProducts(): number {
    return !isNullOrUndefined(this.products) ? this.products.length : 0;
  }

  public trackByFn(index: number, product: Product): string {
    return product.id;
  }

  public redirect(event: { product: Product; url: string }): void {
    this.model.clearSelectPayment();
    this.model.setProduct({
      type: event.product.typeAccount,
      id: event.product.id,
      name: 'Tarjeta de crédito',
      bank: '0002',
      bank_name: BANKS.BANCO_POPULAR,
      dataComplete: event.product.accountInformation,
    });
    this.router.navigate([event.url]);
  }

  private _validateProduct(typeProduct: string): boolean {
    return (
      typeProduct === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
      typeProduct === TYPE_ACCOUNTS.CREDIT_CARD ||
      typeProduct === TYPE_ACCOUNTS.CERTIFIED_DEPOSIT_TERM ||
      typeProduct === TYPE_ACCOUNTS.CURRENT_ACCOUNT
    );
  }
}

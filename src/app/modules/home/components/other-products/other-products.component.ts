import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { isNullOrUndefined } from 'util';

import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { TypeProduct } from '@core/interfaces/product_type.interface';
import { OtherProduct } from '@store/reducers/models/products/other-products.reducer';

@Component({
  selector: 'app-other-products',
  templateUrl: './other-products.component.html',
  styleUrls: ['./other-products.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtherProductsComponent {
  @Input() bank: OtherProduct;
  @Output() load: EventEmitter<string> = new EventEmitter<string>();

  public showImage: boolean = true;
  public typeProducts: TypeProduct = TYPE_ACCOUNTS;

  constructor() {}

  get hasProducts(): boolean {
    return (
      !isNullOrUndefined(this.bank) &&
      !isNullOrUndefined(this.bank.products) &&
      joinProducts(this.bank.products).length > 0
    );
  }

  public quantityProducts(products: any[]): number {
    return products.length;
  }

  public hiddenImage(): void {
    this.showImage = false;
  }
}

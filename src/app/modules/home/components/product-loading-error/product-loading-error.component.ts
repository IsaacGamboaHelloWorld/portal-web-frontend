import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { HomeModel } from '@modules/home/home.model';

@Component({
  selector: 'app-product-loading-error',
  templateUrl: './product-loading-error.component.html',
  styleUrls: ['./product-loading-error.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductLoadingErrorComponent {
  @Input() product: any;

  constructor(private model: HomeModel) {}

  public loadProduct(): void {
    if (
      this.product.accountInformation.productType ===
      TYPE_ACCOUNTS.FREE_DESTINATION
    ) {
      this.model.fetchFreeDestiny(this.product.accountIdentifier, this.product);
    } else {
      this.model.fetchDetailProduct(this.product.typeAccount, this.product.id);
    }
  }
}

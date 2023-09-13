import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@core/constants/navigate';
import { AccountBalance } from '@core/models/products/accountBalance';
import { Product } from '@core/models/products/product';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-product-default',
  templateUrl: './product-default.component.html',
  styleUrls: ['./product-default.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDefaultComponent {
  @Input() product: Product;
  @Input() nameBank: string;

  constructor(
    private router: Router,
    private dom: ManipulateDomService,
    private security: SecurityService,
  ) {}

  get hasProduct(): boolean {
    return (
      !isNullOrUndefined(this.product) &&
      !isNullOrUndefined(this.product.productAccountBalances)
    );
  }

  get hasNameBank(): boolean {
    return !isNullOrUndefined(this.nameBank);
  }

  public redirect(type: string, id: string | number): void {
    this.security.encryptAesGcm(id.toString()).then((data) => {
      this.router.navigate([Navigate.detail, type.toLowerCase(), data]);
      this.dom.scrollTop();
    });
  }

  get validateProperty(): boolean {
    return (
      this.product.hasOwnProperty('productAccountBalances') &&
      !isNullOrUndefined(
        this.product.productAccountBalances[
          Object.keys(this.product.productAccountBalances)[0]
        ],
      )
    );
  }

  public valueFirstPosition(): number {
    const property: AccountBalance = this.product.productAccountBalances[
      Object.keys(this.product.productAccountBalances)[0]
    ];
    return property.amount;
  }
}

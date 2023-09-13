import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@core/models/products/product';
import { isNullOrUndefined } from 'util';

import { Navigate } from '@core/constants/navigate';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';

@Component({
  selector: 'app-product-cdt',
  templateUrl: './product-cdt.component.html',
  styleUrls: ['./product-cdt.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductCdtComponent {
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

  public showFooter(date: string): boolean {
    return !isNullOrUndefined(date) && date !== '';
  }
}

import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { Navigate } from '@core/constants/navigate';
import { Product } from '@core/models/products/product';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Observable } from 'rxjs';
import { HomeModel } from '../../home.model';

@Component({
  selector: 'app-product-current-account',
  templateUrl: './product-current-account.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ProductCurrentAccountComponent {
  @Input() product: Product;
  @Input() nameBank: string;

  constructor(
    private router: Router,
    private dom: ManipulateDomService,
    private security: SecurityService,
    private model: HomeModel,
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

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }

  public redirect(type: string, id: string | number): void {
    this.security.encryptAesGcm(id.toString()).then((data) => {
      this.router.navigate([Navigate.detail, type.toLowerCase(), data]);
      this.dom.scrollTop();
    });
  }

  public showFooter(value: number | string): boolean {
    return !isNullOrUndefined(value) && value > 0;
  }
}

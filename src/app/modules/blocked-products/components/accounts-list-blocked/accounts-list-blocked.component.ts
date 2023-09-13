import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { BlockedProductsModel } from '@app/modules/blocked-products/store/model/blocked-products.model';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { Observable } from 'rxjs';
import { filter, finalize, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { TYPE_ACCOUNTS } from '../../../../core/constants/types_account';
import { ProductsInterface } from '../../../../core/interfaces/products.interface';
import { Product } from '../../../../core/models/products/product';
import { joinProducts } from '../../../../shared/helpers/joinProducts.helper';

@Component({
  selector: 'app-accounts-list-blocked',
  templateUrl: './accounts-list-blocked.component.html',
  styleUrls: ['./accounts-list-blocked.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsListBlockedComponent implements OnDestroy {
  loading: boolean = false;
  timeout: any = null;

  constructor(
    private model: BlockedProductsModel,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    if (!!this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  public retryLoadAccountList(): void {
    this.loading = true;
    this.model.loadProducts();
  }

  private _finalize(): void {
    if (!!this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.loading = false;
      this.cd.detectChanges();
    }, 1000);
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }

  get depositAccounts$(): Observable<Product[]> {
    return this.model.products$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      finalize(() => this._finalize()),
      map((products: ProductsInterface) => {
        return joinProducts(products).filter((product: Product) => {
          return product.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT;
        });
      }),
    );
  }

  get currentAccounts$(): Observable<Product[]> {
    return this.model.products$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      finalize(() => this._finalize()),
      map((products: ProductsInterface) => {
        return joinProducts(products).filter((product: Product) => {
          return product.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT;
        });
      }),
    );
  }
}

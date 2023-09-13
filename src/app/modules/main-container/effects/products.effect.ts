import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { SecurityService } from '@app/modules/security/services/security.service';
import { evenProducts } from '@app/shared/helpers/eventDataLayer';
import { CURRENT_USER } from '@core/constants/auth';
import {
  ProductsInterface,
  RespondServiceProducts,
} from '@core/interfaces/products.interface';
import { Product } from '@core/models/products/product';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { MainContainerModel } from '@modules/main-container/main-container.model';
import { DetailsService } from '@modules/main-container/services/details.service';
import { ProductsService } from '@modules/main-container/services/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  detailProductLoad,
  productFail,
  productLoad,
  productSuccess,
} from '@store/actions/models/product/product.action';
import {
  productsCancel,
  productsFail,
  productsLoad,
  productsSuccess,
} from '@store/actions/models/products/products.action';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root',
})
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private globalData: GlobalDataService,
    private detailPService: DetailsService,
    private model: MainContainerModel,
    private securityService: SecurityService,
    private urlEncode: HttpUrlEncodingCodec,
  ) {}

  LoadProducts: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(productsLoad),
      switchMap(() => {
        return this.productsService.allProducts().pipe(
          takeUntil(this.globalData.cancel),
          map((productsOnStore: RespondServiceProducts) => {
            if (!!productsOnStore && productsOnStore.success) {
              this.sendEventMaxymiser(productsOnStore.products);
              this.dispatchActionDetail(productsOnStore.products);
              return productsSuccess(productsOnStore.products);
            }
            return productsFail(productsOnStore.errorMessage);
          }),
          catchError((err) => of(productsFail(err.errorMessage))),
        );
      }),
    ),
  );

  LoadProduct: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(productLoad),
      concatMap((action) => {
        if (isNullOrUndefined(this.securityService.getItem(CURRENT_USER))) {
          return of(productsCancel());
        } else {
          return this.detailService(action.typeAccount, action.id);
        }
      }),
    ),
  );

  LoadProductDetail: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(detailProductLoad),
      switchMap((action) => {
        return this.detailService(action.typeAccount, action.id);
      }),
    ),
  );

  productsLoadPriority: any = {
    DEPOSIT_ACCOUNT: 1,
    CURRENT_ACCOUNT: 2,
    CREDIT_CARD: 3,
    CREDIT: 4,
    CERTIFIED_DEPOSIT_TERM: 5,
    UNKNOWN: 100,
  };

  private extractOrderByType(type: string): number {
    return !!this.productsLoadPriority[type]
      ? this.productsLoadPriority[type]
      : this.productsLoadPriority.UNKNOWN;
  }

  private dispatchActionDetail(products: ProductsInterface): void {
    let productsList = [];
    const productTypes = Object.keys(products);
    productTypes.sort(
      (a, b) => this.extractOrderByType(a) - this.extractOrderByType(b),
    );
    productTypes.forEach(
      (key) => (productsList = productsList.concat(products[key])),
    );

    productsList.forEach((product: Product) => {
      this.model.fetchProduct(
        product.accountInformation.accountIdentifier,
        product.accountInformation.productType,
        product,
      );
    });
  }

  private detailService(type: string, id: string): Observable<Action> {
    return this.detailPService.get_product(type, id).pipe(
      takeUntil(this.globalData.cancel),
      map((product: Product) => {
        if (!!product && product.success) {
          return productSuccess(type, id, product);
        }
        return productFail(type, id, product.errorMessage);
      }),
      catchError((err) => of(productFail(type, id, ''))),
    );
  }

  private sendEventMaxymiser(products: ProductsInterface): void {
    const productDontHave = [];
    Object.keys(TYPE_ACCOUNTS).forEach((value) => {
      if (products[value] == null) {
        productDontHave.push(value);
      }
    });
    const token = this.urlEncode.encodeValue(
      this.securityService.getItem(CURRENT_USER),
    );
    evenProducts({
      eventId: token,
      products: productDontHave,
    });
  }
}

import { Injectable } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { LoadRegisterAffiliationApiOperation } from '@app/store/actions/models/transfer/products-destination/register-affiliation.action';
import { RegisterDestinationProductState } from '@app/store/reducers/models/transfer/destination-products/register-destination-product.reducer';
import { ApplicationState } from '@app/store/state/application.state';
import {
  IProductAffiliationElement,
  OriginAccountRegistrationProduct,
} from '@core/interfaces/product-destination.interface';
import { Product } from '@core/models/products/product';
import { DeleteAffiliationLoad } from '@modules/registered-accounts/store/actions/delete-affiliation.action';
import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { select, Store } from '@ngrx/store';
import { DestinationProductsState } from '@store/reducers/models/transfer/destination-products/destination-products.reducer';
import { Observable } from 'rxjs';

@Injectable()
export class RegisteredAccountsFacade extends TransferModel {
  constructor(
    protected dom: ManipulateDomService,
    protected store: Store<ApplicationState>,
  ) {
    super(dom, store);
  }

  public affiliation$: Observable<DestinationProductsState> = this.store.pipe(
    select((store) => store.models.transfer.destination_products),
  );

  public getRegisterDestinationProductState$: Observable<
    RegisterDestinationProductState
  > = this.store.pipe(
    select((store) => store.models.transfer.register_product_affiliation),
  );

  public deleteAffiliation(
    affiliationProduct: IProductAffiliationElement,
    product: Product,
  ): void {
    this.store.dispatch(DeleteAffiliationLoad(affiliationProduct, product));
  }

  public registerProductAffiliation(
    affiliationProduct: IProductAffiliationElement,
    originAccounts: OriginAccountRegistrationProduct[],
  ): void {
    this.store.dispatch(
      LoadRegisterAffiliationApiOperation(affiliationProduct, originAccounts),
    );
  }
}

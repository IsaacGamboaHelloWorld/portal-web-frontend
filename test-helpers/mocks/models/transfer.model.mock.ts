import { Injectable } from '@angular/core';
import { Product } from '@core/models/products/product';
import { initFormStepThree } from '@store/reducers/models/transfer/steps/form-step-three.reducer';
import { BehaviorSubject } from 'rxjs';
import { ProductsMock } from '../data/products.mock';
import { TransferTwoForm } from '../data/TransferTwoFrom.mock';

import { DestinationProductsState } from '@store/reducers/models/transfer/destination-products/destination-products.reducer';
import { AffiliationProductsMock } from '../../../test-helpers/mocks/data/affiliation-products.mock';
import { ApplicationModelMock } from './application.model.mock';

@Injectable()
export class TransferModelMock extends ApplicationModelMock {
  public step$: BehaviorSubject<number> = new BehaviorSubject(1);
  public previousStep$: BehaviorSubject<number> = new BehaviorSubject(1);
  public formOne$: BehaviorSubject<object> = new BehaviorSubject({
    account_origin: ProductsMock.CURRENT_ACCOUNT[0],
    account_destination: ProductsMock.CURRENT_ACCOUNT[0],
  });
  public formTwo$: BehaviorSubject<object> = new BehaviorSubject(
    TransferTwoForm,
  );
  public formThree$: BehaviorSubject<object> = new BehaviorSubject(
    initFormStepThree,
  );
  public transfer$: BehaviorSubject<object> = new BehaviorSubject({});
  public categories$: BehaviorSubject<object> = new BehaviorSubject({});
  public banks$: BehaviorSubject<object> = new BehaviorSubject({});
  public destination$: BehaviorSubject<object> = new BehaviorSubject({});
  public pending$: BehaviorSubject<object> = new BehaviorSubject({});
  public historic$: BehaviorSubject<object> = new BehaviorSubject({});
  public options$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public scheduled$: BehaviorSubject<object> = new BehaviorSubject({});
  public favorites$: BehaviorSubject<object> = new BehaviorSubject({});
  public product$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public affiliation$: BehaviorSubject<
    DestinationProductsState
  > = new BehaviorSubject({
    products: AffiliationProductsMock.productAffiliations,
    loading: false,
    loaded: true,
    error: false,
    errorMessage: null,
  });

  public fetchTransfer(): void {}
  public resetTransfer(): void {}
  public fetchPending(): void {}
  public resetDestination(): void {}
  public fetchDestinationProducts(): void {}
  public fetchCategories(): void {}
  public fetchBanks(): void {}
  public setStep(step: number): void {}
  public setPreviousStep(): void {}
  public setFormOne(): void {}
  public setFormTwo(): void {}
  public setFormThree(): void {}
  public resetFormOne(): void {}
  public resetFormTwo(): void {}
  public resetFormThree(): void {}
  public fetchFavorite(): void {}
  public fetchHistoric(): void {}
  public fetchScheduled(): void {}
  public fetchDeleteFavorite(): void {}
  public resetScheduledTransfer(): void {}
}

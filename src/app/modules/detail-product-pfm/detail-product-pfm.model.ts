import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { Product } from '@app/core/models/products/product';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { optionTabsEnum } from './constans/tabs-options.enum';
import {
  IDatePfm,
  IPfmCreditCardData,
  PfmExpenseData,
  PfmItemsRequest,
  PfmMovimentRequest,
  PfmProductData,
  PfmRecategorizeRequest,
} from './entities';
import {
  creditCardsPfmLoad,
  creditCardsPfmReset,
  detailProductPfmLoad,
  detailProductPfmReset,
  expensesPfmLoad,
  expensesPfmReset,
  IPfmExpensesState,
  IPfmItemsState,
  IPfmMovimentsState,
  IPfmProductState,
  IPfmRecategorizeState,
  itemsPfmLoad,
  itemsPfmReset,
  movimentsPfmLoad,
  movimentsPfmReset,
  pfmDateSelected,
  pfmDateSelectedReset,
  pfmIsFirstTime,
  pfmProductSelected,
  pfmProductSelectedReset,
  pfmTabSelected,
  pfmTabSelectedReset,
  recategorizePfmLoad,
  recategorizePfmReset,
} from './store';

@Injectable()
export class DetailProductPFMModel extends ApplicationModel {
  public detailProductPfm$: Observable<IPfmProductState> = this.store.pipe(
    select((store) => store.models.productPFM.detailProductPFM),
  );

  public pfmProductLoading$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.productPFM.detailProductPFM.loading),
  );

  public pfmProductData$: Observable<PfmProductData> = this.store.pipe(
    select((store) => store.models.productPFM.detailProductPFM.data),
  );

  public pfmExpensesLoading$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.productPFM.expensesPFM.loading),
  );

  public pfmExpensesData$: Observable<PfmExpenseData> = this.store.pipe(
    select((store) => store.models.productPFM.expensesPFM.data),
  );

  public pfmExpenses$: Observable<IPfmExpensesState> = this.store.pipe(
    select((store) => store.models.productPFM.expensesPFM),
  );

  public pfmCreditCardsData$: Observable<IPfmCreditCardData> = this.store.pipe(
    select((store) => store.models.productPFM.creditCardsPFM.data),
  );

  public pfmMoviments$: Observable<IPfmMovimentsState> = this.store.pipe(
    select((store) => store.models.productPFM.movimentsPFM),
  );

  public pfmItems$: Observable<IPfmItemsState> = this.store.pipe(
    select((store) => store.models.productPFM.itemsPFM),
  );

  public pfmRecategorizarion$: Observable<
    IPfmRecategorizeState
  > = this.store.pipe(
    select((store) => store.models.productPFM.recategorizationPFM),
  );

  public pfmDateSelected$: Observable<IDatePfm> = this.store.pipe(
    select((store) => store.models.productPFM.navigatePFM.date),
  );

  public pfmProductSelected$: Observable<Product> = this.store.pipe(
    select((store) => store.models.productPFM.navigatePFM.product),
  );

  public pfmTapSelected$: Observable<optionTabsEnum> = this.store.pipe(
    select((store) => store.models.productPFM.navigatePFM.tab),
  );

  public pfmIsFirstTime$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.productPFM.navigatePFM.isFirstTime),
  );

  public fetchProductPfm(month: string, year: string): void {
    this.store.dispatch(detailProductPfmLoad({ month, year }));
  }

  public pfmProductReset(): void {
    this.store.dispatch(detailProductPfmReset());
  }

  public fetchExpesesPfm(
    month: string,
    year: string,
    type2: string,
    product_type: string,
  ): void {
    this.store.dispatch(expensesPfmLoad({ month, year, type2, product_type }));
  }

  public pfmExpensesReset(): void {
    this.store.dispatch(expensesPfmReset());
  }

  public pfmMovimentsLoad(body: PfmMovimentRequest): void {
    this.store.dispatch(movimentsPfmLoad({ body }));
  }

  public pfmMovimentsReset(): void {
    this.store.dispatch(movimentsPfmReset());
  }

  public fetchCreditCardsPfm(month: string, year: string): void {
    this.store.dispatch(creditCardsPfmLoad({ month, year }));
  }

  public resetCreditCards(): void {
    this.store.dispatch(creditCardsPfmReset());
  }

  public fetchItemsPfm(body: PfmItemsRequest): void {
    this.store.dispatch(itemsPfmLoad({ body }));
  }

  public resetItems(): void {
    this.store.dispatch(itemsPfmReset());
  }

  public fetchRecategorizationPfm(body: PfmRecategorizeRequest): void {
    this.store.dispatch(recategorizePfmLoad({ body }));
  }

  public resetRecategorization(): void {
    this.store.dispatch(recategorizePfmReset());
  }

  public tabSelected(tab: optionTabsEnum): void {
    this.store.dispatch(pfmTabSelected({ tab }));
  }

  public tabSelectedReset(): void {
    this.store.dispatch(pfmTabSelectedReset());
  }

  public productSelected(product: Product): void {
    this.store.dispatch(pfmProductSelected({ product }));
  }

  public productSelectedReset(): void {
    this.store.dispatch(pfmProductSelectedReset());
  }

  public dateSelected(date: IDatePfm): void {
    this.store.dispatch(pfmDateSelected({ date }));
  }

  public dateSelectedReset(): void {
    this.store.dispatch(pfmDateSelectedReset());
  }

  public isFirstTime(value: boolean): void {
    this.store.dispatch(pfmIsFirstTime({ value }));
  }
}

import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { selectIsFreeDestinationFlow } from './../paymentsv2/financial-ob/store/selectors/financial-op.selector';

import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import {
  NotificationClosedAction,
  NotificationResetAction,
  NotificationShowAction,
} from '@app/store/actions/global/notification/notification.action';
import { OTHER_BANKS } from '@core/constants/banks';
import { IStocksAllParams } from '@modules/home/entities/stocks.interface';
import {
  stocksAllLoad,
  stocksAllReset,
  stocksPeriodLoad,
  stocksTypeLoad,
} from '@modules/home/store/actions/stocks.action';
import { IStocksAllState } from '@modules/home/store/reducers/stocks/stocks-all.reducer';
import { IStocksPeriodState } from '@modules/home/store/reducers/stocks/stocks-period.reducer';
import { IStocksTypeState } from '@modules/home/store/reducers/stocks/stocks-type.reducer';
import {
  nicknamesAllState,
  OrderOfPaymentSelect,
  selectStocksAll,
  selectStocksPeriod,
  selectStocksType,
} from '@modules/home/store/selectors/stocks.selector';
import {
  otherProductLoad,
  otherProductShow,
} from '@store/actions/models/products/other-products.action';
import { OtherProduct } from '@store/reducers/models/products/other-products.reducer';
import { ProductsState } from '@store/reducers/models/products/products.reducer';
import { IToPlusState } from '@store/reducers/models/to-plus/to-plus.reducer';
import { INicknamesAll } from '../detail-product/entities/nicknames';
import { NicknamesAllLoad } from '../detail-product/store/actions/nicknames.actions';
import { setFreeDestinationFlowAction } from '../paymentsv2/financial-ob/store/actions/navigate.actions';
import { IOrderPaymentAll } from './entities/order-of-payment';
import { OrderOfPaymentLoad } from './store/actions/order-of-payment.actions';

@Injectable()
export class HomeModel extends ApplicationModel {
  get hasOtherProducts$(): Observable<boolean> {
    return this.otherProducts$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      map(
        (products: OtherProduct[]) =>
          products
            .map((product) => joinProducts(product.products).length)
            .reduce((a, b) => a + b, 0) > 0,
      ),
    );
  }

  public infoProducts$: Observable<ProductsState> = this.store.pipe(
    select((store) => store.models.products),
  );

  public otherProducts$: Observable<OtherProduct[]> = this.store.pipe(
    select((store) => store.models.otherProducts.avalProducts),
  );

  public otherProductsShow$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.otherProducts.showProducts),
  );

  public toPlus$: Observable<IToPlusState> = this.store.pipe(
    select((store) => store.models.toPlus),
  );

  public stocksAll$: Observable<IStocksAllState> = this.store.pipe(
    select(selectStocksAll),
  );

  public stocksPeriod$: Observable<IStocksPeriodState> = this.store.pipe(
    select(selectStocksPeriod),
  );

  public stocksType$: Observable<IStocksTypeState> = this.store.pipe(
    select(selectStocksType),
  );

  public orderOfPayment$: Observable<IOrderPaymentAll> = this.store.pipe(
    select(OrderOfPaymentSelect),
  );

  public nicknames$: Observable<INicknamesAll> = this.store.pipe(
    select(nicknamesAllState),
  );

  public selectIsFreeDestinationFlow$: Observable<boolean> = this.store.pipe(
    select(selectIsFreeDestinationFlow),
  );

  public loadOtherBanks(): void {
    OTHER_BANKS.forEach((bank: string) => {
      this.store.dispatch(otherProductLoad(bank));
    });
  }

  public loadOtherBank(bank: string): void {
    this.store.dispatch(otherProductLoad(bank));
  }

  public loadOrderOfPayment(): void {
    this.store.dispatch(OrderOfPaymentLoad());
  }

  public showOtherProducts(check: boolean): void {
    this.store.dispatch(otherProductShow(check));
  }

  public fetchStocksPeriod(): void {
    this.store.dispatch(stocksPeriodLoad());
  }

  public fetchStocksType(): void {
    this.store.dispatch(stocksTypeLoad());
  }

  public fetchStocksAll(params: IStocksAllParams): void {
    this.store.dispatch(stocksAllLoad(params));
  }

  public resetStockAll(): void {
    this.store.dispatch(stocksAllReset());
  }

  public nicknamesAll(): void {
    this.store.dispatch(NicknamesAllLoad());
  }

  public setFlowFreeDestination(isFreeDestination: boolean): void {
    this.store.dispatch(setFreeDestinationFlowAction({ isFreeDestination }));
  }

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(message, autoClosed, typeNotification),
    );
  }

  public notificationClosed(): void {
    this.store.dispatch(new NotificationClosedAction());
  }
}

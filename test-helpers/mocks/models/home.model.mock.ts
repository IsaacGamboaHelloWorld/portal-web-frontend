import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { responseOptionsModuleMock } from './../data/options-modules.mock';

import { IOrderPaymentAll } from '@app/modules/home/entities/order-of-payment';
import { ProductsInterface } from '@core/interfaces/products.interface';
import { OtherProduct } from '@store/reducers/models/products/other-products.reducer';
import { ProductsState } from '@store/reducers/models/products/products.reducer';
import { IToPlusState } from '@store/reducers/models/to-plus/to-plus.reducer';
import { ProductsMock } from '../data/products.mock';

@Injectable()
export class HomeModelMock {
  get hasOtherProducts$(): Observable<boolean> {
    return new BehaviorSubject(true);
  }

  get selectIsFreeDestinationFlow$(): Observable<boolean> {
    return new BehaviorSubject(true);
  }

  public infoProducts$: BehaviorSubject<ProductsState> = new BehaviorSubject({
    types_account: null,
    financialResume: [],
    loading: false,
    loaded: false,
    error: false,
    errorMessage: '',
  });

  public otherProducts$: BehaviorSubject<OtherProduct[]> = new BehaviorSubject(
    [],
  );

  public otherProductsShow$: BehaviorSubject<boolean> = new BehaviorSubject(
    false,
  );

  public finance$: BehaviorSubject<object[]> = new BehaviorSubject([]);

  private innerProduct: any = ProductsMock;
  set setInnerProduct(data: any) {
    this.innerProduct = data;
    this.products$.next(data);
  }
  get getInnerProduct(): any {
    return this.innerProduct;
  }
  public products$: BehaviorSubject<ProductsInterface> = new BehaviorSubject(
    this.innerProduct,
  );

  public toPlus$: BehaviorSubject<IToPlusState> = new BehaviorSubject({
    data: null,
    errorMessage: '',
    loading: false,
    loaded: false,
    error: false,
  });

  public stocksAll$: BehaviorSubject<IToPlusState> = new BehaviorSubject({
    data: null,
    errorMessage: '',
    loading: false,
    loaded: false,
    error: false,
  });

  public stocksPeriod$: BehaviorSubject<IToPlusState> = new BehaviorSubject({
    data: null,
    errorMessage: '',
    loading: false,
    loaded: false,
    error: false,
  });

  public stocksType$: BehaviorSubject<IToPlusState> = new BehaviorSubject({
    data: null,
    errorMessage: '',
    loading: false,
    loaded: false,
    error: false,
  });

  public orderOfPayment$: BehaviorSubject<
    IOrderPaymentAll
  > = new BehaviorSubject({
    approvalId: '',
    errorMessage: '',
    specificErrorMessage: '',
    payrollLoans: [],
    success: false,
  });

  public userInfo$: BehaviorSubject<object> = new BehaviorSubject({
    clientName: '',
  });

  public offersProducts: Array<{
    img: string;
    name: string;
    title: string;
    desc: string;
    btn: string;
  }> = [
    {
      img: '/open-account-saving@3x.png',
      name: 'Cuentas de ahorro',
      title: 'Abre tu Cuenta de Ahorros',
      desc: 'Con tansferencias gratuitas entre cuentas del grupo Aval.',
      btn: 'Abrir una cuenta',
    },
  ];
  private innerOptionModule: any = responseOptionsModuleMock;
  set setInnerOptionModule(data: any) {
    this.innerOptionModule = data;
    this.optionModule$.next(data);
  }
  get getInnerOptionModule(): any {
    return this.innerOptionModule;
  }
  public optionModule$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerOptionModule,
  );

  public loadOtherBanks(): void {}
  public loadOtherBank(): void {}
  public showOtherProducts(): void {}
  public fetchProducts(): void {}
  public fetchToPlus(): void {}
  public fetchStocksPeriod(): void {}
  public fetchStocksType(): void {}
  public fetchStocksAll(): void {}
  public resetStockAll(): void {}
  public loadOrderOfPayment(): void {}
  public nicknamesAll(): void {}
  public setProduct(): void {}
  public fetchFreeDestinationsAll(): void {}
  public fetchDetailProduct(): void {}
  public fetchFreeDestiny(): void {}
  public selectPayment(): void {}
  public clearSelectPayment(): void {}
  public setFlowFreeDestination(isFreeDestination: boolean): void {}
  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {}

  public notificationClosed(): void {}
}

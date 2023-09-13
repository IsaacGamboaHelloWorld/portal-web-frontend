import { Injectable } from '@angular/core';
import { IDeletePocket } from '@app/modules/pockets/edit-pocket/store/reducers/delete-pocket.reducer';
import { IEditPocket } from '@app/modules/pockets/edit-pocket/store/reducers/edit-pocket.reducer';
import { IHomePocketsRecord } from '@app/modules/pockets/home-pockets/entities/home-pockets';
import { Product } from '@core/models/products/product';
import { BehaviorSubject } from 'rxjs';
import { IPocketActive } from '../../../src/app/modules/pockets/home-pockets/store/reducers/active-pocket.reducer';
import { IAnswerPocket } from '../../../src/app/modules/pockets/move-pockets/entities/move-pockets';
import { IMoveMoney } from '../../../src/app/modules/pockets/move-pockets/store/reducers/move-money.reducer';
import { IProductActive } from '../../../src/app/store/reducers/models/product-active/product-active.reducer';
@Injectable()
export class PocketsModelMock {
  public static activeProduct$: BehaviorSubject<
    IProductActive
  > = new BehaviorSubject({ id: '', type: '' });
  public static activePocket$: BehaviorSubject<
    IPocketActive
  > = new BehaviorSubject({
    pocketId: '',
    pocketType: '',
    pocketName: '',
    savingGoal: '',
    amountPeriodicSavings: '',
    amountSaved: '',
    pendingAmount: '',
    category: '',
    pocketPeriod: '',
    pocketPeriodDescription: '',
    parentId: '',
    parentType: '',
  });
  public static updateInfo$: BehaviorSubject<
    IHomePocketsRecord
  > = new BehaviorSubject({
    pocketId: '',
    pocketType: '',
    pocketName: '',
    savingGoal: '',
    amountPeriodicSavings: '',
    amountSaved: '',
    pendingAmount: '',
    category: '',
  });
  public static homePockets$: BehaviorSubject<any> = new BehaviorSubject({});
  public static pocketAnswer$: BehaviorSubject<
    IAnswerPocket
  > = new BehaviorSubject({
    success: false,
    errorMessage: '',
    loading: true,
    loaded: true,
    error: true,
  });
  public static editPocket$: BehaviorSubject<IEditPocket> = new BehaviorSubject(
    {
      data: { success: false },
      errorMessage: '',
      loading: false,
      loaded: false,
      error: false,
    },
  );
  public static deletePocket$: BehaviorSubject<
    IDeletePocket
  > = new BehaviorSubject({
    data: { success: false },
    errorMessage: '',
    loading: false,
    loaded: false,
    error: false,
    request: null,
    rqUid: '',
  });
  public static movedMoney$: BehaviorSubject<IMoveMoney> = new BehaviorSubject({
    data: { success: false },
    errorMessage: '',
    loading: false,
    loaded: false,
    error: false,
    request: null,
    rqUid: '',
  });
  public productsOrigin$: BehaviorSubject<object> = new BehaviorSubject({});
  public products$: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public pockets$: BehaviorSubject<object> = new BehaviorSubject({});
  public categories$: BehaviorSubject<object> = new BehaviorSubject({});
  public firstStep$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepOne$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepTwo$: BehaviorSubject<object> = new BehaviorSubject({});
  public stepThree$: BehaviorSubject<object> = new BehaviorSubject({});
  public pocketInfo$: BehaviorSubject<object> = new BehaviorSubject({});
  public hasPocket: BehaviorSubject<object> = new BehaviorSubject({});
  public loadPrefs$: BehaviorSubject<object> = new BehaviorSubject({});
  public static moveToPocket(_data: any): void {}
  public static moveToAccount(_data: any): void {}
  public static clearMovements(): void {}
  public clearDelete(): void {}
  public clearEdit(): void {}
  public hasPockets(): void {}
  public fetchHome(): void {}
  public resetHome(): void {}
  public resetPocket(): void {}
  public getCategories(): void {}
  public createPocket(): void {}
  public setFormOne(): void {}
  public setFormTwo(): void {}
  public setFormThree(): void {}
  public setProduct(): void {}
  public setActivePocket(): void {}
  public getPrefs(): void {}
}

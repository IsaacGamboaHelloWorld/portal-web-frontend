import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '@core/models/products/product';
import { IFormOneRecharge } from '@modules/recharge-phone/entities/formOne';
import { IProductActive } from '@store/reducers/models/product-active/product-active.reducer';
import { initFormStepOneRecharge } from '@store/reducers/models/recharge/form-step-one.reducer';
import {
  initOperators,
  IOperators,
} from '@store/reducers/models/recharge/operators.reducer';
import {
  initRecharge,
  IRecharge,
} from '@store/reducers/models/recharge/recharge.reducer';
import { ProductsMock } from '../../../test-helpers/mocks/data/products.mock';
import { ApplicationModelMock } from './application.model.mock';

@Injectable()
export class RechargeModelMock extends ApplicationModelMock {
  public operators$: BehaviorSubject<IOperators> = new BehaviorSubject(
    initOperators,
  );

  public step$: BehaviorSubject<number> = new BehaviorSubject(1);

  public formOne$: BehaviorSubject<IFormOneRecharge> = new BehaviorSubject(
    initFormStepOneRecharge,
  );

  public recharge$: BehaviorSubject<IRecharge> = new BehaviorSubject(
    initRecharge,
  );

  public product$: BehaviorSubject<Product[]> = new BehaviorSubject(
    ProductsMock.DEPOSIT_ACCOUNT.concat(ProductsMock.CURRENT_ACCOUNT),
  );

  public productActive$: BehaviorSubject<IProductActive> = new BehaviorSubject(
    null,
  );

  public loadOperators(): void {}
  public setStep(): void {}
  public setFormOne(): void {}
  public resetFormOne(): void {}
  public recharge(): void {}
  public resetRecharge(): void {}
  public resetAllRecharge(): void {}
}

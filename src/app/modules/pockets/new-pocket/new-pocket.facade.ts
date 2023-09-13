import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';
import { Product } from '../../../core/models/products/product';
import { IProductActive } from '../../../store/reducers/models/product-active/product-active.reducer';
import { IPocketActive } from '../home-pockets/store/reducers/active-pocket.reducer';
import { selectActivePocket } from '../home-pockets/store/selectors/home-pockets.selector';
import { MoveMoneyPocketsReset } from '../move-pockets/store/actions/move-money.action';
import {
  IAnswerPocket,
  ICategoriesPocket,
  INewPocketModuleState,
  IPocketFormOne,
  IPocketFormThree,
  IPocketFormTwo,
  ISendPocket,
} from './entities/new-pockets';
import { CategoriesocketLoad } from './store/actions/categories.action';
import {
  ResetStepOnePockets,
  SetStepOnePockets,
} from './store/actions/formOne.action';
import {
  ResetStepThreePockets,
  SetStepThreePockets,
} from './store/actions/formThree.action';
import {
  ResetStepTwoPockets,
  SetStepTwoPockets,
} from './store/actions/formTwo.action';
import {
  CreatePocketFail,
  CreatePocketLoad,
  CreatePocketReset,
} from './store/actions/new-pocket.action';
import {
  selectActiveProduct,
  selectCategories,
  selectFirstStep,
  selectPocketInfo,
  selectProducts,
  selectReturnedInfo,
  selectStepOne,
  selectStepThree,
  selectStepTwo,
} from './store/selectors/new-pocket.selector';

@Injectable()
export class NewPocketFacade {
  constructor(private store: Store<ApplicationState>) {}

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public pocket$: Observable<INewPocketModuleState> = this.store.pipe(
    select(selectPocketInfo),
  );

  public pocketAnswer$: Observable<IAnswerPocket> = this.store.pipe(
    select(selectReturnedInfo),
  );

  public firstStep$: Observable<IPocketFormOne> = this.store.pipe(
    select(selectFirstStep),
  );

  public categories$: Observable<ICategoriesPocket> = this.store.pipe(
    select(selectCategories),
  );

  public stepOne$: Observable<IPocketFormOne> = this.store.pipe(
    select(selectStepOne),
  );

  public stepTwo$: Observable<IPocketFormTwo> = this.store.pipe(
    select(selectStepTwo),
  );

  public stepThree$: Observable<IPocketFormThree> = this.store.pipe(
    select(selectStepThree),
  );

  public activeProduct$: Observable<IProductActive> = this.store.pipe(
    select(selectActiveProduct),
  );

  public activePocket$: Observable<IPocketActive> = this.store.pipe(
    select(selectActivePocket),
  );

  public resetPocket(): void {
    this.store.dispatch(ResetStepOnePockets());
    this.store.dispatch(ResetStepTwoPockets());
    this.store.dispatch(ResetStepThreePockets());
    this.store.dispatch(CreatePocketReset());
    this.store.dispatch(MoveMoneyPocketsReset());
  }

  public getCategories(): void {
    this.store.dispatch(CategoriesocketLoad());
  }

  public createPocket(_data: ISendPocket): void {
    this.store.dispatch(CreatePocketLoad(_data));
  }

  public setFormOne(_data: IPocketFormOne): void {
    this.store.dispatch(SetStepOnePockets(_data));
  }

  public setFormTwo(_data: IPocketFormTwo): void {
    this.store.dispatch(SetStepTwoPockets(_data));
  }

  public setFormThree(_data: IPocketFormThree): void {
    this.store.dispatch(SetStepThreePockets(_data));
  }

  public creationFail(_data: string): void {
    this.store.dispatch(CreatePocketFail(_data));
  }
}

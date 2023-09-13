import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationState } from '@store/state/application.state';
import { Product } from '../../../core/models/products/product';
import { SetSProductActive } from '../../../store/actions/models/product-active/product-active.action';
import { IProductActive } from '../../../store/reducers/models/product-active/product-active.reducer';
import {
  IHomePocketsRecord,
  IPocketToSearch,
  IPrefsRequest,
} from './entities/home-pockets';
import { SetPocketActive } from './store/actions/active-pocket.action';
import {
  HomePocketsLoad,
  HomePocketsReset,
} from './store/actions/get-pockets.action';
import {
  LoadPrefsLoad,
  LoadPrefsReset,
} from './store/actions/load-prefs.action';
import { SavePrefsLoad } from './store/actions/save-prefs.action';
import {
  UpdateDetailPocketLoad,
  UpdatePocketsLoad,
} from './store/actions/update-pockets.actions';
import { IPocketActive } from './store/reducers/active-pocket.reducer';
import { IHomePockets } from './store/reducers/get-pockets.reducer';
import { ILoadPrefs } from './store/reducers/load-prefs.reducer';
import {
  getUpdateState,
  selectActivePocket,
  selectActiveProduct,
  selectHomePockets,
  selectPrefsPockets,
  selectProducts,
} from './store/selectors/home-pockets.selector';

@Injectable()
export class HomePocketsFacade {
  constructor(private store: Store<ApplicationState>) {}

  public homePockets$: Observable<IHomePockets> = this.store.pipe(
    select(selectHomePockets),
  );

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public activeProduct$: Observable<IProductActive> = this.store.pipe(
    select(selectActiveProduct),
  );
  public activePocket$: Observable<IPocketActive> = this.store.pipe(
    select(selectActivePocket),
  );

  public loadPrefs$: Observable<ILoadPrefs> = this.store.pipe(
    select(selectPrefsPockets),
  );

  public loadInfoPockets$: Observable<IHomePocketsRecord> = this.store.pipe(
    select(getUpdateState),
  );

  public clearPrefs(): void {
    this.store.dispatch(LoadPrefsReset());
  }

  public fetchHome(): void {
    this.store.dispatch(HomePocketsLoad());
  }

  public resetHome(): void {
    this.store.dispatch(HomePocketsReset());
  }

  public setProduct(product: IProductActive): void {
    this.store.dispatch(SetSProductActive(product));
  }

  public setActivePocket(pocket: IPocketActive): void {
    this.store.dispatch(SetPocketActive(pocket));
  }

  public getPrefs(): void {
    this.store.dispatch(LoadPrefsLoad());
  }

  public setPrefs(data: IPrefsRequest): void {
    this.store.dispatch(SavePrefsLoad(data));
  }

  public setUpdatePockets(data: IPocketToSearch): void {
    this.store.dispatch(UpdatePocketsLoad(data));
  }
  public detailPocket(data: IPocketToSearch): void {
    this.store.dispatch(UpdateDetailPocketLoad(data));
  }
}

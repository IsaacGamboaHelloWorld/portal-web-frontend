import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationState } from '@store/state/application.state';
import { IPrefsRequest } from '../../entities/news';
import {
  LoadPrefsLoad,
  LoadPrefsReset,
  SavePrefsLoad,
} from '../actions/news.actions';
import { ILoadPrefs } from '../reducers/news.reducers';
import { selectPrefsNews } from '../selectors/news.selectors';

@Injectable()
export class NewsModel {
  constructor(private store: Store<ApplicationState>) {}

  public loadPrefs$: Observable<ILoadPrefs> = this.store.pipe(
    select(selectPrefsNews),
  );

  public clearPrefs(): void {
    this.store.dispatch(LoadPrefsReset());
  }

  public getPrefs(): void {
    this.store.dispatch(LoadPrefsLoad());
  }

  public setPrefs(data: IPrefsRequest): void {
    this.store.dispatch(SavePrefsLoad(data));
  }
}

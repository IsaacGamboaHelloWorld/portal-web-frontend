import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';

import { IAnswerActivateTc, ISendActivateTc } from '../../entities/activate-tc';
import {
  ActivateTcFail,
  ActivateTcLoad,
  ActivateTcReset,
} from '../actions/activate-tc.actions';
import { selectActivateTc } from '../selectors/activate-tc.selector';

@Injectable()
export class ActivateTcModel {
  constructor(private store: Store<ApplicationState>) {}

  public stateActivateTc$: Observable<IAnswerActivateTc> = this.store.pipe(
    select(selectActivateTc),
  );

  public creationFail(_data: IAnswerActivateTc): void {
    this.store.dispatch(ActivateTcFail(_data));
  }

  public creationSucces(_data: ISendActivateTc): void {
    this.store.dispatch(ActivateTcLoad(_data));
  }

  public reset(): void {
    this.store.dispatch(ActivateTcReset());
  }
}

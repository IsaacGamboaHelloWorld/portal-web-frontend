import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { select, Store } from '@ngrx/store';

import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';

import { IincomeTax, IincomeTaxTC, ITributary } from '../../entities/documents';
import { IincomeRac } from '../../entities/tributary';
import {
  TributaryFail,
  TributaryIncomeFail,
  TributaryIncomeLoad,
  TributaryIncomeRacFail,
  TributaryIncomeRacLoad,
  TributaryIncomeRacReset,
  TributaryIncomeReset,
  TributaryIncomeTaxTCFail,
  TributaryIncomeTaxTCLoad,
  TributaryIncomeTaxTCReset,
  TributaryLoad,
  TributaryReset,
} from '../actions/tributary.actions';
import {
  selectTributary,
  selectTributaryIncome,
  selectTributaryIncomeTaxTC,
  selectTributaryRac,
} from '../selectors/documents.selectors';

@Injectable()
export class TributaryModel extends ApplicationModel {
  constructor(protected store: Store<ApplicationState>) {
    super(store);
  }

  public stateTributary$: Observable<ITributary> = this.store.pipe(
    select(selectTributary),
  );
  public stateTributaryIncome$: Observable<IincomeTax> = this.store.pipe(
    select(selectTributaryIncome),
  );

  public stateTributaryIncomeTaxTC$: Observable<IincomeTaxTC> = this.store.pipe(
    select(selectTributaryIncomeTaxTC),
  );

  public stateTributaryIncomeRac$: Observable<IincomeRac> = this.store.pipe(
    select(selectTributaryRac),
  );

  public creationFail(_data: string): void {
    this.store.dispatch(TributaryFail(_data));
  }

  public creationSucces(_data: string): void {
    this.store.dispatch(TributaryLoad(_data));
  }

  public creationIncomeFail(_data: string): void {
    this.store.dispatch(TributaryIncomeFail(_data));
  }

  public creationIncomeSucces(_data: string): void {
    this.store.dispatch(TributaryIncomeLoad(_data));
  }

  public creationIncomeTaxTCFail(_data: string): void {
    this.store.dispatch(TributaryIncomeTaxTCFail(_data));
  }

  public creationIncomeTaxTCSucces(_data: string): void {
    this.store.dispatch(TributaryIncomeTaxTCLoad(_data));
  }

  public creationIncomeRacFail(_data: string): void {
    this.store.dispatch(TributaryIncomeRacFail(_data));
  }

  public creationIncomeRacSucces(_data: string): void {
    this.store.dispatch(TributaryIncomeRacLoad(_data));
  }

  public reset(): void {
    this.store.dispatch(TributaryReset());
    this.store.dispatch(TributaryIncomeReset());
    this.store.dispatch(TributaryIncomeTaxTCReset());
    this.store.dispatch(TributaryIncomeRacReset());
  }
}

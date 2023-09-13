import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { select, Store } from '@ngrx/store';
import {
  selectTributaryGmf,
  selectTributaryRetention,
} from './../selectors/documents.selectors';
import {
  IIncomeTaxTCState,
  ITributaryGmfState,
  ITributaryRetentionState,
} from './../state/documents.state';

import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';

import {
  TributaryGmfFail,
  TributaryGmfLoad,
  TributaryGmfReset,
  TributaryGmfSuccess,
} from '../actions/tributary-gmf.actions';
import {
  TributaryIncomeTaxTCFail,
  TributaryIncomeTaxTCLoad,
  TributaryIncomeTaxTCReset,
  TributaryIncomeTaxTCSuccess,
} from '../actions/tributary-income-tc.actions';

import { IincomeTaxTC } from '@app/modules/documents/entities/documents';
import { ITributaryGmf, ITributaryRetention } from '../../entities/tribubtary';
import {
  TributaryRetentionFail,
  TributaryRetentionLoad,
  TributaryRetentionReset,
  TributaryRetentionSuccess,
} from '../actions/tributary-retention.actions';
import { selectTributaryIncomeTaxTC } from '../selectors/documents.selectors';

@Injectable()
export class TributaryModel extends ApplicationModel {
  constructor(protected store: Store<ApplicationState>) {
    super(store);
  }

  public stateTributaryGmf$: Observable<ITributaryGmfState> = this.store.pipe(
    select(selectTributaryGmf),
  );

  public stateTributaryRetention$: Observable<
    ITributaryRetentionState
  > = this.store.pipe(select(selectTributaryRetention));

  public stateTributaryIncomeTaxTC$: Observable<
    IIncomeTaxTCState
  > = this.store.pipe(select(selectTributaryIncomeTaxTC));

  public tributaryRetentionLoad(year: string): void {
    this.store.dispatch(TributaryRetentionLoad({ year }));
  }

  public tributaryRetentionFail(errorMessage: string): void {
    this.store.dispatch(TributaryRetentionFail({ errorMessage }));
  }

  public tributaryRetentionSuccess(tributary: ITributaryRetention): void {
    this.store.dispatch(TributaryRetentionSuccess({ tributary }));
  }

  public tributaryRetentionReset(): void {
    this.store.dispatch(TributaryRetentionReset());
  }

  public tributaryGmfLoad(year: string): void {
    this.store.dispatch(TributaryGmfLoad({ year }));
  }

  public tributaryGmfFail(errorMessage: string): void {
    this.store.dispatch(TributaryGmfFail({ errorMessage }));
  }

  public tributaryGmfSuccess(tributary: ITributaryGmf): void {
    this.store.dispatch(TributaryGmfSuccess({ tributary }));
  }

  public tributaryGmfReset(): void {
    this.store.dispatch(TributaryGmfReset());
  }

  public tributaryTaxTCLoad(year: string): void {
    this.store.dispatch(TributaryIncomeTaxTCLoad({ year }));
  }

  public tributaryTaxTCFail(errorMessage: string): void {
    this.store.dispatch(TributaryIncomeTaxTCFail({ errorMessage }));
  }

  public tributaryTaxTCSuccess(income: IincomeTaxTC): void {
    this.store.dispatch(TributaryIncomeTaxTCSuccess({ income }));
  }

  public tributaryTaxTCReset(): void {
    this.store.dispatch(TributaryIncomeTaxTCReset());
  }

  public reset(): void {
    this.tributaryGmfReset();
    this.tributaryTaxTCReset();
    this.tributaryRetentionReset();
  }
}

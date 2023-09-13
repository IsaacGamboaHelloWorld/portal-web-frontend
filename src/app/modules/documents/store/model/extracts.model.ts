import { Injectable } from '@angular/core';
import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { IStatement } from '@app/core/interfaces/statement/statement';
import { Product } from '@app/core/models/products/product';
import { select, Store } from '@ngrx/store';

import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';

import {
  ExtractsFail,
  ExtractsLoad,
  ExtractsPeriodsFail,
  ExtractsPeriodsLoad,
  ExtractsPeriodsReset,
  ExtractsReset,
} from '../actions/extracts.actions';
import {
  selectExtracts,
  selectExtractsPeriods,
  selectProducts,
} from '../selectors/documents.selectors';

@Injectable()
export class ExtractsModel {
  constructor(private store: Store<ApplicationState>) {}

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public stateEstracts$: Observable<IPdfdata> = this.store.pipe(
    select(selectExtracts),
  );

  public statePeriodsEstracts$: Observable<IStatement> = this.store.pipe(
    select(selectExtractsPeriods),
  );

  public creationFail(_data?: string): void {
    this.store.dispatch(ExtractsFail(_data));
  }

  public creationSucces(
    account: string,
    type: string,
    data: IPeriodItem,
  ): void {
    this.store.dispatch(ExtractsLoad(account, type, data));
  }

  public creationPeriodsFail(_data: string): void {
    this.store.dispatch(ExtractsPeriodsFail(_data));
  }

  public creationPeriodsSucces(account: string, type: string): void {
    this.store.dispatch(ExtractsPeriodsLoad(account, type));
  }

  public reset(): void {
    this.store.dispatch(ExtractsPeriodsReset());
    this.store.dispatch(ExtractsReset());
  }
}

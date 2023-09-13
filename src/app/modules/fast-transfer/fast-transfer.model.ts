import { Injectable } from '@angular/core';
import { Product } from '@app/core/models/products/product';
import { LoadBanksAction } from '@app/store/actions/models/banks/banks.action';
import { IBanks } from '@app/store/reducers/models/banks/banks.reducer';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  fastTransferSelector,
  selectProducts,
  stepFastTransferSelector,
} from '../fast-transfer/store/selectors/fast-transfer.selectors';
import {
  FastTransfer,
  IStepFastTransfer,
} from './entities/fast-transfer.interface';
import {
  FastTransferActionLoad,
  FastTransferActionReset,
} from './store/actions/fast-transfer.actions';
import {
  ProductDestinationLoad,
  ProductDestinationReset,
} from './store/actions/product-destination.action';
import { SetStepFastTransfer } from './store/actions/step.actions';
import { DestinationProductsState } from './store/reducers/destination-products.reducer';
import { IFastTransfer } from './store/reducers/fast-transfer.reducer';

@Injectable()
export class FastTransferModel {
  constructor(protected store: Store<ApplicationState>) {}

  public stepFastTransfer$: Observable<IStepFastTransfer> = this.store.pipe(
    select(stepFastTransferSelector),
  );

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );
  public destination$: Observable<DestinationProductsState> = this.store.pipe(
    select((store) => store.models.transfer.destination_products),
  );
  public banks$: Observable<IBanks> = this.store.pipe(
    select((store) => store.models.banks),
  );
  public fastTransfer$: Observable<IFastTransfer> = this.store.pipe(
    select(fastTransferSelector),
  );
  public setStep(step: IStepFastTransfer): void {
    setTimeout(() => {
      this.store.dispatch(SetStepFastTransfer({ step }));
    }, 0);
  }
  public resetFastTransfer(): void {
    this.store.dispatch(FastTransferActionReset());
  }

  public resetDestination(): void {
    this.store.dispatch(ProductDestinationReset());
  }
  public fetchDestinationProducts(id: string, type: string): void {
    this.store.dispatch(ProductDestinationLoad(id, type));
  }
  public fetchBanks(): void {
    this.store.dispatch(new LoadBanksAction());
  }
  public FastTransferLoad(fastTransfer: FastTransfer): void {
    this.store.dispatch(
      FastTransferActionLoad({
        fastTransfer,
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { LoadBanksAction } from '@app/store/actions/models/banks/banks.action';
import { IBanks } from '@app/store/reducers/models/banks/banks.reducer';
import { ICategories } from '@app/store/reducers/models/categories/categories.reducer';
import { ApplicationState } from '@app/store/state/application.state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IFormOneTransferInterface } from './entities/formOneTransfer.interface';
import {
  IScheduledTransfersSearch,
  IScheduleTransferCreate,
  IScheduleTransferDelete,
} from './entities/scheduledTransfer.interface';
import { HistoricLoad } from './store/actions/historic-transfer.action';
import { PendingLoad } from './store/actions/pending-transfer.action';
import {
  ProductDestinationLoad,
  ProductDestinationReset,
} from './store/actions/product-destination.action';
import {
  ScheduledCreateFail,
  ScheduledCreateLoad,
  ScheduledCreateReset,
} from './store/actions/scheduled-create-transfers.action';
import {
  ScheduledDeleteFail,
  ScheduledDeleteLoad,
} from './store/actions/scheduled-delete-transfer.action';
import {
  ScheduledSearchLoad,
  ScheduledSearchReset,
} from './store/actions/scheduled-transfers.action';
import { IAccountTransferState } from './store/reducers/account-tranfer.reducer';
import { DestinationProductsState } from './store/reducers/destination-products.reducer';
import { IHistoric } from './store/reducers/historic.reducer';
import { IPendingTransferState } from './store/reducers/pending-tranfer.reducer';

import { Product } from '@app/core/models/products/product';
import {
  FormNewTransferSelector,
  newTransferSelector,
  selectProducts,
  stepNewTransferSelector,
} from '../transfer-to-account/store/selectors/new-transfer.selectors';

import {
  TransferLoadAction,
  TransferResetAction,
} from '@app/store/actions/models/transfer/transfer-account/transfer-account-action';
import { IFavorite } from './entities/favorites';
import {
  IStepNewTransfer,
  NewTransfer,
} from './entities/new-transfer.interface';
import { FavoriteDelete, FavoriteLoad } from './store/actions/favorite.actions';
import {
  FormNewTransferActionLoad,
  FormNewTransferActionReset,
} from './store/actions/form-new-transfer.actions';
import {
  FormResetStepOneAction,
  FormStepOneAction,
} from './store/actions/form-step-one.action';
import {
  FormResetStepThreeAction,
  FormStepThreeAction,
} from './store/actions/form-step-three.action';
import {
  FormResetStepTwoAction,
  FormStepTwoAction,
} from './store/actions/form-step-two.action';
import {
  NewTransferActionLoad,
  NewTransferActionReset,
} from './store/actions/new-transfer.actions';
import { SetStepNewTransfer } from './store/actions/step.actions';
import { IFavorites } from './store/reducers/favorites.reducer';
import { IFormNewTransfer } from './store/reducers/form-new-transfer.reducer';
import { FormStepThreeState } from './store/reducers/form-step-three.reducer';
import { FormStepTwoState } from './store/reducers/form-step-two.reducer';
import { INewTransfer } from './store/reducers/new-transfer.reducer';

@Injectable()
export class TransferModel extends ApplicationModel {
  constructor(
    protected dom: ManipulateDomService,
    protected store: Store<ApplicationState>,
  ) {
    super(store);
  }

  public step$: Observable<IStepNewTransfer> = this.store.pipe(
    select(stepNewTransferSelector),
  );

  public productsNewTrasfer$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public formNewTransfer$: Observable<IFormNewTransfer> = this.store.pipe(
    select(FormNewTransferSelector),
  );
  public formTransfer$: Observable<INewTransfer> = this.store.pipe(
    select(newTransferSelector),
  );

  public formOne$: Observable<IFormOneTransferInterface> = this.store.pipe(
    select((store) => store.models.transfer.form_one),
  );

  public formTwo$: Observable<FormStepTwoState> = this.store.pipe(
    select((store) => store.models.transfer.form_two),
  );

  public formThree$: Observable<FormStepThreeState> = this.store.pipe(
    select((store) => store.models.transfer.form_three),
  );

  public transfer$: Observable<IAccountTransferState> = this.store.pipe(
    select((store) => store.models.transfer.account_transfer),
  );
  public transferScheduled$: Observable<
    IScheduleTransferCreate
  > = this.store.pipe(
    select((store) => store.models.transfer.scheduledTransferC),
  );

  public transferScheduledDelete$: Observable<
    IScheduleTransferDelete
  > = this.store.pipe(
    select((store) => store.models.transfer.scheduledTransferD),
  );

  public destination$: Observable<DestinationProductsState> = this.store.pipe(
    select((store) => store.models.transfer.destination_products),
  );

  public categories$: Observable<ICategories> = this.store.pipe(
    select((store) => store.models.categories),
  );

  public banks$: Observable<IBanks> = this.store.pipe(
    select((store) => store.models.banks),
  );

  public pending$: Observable<IPendingTransferState> = this.store.pipe(
    select((store) => store.models.transfer.pendingTransfer),
  );

  public historic$: Observable<IHistoric> = this.store.pipe(
    select((store) => store.models.transfer.historicTransfer),
  );
  public scheduled$: Observable<IScheduledTransfersSearch> = this.store.pipe(
    select((store) => store.models.transfer.scheduledTransfer),
  );

  public favorites$: Observable<IFavorites> = this.store.pipe(
    select((store) => store.models.transfer.favorites),
  );

  public fetchTransfer(
    formOne: IFormOneTransferInterface,
    amount: number | string,
    voucher: string,
    description: string,
    dueDate: string,
    isNew: boolean,
    scheduledTransfer: boolean,
    favorite: boolean,
    transactionCost: string,
    nickNameFrom: string,
    nickNameTo: string,
  ): void {
    this.store.dispatch(
      new TransferLoadAction(
        formOne,
        amount,
        voucher,
        description,
        dueDate,
        isNew,
        scheduledTransfer,
        favorite,
        transactionCost,
        nickNameFrom,
        nickNameTo,
      ),
    );
  }
  public fetchScheduledCreate(
    formOne: IFormOneTransferInterface,
    amount: number | string,
    voucher: string,
    description: string,
    dueDate: string,
    isNew: boolean,
    scheduledTransfer: boolean,
    favorite: boolean,
    periodicity: string,
    numberDesiredPayments: number,
    nickNameFrom: string,
    nickNameTo: string,
  ): void {
    this.store.dispatch(
      ScheduledCreateLoad(
        formOne,
        amount,
        voucher,
        description,
        dueDate,
        isNew,
        scheduledTransfer,
        favorite,
        periodicity,
        numberDesiredPayments,
        nickNameFrom,
        nickNameTo,
      ),
    );
  }

  public NewTransferLoad(newTransfer: NewTransfer): void {
    this.store.dispatch(
      NewTransferActionLoad({
        newTransfer,
      }),
    );
  }
  public resetNewTransfer(): void {
    this.store.dispatch(NewTransferActionReset());
  }

  public resetTransfer(): void {
    this.store.dispatch(new TransferResetAction());
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

  public fetchPending(): void {
    this.store.dispatch(PendingLoad());
  }

  public fetchHistoric(): void {
    this.store.dispatch(HistoricLoad());
  }

  public fetchScheduled(): void {
    this.store.dispatch(ScheduledSearchLoad());
  }

  public resetScheduled(): void {
    this.store.dispatch(ScheduledSearchReset());
  }

  public fetchScheduledCFail(error: string): void {
    this.store.dispatch(ScheduledCreateFail(error));
  }
  public fetchScheduledDeleteFail(error: string): void {
    this.store.dispatch(ScheduledDeleteFail(error));
  }
  public fetchScheduledDelete(id: string): void {
    this.store.dispatch(ScheduledDeleteLoad(id));
  }

  public setStep(step: IStepNewTransfer): void {
    setTimeout(() => {
      this.store.dispatch(SetStepNewTransfer({ step }));
    }, 0);
  }

  public setFormNewTransfer(FormNewTransfer: NewTransfer): void {
    this.store.dispatch(FormNewTransferActionLoad({ FormNewTransfer }));
  }
  public resetFormNewTransfer(): void {
    this.store.dispatch(FormNewTransferActionReset());
  }
  public setFormOne(form: IFormOneTransferInterface): void {
    this.store.dispatch(new FormStepOneAction(form));
  }

  public setFormTwo(dataForm: FormStepTwoState): void {
    this.store.dispatch(new FormStepTwoAction(dataForm));
  }

  public setFormThree(dataForm: FormStepThreeState): void {
    this.store.dispatch(new FormStepThreeAction(dataForm));
  }

  public resetFormOne(): void {
    this.store.dispatch(new FormResetStepOneAction());
  }

  public resetFormTwo(): void {
    this.store.dispatch(new FormResetStepTwoAction());
  }

  public resetFormThree(): void {
    this.store.dispatch(new FormResetStepThreeAction());
  }
  public resetScheduledTransfer(): void {
    this.store.dispatch(ScheduledCreateReset());
  }

  public fetchFavorite(): void {
    this.store.dispatch(FavoriteLoad());
  }

  public fetchDeleteFavorite(favorite: IFavorite): void {
    this.store.dispatch(FavoriteDelete(favorite));
  }
  // tslint:disable-next-line:max-file-line-count
}

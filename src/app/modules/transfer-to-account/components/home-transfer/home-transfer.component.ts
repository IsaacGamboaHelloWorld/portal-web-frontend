import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { registeredAccountsRootRoute } from '@app/modules/registered-accounts/registered-accounts.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { INavigate, Navigate } from '@core/constants/navigate';
import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { IScheduledTransfersSearch } from '../../entities/scheduledTransfer.interface';
import { IFavorites } from '../../store/reducers/favorites.reducer';
import { IHistoric } from '../../store/reducers/historic.reducer';
import { IPendingTransferState } from '../../store/reducers/pending-tranfer.reducer';

@Component({
  selector: 'app-home-transfer',
  templateUrl: './home-transfer.component.html',
  styleUrls: ['./home-transfer.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeTransferComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private _modelTransfer: TransferModel,
    private _router: Router,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this._modelTransfer.fetchBanks();
    this._modelTransfer.fetchFavorite();
    this._modelTransfer.fetchHistoric();
    this._modelTransfer.fetchScheduled();
    this._resetTransfer();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.modalService.close();
    this._modelTransfer.resetScheduledTransfer();
    this._modelTransfer.resetScheduled();
  }

  get pending$(): Observable<IPendingTransferState> {
    return this._modelTransfer.pending$;
  }

  get hasPending$(): Observable<boolean> {
    return this.pending$.pipe(
      map((info) => !isNullOrUndefined(info.data) && info.data.length > 0),
    );
  }

  get historic$(): Observable<IHistoric> {
    return this._modelTransfer.historic$;
  }

  get scheduled$(): Observable<IScheduledTransfersSearch> {
    return this._modelTransfer.scheduled$;
  }

  get hasHistoric$(): Observable<boolean> {
    return this.historic$.pipe(
      map((info) => !isNullOrUndefined(info.data) && info.data.length > 0),
    );
  }

  get hasScheduled$(): Observable<boolean> {
    return this.scheduled$.pipe(
      map(
        (info) =>
          !isNullOrUndefined(info.transfers) && info.transfers.length > 0,
      ),
    );
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get favorites$(): Observable<IFavorites> {
    return this._modelTransfer.favorites$;
  }

  get hasFavorites$(): Observable<boolean> {
    return this.favorites$.pipe(
      map(
        (info: IFavorites) =>
          !isNullOrUndefined(info.data) && info.data.length > 0,
      ),
    );
  }

  public fetchHistoric(): void {
    this._modelTransfer.fetchHistoric();
  }

  public accountRegistration(): void {
    this._router.navigate([registeredAccountsRootRoute]);
  }

  private _resetTransfer(): void {
    this._modelTransfer.resetDestination();
    this._modelTransfer.resetFormOne();
    this._modelTransfer.resetFormTwo();
    this._modelTransfer.resetFormThree();
    this._modelTransfer.resetTransfer();
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this._modelTransfer.optionModule$;
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NEW } from '@app/core/constants/global';
import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { NewTransfer } from '@app/modules/transfer-to-account/entities/new-transfer.interface';
import { IFormNewTransfer } from '@app/modules/transfer-to-account/store/reducers/form-new-transfer.reducer';
import { INewTransfer } from '@app/modules/transfer-to-account/store/reducers/new-transfer.reducer';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  INavigateFastTransfer,
  NavigateFastTransfer,
} from '../../constants/routes';
import { FastTransferModel } from '../../fast-transfer.model';
import { IFastTransfer } from '../../store/reducers/fast-transfer.reducer';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
})
export class StepTwoComponent implements OnInit, OnDestroy {
  public date: object = new Date();
  public loading: boolean = false;
  public subscribe: Subscription = new Subscription();
  public nicknameFrom: string = '';
  public nicknameTo: string = '';
  private _constFormNewTransfer: NewTransfer;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _modelTransfer: TransferModel,
    private _FastTransferModel: FastTransferModel,
    private nickName: NicknamesService,
    private _router: Router,
  ) {}
  // confirmacion

  ngOnInit(): void {
    this._setStep(2);
    this._formNewTransfer();
    this._getNickname();
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _setStep(step: number): void {
    this._modelTransfer.setStep({ step });
  }

  get navigate(): INavigateFastTransfer {
    return NavigateFastTransfer;
  }

  private _getNickname(): void {
    combineLatest([this.nickName.nicknamesAll()]).subscribe(([nick]: any) => {
      if (nick) {
        const nickname = nick.nicknames.filter(
          (e: any) =>
            e['accountId'] ===
            this._constFormNewTransfer.account_origin.accountInformation
              .accountIdentifier,
        );
        nickname['name'] = nickname['name']
          ? nickname['name']
          : this._constFormNewTransfer.account_origin.accountInformation
              .productName;
        this.nicknameFrom = nickname['name'];
        this.nicknameTo = this._constFormNewTransfer.account_destination.customerName;
      }
    });
  }
  get isNew$(): Observable<boolean> {
    return this.formNewTransfer$.pipe(
      filter(
        (data) =>
          !isNullOrUndefined(data.data) &&
          !isNullOrUndefined(data.data['account_destination']) &&
          !isNullOrUndefined(
            data.data.account_destination['destinationAccountId'],
          ),
      ),
      map((data: IFormNewTransfer) => {
        return data.data.account_destination.destinationAccountId === NEW;
      }),
    );
  }

  get formNewTransfer$(): Observable<IFormNewTransfer> {
    return this._modelTransfer.formNewTransfer$;
  }
  private _formNewTransfer(): void {
    this.formNewTransfer$
      .subscribe((data: IFormNewTransfer) => {
        if (!!data.data) {
          this._constFormNewTransfer = data.data;
        }
      })
      .unsubscribe();
  }
  public submitData(): void {
    this.loading = true;
    this.formNewTransfer$
      .subscribe((data: IFormNewTransfer) => {
        if (!!data.data) {
          if (data.data.origin_transfer === 'NEW_TRANSFER') {
            // Se llama NewTransferLoad cuando viene desde transferencia normal
            this._modelTransfer.NewTransferLoad(data.data);
            this._validateDataNewTransfer();
          } else if (data.data.origin_transfer === 'FAST_TRANSFER') {
            // Se llama NewTransferLoad cuando viene desde transferencia rapida
            this._FastTransferModel.FastTransferLoad(data.data);
            this._validateDataFastTransfer();
          } else {
            this._setStep(1);
            this._router.navigate([this.navigate.transfer]);
          }
        }
      })
      .unsubscribe();
  }
  get formTransfer$(): Observable<INewTransfer> {
    return this._modelTransfer.formTransfer$;
  }
  get fastTransfer$(): Observable<IFastTransfer> {
    return this._FastTransferModel.fastTransfer$;
  }

  private _validateDataNewTransfer(): void {
    const formTransfer = this.formTransfer$.subscribe((data: INewTransfer) => {
      if (!!data && data.success) {
        this._router.navigate([this.navigate.step3]);
        formTransfer.unsubscribe();
      } else if (data.error && data.loaded) {
        this._router.navigate([this.navigate.transfer]);
        formTransfer.unsubscribe();
      }
    });
  }
  private _validateDataFastTransfer(): void {
    const fastTransfer = this.fastTransfer$.subscribe((data: INewTransfer) => {
      if (!!data && data.success) {
        this._router.navigate([this.navigate.step3]);
        fastTransfer.unsubscribe();
      } else if (data.error && data.loaded) {
        this._router.navigate([this.navigate.transfer]);
        fastTransfer.unsubscribe();
      }
    });
  }
}

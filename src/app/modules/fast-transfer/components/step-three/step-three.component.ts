import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IFormNewTransfer } from '@app/modules/transfer-to-account/store/reducers/form-new-transfer.reducer';
import { INewTransfer } from '@app/modules/transfer-to-account/store/reducers/new-transfer.reducer';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  INavigateFastTransfer,
  NavigateFastTransfer,
} from '../../constants/routes';
import { FastTransferModel } from '../../fast-transfer.model';
import { IFastTransfer } from '../../store/reducers/fast-transfer.reducer';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
})
export class StepThreeComponent implements OnInit, OnDestroy {
  public disabled: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _modelTransfer: TransferModel,
    private _FastTransferModel: FastTransferModel,
  ) {}
  // exitosa

  ngOnInit(): void {
    this._setStep(3);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();

    this._modelTransfer.resetDestination();
    this._modelTransfer.resetFormOne();
    this._modelTransfer.resetFormTwo();
    this._modelTransfer.resetFormThree();
    this._modelTransfer.resetTransfer();
    this._modelTransfer.resetScheduledTransfer();
  }

  private _setStep(step: number): void {
    this._modelTransfer.setStep({ step });
  }

  public goStep(step: number): void {
    this._setStep(step);
    switch (step) {
      case 1:
        this._router.navigate([this.navigate.transfer]);
        break;
      default:
        this._router.navigate([this.navigate.home]);
        break;
    }
  }

  get navigate(): INavigateFastTransfer {
    return NavigateFastTransfer;
  }

  get newTransfer$(): Observable<INewTransfer> {
    return this._modelTransfer.formTransfer$;
  }
  get fastTransfer$(): Observable<IFastTransfer> {
    return this._FastTransferModel.fastTransfer$;
  }
  get formNewTransfer$(): Observable<IFormNewTransfer> {
    return this._modelTransfer.formNewTransfer$;
  }
  get newTransferData$(): Observable<any> {
    return this.newTransfer$.pipe(
      map((transfer: INewTransfer) => {
        // !? con 2FA la data llega por el response, cuando está inactivo se debe tomar del request
        return !!(transfer && transfer.data && transfer.data.response)
          ? transfer.data.response
          : transfer.data.request;
      }),
    );
  }
  get fastTransferData$(): Observable<any> {
    return this.fastTransfer$.pipe(
      map((transfer: IFastTransfer) => {
        // !? con 2FA la data llega por el response, cuando está inactivo se debe tomar del request
        return !!(transfer && transfer.data && transfer.data.response)
          ? transfer.data.response
          : transfer.data.request;
      }),
    );
  }

  public download(): void {
    this.disabled = true;
    createJpeg('voucher-transfer')
      .then((dataUrl) => {
        downloadImage('voucher-transfer.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
    this._cd.detectChanges();
  }
}

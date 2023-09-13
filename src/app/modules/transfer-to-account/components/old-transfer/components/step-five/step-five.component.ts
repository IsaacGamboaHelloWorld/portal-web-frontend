import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccountTransferState } from '@app/modules/transfer-to-account/store/reducers/account-tranfer.reducer';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  INavigateOldTransfer,
  NavigateOldTransfer,
} from '../../constants/routes';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.sass'],
})
export class StepFiveComponent implements OnInit, OnDestroy {
  public disabled: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _modelTransfer: TransferModel,
  ) {}
  // exitosa

  ngOnInit(): void {
    this._setStep(5);
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
        this._router.navigate([this.navigate.step1]);
        break;
      default:
        this._router.navigate([this.navigate.home]);
        break;
    }
  }

  get navigate(): INavigateOldTransfer {
    return NavigateOldTransfer;
  }

  get transfer$(): Observable<IAccountTransferState> {
    return this._modelTransfer.transfer$;
  }

  get transferData$(): Observable<any> {
    return this.transfer$.pipe(
      map((t: IAccountTransferState) => {
        // !? con 2FA la data llega por el response, cuando está inactivo se debe tomar del request
        return !!(t && t.data && t.data.response)
          ? t.data.response
          : t.data.request;
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

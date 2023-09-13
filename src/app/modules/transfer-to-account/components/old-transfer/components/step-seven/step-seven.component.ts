import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAccountTransferState } from '@app/modules/transfer-to-account/store/reducers/account-tranfer.reducer';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { Observable } from 'rxjs';
import {
  INavigateOldTransfer,
  NavigateOldTransfer,
} from '../../constants/routes';

@Component({
  selector: 'app-step-seven',
  templateUrl: './step-seven.component.html',
  styleUrls: ['./step-seven.component.sass'],
})
export class StepSevenComponent implements OnInit, OnDestroy {
  constructor(private _modelTransfer: TransferModel, private _router: Router) {}
  // pendiente
  // TODO: No se sabe donde se llama este paso
  ngOnInit(): void {
    this._setStep(7);
  }

  ngOnDestroy(): void {
    this._modelTransfer.resetDestination();
    this._modelTransfer.resetFormOne();
    this._modelTransfer.resetFormTwo();
    this._modelTransfer.resetFormThree();
    this._modelTransfer.resetTransfer();
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
}

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IFormOneTransferInterface } from '@app/modules/transfer-to-account/entities/formOneTransfer.interface';
import { IScheduleTransferCreate } from '@app/modules/transfer-to-account/entities/scheduledTransfer.interface';
import { FormStepThreeState } from '@app/modules/transfer-to-account/store/reducers/form-step-three.reducer';
import { FormStepTwoState } from '@app/modules/transfer-to-account/store/reducers/form-step-two.reducer';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  INavigateOldTransfer,
  NavigateOldTransfer,
} from '../../constants/routes';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.sass'],
})
export class StepSixComponent implements OnInit, OnDestroy {
  public info: object = {};
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _router: Router, private _modelTransfer: TransferModel) {}
  // programada
  ngOnInit(): void {
    this._setStep(6);
    this.infoTransferSchedule();
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
    this._modelTransfer.resetScheduled();
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

  get formOne$(): Observable<IFormOneTransferInterface> {
    return this._modelTransfer.formOne$;
  }

  get formTwo$(): Observable<FormStepTwoState> {
    return this._modelTransfer.formTwo$;
  }

  get formThree$(): Observable<FormStepThreeState> {
    return this._modelTransfer.formThree$;
  }
  get scheduled$(): Observable<IScheduleTransferCreate> {
    return this._modelTransfer.transferScheduled$;
  }

  public infoTransferSchedule(): void {
    combineLatest([this.formOne$, this.formTwo$, this.scheduled$])
      .subscribe(([formOne, formTwo, scheduled]: any) => {
        // !? con 2FA se debe el response, cuando está inactivo se debe tomar del request
        this.info['date'] =
          scheduled[
            !!scheduled && !!scheduled.response ? 'response' : 'request'
          ].scheduleInfo.transactionExecutionDate;
        this.info['originAccountType'] = formOne.account_origin.typeAccount;
        this.info['originAccount'] = formOne.account_origin.id;
        this.info['destinationAccountType'] =
          formOne.account_destination.destinationAccountType;
        this.info['destinationAccount'] =
          formOne.account_destination.destinationAccountId;
        this.info['amount'] = formTwo.amount;
        this.info['transactionCost'] = formTwo.transactionCost;
        this.info['bankNameOrigin'] =
          formOne.account_origin.accountInformation.bank;
        this.info['bankNameDestination'] = formOne.account_destination.bankName;
        this.info['customerName'] = formOne.account_destination.customerName;
      })
      .unsubscribe();
  }
}

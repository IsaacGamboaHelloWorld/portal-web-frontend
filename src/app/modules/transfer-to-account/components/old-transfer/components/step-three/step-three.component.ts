import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NEW } from '@app/core/constants/global';
import {
  DATE,
  TODAY,
} from '@app/modules/transfer-to-account/constants/calendar';
import { IFormOneTransferInterface } from '@app/modules/transfer-to-account/entities/formOneTransfer.interface';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  INavigateOldTransfer,
  NavigateOldTransfer,
} from '../../constants/routes';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
})
export class StepThreeComponent implements OnInit, OnDestroy {
  public formStepThree: FormGroup;
  public typeActive: string = '';
  public today: object = new Date();
  public optionOne: string = TODAY;
  public optionTwo: string = DATE;
  public minDate: Date = new Date();

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _modelTransfer: TransferModel, private _router: Router) {}
  // cuando
  ngOnInit(): void {
    this._setStep(3);
    this._initForm();
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _setStep(step: number): void {
    this._modelTransfer.setStep({ step });
  }

  get navigate(): INavigateOldTransfer {
    return NavigateOldTransfer;
  }

  public submitForm(): void {
    this._modelTransfer.setFormThree(this.formStepThree.value);
    this._setStep(4);
    this._router.navigate([this.navigate.step4]);
  }

  get isNew$(): Observable<boolean> {
    return this._modelTransfer.formOne$.pipe(
      filter((data) => this._validateParams(data)),
      map((data: IFormOneTransferInterface) => {
        return data.account_destination.destinationAccountId === NEW;
      }),
    );
  }

  get isAval(): Observable<boolean> {
    const avalBanks = ['0001', '0002', '0023', '0052'];
    return this._modelTransfer.formOne$.pipe(
      map((data: IFormOneTransferInterface) => {
        let bank = data.account_destination.bankId;
        if (data.account_destination.destinationAccountId === NEW) {
          bank = data.bank.value;
        }
        return avalBanks.indexOf(bank) >= 0;
      }),
    );
  }

  private _initForm(): void {
    combineLatest([
      this._modelTransfer.formOne$,
      this._modelTransfer.formThree$,
    ])
      .subscribe(([formOne, formThree]: any) => {
        this.formStepThree = new FormGroup({
          scheduledTransfer: new FormControl(
            validateData(formThree.scheduledTransfer, ''),
            this._validateParams(formOne) &&
            formOne.account_destination.destinationAccountId !== NEW
              ? [Validators.required]
              : [],
          ),
          dueDate: new FormControl(validateData(formThree.dueDate, '')),
          favorite: new FormControl(validateData(formThree.favorite, false)),
          periodicity: new FormControl(''),
          numberRepeat: new FormControl(null),
        });
        this.typeActive = formThree.scheduledTransfer;
      })
      .unsubscribe();
  }

  private _validateParams(data: IFormOneTransferInterface): boolean {
    return (
      !isNullOrUndefined(data) &&
      !isNullOrUndefined(data['account_destination']) &&
      !isNullOrUndefined(data.account_destination['destinationAccountId'])
    );
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this._modelTransfer.optionModule$;
  }
}

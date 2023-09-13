import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NEW } from '@app/core/constants/global';
import { FormStepTwoState } from '@app/modules/transfer-to-account/store/reducers/form-step-two.reducer';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { environment } from '@environment';
import { Observable, of, Subject } from 'rxjs';
import {
  INavigateOldTransfer,
  NavigateOldTransfer,
} from '../../constants/routes';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
})
export class StepTwoComponent implements OnInit, OnDestroy {
  public formStepTwo: FormGroup;
  private _cost: string;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _modelTransfer: TransferModel,
    private http: HttpClient,
    private _router: Router,
  ) {}
  // por-cuanto

  ngOnInit(): void {
    this._setStep(2);
    this._initForm();
    this.calculateCost();
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
    const value: any = this.formStepTwo.value;
    value['transactionCost'] = this._cost;
    this._modelTransfer.setFormTwo(value);
    this._setStep(3);
    this._router.navigate([this.navigate.step3]);
  }

  private _initForm(): void {
    this._modelTransfer.formTwo$
      .subscribe((data: FormStepTwoState) => {
        this.formStepTwo = new FormGroup({
          amount: new FormControl(data.amount, [
            Validators.required,
            Validators.min(10000),
            Validators.max(5000000),
            Validators.pattern(/^[0-9]+$/),
          ]),
          description: new FormControl(data.description, [
            Validators.required,
            Validators.maxLength(80),
            Validators.pattern(/^[ A-Za-z0-9_@./#&+-]*$/),
          ]),
          voucher: new FormControl(data.voucher, [
            Validators.maxLength(24),
            Validators.pattern(/^[ A-Za-z0-9_@./#&+-]*$/),
          ]),
        });
      })
      .unsubscribe();
  }
  private calculateCost(): void {
    this._modelTransfer.formOne$
      .subscribe((data: any) => {
        if (
          data &&
          data['account_origin'] &&
          data['account_origin']['accountInformation']
        ) {
          const request = {
            accountFromInformation: {
              accountIdentifier:
                data.account_origin.accountInformation.accountIdentifier,
              productType: data.account_origin.accountInformation.productType,
            },
            accountToInformation: {
              accountIdentifier: data.account_destination.destinationAccountId,
              bank: data.account_destination.bankId,
              productType: data.account_destination.destinationAccountType,
            },
          };
          if (data.account_destination.destinationAccountId === NEW) {
            request.accountToInformation = {
              accountIdentifier: data.accountIdentifier,
              bank: data.bank.value,
              productType: data.productType,
            };
          }
          this.http
            .post(
              environment.api.base + environment.api.services.transfers.cost,
              request,
            )
            .subscribe((response: any) => {
              this._cost = response.cost;
            });
        }
      })
      .unsubscribe();
  }

  get cost(): Observable<string> {
    return of(this._cost);
  }
}

import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { PaymentInterface } from '@app/core/interfaces/paymentObligation.interface';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { UserSecureDataMdmState } from '@app/store/reducers/global/user/user-get-secure-data-mdm.reducer';
import { INavigate, Navigate } from '@core/constants/navigate';
import { PaymentModel } from '@modules/payments/payment.model';
import { FormStepOneState } from '@store/reducers/models/payment/steps/form-step-one.reducer';
import { FormStepTwoState } from '@store/reducers/models/payment/steps/form-step-two.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  NORMAL_PAYMENT,
  SERVICE_PUBLIC,
} from '../../../../core/constants/global';
import { PaymentBillResponseInterface } from '../../../../core/interfaces/paymentBills.interface';
import { AccountPaymentState } from '../../../../store/reducers/models/payment/account-payment/account-payment.reducer';

@Component({
  selector: 'app-step-success',
  templateUrl: './step-success.component.html',
  styleUrls: ['./step-success.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepSuccessComponent implements OnDestroy {
  public date: object = new Date();
  public disabled: boolean = false;

  constructor(private model: PaymentModel, private cd: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    this.model.setStep(0);
    this.model.resetFormOne();
    this.model.resetFormTwo();
    this.model.resetPayment();
    this.model.fetchPaymentType(null);
    this.model.resetLoansDestination();
    this.model.resetBillsDestination();
  }

  get textLoaded$(): Observable<PaymentBillResponseInterface> {
    return this.model.productsPaymentBill$;
  }

  get formOne$(): Observable<FormStepOneState> {
    return this.model.formOne$;
  }

  get formTwo$(): Observable<FormStepTwoState> {
    return this.model.formTwo$;
  }

  get hasPaymentData$(): Observable<boolean> {
    return this.model.payment$.pipe(map((data) => !isNullOrUndefined(data)));
  }

  get hasPaymentBillData$(): Observable<boolean> {
    return this.model.productsPaymentBill$.pipe(
      map((data) => !isNullOrUndefined(data)),
    );
  }

  get payment$(): Observable<PaymentInterface> {
    return this.model.payment$.pipe(
      map((data: AccountPaymentState) => {
        return data.data;
      }),
    );
  }

  get paymentBill$(): Observable<PaymentBillResponseInterface> {
    return this.model.productsPaymentBill$;
  }

  get name$(): Observable<string> {
    return this.model.userInfo$.pipe(
      map((userState) =>
        this.hasName(userState)
          ? userState.data.PartyAssociation[0].PersonInfo.PersonName[0]
              .FirstName +
            ' ' +
            userState.data.PartyAssociation[0].PersonInfo.PersonName[0].LastName
          : '',
      ),
    );
  }

  get navigate(): INavigate {
    return Navigate;
  }

  public setStep(step: number): void {
    this.model.setStep(step);
  }

  get isBillPaymentName$(): Observable<string> {
    return this.model.formOne$.pipe(
      map(
        (data) =>
          !isNullOrUndefined(data.account_destination) &&
          data.account_destination.billerName,
      ),
    );
  }

  get isBillPaymentNickName$(): Observable<string> {
    return this.model.formOne$.pipe(
      map(
        (data) =>
          !isNullOrUndefined(data.account_destination) &&
          data.account_destination.billerNickName,
      ),
    );
  }

  get isBillPaymentAmount$(): Observable<string | number> {
    return this.model.formOne$.pipe(
      map(
        (data) =>
          !isNullOrUndefined(data.account_destination) &&
          data.account_destination.amount,
      ),
    );
  }

  get isAnotherOwner$(): Observable<boolean> {
    return this.model.formOne$.pipe(
      map(
        (data) => !isNullOrUndefined(data.ownership) && data.ownership !== '',
      ),
    );
  }

  get paymentType(): string {
    return this.model.paymentType;
  }

  get servicepublic(): string {
    return SERVICE_PUBLIC;
  }

  get paymentnormal(): string {
    return NORMAL_PAYMENT;
  }

  public download(): void {
    this.disabled = true;
    createJpeg('voucher-payment')
      .then((dataUrl) => {
        downloadImage('voucher-payment.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
    this.cd.detectChanges();
  }

  hasName(userState: UserSecureDataMdmState): boolean {
    return (
      !!userState &&
      !!userState.data &&
      userState.data.success &&
      !!userState.data.PartyAssociation &&
      !!userState.data.PartyAssociation[0] &&
      !!userState.data.PartyAssociation[0].PersonInfo &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0] &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0].FirstName &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0].LastName
    );
  }
}

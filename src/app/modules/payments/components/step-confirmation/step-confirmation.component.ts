import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { UserSecureDataMdmState } from '@app/store/reducers/global/user/user-get-secure-data-mdm.reducer';
import { AccountPaymentState } from '@app/store/reducers/models/payment/account-payment/account-payment.reducer';
import { Events } from '@core/constants/events';
import { NORMAL_PAYMENT, SERVICE_PUBLIC } from '@core/constants/global';
import { Navigate, Titles } from '@core/constants/navigate';
import { PageView } from '@core/decorators/page-view.decorator';
import { PaymentBillResponseInterface } from '@core/interfaces/paymentBills.interface';
import { PaymentModel } from '@modules/payments/payment.model';
import { FormStepOneState } from '@store/reducers/models/payment/steps/form-step-one.reducer';
import { FormStepTwoState } from '@store/reducers/models/payment/steps/form-step-two.reducer';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { PaymentBillState } from '../../../../store/reducers/models/payment/payment-bills-public/payment-bills-public.reducer';
import { BillerLoanDetailState } from '../../store/reducers/biller-loan-detail.reducers';

@PageView(Navigate.confirmation, Titles.confirmation, Events.page_view)
@Component({
  selector: 'app-step-confirmation',
  templateUrl: './step-confirmation.component.html',
  styleUrls: ['./step-confirmation.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepConfirmationComponent implements OnInit, OnDestroy {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public date: object = new Date();

  constructor(private model: PaymentModel) {}

  ngOnInit(): void {
    if (this.paymentType !== SERVICE_PUBLIC) {
      this.model.successPayment$
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: AccountPaymentState) => {
          if (data.loaded) {
            this.setStep(5);
          }
        });
    } else {
      this.model.productsPaymentBill$
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: PaymentBillResponseInterface) => {
          if (!isNullOrUndefined(data) && data.success) {
            this.setStep(5);
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get isLoading$(): Observable<boolean> {
    return this.model.isLoadingPayment$;
  }

  get isError$(): Observable<boolean> {
    return this.model.errorPayment$.pipe(
      map((data) => !isNullOrUndefined(data)),
    );
  }

  get textError$(): Observable<boolean> {
    return this.model.errorPayment$;
  }

  get formOne$(): Observable<FormStepOneState> {
    return this.model.formOne$;
  }

  get formTwo$(): Observable<FormStepTwoState> {
    return this.model.formTwo$;
  }
  get billerLoanDetail$(): Observable<BillerLoanDetailState> {
    return this.model.billerLoanDetail$;
  }

  public submitData(): void {
    if (this.paymentType !== SERVICE_PUBLIC) {
      combineLatest(this.formOne$, this.formTwo$)
        .subscribe(([formOne, formTwo]: any) => {
          this.model.fetchPayment(
            formOne.ownershipIdType,
            formOne.ownershipIdNumber,
            formOne.account_origin.accountInformation.accountIdentifier,
            formOne.account_origin.accountInformation.productType,
            formOne.isNew
              ? formOne.accountIdentifier
              : formOne.account_destination.accountId,
            formOne.isNew
              ? formOne.loanType
              : formOne.account_destination.accountType,
            formOne.isNew ? formOne.name : formOne.account_destination.loanName,
            formOne.isNew,
            formOne.isNew
              ? formOne.bank.value
              : formOne.account_destination.bank,
            formTwo.amount,
            formTwo.comments,
          );
        })
        .unsubscribe();
    } else {
      combineLatest(this.formOne$, this.formTwo$, this.billerLoanDetail$)
        .subscribe(([formOne, formTwo, billerLoanDetail]: any) => {
          const isBillerLoanDetail: boolean = !!billerLoanDetail.data;
          this.model.fetchPaymentBill(
            formOne.account_origin.accountInformation.accountIdentifier,
            formOne.account_origin.accountInformation.productType,
            formOne.account_destination.biller
              ? formTwo.amount
              : formTwo.amounttext,
            formOne.account_destination.biller,
            formOne.account_destination.billerId,
            formOne.account_destination.billerName,
            formOne.account_destination.billerNickName,
            formOne.account_destination.contract,
            formOne.account_destination.invoice,
            formOne.account_destination.dueDate,
            formOne.account_destination.scheduledDate,
            formOne.account_destination.expirationDate,
            formOne.account_destination.isScheduledPayment,
            formOne.account_destination.isDonePayment,
            isBillerLoanDetail
              ? billerLoanDetail.data.billerPayment.primaryBillerAmount
              : null,
            isBillerLoanDetail
              ? billerLoanDetail.data.billerPayment.primaryBillerCurrencyCode
              : null,
            formOne.account_destination.biller
              ? null
              : formOne.account_destination.contract,
            isBillerLoanDetail
              ? billerLoanDetail.data.billerPayment.secondaryBillerAmount
              : null,
            isBillerLoanDetail
              ? billerLoanDetail.data.billerPayment.secondaryBillerCurrencyCode
              : null,
          );
        })
        .unsubscribe();
    }
  }

  get payment(): Observable<AccountPaymentState> {
    return this.model.payment$;
  }

  get paymentBill(): Observable<PaymentBillState> {
    return this.model.paymentBill$;
  }

  public setStep(step: number): void {
    this.model.setStep(step);
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

  get isAnotherOwner$(): Observable<boolean> {
    return this.model.formOne$.pipe(
      map(
        (data) => !isNullOrUndefined(data.ownership) && data.ownership !== '',
      ),
    );
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

  get paymentType(): string {
    return this.model.paymentType;
  }

  get servicepublic(): string {
    return SERVICE_PUBLIC;
  }

  get paymentnormal(): string {
    return NORMAL_PAYMENT;
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

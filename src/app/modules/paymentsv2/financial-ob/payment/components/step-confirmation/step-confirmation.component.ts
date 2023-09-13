import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { AccountPaymentState } from '@store/reducers/models/payment/account-payment/account-payment.reducer';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaymentModel } from '../../../../../payments/payment.model';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import {
  IPaymentFormOne,
  IPaymentFormThree,
  IPaymentFormTwo,
} from '../../entities/new-payment';
import { PaymentObligationsFacade } from '../../payment.facade';
import { INavigatePayment, NavigatePayment } from '../navigate/routes';

@Component({
  selector: 'app-obligations-step-confirmation',
  templateUrl: './step-confirmation.component.html',
  styleUrls: ['./step-confirmation.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepConfirmationComponent implements OnInit {
  private static readonly CURRENT_STEP: number = 4;
  private static readonly NEXT_STEP: number = 5;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public costTransfer: number = 0.0;
  private paymentObs$: Subscription;

  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _model: PaymentModel,
    private _facade: PaymentObligationsFacade,
    private _router: Router,
    private _parent_facade: FinancialOpFacade,
  ) {}

  ngOnInit(): void {
    this._setStep(StepConfirmationComponent.CURRENT_STEP);
  }

  public submitData(): void {
    combineLatest([this.stepOne$, this.stepTwo$, this.stepThree$])
      .subscribe(([formOne, formTwo, formThree]) => {
        this._model.fetchPayment(
          formOne.loan_destination.activePayment.newLoan,
          null,
          Number(formOne.account_origin.accountInformation.accountIdentifier),
          formOne.account_origin.accountInformation.productType,
          formOne.loan_destination.activePayment.accountId,
          formOne.loan_destination.activePayment.accountType,
          formOne.loan_destination.activePayment.loanName,
          'false',
          formOne.loan_destination.activePayment.bank,
          formTwo.amounttext,
          formTwo.comments,
        );
      })
      .unsubscribe();

    if (!!this.paymentObs$) {
      this.paymentObs$.unsubscribe();
    }

    this.paymentObs$ = this.payment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((returnedData: AccountPaymentState) =>
        this._checkPayment(returnedData),
      );
  }

  private _checkPayment(payment: AccountPaymentState): void {
    if (!!payment.loaded) {
      this.nexStep();
    }
  }

  get stepOne$(): Observable<IPaymentFormOne> {
    return this._facade.getStepOne$;
  }

  get stepTwo$(): Observable<IPaymentFormTwo> {
    return this._facade.getStepTwo$;
  }

  get stepThree$(): Observable<IPaymentFormThree> {
    return this._facade.getStepThree$;
  }

  get payment$(): Observable<AccountPaymentState> {
    return this._model.payment$;
  }

  public nexStep(): void {
    this._router.navigate([this.navigateInternal.step_end]);
    this.setStep.emit(StepConfirmationComponent.NEXT_STEP);
  }

  public _setStep(step: number): void {
    this._parent_facade.setStep({ step });
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
  }
}

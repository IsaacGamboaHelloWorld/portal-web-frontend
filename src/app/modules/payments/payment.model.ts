import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { IBankLoanElement } from '@app/core/interfaces/bankLoan.interface';
import { LoanDestinationInterface } from '@app/core/interfaces/loan-destination.interface';
import { LoanObject } from '@app/core/interfaces/loan.interface';
import { Product } from '@app/core/models/products/product';
import {
  BankLoansResetAction,
  LoadBankLoansAction,
} from '@app/store/actions/models/banks/payments-bank-loans.action';
import { LoadLoansAvailableBanksAction } from '@app/store/actions/models/banks/payments-banks.action';
import { PaymentTypeSetAction } from '@app/store/actions/models/payment/payment-type/payment-type.action';
import { RecurringPaymentLoadAction } from '@app/store/actions/models/payment/recurring/recurring-payment.action';
import { AccountPaymentState } from '@app/store/reducers/models/payment/account-payment/account-payment.reducer';
import { SavedAgreementState } from '@app/store/reducers/models/payment/search-companies/save-agreement.reducer';
import { IBankElement } from '@core/interfaces/banks.interface';
import {
  PaymentBillResponseInterface,
  PaymentBillsInterface,
} from '@core/interfaces/paymentBills.interface';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { select, Store } from '@ngrx/store';
import {
  PaymentLoadAction,
  PaymentResetAction,
} from '@store/actions/models/payment/payment-account/payment-account-action';
import {
  PaymentBillsPublicLoadAction,
  PaymentBillsPublicResetAction,
} from '@store/actions/models/payment/payment-bills-public/payments-bills-public.action';
import {
  PaymentBillsLoadAction,
  PaymentBillsResetAction,
} from '@store/actions/models/payment/payment-bills/payments-bills.action';
import { CompaniesBillLoadAction } from '@store/actions/models/payment/payment-bills/search-company.action';
import {
  LoansDestinationLoadAction,
  LoansDestinationResetAction,
} from '@store/actions/models/payment/payment-destination/payment-destination.action';
import {
  FormResetStepOneAction,
  FormStepOneAction,
} from '@store/actions/models/payment/steps/form-step-one.action';
import {
  FormResetStepTwoAction,
  FormStepTwoAction,
} from '@store/actions/models/payment/steps/form-step-two.action';
import { SetPreviousStepAction } from '@store/actions/models/payment/steps/previous_step.action';
import { SetStepAction } from '@store/actions/models/payment/steps/step.action';
import { IBanks } from '@store/reducers/models/banks/loans_banks.reducer';
import { FormStepOneState } from '@store/reducers/models/payment/steps/form-step-one.reducer';
import { FormStepTwoState } from '@store/reducers/models/payment/steps/form-step-two.reducer';
import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';
import {
  CompanyInterface,
  CompanyListInterface,
  IActiveCompanySave,
  IRecurringPayment,
  IRecurringPaymentResponse,
} from '../../core/interfaces/paymentBills.interface';
import { BillsRegisteredLoadAction } from '../../store/actions/models/payment/payment-bills/all-registered-bills.action';
import {
  CompanyActiveResetAction,
  CompanyActiveSuccessAction,
} from '../../store/actions/models/payment/payment-bills/company-select.action';
import {
  SaveCompanyLoadAction,
  SaveCompanyResetAction,
} from '../../store/actions/models/payment/payment-bills/save-company.action';
import { PaymentBillState } from '../../store/reducers/models/payment/payment-bills-public/payment-bills-public.reducer';
import { BillsRegisteredState } from '../../store/reducers/models/payment/payment-bills/all-registered-bills.reducer';
import {
  BillerLoanDetailFail,
  BillerLoanDetailLoad,
  BillerLoanDetailReset,
} from './store/actions/biller-loan-detail.actions';
import { BillerLoanDetailState } from './store/reducers/biller-loan-detail.reducers';
import { setNewBillerLoanDetailState } from './store/selectors/biller-loan-detail.selector';

@Injectable()
export class PaymentModel extends ApplicationModel {
  constructor(
    protected dom: ManipulateDomService,
    protected store: Store<ApplicationState>,
  ) {
    super(store);
  }

  public step$: Observable<number> = this.store.pipe(
    select((store) => store.models.payment.p_step),
  );
  public previousStep$: Observable<number> = this.store.pipe(
    select((store) => store.models.payment.p_previous_step),
  );
  public formOne$: Observable<FormStepOneState> = this.store.pipe(
    select((store) => store.models.payment.p_form_one),
  );

  public formTwo$: Observable<FormStepTwoState> = this.store.pipe(
    select((store) => store.models.payment.p_form_two),
  );

  public isLoadingPayment$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.loans_user.loading),
  );

  public errorPayment$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.loans_user.error),
  );

  public loadedPayment$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.account_payment.loaded),
  );

  public successPayment$: Observable<AccountPaymentState> = this.store.pipe(
    select((store) => store.models.payment.account_payment),
  );

  public isLoadingDestination$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.loans_user.loading),
  );

  public isLoadedDestination$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.loans_user.loaded),
  );

  public isErrorDestination$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.loans_user.error),
  );

  public productsDestination$: Observable<
    LoanDestinationInterface[]
  > = this.store.pipe(select((store) => store.models.payment.loans_user.loans));

  public isLoadingDestinationBills$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.bills_user.loading),
  );

  public isLoadedDestinationBills$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.bills_user.loaded),
  );

  public isErrorDestinationBills$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.bills_user.error),
  );

  public productsDestinationBills$: Observable<
    PaymentBillsInterface[]
  > = this.store.pipe(select((store) => store.models.payment.bills_user.bills));

  public isLoadingPaymentBill$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.payment_bill.loading),
  );

  public isLoadedPaymentBill$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.payment_bill.loaded),
  );

  public isErrorPaymentBill$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.payment_bill.error),
  );

  public productsPaymentBill$: Observable<
    PaymentBillResponseInterface
  > = this.store.pipe(
    select((store) => store.models.payment.payment_bill.bill),
  );

  public payment$: Observable<AccountPaymentState> = this.store.pipe(
    select((store) => store.models.payment.account_payment),
  );

  public paymentBill$: Observable<PaymentBillState> = this.store.pipe(
    select((store) => store.models.payment.payment_bill),
  );

  public bank_loans$: Observable<IBankLoanElement[]> = this.store.pipe(
    select((store) => store.models.payment.bank_loans.data),
  );
  public loans_banks$: Observable<IBanks> = this.store.pipe(
    select((store) => store.models.loans_banks),
  );
  public paymentT$: Observable<string> = this.store.pipe(
    select((store) => store.models.payment.paymentType.data),
  );
  public companyList$: Observable<CompanyListInterface> = this.store.pipe(
    select((store) => store.models.payment.companies.data),
  );
  public companies$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.companies.loaded),
  );
  public companyActive$: Observable<CompanyInterface> = this.store.pipe(
    select((store) => store.models.payment.companyActive.data),
  );
  public companyActiveLoading$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.companyActive.loading),
  );
  public companyActiveLoaded$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.companyActive.loaded),
  );
  public serviceAdded$: Observable<SavedAgreementState> = this.store.pipe(
    select((store) => store.models.payment.serviceSaved),
  );
  public serviceAddedLoading$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.serviceSaved.loading),
  );
  public serviceAddedLoaded$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.serviceSaved.loaded),
  );
  public serviceAll$: Observable<BillsRegisteredState> = this.store.pipe(
    select((store) => store.models.payment.allBills),
  );
  public serviceAllLoading$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.allBills.loading),
  );
  public serviceAllLoaded$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.allBills.loaded),
  );
  public serviceAllError$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.allBills.error),
  );
  public recurring$: Observable<IRecurringPaymentResponse> = this.store.pipe(
    select((store) => store.models.payment.recurringSaved.data),
  );
  public recurringLoaded$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.recurringSaved.loaded),
  );
  public recurringError$: Observable<boolean> = this.store.pipe(
    select((store) => store.models.payment.recurringSaved.error),
  );
  public billerLoanDetail$: Observable<BillerLoanDetailState> = this.store.pipe(
    select(setNewBillerLoanDetailState),
  );

  public fetchPayment(
    ownershipIdType: string,
    ownershipIdNumber: string,
    originAccountId: number,
    originAccountType: string,
    destinationAccountId: string,
    destinationAccountType: string,
    destinationLoanName: string,
    destinationNewLoan: string,
    bank: string,
    amount: number | string,
    notes: string,
  ): void {
    this.store.dispatch(
      new PaymentLoadAction(
        ownershipIdType,
        ownershipIdNumber,
        originAccountId,
        originAccountType,
        destinationAccountId,
        destinationAccountType,
        destinationLoanName,
        destinationNewLoan,
        bank,
        amount,
        notes,
      ),
    );
  }

  public fetchPaymentBill(
    originAccountId: string,
    originAccountType: string,
    amount: string,
    biller: boolean,
    billerId: string,
    billerName: string,
    billerNickName: string,
    contract: string,
    invoice: string,
    dueDate: string,
    scheduledDate: string,
    expirationDate: string,
    isScheduledPayment: boolean,
    isDonePayment: boolean,
    primaryBillerAmount: string,
    primaryBillerCurrencyCode: string,
    reference: string,
    secondaryBillerAmount: string,
    secondaryBillerCurrencyCode: string,
  ): void {
    this.store.dispatch(
      new PaymentBillsPublicLoadAction(
        originAccountId,
        originAccountType,
        amount,
        biller,
        billerId,
        billerName,
        billerNickName,
        contract,
        invoice,
        dueDate,
        scheduledDate,
        expirationDate,
        isScheduledPayment,
        isDonePayment,
        primaryBillerAmount,
        primaryBillerCurrencyCode,
        reference,
        secondaryBillerAmount,
        secondaryBillerCurrencyCode,
      ),
    );
  }

  public fetchPaymentType(paymentType: string): void {
    this.store.dispatch(new PaymentTypeSetAction(paymentType));
  }

  public resetPayment(): void {
    this.store.dispatch(new PaymentBillsPublicResetAction());
    this.store.dispatch(new PaymentResetAction());
  }

  public resetLoansDestination(): void {
    this.store.dispatch(new LoansDestinationResetAction());
  }

  public fetchLoansDestination(): void {
    this.store.dispatch(new LoansDestinationLoadAction());
  }

  public fetchBillsDestination(): void {
    this.store.dispatch(PaymentBillsLoadAction());
  }

  public resetBillsDestination(): void {
    this.store.dispatch(PaymentBillsResetAction());
  }

  public fetchBanks(): void {
    this.store.dispatch(new LoadLoansAvailableBanksAction());
  }

  public resetBankLoans(): void {
    this.store.dispatch(new BankLoansResetAction());
  }

  public fetchBankLoans(bank: string): void {
    this.store.dispatch(new LoadBankLoansAction(bank));
  }

  public searchAllRegistered(): void {
    this.store.dispatch(BillsRegisteredLoadAction());
  }
  public setStep(step: number): void {
    setTimeout(() => {
      this.store.dispatch(new SetStepAction(step));
      this.dom.scrollTop();
    }, 0);
  }
  public setPreviousStep(step: number): void {
    this.store.dispatch(new SetPreviousStepAction(step));
  }
  public setFormOne(
    ownership: string,
    ownershipIdType: string,
    ownershipIdNumber: string,
    origin: Product,
    destination: LoanObject,
    bank: IBankElement,
    productType: string,
    loanType: string,
    accountIdentifier: string,
    name: string,
    isNew: boolean,
  ): void {
    this.store.dispatch(
      new FormStepOneAction(
        ownership,
        ownershipIdType,
        ownershipIdNumber,
        origin,
        destination,
        bank,
        productType,
        loanType,
        accountIdentifier,
        name,
        isNew,
      ),
    );
  }
  public setFormTwo(dataForm: any): void {
    this.store.dispatch(new FormStepTwoAction(dataForm));
  }
  public setFormThree(dataForm: any): void {
    this.store.dispatch(new FormStepTwoAction(dataForm));
  }
  public createRecurring(data: IRecurringPayment): void {
    this.store.dispatch(RecurringPaymentLoadAction(data));
  }
  public resetFormOne(): void {
    this.store.dispatch(new FormResetStepOneAction());
  }
  public resetFormTwo(): void {
    this.store.dispatch(new FormResetStepTwoAction());
  }
  public resetFormThree(): void {
    this.store.dispatch(new FormResetStepTwoAction());
  }
  get paymentType(): string {
    let type = '';
    this.paymentT$.subscribe((data) => {
      type = data;
    });
    return type;
  }
  public searchData(data: string): void {
    this.store.dispatch(CompaniesBillLoadAction(data));
  }
  public fetchCompanyActive(company: CompanyInterface): void {
    this.store.dispatch(CompanyActiveSuccessAction(company));
  }
  public clearCompanyActive(): void {
    this.store.dispatch(CompanyActiveResetAction());
  }
  public fetchNewService(_data: IActiveCompanySave): void {
    this.store.dispatch(SaveCompanyLoadAction(_data));
  }
  public clearServiceSaved(): void {
    this.store.dispatch(SaveCompanyResetAction());
  }
  public fetchBillerLoanDetail(billerId: string, contract: string): void {
    this.store.dispatch(BillerLoanDetailLoad({ billerId, contract }));
  }
  public billerLoanDetailFail(data: string): void {
    this.store.dispatch(BillerLoanDetailFail(data));
  }
  public resetBillerLoanDetail(): void {
    this.store.dispatch(BillerLoanDetailReset());
  }
  // tslint:disable-next-line:max-file-line-count
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBankLoanElement } from '@app/core/interfaces/bankLoan.interface';
import { LoanDestinationInterface } from '@app/core/interfaces/loan-destination.interface';
import {
  setAccountIdentifier,
  setInitialValueCustomInfo,
  setValidators,
} from '@app/shared/helpers/formValidators.helper';
import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { DOCUMENT_TYPES } from '@core/constants/document_types';
import { Events } from '@core/constants/events';
import {
  loansTypeConst,
  NEW_PAYMENT,
  NO_OWNER,
  otherOptionsConst,
  OWNER,
  SERVICE_PUBLIC,
} from '@core/constants/global';
import { Navigate, Titles } from '@core/constants/navigate';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { PageView } from '@core/decorators/page-view.decorator';
import { PaymentBillsInterface } from '@core/interfaces/paymentBills.interface';
import { ProductsInterface } from '@core/interfaces/products.interface';
import { Product } from '@core/models/products/product';
import { IBanks } from '@store/reducers/models/banks/loans_banks.reducer';
import { FormStepOneState } from '@store/reducers/models/payment/steps/form-step-one.reducer';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { PaymentModel } from '../../payment.model';

@PageView(Navigate.to_who, Titles.to_who, Events.page_view)
@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepOneComponent implements OnInit {
  public formStepOne: FormGroup;
  public showNewAccount: boolean = false;
  public showFormOwner: boolean = false;
  public otherOptions: Array<{
    accountId: string;
    accountType: string;
  }> = otherOptionsConst;
  public loansType: Array<{
    loanType: string;
    loanName: string;
  }> = loansTypeConst;
  public loanActive: string = '';
  public isOwner: boolean = false;
  public documentTypes: Array<{ name: string; type: string }> = DOCUMENT_TYPES;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private model: PaymentModel) {}
  ngOnInit(): void {
    this.fetchBanks();
    this._initForm();
    this._setDefaultValue();
    this.formStepOne
      .get('account_destination')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (
          !isNullOrUndefined(data.accountId) &&
          data.accountId === NEW_PAYMENT
        ) {
          setValidators(
            this.formStepOne,
            ['productType', 'loanType', 'bank', 'name', 'ownership'],
            [Validators.required],
          );
        } else {
          setValidators(
            this.formStepOne,
            [
              'productType',
              'loanType',
              'bank',
              'name',
              'ownership',
              'ownershipIdType',
              'ownershipIdNumber',
              'accountIdentifier',
            ],
            null,
          );
        }
        this.showNewAccount = data.accountId === NEW_PAYMENT;
      });
    this.formStepOne
      .get('loanType')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.validateAccountIdentifier();
      });
    this.formStepOne
      .get('productType')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data !== '') {
          this.showFormOwner = true;
        }
        this.isOwner = data === OWNER;
        if (!this.isOwner) {
          setValidators(
            this.formStepOne,
            ['ownership', 'ownershipIdType', 'ownershipIdNumber', 'loanType'],
            [Validators.required],
          );
        } else {
          setValidators(
            this.formStepOne,
            ['ownership', 'ownershipIdType', 'ownershipIdNumber'],
            null,
          );
          setValidators(
            this.formStepOne,
            ['loanType', 'bank', 'name', 'accountIdentifier'],
            [Validators.required],
          );
        }
      });
    if (
      this.formStepOne.get('account_destination').value.accountId ===
      NEW_PAYMENT
    ) {
      this.showNewAccount = this.showFormOwner = true;
      this.isOwner = this.formStepOne.get('productType').value === OWNER;
    }
    this.isLodedDestination$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this._setDefaultValue();
      });
  }
  validateAccountIdentifier(): void {
    if (this.formStepOne.get('loanType').value === 'CREDIT_CARD') {
      setAccountIdentifier(this.formStepOne, ['accountIdentifier'], true);
    } else {
      setAccountIdentifier(this.formStepOne, ['accountIdentifier'], false);
    }
  }
  public compareFnDestination(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.accountId === c2.accountId : c1 === c2;
  }
  public compareFnOrigin(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  public compareFnBanks(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.value === c2.value : c1 === c2;
  }
  public compareFnLoanType(c1: any, c2: any): boolean {
    return c1 && c2 ? c2.loanType === c1.loanType : c2 === c1;
  }
  public populateOrigin(): void {
    this.model.resetLoansDestination();
    if (this.paymentType !== SERVICE_PUBLIC) {
      this.fetchDestination();
    } else {
      this.fetchDestinationBills();
    }
  }
  public fetchDestination(): void {
    this.model.fetchLoansDestination();
  }
  public fetchDestinationBills(): void {
    this.model.fetchBillsDestination();
  }
  public fetchBanks(): void {
    this.model.fetchBanks();
  }
  public changeBank(): void {
    this.model.resetBankLoans();
    this.formStepOne.patchValue({ loanType: '' });
    this.fetchBankLoans();
  }
  public fetchBankLoans(): void {
    this.model.fetchBankLoans(this.formStepOne.value.bank.value);
  }
  public submitForm(): void {
    this.model.setFormOne(
      this.formStepOne.value.ownership,
      this.formStepOne.value.ownershipIdType,
      this.formStepOne.value.ownershipIdNumber,
      this.formStepOne.value.account_origin,
      this.formStepOne.value.account_destination,
      this.formStepOne.value.bank,
      this.formStepOne.value.productType,
      this.formStepOne.value.loanType,
      this.formStepOne.value.accountIdentifier,
      this.formStepOne.value.name,
      this.showNewAccount,
    );
    this.model.setStep(2);
    this.model.resetBillerLoanDetail();

    if (this.formStepOne.value.account_destination.biller) {
      const contract: string =
        this.formStepOne.value.account_destination.billerId === '00000043'
          ? this.formStepOne.value.account_destination.contract
          : this.formStepOne.value.account_destination.invoice;

      this.model.fetchBillerLoanDetail(
        this.formStepOne.value.account_destination.billerId,
        contract,
      );
    }
  }
  private _initForm(): void {
    this.model.formOne$
      .subscribe((data: FormStepOneState) => {
        this.loanActive = data.loanType;
        this.formStepOne = new FormGroup({
          ownership: new FormControl(validateData(data.ownership, '')),
          ownershipIdType: new FormControl(
            validateData(data.ownershipIdType, ''),
          ),
          ownershipIdNumber: new FormControl(
            validateData(data.ownershipIdNumber, ''),
          ),
          account_origin: new FormControl(
            validateData(data.account_origin, ''),
            [Validators.required],
          ),
          account_destination: new FormControl(
            validateData(data.account_destination, ''),
            [Validators.required],
          ),
          bank: new FormControl(validateData(data.bank, '')),
          productType: new FormControl(validateData(data.productType, '')),
          loanType: new FormControl(validateData(data.loanType, '')),
          accountIdentifier: new FormControl(
            validateData(data.accountIdentifier, ''),
          ),
          name: new FormControl(validateData(data.name, 'N/A')),
        });
        this.showNewAccount =
          !isNullOrUndefined(data.account_destination) &&
          data.account_destination.accountId === NEW_PAYMENT;
        this.isOwner =
          !isNullOrUndefined(data.productType) && data.productType === NO_OWNER;
      })
      .unsubscribe();
    this.populateOrigin();
  }
  get isLoadingDestination$(): Observable<boolean> {
    return this.model.isLoadingDestination$;
  }
  get isLodedDestination$(): Observable<boolean> {
    return this.model.isLoadedDestination$;
  }
  get isErrorDestination$(): Observable<boolean> {
    return this.model.isErrorDestination$;
  }
  get isLoadingDestinationBills$(): Observable<boolean> {
    return this.model.isLoadingDestinationBills$;
  }
  get isLodedDestinationBills$(): Observable<boolean> {
    return this.model.isLoadedDestinationBills$;
  }
  get isErrorDestinationBills$(): Observable<boolean> {
    return this.model.isErrorDestinationBills$;
  }
  get loans_banks$(): Observable<IBanks> {
    return this.model.loans_banks$;
  }
  get productsOrigin$(): Observable<Product[]> {
    return this.model.products$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      map((products: ProductsInterface) => {
        return joinProducts(products).filter((product: Product) => {
          return (
            product.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT ||
            product.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT
          );
        });
      }),
    );
  }
  get destinationProducts$(): Observable<LoanDestinationInterface[]> {
    return combineLatest([
      this.model.productsDestination$,
      this.model.product$,
    ]).pipe(
      take(1),
      map((data) => {
        let products: Product[] = data[1];
        products = products.filter(
          (product) => !isNullOrUndefined(product) && product.enabled,
        );
        const loans: LoanDestinationInterface[] = data[0];
        return loans.filter(
          (loan) =>
            loan.bank !== '0002' ||
            (loan.bank === '0002' &&
              (!this.isCreditCardBpopLoan(loan) ||
                (this.isCreditCardBpopLoan(loan) &&
                  products.some(
                    (product) =>
                      product.enabled &&
                      product.accountInformation.productType ===
                        'CREDIT_CARD' &&
                      product.accountInformation.accountIdentifier ===
                        loan.accountId,
                  )))),
        );
      }),
    );
  }
  private isCreditCardBpopLoan(loan: LoanDestinationInterface): boolean {
    return loan.accountType === 'TC' || loan.accountType === 'CREDIT_CARD';
  }
  get destinationProductsBills$(): Observable<PaymentBillsInterface[]> {
    return this.model.productsDestinationBills$;
  }
  get paymentType(): string {
    return this.model.paymentType;
  }
  get bank_loans$(): Observable<IBankLoanElement[]> {
    return this.model.bank_loans$;
  }
  get servicepublic(): string {
    return SERVICE_PUBLIC;
  }
  public trackByFn(index: number, product: Product): string {
    return product.id;
  }
  private _setDefaultValue(): void {
    combineLatest([
      this.model.productActive$,
      this.productsOrigin$,
      this.destinationProducts$,
    ])
      .pipe(
        take(1),
        map((data) => {
          return { productDetail: data[0], products: data[1], loans: data[2] };
        }),
      )
      .subscribe((info) => {
        setInitialValueCustomInfo(
          info.productDetail,
          info.products,
          info.loans,
          this.formStepOne,
          ['account_origin', 'account_destination'],
        );
      })
      .unsubscribe();
  }
  // tslint:disable-next-line:max-file-line-count
}

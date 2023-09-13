import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BANKS } from '@app/core/constants/banks';
import { DOCUMENT_TYPES } from '@app/core/constants/document_types';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { IBankElement } from '@app/core/interfaces/banks.interface';
import { Product } from '@app/core/models/products/product';
import { NewTransfer } from '@app/modules/transfer-to-account/entities/new-transfer.interface';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { IDsDropDown } from '@app/shared/ds/ds-dropdown-select/constants/ds-dropdown-interface';
import { IBanks } from '@app/store/reducers/models/banks/banks.reducer';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  FAST_TRANSFER,
  MAX_AMOUNT_TRANSFER,
  MAX_LENGTH_CUSTOMER_ID,
  MAX_LENGTH_CUSTOMER_NAME,
  MAX_LENGTH_DESCRIPTION,
  MAX_LENGTH_DESTINATION_ACCOUNT_ID,
  MAX_LENGTH_VOUCHER,
  MIN_AMOUNT_TRANSFER,
} from '../../constants/fast-transfer';
import {
  INavigateFastTransfer,
  NavigateFastTransfer,
} from '../../constants/routes';
import { IStepFastTransfer } from '../../entities/fast-transfer.interface';
import { IProductAffiliationElement } from '../../entities/product-destination.interface';
import { FastTransferModel } from '../../fast-transfer.model';
import { DestinationProductsState } from '../../store/reducers/destination-products.reducer';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepOneComponent implements OnInit, OnDestroy {
  public viewBack: boolean = false;
  public backUrl: string;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  public documentTypes: object[] = DOCUMENT_TYPES;
  public banks: object[] = [];

  public formFastTransfer: FormGroup;
  public accountDefault: any;

  private _newTransfer: NewTransfer;
  private _isNewAccount: boolean = false;
  private _scheduledTransfer: boolean = false;
  private _dueDate: Date = null;
  private _transactionCost: string = '0';
  private _favorite: boolean = false;
  private _nicknameFrom: string = '';
  private _nicknameTo: string = '';

  public VALUE_TO_TRANSFER: string = '';
  public MAX: string = '';
  public MIN: string = '';

  private objAccount: any = {
    1: TYPE_ACCOUNTS.DEPOSIT_ACCOUNT,
    2: TYPE_ACCOUNTS.CURRENT_ACCOUNT,
  };

  constructor(
    private _router: Router,
    private _translate: TranslateService,
    private _modelFastTransfer: FastTransferModel,
    private _transferModel: TransferModel,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._setStep(1);
    this._initData();
    this._initText();
    this._initForm();
    setTimeout(() => this.cd.markForCheck(), 10);
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
  private _initData(): void {
    this.documentTypes = DOCUMENT_TYPES.map((obj) => {
      return {
        label: obj.name,
        value: obj.type,
      };
    });
    this.documentTypes.unshift({
      label: this._translate.instant(
        'REGISTER_PRODUCT_AFFILIATION.DESTINATION_DOCUMENT_TYPE_PLACEHOLDER',
      ),
      value: '',
    });
    setTimeout(() => this._loadBanks(), 100);
  }
  private _initText(): void {
    this.VALUE_TO_TRANSFER = this._translate
      .instant('TRANSFER.FAST_TRANSFER.VALUE.VALUE_TO_TRANSFER')
      .replace('{{max}}', MAX_AMOUNT_TRANSFER);
    this.MAX = this._translate
      .instant('TRANSFER.FAST_TRANSFER.VALUE.MAX')
      .replace('{{max}}', MAX_AMOUNT_TRANSFER);
    this.MIN = this._translate
      .instant('TRANSFER.FAST_TRANSFER.VALUE.MIN')
      .replace('{{min}}', MIN_AMOUNT_TRANSFER);
  }
  private _setStep(step: number): void {
    this._modelFastTransfer.setStep({ step });
  }
  get navigate(): INavigateFastTransfer {
    return NavigateFastTransfer;
  }

  private _initForm(): void {
    this.formFastTransfer = new FormGroup({
      account_origin: new FormControl('', [Validators.required]),
      account_destination: new FormControl(''),

      bankId: new FormControl('', [Validators.required]),
      destinationAccountType: new FormControl('', [Validators.required]),
      destinationAccountId: new FormControl('', [
        Validators.required,
        Validators.maxLength(MAX_LENGTH_DESTINATION_ACCOUNT_ID),
        Validators.pattern(/^[0-9]+$/),
      ]),

      customerIdType: new FormControl('', [Validators.required]),
      customerId: new FormControl('', [
        Validators.required,
        Validators.maxLength(MAX_LENGTH_CUSTOMER_ID),
        Validators.pattern(/^[0-9]+$/),
      ]),
      customerName: new FormControl('', [
        Validators.required,
        Validators.maxLength(MAX_LENGTH_CUSTOMER_NAME),
        Validators.pattern(/^[ A-Za-z0-9_@./#&+-]*$/),
      ]),

      amount: new FormControl('', [
        Validators.required,
        Validators.min(MIN_AMOUNT_TRANSFER),
        Validators.max(MAX_AMOUNT_TRANSFER),
        Validators.pattern(/^[0-9]+$/),
      ]),
      description: new FormControl('', [
        Validators.maxLength(MAX_LENGTH_DESCRIPTION),
        Validators.pattern(/^[ A-Za-z0-9_@./#&+-]*$/),
      ]),
      voucher: new FormControl('', [
        Validators.maxLength(MAX_LENGTH_VOUCHER),
        Validators.pattern(/^[ A-Za-z0-9_@./#&+-]*$/),
      ]),
    });
  }
  get getAccountOrigin(): AbstractControl {
    return this.formFastTransfer.get('account_origin');
  }
  get getAccountDestination(): AbstractControl {
    return this.formFastTransfer.get('account_destination');
  }
  get getBankId(): AbstractControl {
    return this.formFastTransfer.get('bankId');
  }
  get getDestinationAccountType(): AbstractControl {
    return this.formFastTransfer.get('destinationAccountType');
  }
  get getDestinationAccountId(): AbstractControl {
    return this.formFastTransfer.get('destinationAccountId');
  }
  get getCustomerIdType(): AbstractControl {
    return this.formFastTransfer.get('customerIdType');
  }
  get getCustomerId(): AbstractControl {
    return this.formFastTransfer.get('customerId');
  }
  get getCustomerName(): AbstractControl {
    return this.formFastTransfer.get('customerName');
  }
  get getAmount(): AbstractControl {
    return this.formFastTransfer.get('amount');
  }
  get getDescription(): AbstractControl {
    return this.formFastTransfer.get('description');
  }
  get getVoucher(): AbstractControl {
    return this.formFastTransfer.get('voucher');
  }
  get hasErrorAmount$(): Observable<boolean> {
    return of(
      parseInt(this.getAmount.value, 10) > parseInt(this.getAmount.value, 10),
    );
  }

  public submitForm(): void {
    this._setStep(2);
    this._loadData();
    this._transferModel.setFormNewTransfer(this._newTransfer);
    this._router.navigate([this.navigate.step2]);
  }
  private _loadData(): void {
    this._updateAccountDestination();
    this._newTransfer = {
      origin_transfer: FAST_TRANSFER,
      account_origin: this.getAccountOrigin.value,
      account_destination: this.getAccountDestination.value,
      notes: this.getDescription.value,
      scheduledTransfer: this._scheduledTransfer,
      dueDate: this._dueDate,
      transactionCost: this._transactionCost,
      companyId: BANKS.BANCO_POPULAR,
      requestId: Math.floor(Date.now() / 1000),
      invoiceNumber: this.getVoucher.value,
      transferInformation: {
        amount: this.getAmount.value,
      },
      accountFromInformation: {
        accountIdentifier: this.formFastTransfer.value.account_origin.id,
        productType: this.formFastTransfer.value.account_origin.typeAccount,
        nickName: this._nicknameFrom,
      },
      accountToInformation: {
        bank: this.formFastTransfer.value.account_destination.bankId,
        isNewAccount: this._isNewAccount,
        name: this.formFastTransfer.value.account_destination.customerName,
        identificationNumber: this.formFastTransfer.value.account_destination
          .customerId,
        accountIdentifier: this.formFastTransfer.value.account_destination
          .destinationAccountId,
        bankName: this.formFastTransfer.value.account_destination.bankName,
        identificationType: this.formFastTransfer.value.account_destination
          .customerIdType,
        productType: this.formFastTransfer.value.account_destination
          .destinationAccountType,
        isFavorite: this._favorite,
        nickName: this._nicknameTo,
      },
    };
  }
  private _updateAccountDestination(): void {
    const new_account_destination: IProductAffiliationElement = {
      originAccountId: this.formFastTransfer.value.account_origin.id,
      originAccountType: this.formFastTransfer.value.account_origin.typeAccount,
      destinationAccountId: this.getDestinationAccountId.value,
      destinationAccountType: this.getDestinationAccountType.value,
      customerId: this.getCustomerId.value,
      customerIdType: this.getCustomerIdType.value,
      customerName: this.getCustomerName.value,
      email: null,
      bankId: this.getBankId.value.value,
      bankName: this.getBankId.value.name,
    };
    this.formFastTransfer.patchValue({
      account_destination: new_account_destination,
    });
  }
  get step$(): Observable<IStepFastTransfer> {
    return this._modelFastTransfer.stepFastTransfer$;
  }

  get productsOrigin$(): Observable<Product[]> {
    return this._modelFastTransfer.products$.pipe(
      map((product: Product[]) => {
        return this._filterProducts(product);
      }),
    );
  }
  get productDefault$(): Observable<Product> {
    return this._modelFastTransfer.products$.pipe(
      map((product: Product[]) => this._filterProducts(product).shift()),
    );
  }
  private _filterProducts(product: Product[]): Product[] {
    return product.filter(
      (data) =>
        data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
        data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
    );
  }
  get destination$(): Observable<DestinationProductsState> {
    return this._modelFastTransfer.destination$.pipe(
      map((state: DestinationProductsState) => {
        state.products = isNullOrUndefined(state.products)
          ? null
          : state.products.filter(
              (product) =>
                !(
                  product.destinationAccountId.includes(
                    this.formFastTransfer.value.id,
                  ) &&
                  product.destinationAccountType ===
                    this.formFastTransfer.value.typeAccount
                ),
            );
        return state;
      }),
    );
  }
  public compareFnDestination(c1: any, c2: any): boolean {
    return c1 && c2
      ? c1.destinationAccountId === c2.destinationAccountId
      : c1 === c2;
  }

  public changeOrigin(): void {
    this._modelFastTransfer.resetDestination();
    this.formFastTransfer.patchValue({ account_destination: '' });
    this.fetchDestination();
  }
  public fetchDestination(): void {
    this._modelFastTransfer.fetchDestinationProducts(
      this.formFastTransfer.value.account_origin.id,
      this.formFastTransfer.value.account_origin.typeAccount,
    );
  }
  public loadAmount(
    product: Product,
    text: string,
    amount: string,
    textLoading: string,
  ): string {
    if (product.loading && isNullOrUndefined(amount)) {
      return `- ${textLoading}...`;
    } else if (product.loaded || !isNullOrUndefined(amount)) {
      return `- ${text} ${amount}`;
    } else {
      return '';
    }
  }
  public selectAccount(event: object): void {
    this.accountDefault = event;
    this.formFastTransfer.patchValue({
      account_origin: this.accountDefault,
    });
    this.formFastTransfer.patchValue({
      fromId: this.accountDefault['id'],
    });
    this.formFastTransfer.patchValue({
      fromType: this.accountDefault['typeAccount'],
    });
  }
  public compareFnBanks(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.value === c2.value : c1 === c2;
  }
  public fetchBanks(): void {
    this._modelFastTransfer.fetchBanks();
  }

  get banks$(): Observable<IBanks> {
    return this._modelFastTransfer.banks$;
  }
  private _loadBanks(): void {
    this.banks$
      .subscribe((data: IBanks) => {
        if (!!data.data) {
          this.banks = data.data.map((obj) => {
            return {
              label: obj.value,
              value: obj.name,
            };
          });
        }
        this.banks.unshift({
          label: this._translate.instant(
            'REGISTER_PRODUCT_AFFILIATION.CHOOSE_DESTINATION_BANK_PLACEHOLDER',
          ),
          value: '',
        });
      })
      .unsubscribe();
  }
  public selectCard(index: number): void {
    if (index <= 0) {
      return;
    }
    const account = this.objAccount[index];
    this.getDestinationAccountType.setValue(`${account}`);
    this.cd.markForCheck();
  }
  // tslint:disable-next-line:max-file-line-count
}

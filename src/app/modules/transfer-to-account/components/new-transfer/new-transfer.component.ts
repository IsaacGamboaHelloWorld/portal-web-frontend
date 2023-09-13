import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BANKS } from '@app/core/constants/banks';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import {
  INavigateFastTransfer,
  NavigateFastTransfer,
} from '@app/modules/fast-transfer/constants/routes';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  FAST_TRANSFER,
  MAX_AMOUNT_TRANSFER,
  MAX_LENGTH_DESCRIPTION,
  MAX_LENGTH_VOUCHER,
  MIN_AMOUNT_TRANSFER,
  NEW_TRANSFER,
} from '../../constants/new-transfer';
import { NewTransfer } from '../../entities/new-transfer.interface';
import { DestinationProductsState } from '../../store/reducers/destination-products.reducer';
import { TransferModel } from '../../transfer.model';

@Component({
  selector: 'app-new-transfer',
  templateUrl: './new-transfer.component.html',
  styleUrls: ['./new-transfer.component.sass'],
})
export class NewTransferComponent implements OnInit, OnDestroy {
  public viewBack: boolean = false;
  public backUrl: string;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  public formNewTransfer: FormGroup;
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

  constructor(
    private _router: Router,
    private _translate: TranslateService,
    private _model: TransferModel,
  ) {}

  ngOnInit(): void {
    this._model.resetFormNewTransfer();
    this._initText();
    this._initForm();
    setTimeout(() => {
      this.changeOrigin();
    }, 10);
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
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
  private _initForm(): void {
    this.formNewTransfer = new FormGroup({
      account_origin: new FormControl('', [Validators.required]),
      account_destination: new FormControl('', [Validators.required]),

      amount: new FormControl('$', [
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
    return this.formNewTransfer.get('account_origin');
  }
  get getAccountDestination(): AbstractControl {
    return this.formNewTransfer.get('account_destination');
  }
  get getAmount(): AbstractControl {
    return this.formNewTransfer.get('amount');
  }
  get getDescription(): AbstractControl {
    return this.formNewTransfer.get('description');
  }
  get getVoucher(): AbstractControl {
    return this.formNewTransfer.get('voucher');
  }

  private _loadData(): void {
    this._newTransfer = {
      origin_transfer: NEW_TRANSFER,
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
        accountIdentifier: this.formNewTransfer.value.account_origin.id,
        productType: this.formNewTransfer.value.account_origin.typeAccount,
        nickName: this._nicknameFrom,
      },
      accountToInformation: {
        bank: this.formNewTransfer.value.account_destination.bankId,
        isNewAccount: this._isNewAccount,
        name: this.formNewTransfer.value.account_destination.customerName,
        identificationNumber: this.formNewTransfer.value.account_destination
          .customerId,
        accountIdentifier: this.formNewTransfer.value.account_destination
          .destinationAccountId,
        bankName: this.formNewTransfer.value.account_destination.bankName,
        identificationType: this.formNewTransfer.value.account_destination
          .customerIdType,
        productType: this.formNewTransfer.value.account_destination
          .destinationAccountType,
        isFavorite: this._favorite,
        nickName: this._nicknameTo,
      },
    };
  }

  public submitForm(): void {
    this._loadData();
    this._model.setFormNewTransfer(this._newTransfer);
    this._router.navigate([this.navigateFastTransfer.step2]);
  }
  get navigate(): INavigate {
    return Navigate;
  }

  get navigateFastTransfer(): INavigateFastTransfer {
    return NavigateFastTransfer;
  }

  get productsOrigin$(): Observable<Product[]> {
    return this._model.productsNewTrasfer$.pipe(
      map((product: Product[]) => {
        return this._filterProducts(product);
      }),
    );
  }
  get productDefault$(): Observable<Product> {
    return this._model.productsNewTrasfer$.pipe(
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
    return this._model.destination$.pipe(
      map((state: DestinationProductsState) => {
        state.products = isNullOrUndefined(state.products)
          ? null
          : state.products.filter(
              (product) =>
                !(
                  product.destinationAccountId.includes(
                    this.formNewTransfer.value.id,
                  ) &&
                  product.destinationAccountType ===
                    this.formNewTransfer.value.typeAccount
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
    this._model.resetDestination();
    this.formNewTransfer.patchValue({ account_destination: '' });
    this.fetchDestination();
  }
  public fetchDestination(): void {
    this._model.fetchDestinationProducts(
      this.formNewTransfer.value.account_origin.id,
      this.formNewTransfer.value.account_origin.typeAccount,
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
    this.formNewTransfer.patchValue({
      account_origin: this.accountDefault,
    });
    this.formNewTransfer.patchValue({
      fromId: this.accountDefault['id'],
    });
    this.formNewTransfer.patchValue({
      fromType: this.accountDefault['typeAccount'],
    });
  }
  public onChange(): void {
    if (this.formNewTransfer.value.account_destination === FAST_TRANSFER) {
      this._router.navigate([this.navigate.fast_transfer_other_accounts]);
    }
  }
}

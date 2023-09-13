import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT_TYPES } from '@app/core/constants/document_types';
import { NEW } from '@app/core/constants/global';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { IFormOneTransferInterface } from '@app/modules/transfer-to-account/entities/formOneTransfer.interface';
import { DestinationProductsState } from '@app/modules/transfer-to-account/store/reducers/destination-products.reducer';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import {
  validateAsyncForm,
  validateData,
} from '@app/shared/helpers/validateData.helper';
import { IBanks } from '@app/store/reducers/models/banks/banks.reducer';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  INavigateOldTransfer,
  NavigateOldTransfer,
} from '../../constants/routes';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
})
export class StepOneComponent implements OnInit, OnDestroy {
  public formStepOne: FormGroup;
  public showNewAccount: boolean = false;
  public otherOptions: Array<{
    destinationAccountId: string;
    destinationAccountType: string;
  }> = [
    {
      destinationAccountId: NEW,
      destinationAccountType: 'Nueva cuenta',
    },
  ];
  public documentTypes: Array<{ name: string; type: string }> = DOCUMENT_TYPES;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private _modelTransfer: TransferModel, private _router: Router) {}
  // A quien
  ngOnInit(): void {
    this._setStep(1);
    this.fetchBanks();
    this._initForm();
    this._setDefaultValue();

    this.formStepOne
      .get('account_destination')
      .valueChanges.pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        if (data.destinationAccountId !== NEW) {
          setTimeout(() => {
            this.setDataFormNew();
          }, 100);
        }

        this.showNewAccount = data.destinationAccountId === NEW;

        validateAsyncForm(
          this.formStepOne,
          data.destinationAccountId,
          NEW,
          'bank',
          [Validators.required],
        );
        validateAsyncForm(
          this.formStepOne,
          data.destinationAccountId,
          NEW,
          'productType',
          [Validators.required],
        );
        validateAsyncForm(
          this.formStepOne,
          data.destinationAccountId,
          NEW,
          'accountIdentifier',
          [
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
            Validators.maxLength(22),
          ],
        );
        validateAsyncForm(
          this.formStepOne,
          data.destinationAccountId,
          NEW,
          'name',
          [Validators.required],
        );
        validateAsyncForm(
          this.formStepOne,
          data.destinationAccountId,
          NEW,
          'identificationType',
          [Validators.required],
        );
        validateAsyncForm(
          this.formStepOne,
          data.destinationAccountId,
          NEW,
          'identificationNumber',
          [
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
            Validators.maxLength(12),
          ],
        );
      });
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

  get banks$(): Observable<IBanks> {
    return this._modelTransfer.banks$;
  }

  get destination$(): Observable<DestinationProductsState> {
    return this._modelTransfer.destination$.pipe(
      map((state: DestinationProductsState) => {
        state.products = isNullOrUndefined(state.products)
          ? null
          : state.products.filter(
              (product) =>
                !(
                  product.destinationAccountId.includes(
                    this.formStepOne.value.account_origin.id,
                  ) &&
                  product.destinationAccountType ===
                    this.formStepOne.value.account_origin.typeAccount
                ),
            );
        return state;
      }),
    );
  }

  get productsOrigin$(): Observable<Product[]> {
    return this._modelTransfer.product$.pipe(
      filter(
        (products: Product[]) =>
          !isNullOrUndefined(products) && products.length > 0,
      ),
      map((products) => {
        return products.filter(
          (product) =>
            product.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
            product.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
        );
      }),
    );
  }

  public fetchBanks(): void {
    this._modelTransfer.fetchBanks();
  }

  public compareFnDestination(c1: any, c2: any): boolean {
    return c1 && c2
      ? c1.destinationAccountId === c2.destinationAccountId
      : c1 === c2;
  }

  public compareFnOrigin(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  public compareFnBanks(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.value === c2.value : c1 === c2;
  }

  public changeOrigin(): void {
    this._modelTransfer.resetDestination();
    this.formStepOne.patchValue({ account_destination: '' });
    this.fetchDestination();
  }

  public fetchDestination(): void {
    this._modelTransfer.fetchDestinationProducts(
      this.formStepOne.value.account_origin.id,
      this.formStepOne.value.account_origin.typeAccount,
    );
  }

  public submitForm(): void {
    this._modelTransfer.setFormOne(this.formStepOne.value);
    this._setStep(2);
    this._router.navigate([this.navigate.step2]);
  }

  private _initForm(): void {
    this._modelTransfer.formOne$
      .subscribe((data: IFormOneTransferInterface) => {
        this.formStepOne = new FormGroup({
          account_origin: new FormControl(
            validateData(data.account_origin, ''),
            [Validators.required],
          ),
          account_destination: new FormControl(
            validateData(data.account_destination, ''),
            [Validators.required],
          ),
          productType: new FormControl(validateData(data.productType, '')),
          bank: new FormControl(validateData(data.bank, '')),
          accountIdentifier: new FormControl(
            validateData(data.accountIdentifier, ''),
          ),
          name: new FormControl(validateData(data.name, '')),
          identificationType: new FormControl(
            validateData(data.identificationType, ''),
          ),
          identificationNumber: new FormControl(
            validateData(data.identificationNumber, ''),
          ),
        });

        this.showNewAccount =
          !isNullOrUndefined(data.account_destination) &&
          data.account_destination.hasOwnProperty('destinationAccountId') &&
          data.account_destination.destinationAccountId === NEW;
      })
      .unsubscribe();
  }

  private setDataFormNew(): void {
    this.formStepOne.controls['bank'].setValue('');
    this.formStepOne.controls['identificationType'].setValue('');
  }

  public trackByFn(index: number, product: Product): string {
    return product.id;
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

  private _setDefaultValue(): void {
    combineLatest([this._modelTransfer.productActive$, this.productsOrigin$])
      .pipe(
        take(1),
        map((data) => ({ productDetail: data[0], products: data[1] })),
      )
      .subscribe((info) => {
        if (!isNullOrUndefined(info.productDetail)) {
          const product = info.products.find(
            (account) =>
              account.id === info.productDetail.id &&
              account.typeAccount === info.productDetail.type.toUpperCase(),
          );
          this.formStepOne.controls['account_origin'].setValue(product);
          this.fetchDestination();
        }
      });
  }
}

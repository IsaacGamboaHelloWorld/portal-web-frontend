import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { Product } from '@app/core/models/products/product';
import { BANKS } from '@core/constants/banks';
import { Events } from '@core/constants/events';
import { NORMAL_PAYMENT, SERVICE_PUBLIC } from '@core/constants/global';
import { Navigate, Titles } from '@core/constants/navigate';
import { PageView } from '@core/decorators/page-view.decorator';
import { PaymentBillsInterface } from '@core/interfaces/paymentBills.interface';
import { FormStepOneState } from '@store/reducers/models/payment/steps/form-step-one.reducer';
import { FormStepTwoState } from '@store/reducers/models/payment/steps/form-step-two.reducer';
import { TYPE_ACCOUNTS } from '../../../../core/constants/types_account';
import { HomeModel } from '../../../home/home.model';
import { PaymentModel } from '../../payment.model';

@PageView(Navigate.how_much, Titles.how_much, Events.page_view)
@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepTwoComponent implements OnInit {
  public formStepTwo: FormGroup;
  public categories: Array<{ id: string; name: string }> = [];
  public productTopay: Product;
  public billTopay: PaymentBillsInterface = null;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public OTHER_VALUE: string = 'OTHER_VALUE';
  public FINAL_VALUE: number = 0;

  constructor(
    private model: PaymentModel,
    private p_model: HomeModel,
    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.formStepTwo.controls.amounttext.setValue(0);
    if (this.paymentType() !== SERVICE_PUBLIC) {
      this.formStepTwo
        .get('amount')
        .valueChanges.pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          this.FINAL_VALUE = this.formStepTwo.value.amounttext;
          if (data === this.OTHER_VALUE && this.FINAL_VALUE === 0) {
            this.formStepTwo.controls.amount.setValue(0);
            this.setClass('.payment-container-3');
          }
        });
    }

    this.model.formOne$
      .subscribe((data: FormStepOneState) => {
        if (this.paymentType() === SERVICE_PUBLIC) {
          this.billTopay = data.account_destination as PaymentBillsInterface;
          this.formStepTwo.controls.amount.setValue(this.billTopay.amount);
        } else if (
          data.account_destination.accountType === TYPE_ACCOUNTS.CREDIT_CARD &&
          data.account_destination.bank === '0002'
        ) {
          this.aditionalData();
        }
      })
      .unsubscribe();
  }

  public setValue(): void {
    this.FINAL_VALUE = this.formStepTwo.value.amounttext;
    this.formStepTwo.patchValue({ amount: this.OTHER_VALUE });
  }

  public submitForm(): void {
    if (this.paymentType() === SERVICE_PUBLIC) {
      this.formStepTwo.value.amount = this.billTopay.amount;
    }
    if (this.formStepTwo.value.amount === this.OTHER_VALUE) {
      this.formStepTwo.value.amount = this.FINAL_VALUE;
    }
    this.model.setFormTwo(this.formStepTwo.value);
    this.model.setStep(3);
  }

  private _initForm(): void {
    this.model.formTwo$
      .subscribe((data: FormStepTwoState) => {
        this.formStepTwo = new FormGroup({
          amount: new FormControl(data.amount.toString(), [
            Validators.required,
            Validators.min(0.1),
            Validators.max(10000000),
          ]),
          amounttext: new FormControl(data.amount, [
            Validators.min(0),
            Validators.max(10000000),
          ]),
          comments: new FormControl(data.comments, [Validators.maxLength(24)]),
          idbill: new FormControl(data.idbill, []),
        });
      })
      .unsubscribe();
  }

  public setClass(_id: string): void {
    this.dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this.dom.addClass(_id, 'active');
  }

  get formOne$(): Observable<FormStepOneState> {
    return this.model.formOne$;
  }

  get formTwo$(): Observable<any> {
    return this.model.formTwo$;
  }

  get hasData$(): Observable<boolean> {
    return this.model.formOne$.pipe(map((data) => !isNullOrUndefined(data)));
  }

  public aditionalData(): void {
    combineLatest(this.model.formOne$, this.p_model.products$)
      .subscribe(([formOne, products]) => {
        this.productTopay = this.doFindProductData(
          formOne.account_destination.accountId,
          products.CREDIT_CARD,
        );
      })
      .unsubscribe();
  }

  public doFindProductData(_id: string, _products: Product[]): Product {
    return _products.find(
      (_product) =>
        _product.accountInformation.accountIdentifier.toString() === _id,
    );
  }

  get hasMinimunPayment(): boolean {
    return (
      Product.getMinimumPayment(this.productTopay) &&
      !isNullOrUndefined(this.productTopay) &&
      this.productTopay.accountInformation.bank === BANKS.BANCO_POPULAR
    );
  }

  get hasTotalPayment(): boolean {
    return (
      Product.getTotalPayment(this.productTopay) &&
      !isNullOrUndefined(this.productTopay) &&
      this.productTopay.accountInformation.bank === BANKS.BANCO_POPULAR
    );
  }

  get equalValues(): boolean {
    return Product.getMinimumPayment(this.productTopay) ===
      Product.getTotalPayment(this.productTopay) &&
      Product.getTotalPayment(this.productTopay) > 0
      ? true
      : false;
  }

  get differtenValues(): boolean {
    return Product.getMinimumPayment(this.productTopay) ||
      Product.getTotalPayment(this.productTopay) > 0
      ? true
      : false;
  }

  get showLabel(): boolean {
    return (
      !isNullOrUndefined(this.productTopay) &&
      this.productTopay.productAccountBalances.valor_pago_minimo.amount !==
        this.productTopay.productAccountBalances.pago_total_pesos.amount
    );
  }

  get hasBilledPayment(): boolean {
    return !isNullOrUndefined(this.billTopay) && this.billTopay.amount >= 0;
  }

  public paymentType(): string {
    return this.model.paymentType;
  }

  get paymentnormal(): string {
    return NORMAL_PAYMENT;
  }
}

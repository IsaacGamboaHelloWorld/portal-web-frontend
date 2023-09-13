import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { setValidators } from '@app/shared/helpers/formValidators.helper';
import { Product } from '@core/models/products/product';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { IPaymentFormOne } from '../../entities/new-payment';
import { PaymentObligationsFacade } from '../../payment.facade';
import { INavigatePayment, NavigatePayment } from '../navigate/routes';

@Component({
  selector: 'app-obligations-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepTwoComponent implements OnInit, OnDestroy {
  private static readonly CURRENT_NUMBER_STEP: number = 2;
  private static readonly NEXT_STEP: number = 3;
  public formTwo: FormGroup;
  public OTHER_VALUE: string = 'OTHER_VALUE';
  public FINAL_VALUE: string = '0';
  public productTopay: Product;
  public minPayment: number = 0;
  public totalPayment: number = 0;
  public otherPayment: boolean = true;
  public editOtherValue: boolean = false;
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _facade: PaymentObligationsFacade,
    private _router: Router,
    private _parent_facade: FinancialOpFacade,
    private _dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._setStep(StepTwoComponent.CURRENT_NUMBER_STEP);
    this._setupClass(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._setupClass(false);
  }

  private _initForm(): void {
    this.formTwo = new FormGroup({
      option_to_pay: new FormControl('', Validators.required),
      amounttext: new FormControl('', [Validators.min(1)]),
      comments: new FormControl(''),
    });

    this.formTwo
      .get('option_to_pay')
      .valueChanges.pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        if (data === this.OTHER_VALUE) {
          setValidators(this.formTwo, ['amounttext'], [Validators.required]);
        } else {
          setValidators(this.formTwo, ['amounttext'], null);
        }
      });

    this.aditionalData();
  }

  private _setupClass(add: boolean): void {
    if (add) {
      this._dom.addClass(
        '.main-container-transaction',
        'container-step-two-ob',
      );
    } else {
      this._dom.removeClass(
        '.main-container-transaction',
        'container-step-two-ob',
      );
    }
  }

  public setClass(_id: string): void {
    this._dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this._dom.addClass('.type-' + _id, 'active');
  }

  public setClassOtherValue(): void {
    this._dom.removeClass('.type-2', 'active');
    this._dom.addClass('.type-2', 'editing');
    this.editOtherValue = true;
  }

  public setValue(): void {
    this._dom.removeClass('.type-2', 'editing');
    this.FINAL_VALUE = this.formTwo.value.amounttext;
    if (this.FINAL_VALUE === '') {
      this.editOtherValue = false;
      return;
    }
    this.setClass('2');
    this.formTwo.patchValue({ option_to_pay: this.OTHER_VALUE });
    this.editOtherValue = false;
  }

  public nexStep(): void {
    this._router.navigate([this.navigateInternal.step3]);
    this.setStep.emit(StepTwoComponent.NEXT_STEP);
  }

  public _setStep(step: number): void {
    this._parent_facade.setStep({ step });
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
  }

  public submitData(): void {
    this.formTwo.value.amounttext = this.formTwo.value.option_to_pay;
    if (this.formTwo.value.option_to_pay === this.OTHER_VALUE) {
      this.formTwo.value.amounttext = this.FINAL_VALUE;
    }
    this._facade.setFormTwo(this.formTwo.value);
    this.nexStep();
  }

  public aditionalData(): void {
    combineLatest([this.firstForm$, this.products$])
      .subscribe(([formOne, products]) => {
        if (
          !!formOne &&
          !!formOne.loan_destination &&
          !!formOne.loan_destination.activePayment
        ) {
          this.productTopay = this.doFindProductData(
            formOne.loan_destination.activePayment.accountId,
            products,
          );
          this.configureFront(this.productTopay);
        }
      })
      .unsubscribe();
  }

  public configureFront(_data: Product): void {
    this.minPayment = Product.getMinimumPayment(_data);
    this.totalPayment = Product.getTotalPayment(_data);
  }

  public doFindProductData(_id: string, _products: Product[]): Product {
    return _products.find(
      (_product) =>
        _product.accountInformation.accountIdentifier.toString() === _id,
    );
  }

  get products$(): Observable<Product[]> {
    return this._facade.selectAllProducts$;
  }

  get firstForm$(): Observable<IPaymentFormOne> {
    return this._facade.getStepOne$;
  }
}

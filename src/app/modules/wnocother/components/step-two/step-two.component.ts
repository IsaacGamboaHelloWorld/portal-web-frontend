import {
  ChangeDetectionStrategy,
  Component,
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
import {
  MAX_AMOUNT_WITH_CARD,
  MIN_AMOUNT_WITH_CARD,
  VALUES_WHITDRAWAL,
} from '@app/core/constants/global';
import { WnocotherMoldel } from '@app/modules/wnocother/wnocother.model';
import { setInitialValueCustomInfo } from '@app/shared/helpers/formValidators.helper';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { ProductsInterface } from '@core/interfaces/products.interface';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { WITH_CARD } from '../../../../core/constants/global';
import { Product } from '../../../../core/models/products/product';
import { joinProducts } from '../../../../shared/helpers/joinProducts.helper';
import { loadAmount } from '../../../../shared/helpers/loadAmount.helper';
import { INavigateWnocother, NavigateWnocother } from '../../entities/routes';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent implements OnInit {
  public stepAisActive: boolean = false;
  public anotherAmount: boolean = false;
  public startForm: boolean = false;
  public formNoCard: FormGroup;
  public Products: Product[];
  public error: any = '';
  public showAmount: boolean = false;
  public textVoucher: string = '';
  public textBtnAgain: string = '';

  constructor(
    private model: WnocotherMoldel,
    private translate: TranslateService,
    private router: Router,
  ) {}
  get navigate(): INavigateWnocother {
    return NavigateWnocother;
  }
  ngOnInit(): void {
    this.model.setStepW(1);
    this._initForm();
  }

  private _initForm(): void {
    this.model.dataForm$
      .subscribe((data) => {
        this.formNoCard = new FormGroup({
          product: new FormControl(validateData(data.product, ''), [
            Validators.required,
          ]),
          where: new FormControl(validateData(data.where, ''), [
            Validators.required,
          ]),
          amount: new FormControl(validateData(data.amount, ''), [
            Validators.required,
          ]),
          otheramount: new FormControl(validateData(data.otheramount, '')),
          document: new FormControl(validateData(data.document, '')),
        });
        this._setDefaultValue();
      })
      .unsubscribe();
    this.model.typeTransaction$.subscribe((data) => {
      this.onChangeType(data);
    });

    this.whereAlias.valueChanges.subscribe(
      (data: any) => (this.showAmount = !!data),
    );
  }

  onChangeType(_item: string): void {
    this.textVoucher =
      _item === 'WITH_CARD'
        ? this.translate.instant('WITHDRAWAL.CONFIRM_STEP.AMMOUNT1')
        : this.translate.instant('WITHDRAWAL.CONFIRM_STEP.AMMOUNT2');
    this.textBtnAgain =
      _item === 'WITH_CARD'
        ? this.translate.instant('WITHDRAWAL.VALID_STEP.TRY_AGAIN1')
        : this.translate.instant('WITHDRAWAL.VALID_STEP.TRY_AGAIN2');
    this.model.setTypeTransaction(_item);
    this.stepAisActive = _item === WITH_CARD;
    this.formNoCard.controls.document.setValidators(
      this.stepAisActive ? null : [Validators.required],
    );
    this.formNoCard.controls.document.updateValueAndValidity();
  }

  doSetAnotherAmount(): void {
    this.formNoCard.controls.otheramount.setErrors(null);
    this.anotherAmount = false;
    if (this.formNoCard.controls.amount.value === '-') {
      this.anotherAmount = true;
      this.formNoCard.controls.otheramount.setValidators([
        Validators.required,
        this.onSetMultipleValue,
      ]);
    } else {
      this.formNoCard.controls.otheramount.setValidators(null);
    }
  }

  onSetMultipleValue(control: FormControl): { [key: string]: boolean } | null {
    const valueDefaultMultiple = MIN_AMOUNT_WITH_CARD;
    const amountMax = MAX_AMOUNT_WITH_CARD;
    const value = control.value.replace(/[$]/g, '').replace(/[.]/g, '');
    const otheramount = parseInt(value, 0);
    const calculate = otheramount % valueDefaultMultiple;
    if (value < valueDefaultMultiple) {
      return { minAmountInvalid: true };
    } else if (value > amountMax) {
      return { maxAmountInvalid: true };
    } else if (!!control.value && calculate !== 0) {
      return { valueInvalid: true };
    }
    return null;
  }

  public setState(event: string): void {
    this.error = this.formNoCard.controls.otheramount.errors;
  }

  public setDataForm(): void {
    const valueNew =
      this.formNoCard.controls.amount.value === '-'
        ? this.formNoCard.controls.otheramount.value
        : this.formNoCard.controls.amount.value;
    const dataToSend = {
      product: this.formNoCard.controls.product.value,
      where: this.formNoCard.controls.where.value,
      amount: valueNew,
      document: this.formNoCard.controls.document.value,
      textVoucher: this.textVoucher,
      textBtnAgain: this.textBtnAgain,
    };
    this.model.setDataForm(dataToSend);
    this.model.setStepW(2);
    this.router.navigate([this.navigate.step3]);
  }

  get valuesWithdrawal(): number[] {
    return VALUES_WHITDRAWAL;
  }

  get whereAlias(): AbstractControl {
    return this.formNoCard.get('where');
  }

  public loadAmount(_a: Product, _b: string, _c: string, _d: string): string {
    return loadAmount(_a, _b, _c, _d);
  }

  get productsOrigin$(): Observable<Product[]> {
    return this.model.products$.pipe(
      map((products: ProductsInterface) => {
        return joinProducts(products).filter((product: Product) => {
          return (
            product.accountInformation.productType ===
              TYPE_ACCOUNTS.CURRENT_ACCOUNT ||
            product.accountInformation.productType ===
              TYPE_ACCOUNTS.DEPOSIT_ACCOUNT
          );
        });
      }),
    );
  }
  private _setDefaultValue(): void {
    combineLatest([this.model.productActive$, this.productsOrigin$])
      .pipe(
        take(1),
        map((data) => {
          return { productDetail: data[0], products: data[1], loans: null };
        }),
      )
      .subscribe((info) => {
        setInitialValueCustomInfo(
          info.productDetail,
          info.products,
          info.loans,
          this.formNoCard,
          ['product'],
        );
      })
      .unsubscribe();
  }
}

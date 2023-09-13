import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { Router } from '@angular/router';
import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { Product } from '@core/models/products/product';
import { IFormOneRecharge } from '@modules/recharge-phone/entities/formOne';
import { IOperators } from '@store/reducers/models/recharge/operators.reducer';
import {
  INavigateRechargePhone,
  NavigateRechargePhone,
} from '../../entities/routes';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepOneComponent implements OnInit {
  public formRecharge: FormGroup;

  constructor(private model: RechargeModel, private router: Router) {}

  ngOnInit(): void {
    this._initForm();
    this.model.setStep(1);
    this._setDefaultValue();
  }

  get operators$(): Observable<IOperators> {
    return this.model.operators$;
  }

  get productsOrigin$(): Observable<Product[]> {
    return this.model.product$.pipe(
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

  public retry(): void {
    this.model.loadOperators();
  }

  public compareFnOrigin(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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

  public submitForm(): void {
    this.model.setFormOne(this.formRecharge.value);
    this.model.setStep(2);
    this.router.navigate([this.navigate.step2]);
  }

  private _initForm(): void {
    this.model.formOne$
      .subscribe((data: IFormOneRecharge) => {
        this.formRecharge = new FormGroup({
          account_origin: new FormControl(
            validateData(data.account_origin, ''),
            [Validators.required],
          ),
          operator: new FormControl(validateData(data.operator, ''), [
            Validators.required,
          ]),
          phone_number: new FormControl(validateData(data.phone_number, ''), [
            Validators.required,
            Validators.pattern(/^[0-9]+$/),
            Validators.maxLength(10),
          ]),
          amount: new FormControl(validateData(data.amount, ''), [
            Validators.required,
            Validators.min(1000),
            Validators.max(100000),
            Validators.pattern(/^[0-9]+$/),
          ]),
        });
      })
      .unsubscribe();
  }

  private _setDefaultValue(): void {
    combineLatest([this.model.productActive$, this.productsOrigin$])
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
          this.formRecharge.controls['account_origin'].setValue(product);
        }
      });
  }
  get navigate(): INavigateRechargePhone {
    return NavigateRechargePhone;
  }
}

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { RegisterAffiliationData } from '@app/modules/registered-accounts/entities/register-affiliation';
import { RegisteredAccountsFacade } from '@app/modules/registered-accounts/registered-accounts.facade';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepOneComponent implements OnInit, OnDestroy {
  NEXT_STEP: number = 2;

  @Input()
  registerAffiliationProductData: RegisterAffiliationData;

  @Output()
  public saveInformation: EventEmitter<
    RegisterAffiliationData
  > = new EventEmitter();

  public formData: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public product: Product;

  constructor(private facade: RegisteredAccountsFacade) {}

  ngOnInit(): void {
    this._initForm();
  }

  protected _initForm(): void {
    this.formData = new FormGroup({
      product: new FormControl(this.setupDefaultProductValue(), [
        Validators.required,
      ]),
    });
  }

  setupDefaultProductValue(): Product {
    let product: Product = null;
    const incomingObjectIsNotNull =
      !isNullOrUndefined(this.registerAffiliationProductData) &&
      !isNullOrUndefined(this.registerAffiliationProductData.data);
    if (incomingObjectIsNotNull) {
      this.productsOrigin$.subscribe((products) => {
        product = products.find(
          (account) =>
            account.id ===
              this.registerAffiliationProductData.data.originAccountId &&
            account.typeAccount ===
              this.registerAffiliationProductData.data.originAccountType.toUpperCase(),
        );
      });
    }
    return product;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public submitForm(): void {
    const data = this.formData.value;
    const value: any = {
      originAccountId: data.product.id,
      originAccountType: data.product.typeAccount,
      originAccountName: data.product.accountInformation.productName,
    };
    let products = [];

    this.productsOrigin$
      .subscribe((origins) => (products = origins))
      .unsubscribe();
    this.submitActionHandler({
      step: this.NEXT_STEP,
      data: value,
      products: products.map((product) => {
        return {
          accountType: product.typeAccount,
          accountId: product.id,
        };
      }),
    });
  }

  protected submitActionHandler(data: RegisterAffiliationData): void {
    this.saveInformation.emit(data);
  }

  public compareFnOrigin(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  public trackByFn(index: number, product: Product): string {
    return product.id;
  }

  get productsOrigin$(): Observable<Product[]> {
    return this.facade.product$.pipe(
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
}

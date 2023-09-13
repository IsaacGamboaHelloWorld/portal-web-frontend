import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { CurrencyFormatPipe } from '@app/core/pipes/currency-format/currency-format.pipe';
import { LoadAmountPipe } from '@app/core/pipes/load-amount.pipe';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { compareSelect } from '@app/shared/helpers/compareSelect.helper';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { PRODUCT_ACTIVATE } from '@core/constants/comunication-keys';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { Product } from '@core/models/products/product';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import {
  advanceHowMuch,
  advanceRootRoute,
} from '@modules/advance/constants/routes';
import { StepService } from '@modules/advance/services/step.service';
import { SecurityService } from '@modules/security/services/security.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-to-who',
  templateUrl: './to-who.component.html',
  styleUrls: ['./to-who.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TypeCreditCardPipe, CurrencyFormatPipe, LoadAmountPipe],
})
export class ToWhoComponent implements OnInit {
  public formToWho: FormGroup;
  public productsCreditCard: object[] = [];
  public productsCurrentAccount: object[] = [];
  constructor(
    private fb: FormBuilder,
    private facade: AdvanceFacade,
    private stepService: StepService,
    private router: Router,
    private securityService: SecurityService,
    private dom: ManipulateDomService,
    private translate: TranslateService,
    private typeCreditCard: TypeCreditCardPipe,
    private currency: CurrencyFormatPipe,
    private loadAmount: LoadAmountPipe,
  ) {}

  ngOnInit(): void {
    this.stepService.setStep(1);

    this.productsCreditCard$.subscribe((data) => {
      if (data) {
        this.productsCreditCard = [];
        for (const i of data) {
          if (
            i.productAccountBalances &&
            i.productAccountBalances['cupo_disponible_avances_pesos'] &&
            i.productAccountBalances['cupo_disponible_avances_pesos'].amount
          ) {
            this.productsCreditCard = [
              ...this.productsCreditCard,
              {
                label:
                  this.translate.instant(
                    `SHORT_PRODUCT_NAMES.${i.typeAccount}`,
                  ) +
                  ' ' +
                  this.typeCreditCard.transform(i.id)['name'] +
                  ' ' +
                  String(i.id).slice(-4) +
                  ' ' +
                  this.loadAmount.transform(
                    i.loading,
                    this.currency.transform(
                      i.productAccountBalances['cupo_disponible_avances_pesos']
                        .amount,
                    ),
                    i.loaded,
                    this.translate.instant(`ADVANCE.TO_WHO.QUOTA`),
                    this.translate.instant(`TRANSFER.LOADING_AMOUNT`),
                  ),
                value: i,
                disabled: false,
              },
            ];
          }
        }
      }
    });

    this.productsCurrentAccount$.subscribe((data) => {
      if (data) {
        this.productsCurrentAccount = [];
        for (const i of data) {
          this.productsCurrentAccount = [
            ...this.productsCurrentAccount,
            {
              label:
                this.translate.instant(`PRODUCT_TYPES_SMALL.${i.typeAccount}`) +
                ' ' +
                String(i.id).slice(-4) +
                ' ' +
                this.translate.instant(`BANKS.${i.accountInformation.bank}`),
              value: i,
              disabled: false,
            },
          ];
        }
      }
    });
    this._initForm();
    this._setProduct();
    this.dom.scrollTop();
  }

  get productsCreditCard$(): Observable<Product[]> {
    return this.facade.products$.pipe(
      filter((products) => !!products && products.length > 0),
      map((products) => {
        return products.filter(
          (product) =>
            product.typeAccount === TYPE_ACCOUNTS.CREDIT_CARD &&
            product.enabled,
        );
      }),
    );
  }

  get productsCurrentAccount$(): Observable<Product[]> {
    return this.facade.products$.pipe(
      filter((products) => !!products && products.length > 0),
      map((products) => {
        return products.filter(
          // TODO:Delete filter
          (product) => product.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT, // &&  product.id === this.searchFlexcube(product.id),
        );
      }),
    );
  }

  public compareFnOrigin(item: any, itemTwo: any): boolean {
    return compareSelect(item, itemTwo, 'id');
  }

  public trackByFn(index: number, product: Product): string {
    return product.id;
  }

  public formSubmit(): void {
    const { origin, destination } = this.formToWho.value;
    this.facade.setToWho(origin, destination);
    this.stepService.setStep(2);
    this.router.navigate([`/${advanceRootRoute}/${advanceHowMuch}`]);
  }

  private _initForm(): void {
    this.facade.formGlobal$.pipe(take(1)).subscribe((data) => {
      this.formToWho = this.fb.group({
        origin: [validateData(data.origin, ''), Validators.required],
        destination: [validateData(data.destination, ''), Validators.required],
      });
    });
  }

  private _setProduct(): void {
    this.productsCreditCard$
      .pipe(
        take(1),
        filter((data) => !!data && data.length > 0),
      )
      .subscribe((products) => {
        if (!!this.securityService.getItem(PRODUCT_ACTIVATE)) {
          const key = this.securityService.getItem(PRODUCT_ACTIVATE);
          this.securityService.decryptAesGcm(key).then((id) => {
            const TC = products.find((product) => product.id === id);
            !!TC ? this.formToWho.controls['origin'].setValue(TC) : null;
          });
        }
      });
  }
}

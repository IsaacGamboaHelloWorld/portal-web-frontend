import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import {
  IPublicService,
  IRecurringPayment,
} from '../../entities/public-services';
import { PublicServicesFacade } from '../../public-services.facade';
import { BillerDetailState } from '../../store/reducers/biller-detail.reducer';
import { IRecurringPaymentState } from '../../store/reducers/recurring-payment.reducer';
import { IEditRecurringState } from '../../store/reducers/selected-recurring.reducer';

@Component({
  selector: 'app-recurring-popup',
  templateUrl: './recurring-popup.component.html',
  styleUrls: ['./recurring-popup.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RecurringPopupComponent implements OnInit, OnDestroy {
  public itemsRange: number = 5;
  public formRecurring: FormGroup;
  public options: object[] = [];
  public optionsProds: object[] = [];
  public currentPayment: BillerDetailState;
  public productOrigin: Product[];
  public stepOne: boolean = true;
  public ctaOrigin: boolean = false;
  public editMode: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _translate: TranslateService,
    private _modal: ModalService,
    private _facade: PublicServicesFacade,
  ) {}

  ngOnInit(): void {
    this.options.push({ label: 'En la fecha limite', value: 0 });
    for (let i = 1; i <= this.itemsRange; i++) {
      this.options.push({
        label:
          i >= 1
            ? i +
              ' ' +
              this._translate.instant('PAYMENTS.FORM_THREE.DAYS_BEFORE')
            : i +
              ' ' +
              this._translate.instant('PAYMENTS.FORM_THREE.DAY_BEFORE'),
        value: i,
      });
    }

    combineLatest(this.selectedPayment$, this.selectProductsOrigin$)
      .subscribe(([selectedPayment, allProducts]) => {
        this.currentPayment = selectedPayment;
        this.productOrigin = allProducts;
        if (allProducts) {
          for (const i of allProducts) {
            this.optionsProds = [
              ...this.optionsProds,
              {
                label:
                  this._translate.instant(
                    `PRODUCT_TYPES_SMALL.${i.typeAccount}`,
                  ) +
                  ' ' +
                  String(i.id).slice(-4) +
                  ' ' +
                  this._translate.instant(`BANKS.${i.accountInformation.bank}`),
                value: i,
                disabled: false,
              },
            ];
          }
        }
      })
      .unsubscribe();

    this._initForm();

    this.ctaOrigin = !!this.recurringAlias.value;

    this.recurringAlias.valueChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        if (
          !!data &&
          !!data.accountInformation &&
          !!data.accountInformation.accountIdentifier
        ) {
          this.ctaOrigin = true;
        }
      });
  }

  ngOnDestroy(): void {
    this._facade.clearEditRecurring();
  }

  private _initForm(): void {
    let amount = '';
    let date = 0;
    let account_origin = '';
    this.selectEditRecurring$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: any) => {
        this.editMode = false;
        if (!!data && !!data.recurring) {
          this.editMode = true;
          ({ amount, date, account_origin } = data.recurring);
        }
      });
    const accountItem: any = this.optionsProds.find(
      (item: any) => item.value.id === account_origin,
    );
    let accountProd = null;
    if (!!accountItem && !!accountItem.value) {
      accountProd = accountItem.value;
    }
    this.formRecurring = new FormGroup({
      account_origin: new FormControl(accountProd, [Validators.required]),
      amounttext: new FormControl(amount, [
        Validators.min(1),
        Validators.max(999999),
        Validators.required,
      ]),
      range: new FormControl(date, [Validators.required]),
    });
  }

  public back(): void {
    this.stepOne = true;
  }

  public setSecondStep(): void {
    this.stepOne = false;
  }

  public close(): void {
    this._modal.close();
  }

  public submitForm(): void {
    const mainProd: Product = this.formRecurring.controls.account_origin.value;
    combineLatest([this.selectedPayment$, this.selectedNoDataPayment$])
      .pipe(
        take(1),
        map((data) => {
          return { selected: data[0], nodata: data[1] };
        }),
      )
      .subscribe((info) => {
        const payInfo: IPublicService =
          !!info &&
          !!info.selected &&
          !!info.selected.data &&
          !!info.selected.data.billerPayment
            ? info.selected.data.billerPayment
            : info.nodata;
        const nickname: string = payInfo.billerNickName
          ? payInfo.billerNickName
          : payInfo.billerNickname;

        const data: IRecurringPayment = {
          billerId: payInfo.billerId,
          billerNickname: nickname ? nickname : info.nodata.billerNickname,
          contract: payInfo.contract,
          reference: payInfo.invoice,
          paymentType: 'X_DAYS_BEFORE_DUE_DATE',
          maxAmount: this.formRecurring.controls.amounttext.value,
          daysBeforeAfterExpiration: this.formRecurring.controls.range.value,
          originAccountId: mainProd.accountInformation.accountIdentifier,
          originAccountType: mainProd.accountInformation.productType,
          editMode: this.editMode,
        };
        this._facade.setRecurrent(data);
        this._modal.close();
      });
  }

  get selectProductsOrigin$(): Observable<Product[]> {
    return this._facade.selectedProductsOrigin$.pipe(
      map((product: Product[]) =>
        product.filter(
          (data) =>
            data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
            data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
        ),
      ),
    );
  }

  get recurring$(): Observable<IRecurringPaymentState> {
    return this._facade.selectRecurring$;
  }

  get infoPayment$(): Observable<IPublicService> {
    return combineLatest([
      this.selectedPayment$,
      this.selectedNoDataPayment$,
    ]).pipe(
      take(1),
      map((combined) => {
        return !!combined[0] &&
          !!combined[0].data &&
          !!combined[0].data.billerPayment
          ? combined[0].data.billerPayment
          : combined[1];
      }),
    );
  }

  get selectedPayment$(): Observable<BillerDetailState> {
    return this._facade.selectedPayment$;
  }

  get selectedNoDataPayment$(): Observable<IPublicService> {
    return this._facade.selectedNotDataPayment$;
  }

  get selectEditRecurring$(): Observable<IEditRecurringState> {
    return this._facade.selectEditRecurring$;
  }

  get recurringAlias(): AbstractControl {
    return this.formRecurring.get('account_origin');
  }
}

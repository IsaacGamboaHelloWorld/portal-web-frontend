import {
  ChangeDetectionStrategy,
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
import { ActivatedRoute, Router } from '@angular/router';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { UserSecureDataMdmResponse } from '@app/core/models/user/get-user-secure-data-mdm';
import { SecurityService } from '@app/modules/security/services/security.service';
import { IDsDropDown } from '@app/shared/ds/ds-dropdown-select/constants/ds-dropdown-interface';
import { isAccountFC } from '@app/shared/helpers/check-sfb';
import { getDatesPfm } from '@app/shared/helpers/datePFM.helper';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { _fullNavigate, INavigatePfm } from '../../constans/navigate-pfm';
import {
  IOptionTabs,
  mapTabForOperationType,
  optionTabsEnum,
} from '../../constans/tabs-options.enum';
import { TypeProductPfm } from '../../constans/type-product-pfm.enum';
import { DetailProductPFMModel } from '../../detail-product-pfm.model';
import { PfmMovimentRequest, TypeItemPfm } from '../../entities';
import {
  PfmExpenseData,
  PfmExpenseV2,
} from '../../entities/detail-expense-pfm';
import { PfmProduct, PfmProductData } from '../../entities/detail-product-pfm';
import { IDatePfm, TapOptionPfm } from '../../entities/tap-option-pfm';
import { IPfmMovimentsState } from '../../store';
import { IPfmExpensesState } from '../../store/reducer/pfm-exprenses.reducers';
import { Product } from './../../../../core/models/products/product';
import { DatePfm } from './../../../../shared/helpers/datePFM.helper';

@Component({
  selector: 'app-home-pfm',
  templateUrl: './home-pfm.component.html',
  styleUrls: ['./home-pfm.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePFMComponent implements OnInit, OnDestroy {
  public optionsMonths: IDsDropDown[];
  public form: FormGroup;
  public dateFormName: string = 'date';
  public productFormName: string = 'product';
  public monthName: string;
  public optionTabs: TapOptionPfm[] = [
    {
      id: optionTabsEnum.resumen,
      label: optionTabsEnum.resumen,
    },
    {
      id: optionTabsEnum.incomens,
      label: optionTabsEnum.incomens,
    },
    {
      id: optionTabsEnum.expenses,
      label: optionTabsEnum.expenses,
    },
  ];
  public optionAccounts: any[] = [];
  public fromCard: boolean = false;
  public tabSelected: TapOptionPfm;

  private account: { type: string; id: string };
  private months: DatePfm[];
  private destroy$: Subject<boolean>;
  private typeForExpenses: TypeItemPfm = 'D';
  private monthSelected: string = '';
  private yearSelected: string = '';
  private isFirstTime: boolean = true;
  private dateSelected: IDatePfm;

  constructor(
    private model: DetailProductPFMModel,
    private route: ActivatedRoute,
    private router: Router,
    private security: SecurityService,
    private translate: TranslateService,
  ) {
    this.optionsMonths = [];
    this.destroy$ = new Subject<boolean>();
    this.tabSelected = this.optionTabs[0];
  }

  ngOnInit(): void {
    this._readQueryParams();
    this._mapOptionsMonth();
    this._initForm();
    this.pfmIsFirstTime$
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.subsIsFirstTime.bind(this));
    this._subsDate();
    this._subsProduct();
    this._subsPFM();
    this.pfmDateSelected$
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.subsDateSelected.bind(this));
    this.model.resetRecategorization();
    this.pfmTapSelected$
      .pipe(takeUntil(this.destroy$))
      .subscribe(this.subsTabSelected.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private async _checkParams(params: {
    type: string;
    id: string;
  }): Promise<void> {
    if (!isNullOrUndefined(params.type) && !isNullOrUndefined(params.id)) {
      const id = await this.security.decryptAesGcm(params.id);
      this.account = {
        ...params,
        id,
      };
      this._mapOptionsProduct();
    }
  }

  private _mapOptionsMonth(): void {
    this.months = getDatesPfm();
    this.months.forEach((m) =>
      this.optionsMonths.push({
        label: m.label,
        value: `${m.year}-${m.month}`,
      }),
    );
  }

  private _mapOptionsProduct(): void {
    this.optionAccounts = [
      {
        label:
          this.translate.instant(
            `PFM_PRODUCT_DETAIL.PRODUCT_TYPES.${this.account.type.toUpperCase()}`,
          ) + ` ${this.account.id.slice(-4)}`,
        value: this.account,
      },
    ];
  }

  get mapProducts$(): Observable<any> {
    return this.productsOrigin$.pipe(
      map((data: any[]) => {
        if (!isNullOrUndefined(data)) {
          if (this.fromCard) {
            const mapOne = data.map((item: any) => {
              return {
                label:
                  this.translate.instant(
                    `PFM_PRODUCT_DETAIL.PRODUCT_TYPES.${item.typeAccount.toUpperCase()}`,
                  ) + ` ${item.id.slice(-4)}`,
                value: item,
              };
            });
            return [
              {
                label: this.translate.instant(
                  `PFM_PRODUCT_DETAIL.ALL_ACCOUNTS`,
                ),
                value: null,
              },
              ...mapOne,
            ];
          }
        }
        if (!!this.account) {
          return [
            {
              label:
                this.translate.instant(
                  `PFM_PRODUCT_DETAIL.PRODUCT_TYPES.${this.account.type.toUpperCase()}`,
                ) + ` ${this.account.id.slice(-4)}`,
              value: this.account,
            },
          ];
        }
      }),
    );
  }

  private _initForm(): void {
    this.form = new FormGroup({
      [this.dateFormName]: new FormControl('', Validators.required),
      [this.productFormName]: new FormControl(''),
    });
  }

  private _subsDate(): void {
    this.dateAlias.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(this._changeRequestPFM.bind(this));
  }

  private _subsProduct(): void {
    this.productAlias.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((product: Product) => {
        if (!!product && this.fromCard) {
          const id = product.id;
          const type = !!product.type ? product.type : product.typeAccount;
          const date = this.dateAlias.value;
          this.account = {
            id,
            type,
          };
          this._changeRequestPFM(date);
        }
      });
  }

  private _subsPFM(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (params: { type: string; id: string }) => {
        await this._checkParams(params);
      });
  }

  private _readQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: any) => {
        this.fromCard = !!params['fromCard'];
      });
  }

  private _changeRequestPFM(date: string): void {
    const split = date.split('-');
    if (split.length <= 1) {
      return;
    }
    const year = split[0];
    const month = split[1];
    this.model.dateSelected({
      month,
      year,
    });
  }

  private _setMonthName(month: string = '', year: string = ''): void {
    let monthInit = month;
    let yearInit = year;
    if (month === '' && year === '') {
      const now = new Date();
      monthInit = now.getMonth().toString();
      yearInit = now.getFullYear().toString();
    }
    this.yearSelected = yearInit;
    this.monthSelected = monthInit;
    this.model.pfmProductReset();
    this.model.fetchProductPfm(monthInit, yearInit);
    const monthFound = this.months.find(
      (i: DatePfm) =>
        i.month.toString() === monthInit && i.year.toString() === yearInit,
    );
    if (!!monthFound) {
      this.monthName = monthFound.monthName;
    }
  }

  public tabOptionChange(event: any): void {
    const { detail } = event;
    this.tabSelected = detail;
    const { id } = detail;
    this.model.tabSelected(id);
    if (
      (detail.id === optionTabsEnum.expenses ||
        detail.id === optionTabsEnum.incomens) &&
      this.monthSelected !== ''
    ) {
      this.typeForExpenses = mapTabForOperationType[id];
      this.model.pfmExpensesReset();
      this.model.fetchExpesesPfm(
        this.monthSelected,
        this.yearSelected,
        this.typeForExpenses,
        this.mapTypeAccount,
      );
    }
  }

  get dateAlias(): AbstractControl {
    return this.form.get(this.dateFormName);
  }

  get productAlias(): AbstractControl {
    return this.form.get(this.productFormName);
  }

  get getTabs(): IOptionTabs {
    return optionTabsEnum;
  }

  get pfmProductLoading$(): Observable<boolean> {
    return this.model.pfmProductLoading$;
  }

  get pfmProductData$(): Observable<PfmProductData> {
    return this.model.pfmProductData$;
  }

  get mapPfmData$(): Observable<PfmProduct> {
    return this.model.pfmProductData$.pipe(
      map((data: PfmProductData) => {
        if (
          !isNullOrUndefined(data) &&
          !isNullOrUndefined(data.products) &&
          !isNullOrUndefined(this.account.id) &&
          !isNullOrUndefined(this.account.type)
        ) {
          return this._findProduct(data);
        }
      }),
    );
  }

  private _findProduct(data: PfmProductData): PfmProduct {
    const product = data.products.find(
      (p: PfmProduct) =>
        p.accountNumber === this.account.id &&
        p.type === TypeProductPfm[this.account.type.toUpperCase()],
    );
    return product;
  }

  get mapTypeAccount(): string {
    return !isNullOrUndefined(this.account) &&
      !isNullOrUndefined(this.account.type)
      ? TypeProductPfm[this.account.type.toUpperCase()]
      : '';
  }

  get productsOrigin$(): Observable<any> {
    return this.model.products$.pipe(
      map((product: any) => {
        if (
          !isNullOrUndefined(product) &&
          !isNullOrUndefined(product[TYPE_ACCOUNTS.DEPOSIT_ACCOUNT])
        ) {
          return product[TYPE_ACCOUNTS.DEPOSIT_ACCOUNT].filter((data) =>
            isAccountFC(
              data.accountInformation.accountIdentifier,
              TYPE_ACCOUNTS.DEPOSIT_ACCOUNT,
              true,
            ),
          );
        }
      }),
    );
  }

  get pfmExpenseLoading$(): Observable<boolean> {
    return this.model.pfmExpensesLoading$;
  }

  get pfmExpensesData$(): Observable<PfmExpenseV2> {
    return this.model.pfmExpensesData$.pipe(
      map((data: PfmExpenseData) => {
        if (
          !isNullOrUndefined(data) &&
          !isNullOrUndefined(data.products) &&
          !isNullOrUndefined(this.account.id) &&
          !isNullOrUndefined(this.account.type)
        ) {
          return this._findExpense(data);
        }
      }),
    );
  }

  private _findExpense(data: PfmExpenseData): PfmExpenseV2 {
    const expense = data.products.find(
      (p: PfmExpenseV2) => p.accountNumber === this.account.id,
    );
    return expense;
  }

  get pfmExpenses$(): Observable<IPfmExpensesState> {
    return this.model.pfmExpenses$;
  }

  get pfmMoviments$(): Observable<IPfmMovimentsState> {
    return this.model.pfmMoviments$;
  }

  get userInfoData$(): Observable<UserSecureDataMdmResponse> {
    return this.model.userInfoData$;
  }

  public expensesSelected(event: CustomEvent): void {
    const { detail } = event;
    const { code, value, name } = detail;
    const state: PfmMovimentRequest = {
      idProduct: this.account.id,
      month: this.monthSelected,
      year: this.yearSelected,
      idCategory: code,
      total: value,
      name,
    };
    this.router.navigate([this.fullNavigate.recategorization], {
      state,
    });
  }

  get fullNavigate(): INavigatePfm {
    return _fullNavigate;
  }

  get pfmDateSelected$(): Observable<IDatePfm> {
    return this.model.pfmDateSelected$;
  }

  get pfmTapSelected$(): Observable<optionTabsEnum> {
    return this.model.pfmTapSelected$;
  }

  get pfmIsFirstTime$(): Observable<boolean> {
    return this.model.pfmIsFirstTime$;
  }

  private subsTabSelected(tab: optionTabsEnum): void {
    const option = this.optionTabs.find((i) => i.id === tab);
    const event = {
      detail: option,
    };
    this.tabOptionChange(event);
  }

  private subsDateSelected(date: IDatePfm): void {
    if (!date.year) {
      return;
    }
    this.monthSelected = date.month;
    this.yearSelected = date.year;
    const dateString = `${date.year}-${date.month}`;
    this.dateSelected = date;
    const dateOption = this.optionsMonths.find((d) => d.value === dateString);
    this.yearSelected = date.year;
    this.monthSelected = date.month;
    this._setMonthName(date.month, date.year);
    this.model.pfmProductReset();
    this.model.fetchProductPfm(date.month, date.year);
  }

  private subsIsFirstTime(value: boolean): void {
    this.isFirstTime = value;
  }
  // tslint:disable-next-line:max-file-line-count
}

import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { DataOption } from '@app/core/interfaces/option-module.interface';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { initGreeting } from '@app/shared/helpers/greetings.helper';
import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import { STANDARD_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { UserSecureDataMdmState } from '@app/store/reducers/global/user/user-get-secure-data-mdm.reducer';
import { FreeDestinyState } from '@app/store/reducers/models/free-destiny/free-destinations.reducer';
import { ProductsInterface } from '@core/interfaces/products.interface';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { ModalOtherProductsComponent } from '@modules/home/components/modal-other-products/modal-other-products.component';
import { ModalProductActionsComponent } from '@modules/home/components/modal-product-actions/modal-product-actions.component';
import { IStocksAllParams } from '@modules/home/entities/stocks.interface';
import { HomeModel } from '@modules/home/home.model';
import { IStocksPeriodState } from '@modules/home/store/reducers/stocks/stocks-period.reducer';
import { IStocksTypeState } from '@modules/home/store/reducers/stocks/stocks-type.reducer';
import { TranslateService } from '@ngx-translate/core';
import { OtherProduct } from '@store/reducers/models/products/other-products.reducer';
import { ProductsState } from '@store/reducers/models/products/products.reducer';
import { IToPlusState } from '@store/reducers/models/to-plus/to-plus.reducer';
import { Observable, Subject } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { INicknamesAll } from '../detail-product/entities/nicknames';
import { IOrderPaymentAll } from './entities/order-of-payment';

@Component({
  selector: 'app-home',
  templateUrl: './home.container.html',
  styleUrls: ['./home.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeContainer implements OnInit, OnDestroy {
  public loadingProducts: string[] = Array(1).fill([]);
  public offersProducts: Array<{
    img: string;
    name: string;
    title: string;
    desc: string;
    btn: string;
  }> = this.translateService.instant('HOME.OFFER_PRODUCTS_CONTENT');
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public offerProductsContent: string = this.translateService.instant(
    'HOME.SET_OFFER_PRODUCT',
  );
  public cdtProductsContent: string = this.translateService.instant(
    'HOME.SET_CDT_PRODUCT',
  );
  public openCreditCardContent: string = this.translateService.instant(
    'HOME.SET_OPEN_CREDIT_CARD',
  );

  constructor(
    private model: HomeModel,
    private translateService: TranslateService,
    private dom: ManipulateDomService,
    private modalService: ModalService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.dom.scrollTop();
    this._fetchServices();
    this._closeModal();
    this.setNicknames();
    this.offersProducts =
      typeof this.offersProducts === 'object'
        ? this.offersProducts.filter(
            (e) =>
              e['name'] === this.offerProductsContent ||
              e['name'] === this.cdtProductsContent ||
              e['name'] === this.openCreditCardContent,
          )
        : [];
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public setNicknames(): void {
    combineLatest([this.nicknames$, this.products$]).subscribe(
      ([nick, products]: any) => {
        if (nick && nick.nicknames !== null) {
          for (const dataNick of nick.nicknames) {
            if (products) {
              for (const key of Object.keys(products)) {
                products[key].forEach((info, i) => {
                  switch (info.accountInformation.accountIdentifier) {
                    case dataNick.accountId:
                      products[key][i].accountInformation.productName =
                        dataNick.name;
                      break;
                  }
                });
              }
            }
          }
        }
      },
    );
  }

  get greeting(): string {
    return initGreeting(
      this.translateService.instant('GREETINGS.MORNING'),
      this.translateService.instant('GREETINGS.AFTERNOON'),
      this.translateService.instant('GREETINGS.NIGHT'),
    );
  }

  get hasProducts$(): Observable<boolean> {
    return this.products$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      map((products: ProductsInterface) => joinProducts(products).length > 0),
    );
  }

  get infoProducts$(): Observable<ProductsState> {
    return this.model.infoProducts$;
  }

  get products$(): Observable<ProductsInterface> {
    return combineLatest([this.model.products$, this.model.optionModule$]).pipe(
      map(([product, options]) => {
        if (options.success && product && options.data) {
          return this._mapProductsCombine(product, options.data);
        } else {
          return product;
        }
      }),
    );
  }

  private _mapProductsCombine(
    product: ProductsInterface,
    options: DataOption,
  ): ProductsInterface {
    const result = {
      CURRENT_ACCOUNT: [],
      CREDIT: [],
      DEPOSIT_ACCOUNT: [],
      CERTIFIED_DEPOSIT_TERM: [],
      CREDIT_CARD: [],
    };
    const opt = options.products.options;
    if (opt.current_account && product.CURRENT_ACCOUNT) {
      result.CURRENT_ACCOUNT = [...product.CURRENT_ACCOUNT];
    }
    if (opt.credit && product.CREDIT) {
      result.CREDIT = [...product.CREDIT];
    }
    if (opt.deposit_account && product.DEPOSIT_ACCOUNT) {
      result.DEPOSIT_ACCOUNT = [...product.DEPOSIT_ACCOUNT];
    }
    if (opt.cdt && product.CERTIFIED_DEPOSIT_TERM) {
      result.CERTIFIED_DEPOSIT_TERM = [...product.CERTIFIED_DEPOSIT_TERM];
    }
    if (opt.credit_card && product.CREDIT_CARD) {
      result.CREDIT_CARD = [...product.CREDIT_CARD];
    }
    return result;
  }

  get freeDestiny$(): Observable<FreeDestinyState> {
    return this.model.freeDestiny$;
  }

  get freeDestinations$(): Observable<any> {
    return this.model.freeDestinations$;
  }

  get libranza$(): Observable<IOrderPaymentAll> {
    return this.model.orderOfPayment$.pipe(
      filter((data) => data.success && data.payrollLoans.length > 0),
    );
  }

  get name$(): Observable<string> {
    return this.model.userInfo$.pipe(
      map((userState) =>
        this.hasName(userState)
          ? userState.data.PartyAssociation[0].PersonInfo.PersonName[0]
              .FirstName +
            ' ' +
            userState.data.PartyAssociation[0].PersonInfo.PersonName[0].LastName
          : '',
      ),
    );
  }

  get hasName$(): Observable<boolean> {
    return this.model.userInfo$.pipe(map((data) => this.hasName(data)));
  }

  get toPlus$(): Observable<IToPlusState> {
    return this.model.toPlus$;
  }

  get hasToPlus$(): Observable<boolean> {
    return this.toPlus$.pipe(map((toPlus) => !isNullOrUndefined(toPlus.data)));
  }

  get otherProducts$(): Observable<OtherProduct[]> {
    return this.model.otherProducts$;
  }

  get check$(): Observable<boolean> {
    return this.model.otherProductsShow$;
  }

  get hasActions$(): Observable<boolean> {
    return this.model.stocksType$.pipe(
      map((type) => !!type.data && type.data.length > 0),
    );
  }

  get stocksPeriod$(): Observable<IStocksPeriodState> {
    return this.model.stocksPeriod$;
  }

  get stocksTypes$(): Observable<IStocksTypeState> {
    return this.model.stocksType$;
  }

  get hasOffers(): boolean {
    return Array.isArray(this.offersProducts) && this.offersProducts.length > 0;
  }

  get nicknames$(): Observable<INicknamesAll> {
    return this.model.nicknames$;
  }

  public identify(index: number, item: { key: string }): string {
    return item.key;
  }

  public loadOtherBank(name: string): void {
    this.model.loadOtherBank(name);
  }

  public loadOtherProducts(check: boolean): void {
    this.model.showOtherProducts(check);
    if (check) {
      this.model.loadOtherBanks();
      this.model.hasOtherProducts$
        .subscribe((data) => {
          if (!isNullOrUndefined(data) && data) {
            this.dom.scrollToDivById('other-products');
          } else {
            this.modalService.open(ModalOtherProductsComponent);
          }
        })
        .unsubscribe();
    }
  }
  public openActions(params: IStocksAllParams): void {
    this.model.fetchStocksAll(params);
    this.modalService.open(
      ModalProductActionsComponent,
      true,
      STANDARD_WIDTH,
      true,
      params,
    );

    setTimeout(() => this._actionsModal(), 10);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.modalService.close();
      });
    }
  }

  private _closeModal(): void {
    this.router.events
      .pipe(
        takeUntil(this._destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart),
      )
      .subscribe((_) => {
        this.modalService.close();
      });
  }

  private _fetchServices(): void {
    this.model.fetchProducts();
    this.model.fetchFreeDestinationsAll();
    this.model.fetchToPlus();
    this.model.fetchStocksPeriod();
    this.model.fetchStocksType();
    this.model.nicknamesAll();
  }

  hasName(userState: UserSecureDataMdmState): boolean {
    return (
      !!userState &&
      !!userState.data &&
      userState.data.success &&
      !!userState.data.PartyAssociation &&
      !!userState.data.PartyAssociation[0] &&
      !!userState.data.PartyAssociation[0].PersonInfo &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0] &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0].FirstName &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0].LastName
    );
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }
  // tslint:disable-next-line:max-file-line-count
}

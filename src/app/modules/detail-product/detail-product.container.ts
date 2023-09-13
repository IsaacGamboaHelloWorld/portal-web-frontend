import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { isAccountFC } from '@app/shared/helpers/check-sfb';
import { validateEmpty } from '@app/shared/helpers/validateData.helper';
import { DEFAULT_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { UserPocketsState } from '@app/store/reducers/models/pockets/user-pockets.reducer';
import { INavigate, Navigate } from '@core/constants/navigate';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { TypeProduct } from '@core/interfaces/product_type.interface';
import { Product } from '@core/models/products/product';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { FilterDateComponent } from '@modules/detail-product/components/filter-date/filter-date.component';
import { DATE_FILTER } from '@modules/detail-product/constants/filter';
import { DetailProductModel } from '@modules/detail-product/detail-product.model';
import { SecurityService } from '@modules/security/services/security.service';
import { MovementFilterState } from '@store/reducers/models/movements/filterMovement.reducer';
import { MovementsState } from '@store/reducers/models/movements/movement.reducer';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { BANKS } from '../../core/constants/banks';
import { downloadFile } from '../../shared/helpers/downloadFile.helpers';
import { IProductActive } from '../../store/reducers/models/product-active/product-active.reducer';
import { DetailProductPFMModel } from '../detail-product-pfm/detail-product-pfm.model';
import { IOrderPaymentAll } from '../home/entities/order-of-payment';
import { HomeModel } from '../home/home.model';
import { FreeDestinationDetail } from './../../core/interfaces/free-destination.interface';

@Component({
  selector: 'app-container-detail-product',
  templateUrl: './detail-product.container.html',
  styleUrls: ['./detail-product.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailProductContainer implements OnDestroy, OnInit {
  public account: { type: string; id: string; dataComplete?: object } = {
    type: '',
    id: '',
    dataComplete: null,
  };
  public freeDestination: FreeDestinationDetail;
  public ACCOUNT: TypeProduct = TYPE_ACCOUNTS;
  public cdtData: any;
  public textFilter: string = '';
  public isCDT: boolean = false;
  public isFreeDestination: boolean = false;
  public filterAvailable: boolean;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public filterState: boolean = false;
  public emptyState: boolean = true;
  public viewPayrollLoans: boolean;

  constructor(
    private route: ActivatedRoute,
    private dom: ManipulateDomService,
    private model: DetailProductModel,
    private modelPayrollLoans: HomeModel,
    private security: SecurityService,
    private modalService: ModalService,
    private router: Router,
    private modelPFM: DetailProductPFMModel,
    @Inject('isMobile') public isMobile: boolean,
  ) {}

  ngOnInit(): void {
    this.modelPFM.tabSelectedReset();
    this.modelPFM.dateSelectedReset();
    this.modelPFM.productSelectedReset();
    this.modelPFM.isFirstTime(true);
    this.product$.subscribe((dataProduct) => {
      if (dataProduct) {
        this.account.dataComplete = dataProduct['accountInformation'];
      }
    });
    this.dom.scrollTop();
    this.route.params
      .subscribe(
        (params: { type: string; id: string; accountIdentifier?: string }) => {
          if (
            !isNullOrUndefined(params.type) &&
            !isNullOrUndefined(params.id)
          ) {
            this.security.decryptAesGcm(params.id).then((data) => {
              this.account.type = params.type;
              this.account.id = data;
              this.viewPayrollLoans =
                this.account.type.toUpperCase() === this.ACCOUNT.PAYROLLLOAN;
              if (
                this.account.type ===
                TYPE_ACCOUNTS.FREE_DESTINATION.toLowerCase()
              ) {
                this._setFreeDestination();
                return;
              }
              this.model.fetchMovement(params.type, data);
              this.model.saveInfoMovement(params.type, data);
              this.fetchDetail();
              if (params.type === 'certified_deposit_term') {
                this.isCDT = true;
              }
            });
          }
        },
      )
      .unsubscribe();
    this._closeModal();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.model.clearDetailProduct();
    this.model.clearMovement();
    this.dom.removeClass('#opt_products', 'active');
  }

  get hasFilter$(): Observable<boolean> {
    return this.model.movementFilter$.pipe(
      map(
        (data) => !isNullOrUndefined(data.typeFilter) && data.typeFilter !== '',
      ),
    );
  }

  get filterInfo$(): Observable<MovementFilterState> {
    return this.model.movementFilter$;
  }

  get isDate$(): Observable<boolean> {
    return this.filterInfo$.pipe(
      map(
        (data) =>
          !isNullOrUndefined(data.typeFilter) &&
          data.typeFilter === DATE_FILTER,
      ),
    );
  }

  get hasMovements$(): Observable<boolean> {
    return this.movements$.pipe(
      map((data: MovementsState) => {
        this.filterAvailable = !isNullOrUndefined(data.account);
        return (
          (!isNullOrUndefined(data.account) &&
            (!isNullOrUndefined(data.account.operations) ||
              !isNullOrUndefined(data.account.creditCardMovements))) ||
          this.isCDT
        );
      }),
    );
  }

  get hasInfoProduct$(): Observable<boolean> {
    return this.product$.pipe(map((data) => !isNullOrUndefined(data)));
  }

  get hasFreeDestinationDetail$(): Observable<boolean> {
    return this.freeDestinations$.pipe(map((data) => !isNullOrUndefined(data)));
  }

  get product$(): Observable<any> {
    return this.model.product$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      map((products: Product[]) =>
        products.find(
          (product) =>
            product.id === this.account.id &&
            product.typeAccount === this.account.type.toUpperCase(),
        ),
      ),
    );
  }

  get freeDestinations$(): Observable<any> {
    return this.model.freeDestinations$.pipe(
      filter((data) => !isNullOrUndefined(data)),
      map((products: FreeDestinationDetail[]) =>
        products.find(
          (product) => product.accountIdentifier === this.account.id,
        ),
      ),
    );
  }

  get payrollLoans$(): Observable<IOrderPaymentAll> {
    return this.modelPayrollLoans.orderOfPayment$;
  }

  get pockets$(): Observable<UserPocketsState> {
    return this.model.pockets$;
  }

  get movements$(): Observable<MovementsState> {
    return this.model.movement$;
  }

  get isSafari(): boolean {
    return this.dom.isSafari();
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }

  public openFilter(): void {
    this.modalService.open(FilterDateComponent, true, `${DEFAULT_WIDTH}`);
  }

  public openSearchBox(): void {
    this.filterState = !this.filterState;

    if (!this.filterState) {
      this.textFilter = '';
      this.emptyState = true;
    }
  }

  public doClear(event: any): void {
    event.preventDefault();
    this.textFilter = '';
    this.emptyState = true;
  }

  public onChange(event: any): void {
    if (this.textFilter === '') {
      this.emptyState = true;
    }
  }

  public onKeyUp(event: any): void {
    this.emptyState = this.textFilter === '';
  }

  get navigate(): INavigate {
    return Navigate;
  }

  public fetchMovement(): void {
    if (
      !isNullOrUndefined(this.account) &&
      !isNullOrUndefined(this.account.id)
    ) {
      this.filterInfo$
        .subscribe((data) => {
          this.model.fetchMovement(
            this.account.type,
            this.account.id,
            validateEmpty(data.from, ''),
            validateEmpty(data.to, ''),
          );
        })
        .unsubscribe();
    }
  }

  public fetchDetail(): void {
    if (
      !isNullOrUndefined(this.account) &&
      !isNullOrUndefined(this.account.id)
    ) {
      this.model.fetchDetailProduct(this.account.type, this.account.id);
    }
  }

  public removeFilter(): void {
    this.model.resetMovements();
    this.model.resetFilter();
    this.fetchMovement();
  }

  public fetchPockets(): void {
    this.model.fetchPockets();
  }

  public redirect(url: string): void {
    if (this.account.type === 'credit_card') {
      const dataToSave: IProductActive = {
        type: this.account.type,
        id: this.account.id,
        name: 'Tarjeta de crédito',
        bank: '0002',
        bank_name: BANKS.BANCO_POPULAR,
      };
      this.model.setProduct(dataToSave);
    } else {
      this.model.setProduct(this.account);
    }
    this.router.navigate([url]);
  }

  private _setFreeDestination(): void {
    this.isFreeDestination = true;
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

  public doDownloadFile(): void {
    this.movements$
      .subscribe((data) => {
        downloadFile(data.account.base64);
      })
      .unsubscribe();
  }

  public goToPFM(): void {
    this.security.encryptAesGcm(this.account.id.toString()).then((data) => {
      this.router.navigate([
        Navigate.detailPFM,
        this.account.type.toLowerCase(),
        data,
      ]);
      this.dom.scrollTop();
    });
  }

  get isFlexcubePFM(): boolean {
    return isAccountFC(this.account.id, this.account.type.toUpperCase(), true);
  }
  // tslint:disable-next-line:max-file-line-count
}

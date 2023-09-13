import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { compareSelect } from '@app/shared/helpers/compareSelect.helper';
import { InfoModal } from '@app/shared/helpers/infoModal.helper';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { AlertCloseComponent } from '@core/components/alert-close/alert-close.component';
import { INavigate, Navigate } from '@core/constants/navigate';
import { MESSAGE_NOT_PRODUCTS } from '@core/constants/registered_accounts';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { IFormOneTransferInterface } from '@core/interfaces/formOneTransfer.interface';
import { IProductAffiliationElement } from '@core/interfaces/product-destination.interface';
import { Product } from '@core/models/products/product';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { RegisteredAccountsFacade } from '@modules/registered-accounts/registered-accounts.facade';
import { DestinationProductsState } from '@store/reducers/models/transfer/destination-products/destination-products.reducer';
import { Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-home-registered-accounts',
  templateUrl: './home-registered-accounts.component.html',
  styleUrls: ['./home-registered-accounts.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeRegisteredAccountsComponent implements OnInit, OnDestroy {
  public formAccounts: FormGroup;
  public product: IProductAffiliationElement;
  public active: number;
  public loadings: number = 3;
  public retry: number = 0;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private facade: RegisteredAccountsFacade,
    public router: Router,
    private dom: ManipulateDomService,
    private modalService: ModalService,
    @Inject('isMobile') public isMobile: boolean,
  ) {}

  ngOnInit(): void {
    this.dom.scrollTop();
    this._initForm();
    this.affiliation$
      .pipe(
        takeUntil(this._destroy$),
        filter((_) => !!_),
      )
      .subscribe((data) => {
        if (data.loading) {
          this.product = this.active = null;
        }
        if (data.loaded) {
          this.retry = 0;
        }
      });
  }

  ngOnDestroy(): void {
    this.facade.resetDestination();
    this._destroy$.next(true);
    this._destroy$.complete();
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

  get limitRetry(): boolean {
    return this.retry >= 3;
  }

  get affiliation$(): Observable<DestinationProductsState> {
    return this.facade.affiliation$.pipe(
      map((state: DestinationProductsState) => {
        state.products = isNullOrUndefined(state.products)
          ? null
          : state.products.filter(
              (product) =>
                !(
                  product.destinationAccountId.includes(
                    this.formAccounts.controls['account_origin'].value.id,
                  ) &&
                  product.destinationAccountType ===
                    this.formAccounts.controls['account_origin'].value
                      .typeAccount
                ),
            );
        return state;
      }),
    );
  }

  get hasAccount(): Observable<boolean> {
    return this.affiliation$.pipe(
      map((data) => !!data.products && data.products.length > 0),
    );
  }

  get hasProducts$(): Observable<boolean> {
    return this.affiliation$.pipe(
      filter((data: DestinationProductsState) => !!data && !!data.products),
      map((affiliation) => affiliation.products.length > 0),
    );
  }

  get hasProduct(): boolean {
    return !!this.product;
  }

  get hasMessageNotProduct$(): Observable<boolean> {
    return this.affiliation$.pipe(
      map(
        (affiliation) =>
          !!affiliation.errorMessage &&
          affiliation.errorMessage.includes(MESSAGE_NOT_PRODUCTS),
      ),
    );
  }

  public clickProduct(
    product: IProductAffiliationElement,
    index: number,
  ): void {
    this.product = product;
    this.active = index;
    this.dom.scrollTop();
  }

  public trackByFn(index: number, product: Product): string {
    return product.id;
  }

  public changeProduct(): void {
    this.facade.resetDestination();
    this.active = this.product = null;
    this.facade.fetchDestinationProducts(
      this.formAccounts.controls['account_origin'].value.id,
      this.formAccounts.controls['account_origin'].value.typeAccount,
    );
  }

  public back(): void {
    this.router.navigate([Navigate.transfer]);
  }

  public backMask(): void {
    if (!!this.product) {
      this.product = this.active = null;
      this.dom.scrollTop();
    } else {
      this.back();
    }
  }

  public btnRetry(): void {
    this.retry++;
    this.facade.fetchDestinationProducts(
      this.formAccounts.value.account_origin.id,
      this.formAccounts.value.account_origin.typeAccount,
    );
  }

  public deleteAffiliation(): void {
    this.modalService.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }

  public transfer(registration: boolean = false): void {
    let accountOrigin: Product;
    this.extractOriginAccount(
      validateData(this.formAccounts.controls['account_origin'].value.id, ''),
      validateData(
        this.formAccounts.controls['account_origin'].value.typeAccount,
        '',
      ),
    )
      .subscribe((data) => {
        if (!!data && data.length !== 0) {
          accountOrigin = data[0];
        }
      })
      .unsubscribe();
    const transferAccount: IFormOneTransferInterface = {
      account_origin: accountOrigin,
      productType: null,
      bank: { name: null, value: null },
      accountIdentifier: null,
      name: null,
      identificationNumber: null,
      identificationType: null,
      account_destination: {
        destinationAccountId: validateData(
          this.product.destinationAccountId,
          '',
        ),
        destinationAccountType: validateData(
          this.product.destinationAccountType,
          '',
        ),
        customerId: validateData(this.product.customerId, ''),
        customerIdType: validateData(this.product.customerIdType, ''),
        customerName: validateData(this.product.customerName, ''),
        email: validateData(this.product.email, ''),
        bankId: validateData(this.product.bankId, ''),
        bankName: validateData(this.product.bankName, ''),
      },
    };
    this.facade.setFormOne(transferAccount);
    // FIXME Validar casos
    this._setStep(registration ? 1 : 2);
  }
  private _setStep(step: number): void {
    this.facade.setStep({ step });
    if (step === 1) {
      this.router.navigate([this.navigate.new_transfer]);
    } else if (step === 2) {
      this.router.navigate([this.navigate.new_transfer_how]);
    }
  }

  public compareFnOrigin(c1: any, c2: any): boolean {
    return compareSelect(c1, c2, 'id');
  }

  private _initForm(): void {
    this.formAccounts = new FormGroup({
      account_origin: new FormControl(''),
    });
    this.productsOrigin$
      .pipe(
        take(1),
        takeUntil(this._destroy$),
        filter(
          (products) => !isNullOrUndefined(products) && products.length > 0,
        ),
      )
      .subscribe((data: Product[]) => {
        this.formAccounts.controls['account_origin'].setValue(data[0]);
        this.facade.fetchDestinationProducts(data[0].id, data[0].typeAccount);
      });
    if (!this.isMobile) {
      this.affiliation$
        .pipe(
          takeUntil(this._destroy$),
          filter((data) => data.loaded && data.products.length > 0),
          map((data) => data.products),
        )
        .subscribe((data) => {
          this.clickProduct(data[0], 0);
        });
    }
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = InfoModal(
        this.modalService._dialogComponentRef.instance.componentRef.instance,
        'FAVORITE.ALERT.TITLE',
        '/delete.png',
        'CANCEL',
        'FAVORITE.ALERT.BTN_AGREE',
      );

      component.actionCancel
        .pipe(takeUntil(this._destroy$))
        .subscribe((_) => this.modalService.close());
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this.facade.deleteAffiliation(
          this.product,
          this.formAccounts.controls['account_origin'].value,
        );
      });
    }
  }

  private extractOriginAccount(
    productId: string,
    productType: string,
  ): Observable<Product[]> {
    return this.facade.product$.pipe(
      filter(
        (products: Product[]) =>
          !isNullOrUndefined(products) && products.length > 0,
      ),
      map((products) => {
        return products.filter(
          (product) =>
            product.typeAccount === productType && product.id === productId,
        );
      }),
    );
  }

  get navigate(): INavigate {
    return Navigate;
  }
  // tslint:disable-next-line: max-file-line-count
}

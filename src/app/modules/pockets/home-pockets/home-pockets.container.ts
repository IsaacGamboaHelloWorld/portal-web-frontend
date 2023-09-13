import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filterByFC } from '@app/shared/helpers/check-sfb';
import { INavigate, Navigate } from '@core/constants/navigate';
import { HomePocketsFacade } from '@modules/pockets/home-pockets/home-pockets.facade';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Product } from '../../../core/models/products/product';
import { setInitialValueCustomInfo } from '../../../shared/helpers/formValidators.helper';
import { ModalService } from '../../../shared/modal/services/modal.service';
import { IProductActive } from '../../../store/reducers/models/product-active/product-active.reducer';
import { SecurityService } from '../../security/services/security.service';
import { PopupOnboardingComponent } from './components/popup-onboarding/popup-onboarding.component';
import { IHomePocketsRecord } from './entities/home-pockets';
import { IHomePockets } from './store/reducers/get-pockets.reducer';
import { ILoadPrefs } from './store/reducers/load-prefs.reducer';

@Component({
  selector: 'app-home-pockets',
  templateUrl: './home-pockets.container.html',
  styleUrls: ['./home-pockets.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePocketsContainer
  implements OnInit, OnDestroy, AfterViewChecked {
  public formPocketsHome: FormGroup;
  public currentAccountId: string = '';
  public currentAccountType: string = '';
  public showOnboarding: number = 0;
  public pocketsId: number = 0;
  public pocketsAccount: IHomePockets;
  public pocketsList: IHomePocketsRecord[];
  public loadingItems: number = 3;
  public indexEdit: number = 0;
  public indexPage: any = 1;

  @Output() showBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  private fromCard: boolean = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private facade: HomePocketsFacade,
    private modal: ModalService,
    private router: Router,
    private route: ActivatedRoute,
    private security: SecurityService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this._readQueryParams();
    this.modal.close();
    this.facade.getPrefs();
    this.nextLoad();
  }

  ngAfterViewChecked(): void {
    this.showPopup();
  }

  private _readQueryParams(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: any) => {
        this.fromCard = !!params['fromCard'];
      });
  }

  public showPopup(): void {
    if (this.indexEdit <= 0 && this.showOnboarding === 2) {
      this.indexEdit++;
      this.hasPreferences$.pipe(take(1)).subscribe((data) => {
        if (
          !!data &&
          !!data.data &&
          !!data.data.preferences &&
          !data.data.preferences.pocketOnBoarding
        ) {
          this.modal.open(
            PopupOnboardingComponent,
            true,
            'width-small-no-close',
          );
        }
        this.indexEdit++;
      });
    }
  }

  public nextLoad(): void {
    this._initForm();
    this._setDefaultValue();
    this.facade.fetchHome();
    this.hasPreferences$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (!!data && !!data.data && !!data.data.preferences) {
        if (!!data.data.preferences.firstTimePocketsOnboarding) {
          this.showOnboarding = !data.data.preferences
            .firstTimePocketsOnboarding
            ? 1
            : 2;
        } else {
          this.showOnboarding = 1;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.modal.close();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.showOnboarding = 0;
  }

  get navigate(): INavigate {
    return Navigate;
  }

  public back(): void {
    this.facade.resetHome();
    this.security
      .encryptAesGcm(this.currentAccountId.toString())
      .then((data) => {
        this.facade.resetHome();
        this.router.navigate([
          Navigate.detail,
          this.currentAccountType.toLowerCase(),
          data,
        ]);
      });
  }

  private _initForm(): void {
    this.formPocketsHome = new FormGroup({
      account_origin: new FormControl('', Validators.required),
    });
  }

  public trackByFn(index: number, product: Product): string {
    return product.id;
  }

  public changeAccount(): void {
    this.pocketsList = [];
    const account: Product = this.formPocketsHome.controls.account_origin.value;
    const dataToSave: IProductActive = {
      type: account.accountInformation.productType,
      id: account.accountInformation.accountIdentifier,
      dataComplete: account.accountInformation,
    };
    this.currentAccountId = account.accountInformation.accountIdentifier;
    this.facade.setProduct(dataToSave);
  }

  public searchPockets(_data: string): void {
    for (const j in this.pocketsAccount.data) {
      if (
        !!this.pocketsAccount.data[j].parent &&
        this.pocketsAccount.data[j].parent.accountIdentifier ===
          this.currentAccountId
      ) {
        this.pocketsList = this.pocketsAccount.data[j].pockets;
        this.cdr.detectChanges();
      }
    }
  }

  public compareFnOrigin(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  public startOnboarding(): void {
    this.indexPage = 1;
  }
  public closeOnboarding(): void {
    this.showOnboarding = 2;

    const data: any = {
      firstTimePocketsOnboarding: false,
    };
    this.facade.setPrefs(data);
  }

  public nextStep(): void {
    this.indexPage++;
    this.goStep(this.indexPage);
  }

  public backStep(): void {
    this.indexPage--;
    this.goStep(this.indexPage);
  }

  public goStep(index: number): void {
    this.indexPage = index;
    const arrEl = document.querySelectorAll('.step');
    if (!isNullOrUndefined(arrEl) && arrEl.length > 0) {
      arrEl.forEach((element) => {
        element.classList.remove('active');
      });
    }
    document.querySelector('.step' + index).classList.add('active');
  }

  private _setDefaultValue(): void {
    this.pocketsAccount = null;
    combineLatest([
      this.facade.activeProduct$,
      this.facade.products$,
      this.facade.homePockets$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        map((data) => {
          return {
            productDetail: data[0],
            products: data[1],
            pockets: data[2],
          };
        }),
      )
      .subscribe((info) => {
        setInitialValueCustomInfo(
          info.productDetail,
          info.products,
          null,
          this.formPocketsHome,
          ['account_origin'],
        );
        if (!!info.productDetail && info.pockets) {
          this.pocketsAccount = info.pockets;
          this.currentAccountId = info.productDetail.id;
          this.currentAccountType = info.productDetail.type;
          this.searchPockets(this.currentAccountId);
        } else if (!this.fromCard) {
          this.router.navigate([Navigate.home]);
        }
      });
  }

  get homePockets$(): Observable<IHomePockets> {
    return this.facade.homePockets$;
  }

  get hasPockets(): Observable<boolean> {
    return this.facade.homePockets$.pipe(
      map((data: IHomePockets) => data.loaded),
    );
  }

  get hasPreferences$(): Observable<ILoadPrefs> {
    return this.facade.loadPrefs$;
  }

  get productsOrigin$(): Observable<Product[]> {
    return this.facade.products$.pipe(
      map((product: Product[]) => {
        return filterByFC(product);
      }),
    );
  }
}

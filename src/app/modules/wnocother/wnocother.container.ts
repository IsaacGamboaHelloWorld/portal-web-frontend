import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { ProductsInterface } from '@app/core/interfaces/products.interface';
import { Product } from '@app/core/models/products/product';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { joinProducts } from '@app/shared/helpers/joinProducts.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import { ILoadPrefs } from '@app/shared/news/store/reducers/news.reducers';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { SecurityService } from '../security/services/security.service';
import { ModalWnocotherComponent } from './components/modal-wnocother/modal-wnocother.component';
import { INavigateWnocother, NavigateWnocother } from './entities/routes';
import { WnocotherMoldel } from './wnocother.model';

@Component({
  selector: 'app-wnocother',
  templateUrl: './wnocother.container.html',
  styleUrls: ['./wnocother.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class WnocotherContainer implements OnInit, OnDestroy {
  public stepFlow: number;
  public currentStep: number = 0;
  public previousStep: number = 0;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public showModal: number = 0;
  public subscribe: Subscription = new Subscription();

  public numberSteps: number = 4;
  public viewBack: boolean = false;
  public viewClose: boolean = false;
  public maxStep: number = 4;
  public backUrl: string;
  public param1: string;
  public param2: string;

  constructor(
    private dom: ManipulateDomService,
    private model: WnocotherMoldel,
    private location: Location,
    private modalService: ModalService,
    private modelNews: NewsModel,
    private router: Router,
    private security: SecurityService,
  ) {}

  get hasPreferences$(): Observable<ILoadPrefs> {
    return this.modelNews.loadPrefs$;
  }
  get step$(): Observable<number> {
    return this.model.stepW$;
  }
  get navigate(): INavigateWnocother {
    return NavigateWnocother;
  }

  ngOnInit(): void {
    this.router.navigate([this.navigate.step1]);
    this.dom.scrollTop();
    this.model.setStepW(0);
    this.step$
      .subscribe((data) => {
        if (data === 0) {
          this.nextLoad();
        }
      })
      .unsubscribe();
    this.validateSteps();
  }

  ngOnDestroy(): void {
    this.model.setStepW(0);
    this.model.setTypeTransaction(null);
    this.model.resetWithDrawal();
    this.modalService.close();
    const dataToSend = {
      product: null,
      where: null,
      amount: null,
      document: '',
    };
    this.model.setDataForm(dataToSend);
  }

  public checkPreference(): void {
    this.modalService.open(
      ModalWnocotherComponent,
      false,
      `${SMALL_WIDTH} not-button-close`,
    );
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
        this.viewBack = info['productDetail'] ? true : false;
        if (info['productDetail']) {
          this.security
            .encryptAesGcm(info['productDetail']['id'].toString())
            .then((data) => {
              this.backUrl = this.navigate.payment;
              this.param1 = info['productDetail']['type'].toLowerCase();
              this.param2 = data;
              this.dom.scrollTop();
            });
        }
      })
      .unsubscribe();
  }
  public openAlert(step: number): void {
    this.modalService.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal(step);
    }, 10);
  }

  private _actionsModal(step?: number): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.title = 'WITHDRAWAL.CANCEL_STEP.DESC';
      component.img = '/salir.png';
      component.btnCancel = 'WITHDRAWAL.CANCEL_STEP.NO_OPT';
      component.btnAgree = 'WITHDRAWAL.CANCEL_STEP.YES_OPT';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.modalService.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.model.setStepW(0);
        this.model.setTypeTransaction(null);
        this.model.setDataForm({
          product: null,
          where: null,
          amount: null,
          otheramount: null,
          document: null,
        });
        this.modalService.close();
      });
    }
  }

  public nextLoad(): void {
    this.hasPreferences$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        if (!!data && !!data.data && !!data.data.preferences) {
          // tslint:disable-next-line: prefer-conditional-expression
          if (!!data.data.preferences['wconother']) {
            this.showModal = !data.data.preferences['wconother'] ? 1 : 2;
          } else {
            this.showModal = 1;
          }
          if (this.showModal === 1) {
            this.checkPreference();
          }
        }
      })
      .unsubscribe();
  }

  public validateSteps(): void {
    this.step$.subscribe((response) => {
      this.param1 = '';
      this.param2 = '';
      this.stepFlow = response;
      this.viewBack = false;
      if (response >= 0) {
        this.viewBack = true;
      }
      switch (response) {
        case 0:
          this._setDefaultValue();
          break;
        case 1:
          this.backUrl = this.navigate.step1;
          break;
        case 2:
          this.backUrl = this.navigate.step2;
          break;
        case 3:
          this.backUrl = this.navigate.step3;
          break;
        default:
          this.backUrl = this.navigate.step1;
          break;
      }
      if (response === this.maxStep) {
        this.backUrl = this.navigate.step1;
      }
    });
  }
  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.payment_type;
    } else {
      this.validateSteps();
    }
  }
}

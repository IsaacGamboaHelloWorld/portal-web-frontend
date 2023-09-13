import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { InfoModal } from '@app/shared/helpers/infoModal.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { AlertCloseComponent } from '@core/components/alert-close/alert-close.component';
import { PRODUCT_ACTIVATE } from '@core/constants/comunication-keys';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { advanceRootRoute } from '@modules/advance/constants/routes';
import { StepService } from '@modules/advance/services/step.service';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { SecurityService } from '../security/services/security.service';
import { INavigateAdvance, NavigateAdvance } from './entities/routes';
import { PreviousRouteService } from './services/previous-route.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.container.html',
  styleUrls: ['./advance.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AdvanceContainer implements OnInit, OnDestroy {
  public numberSteps: number = 4;
  public viewBack: boolean = false;
  public viewClose: boolean = false;
  public maxStep: number = 4;
  public backUrl: string;
  public param1: string;
  public param2: string;
  public stepFlow: number;
  public currentStep: number = 0;
  public previousStep: number = 0;

  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _previousUrl: string;

  constructor(
    private _router: Router,
    private _translate: TranslateService,
    private _stepService: StepService,
    private _location: Location,
    private _modalService: ModalService,
    private _facade: AdvanceFacade,
    private _previousRouteService: PreviousRouteService,
    private securityService: SecurityService,

    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this._previousUrl = this._previousRouteService.getPreviousUrl();
    this.initStep();
    this._closeModal();
    this.validateSteps();
    this.dom.scrollTop();
    this._stepService.setStep(1);
  }

  ngOnDestroy(): void {
    this._stepService.setStep(1);
    this._facade.advanceReset();
    this._facade.setFormReset();
    this._destroy$.next(true);
    this._destroy$.complete();
    this.securityService.removeItem(PRODUCT_ACTIVATE);
  }

  get step(): number {
    return this._stepService.step;
  }

  get nameSteps(): string[] {
    return this._translate.instant('LINE_TIME');
  }

  get showLineTime(): boolean {
    return this._stepService.step <= 3;
  }

  get showButton(): boolean {
    return this._stepService.step !== 5;
  }

  get navigate(): INavigateAdvance {
    return NavigateAdvance;
  }

  public backClicked(): void {
    const step = this._stepService.step;
    this._stepService.setStep(step < 2 ? 1 : step - 1);
    this._location.back();
  }

  public leave(): void {
    this._modalService.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }

  public initStep(): void {
    if (this._stepService.step === 0) {
      this._router.navigate([`/${advanceRootRoute}`]);
      this._stepService.setStep(1);
    }
  }

  private _closeModal(): void {
    this._router.events
      .pipe(
        takeUntil(this._destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart),
      )
      .subscribe((_) => {
        this._modalService.close();
      });
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = InfoModal(
        this._modalService._dialogComponentRef.instance.componentRef.instance,
        'TRANSFER.CLOSED.TEXT',
        '/salir.png',
        'WITHDRAWAL.CANCEL_STEP.NO_OPT',
        'WITHDRAWAL.CANCEL_STEP.YES_OPT',
      );

      component.actionCancel
        .pipe(takeUntil(this._destroy$))
        .subscribe((_) => this._modalService.close());

      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe((_) => {
        this._modalService.close();
        if (this._previousUrl === `/${advanceRootRoute}`) {
          this._location.back();
        } else {
          this._router.navigateByUrl(this._previousUrl);
        }
        this._stepService.setStep(1);
        this._facade.setFormReset();
        this._facade.advanceReset();
      });
    }
  }

  get productsOrigin$(): Observable<Product[]> {
    return this._facade.products$.pipe(
      filter((products) => !!products && products.length > 0),
      map((products) => {
        return products.filter(
          (product) =>
            product.accountInformation.productType ===
              TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
            product.accountInformation.productType ===
              TYPE_ACCOUNTS.CURRENT_ACCOUNT,
        );
      }),
    );
  }

  private _setDefaultValue(): void {
    combineLatest([this._facade.productActive$, this.productsOrigin$])
      .pipe(
        take(1),
        map((data) => {
          return { productDetail: data[0], products: data[1], loans: null };
        }),
      )
      .subscribe((info) => {
        this.viewBack = info['productDetail'] ? true : false;
        if (info['productDetail']) {
          this.securityService
            .encryptAesGcm(info['productDetail']['id'].toString())
            .then((data) => {
              this.backUrl = this.navigate.detail;
              this.param1 = info['productDetail']['type'].toLowerCase();
              this.param2 = data;
              this.dom.scrollTop();
            });
        }
      })
      .unsubscribe();
  }

  public validateSteps(): void {
    this._stepService.stepObservable
      .pipe(takeUntil(this._destroy$))
      .subscribe((response) => {
        this.param1 = '';
        this.param2 = '';
        this.viewBack = false;
        if (response >= 0) {
          this.viewBack = true;
        }
        switch (this._stepService.step) {
          case 1:
            this._setDefaultValue();
            break;
          case 2:
            this.backUrl = this.navigate.step1;
            break;
          case 3:
            this.backUrl = this.navigate.step2;
            break;
          case 4:
            this.backUrl = this.navigate.step3;
            break;
          default:
            this.backUrl = this.navigate.step1;
            break;
        }
        if (response === this.maxStep) {
          this.backUrl = this.navigate.step3;
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

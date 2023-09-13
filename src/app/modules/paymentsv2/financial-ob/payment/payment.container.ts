import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@core/constants/navigate';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IProductActive } from '../../../../store/reducers/models/product-active/product-active.reducer';
import { IFinancialOp, ISetPayment } from '../entities/financial-op';
import { FinancialOpFacade } from '../finantial-ob.facade';
import {
  INavigatePaymentFD,
  NavigatePaymentFD,
} from '../payment-fd-pse/navigate/routes';
import { StepLineTime } from '../store/state/financial-op-module.state';
import {
  INavigatePayment,
  NavigatePayment,
} from './components/navigate/routes';
import { PaymentObligationsFacade } from './payment.facade';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.container.html',
  styleUrls: ['./payment.container.sass'],
})
export class PaymentContainer implements OnInit, OnDestroy {
  @Input() step: number;
  public maxSteps: number;
  public fromHoD: boolean = false;
  public backUrl: string;
  public viewBack: boolean = false;
  public maxStep: number = 5;
  public showTimeLine: boolean = true;
  public showCloseButton: boolean = true;
  public title: string;
  public subTitle: string;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _translate: TranslateService,
    private _facade: PaymentObligationsFacade,
    private _router: Router,
    private _parent_facade: FinancialOpFacade,
    @Inject('isMobile') public isMobile: boolean,
  ) {}

  ngOnInit(): void {
    this._facade.setBackHome(false);
    this._validateSteps();
    combineLatest([this.activePayment$, this.productActive$])
      .pipe(takeUntil(this._destroy$))
      .subscribe((payment) => {
        if (!!payment[0].activePayment) {
          this._router.navigate([this.navigateInternal.step1]);
          this._setStep(1);
        } else if (!!payment[1]) {
          const data: IFinancialOp = {
            accountId: payment[1].id,
            accountType: payment[1].type,
            bank: payment[1].bank,
            loanName: payment[1].name,
            bankName: payment[1].bank_name,
            newLoan: false,
          };
          this.fromHoD = true;
          this._parent_facade.clearActivePayment();
          this._parent_facade.selectPayment(data);
        } else {
          if (!this.fromHoD && payment[0].activePayment) {
            this._router.navigate([Navigate.paymentsv2obligations]);
          }
        }
      })
      .unsubscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _validateSteps(): void {
    combineLatest([this.step$, this.selectIsFreeDestinationFlow$]).subscribe(
      ([step, isFreeDestination]) => {
        this._showNavigation();
        this.viewBack = false; // TO-DO
        let backHomeAction = false;
        this._facade.backHome$.subscribe((status) => {
          backHomeAction = status;
        }).unsubscribe;
        this.viewBack = false;
        if (step.step > 1) {
          this.viewBack = true;
        }

        if (backHomeAction) {
          this._router.navigate([this.navigate.paymentsv2obligations]);
        } else {
          this.setConfigStep(step, isFreeDestination);
        }
      },
    );
  }

  private setConfigStep(
    response: StepLineTime,
    isFreeDestination: boolean,
  ): void {
    switch (response.step) {
      case 1:
        this.backUrl = isFreeDestination
          ? this.navigateFreeDestination.step1
          : this.isMobile
          ? this.navigate.paymentsv2registeredOB
          : this.navigate.paymentsv2obligations;
        break;
      case 2:
        this.backUrl = isFreeDestination
          ? this.navigateFreeDestination.step1
          : this.navigateInternal.step1;
        break;
      case 3:
        this.backUrl = this.navigateInternal.step2;
        break;
      case 4:
        this.backUrl = this.navigateInternal.step3;
        break;
      case 5:
        this._hideNavigation();
        break;
      default:
        this.backUrl = this.navigate.paymentsv2obligations;
        break;
    }
  }

  private _showNavigation(): void {
    this.showTimeLine = true;
    this.title = this._translate.instant(
      'PAYMENTSV2.FINANCIAL_OP.SECTIONS.PAYMENT.TITLE',
    );
    this.subTitle = this._translate.instant(
      'PAYMENTSV2.FINANCIAL_OP.SECTIONS.PAYMENT.SUBTITLE',
    );
  }

  private _hideNavigation(): void {
    this.showTimeLine = false;
    this.showCloseButton = false;
    this.title = '';
    this.subTitle = '';
  }

  public setStep(_number: number): void {
    this.step = _number;
    const step: StepLineTime = {
      step: _number,
    };
    this._parent_facade.setStep(step);
  }

  get activePayment$(): Observable<ISetPayment> {
    return this._facade.selectActiveProduct$;
  }

  get productActive$(): Observable<IProductActive> {
    return this._facade.selectActivePayment$;
  }

  get items$(): Observable<string[]> {
    return this._translate.get(
      'PAYMENTSV2.FINANCIAL_OP.SECTIONS.PAYMENT.LINE_TIME',
    );
  }

  get step$(): Observable<StepLineTime> {
    return this._parent_facade.step$;
  }

  get selectIsFreeDestinationFlow$(): Observable<boolean> {
    return this._parent_facade.selectIsFreeDestinationFlow$;
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
  }

  get navigateFreeDestination(): INavigatePaymentFD {
    return NavigatePaymentFD;
  }

  public backHome(event: boolean): void {
    if (event) {
      this._facade.setBackHome(true);
    } else {
      this._facade.setBackHome(false);
      this._validateSteps();
    }
  }

  public _setStep(step: number): void {
    this._parent_facade.setStep({ step });
  }
}

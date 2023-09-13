import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { INavigate } from '@core/constants/navigate';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Navigate } from '../../../../core/constants/navigate';
import { ISetPayment } from '../entities/public-services';
import { StepLineTime } from '../store/state/public-services-module.state';
import { PublicServicesFacade } from './../public-services.facade';
import {
  INavigatePayment,
  NavigatePayment,
} from './components/navigate/routes';
import { PaymentServiceFacade } from './payment.facade';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.container.html',
  styleUrls: ['./payment.container.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentContainer implements OnInit, OnDestroy {
  @Input() step: number;
  @Input() prev: number;
  public maxSteps: number;
  public isBiller: boolean;
  public backUrl: string;
  public showTimeLine: boolean = true;
  public showClose: boolean = true;
  public navInternal: boolean = true;
  public title: string;
  public subTitle: string;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _facade: PaymentServiceFacade,
    private _parent_facade: PublicServicesFacade,
    private _translate: TranslateService,
    @Inject('isMobile') public isMobile: boolean,
  ) {}

  ngOnInit(): void {
    this._setStep(1);
    this._router.navigate([this.navigateInternal.step1]);
    this._facade.setBackHome(false);
    this._validateSteps();
    this.activePayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: ISetPayment) => {
        if (data.payData === null) {
          this._router.navigate([Navigate.paymentsv2services]);
        } else if (!!data && !!data.payData && data.payData.biller) {
          this.isBiller = true;
          this.maxSteps = 2;
          this._router.navigate([this.navigateInternal.step1]);
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _validateSteps(): void {
    this.step$.subscribe((response) => {
      let backHomeAction = false;
      this._facade.backHome$.subscribe((status) => {
        backHomeAction = status;
      }).unsubscribe;

      if (backHomeAction) {
        this._router.navigate([this.navigate.paymentsv2services]);
      } else {
        this.setConfigStep(response);
      }
    });
  }

  private setConfigStep(response: StepLineTime): void {
    this._showNavigation();
    switch (response.step) {
      case 1:
        this.backUrl = this.isMobile
          ? this.navigate.paymentsv2registeredSP
          : this.navigate.paymentsv2services;
        this.showTimeLine = false;
        break;
      case 2:
        this.backUrl = this.navigateInternal.step1;
        break;
      case 3:
        this.backUrl = this.navigateInternal.step2;
        this._hideNavigation();
        break;
      case 4:
        this.showClose = false;
        this._hideNavigation();
        break;
      default:
        this.backUrl = this.navigate.paymentsv2services;
        break;
    }
  }

  private _showNavigation(): void {
    this.showClose = true;
    this.navInternal = true;
    this.showTimeLine = true;
    this.title = this._translate.instant(
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.PAYMENT.TITLE',
    );
    this.subTitle = this._translate.instant(
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.PAYMENT.SUBTITLE',
    );
  }

  private _hideNavigation(): void {
    this.showTimeLine = false;
    this.navInternal = false;
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
  get navigate(): INavigate {
    return Navigate;
  }

  get items$(): Observable<string[]> {
    return this._translate.get(
      'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.PAYMENT.LINE_TIME',
    );
  }

  get step$(): Observable<StepLineTime> {
    return this._parent_facade.step$;
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
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

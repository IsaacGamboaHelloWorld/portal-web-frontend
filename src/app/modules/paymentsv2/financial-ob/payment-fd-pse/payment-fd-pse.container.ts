import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FinancialOpFacade } from '../finantial-ob.facade';
import { ManipulateDomService } from './../../../../core/services/manipulate-dom/manipulate-dom.service';
import { NavigatePaymentFD } from './navigate/routes';
import { PaymentFreeDestinationModel } from './store/models/payment-free-destination.model';

@Component({
  selector: 'app-payment-fd-pse',
  templateUrl: './payment-fd-pse.container.html',
  styleUrls: ['./payment-fd-pse.container.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
// tslint:disable-next-line:component-class-suffix
export class PaymentFdPseContanier implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  public maxStep: number = 5;
  public backUrl: string = this.navigate.paymentsv2obligations;
  private objBackUrl: any;
  private objNavigateUrl: any;

  constructor(
    private _translate: TranslateService,
    private _router: Router,
    private model: PaymentFreeDestinationModel,
    private facade: FinancialOpFacade,
    private dom: ManipulateDomService,
    private auth: AuthService,
  ) {
    this.objBackUrl = {
      1: NavigatePaymentFD.payment_type,
      2: NavigatePaymentFD.step1,
      3: NavigatePaymentFD.step2,
      4: NavigatePaymentFD.step3,
      5: NavigatePaymentFD.step_confirmation,
    };

    this.objNavigateUrl = {
      1: NavigatePaymentFD.step1,
      2: NavigatePaymentFD.step2,
      3: NavigatePaymentFD.step3,
      4: NavigatePaymentFD.step_confirmation,
      5: NavigatePaymentFD.step_end,
    };
  }

  ngOnInit(): void {
    this._setupDom(true);
  }

  ngOnDestroy(): void {
    this._setupDom(false);
    this._resetModels();
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _resetModels(): void {
    this.model.resetStep();
    this.model.resetFormOne();
    this.model.resetFormTwo();
    this.model.resetFormThree();
    this.facade.setFlowFreeDestination(false);
  }

  private _defineBackUrl(step: number): void {
    this.backUrl = this.objBackUrl[step];
    const urlToNavigate = this.objNavigateUrl[step];
    this.model.setStep(step);
    if (this.auth.isAuth) {
      this._router.navigate([urlToNavigate]);
    }
  }

  private _setupDom(isAdd: boolean): void {
    if (isAdd) {
      this.dom.addClass('.main-container-transaction', 'pb-width-full');
      this.dom.addClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.addClass(
        '.main-container-transaction',
        'changes-styles-in-pse-fd',
      );
      this.dom.addClass('.main-container-transaction-section', 'pb-col-ld-10');
    } else {
      this.dom.removeClass('.main-container-transaction', 'pb-width-full');
      this.dom.removeClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.removeClass(
        '.main-container-transaction',
        'changes-styles-in-pse-fd',
      );
      this.dom.removeClass(
        '.main-container-transaction-section',
        'pb-col-ld-10',
      );
    }
  }

  get items$(): Observable<string[]> {
    return this._translate.get(
      'PAYMENTSV2.FINANCIAL_OP.SECTIONS.PAYMENT_PSE.TIME_LINE',
    );
  }

  get step$(): Observable<number> {
    return this.model.getStep$.pipe(
      tap((step: number) => this._defineBackUrl(step)),
    );
  }

  get navigate(): INavigate {
    return Navigate;
  }
}

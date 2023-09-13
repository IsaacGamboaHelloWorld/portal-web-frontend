import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import {
  ITypePayments,
  TYPE_PAYMENTS,
} from '@app/modules/payments/home-payments/constants/types';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { Observable, Subject } from 'rxjs';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { IActiveFinancialOpPaymentPayments } from '../../../store/reducers/selected-payment.reducer';
import {
  IStatusPaymentPse,
  StatusPaymentPseEnum,
} from '../../constants/status-payment-pse.enum';
import { IPaymentPseStatusResponse } from '../../entities/status-pse.interface';
import { PsePrivateService } from '../../services/pse-private.service';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';
import { IStatusPse } from '../../store/reducers/status-pse.reducers';
import {
  DsStatesCardEnum,
  IDsStateCard,
} from './../../../../../../shared/ds/ds-states-card/constants/ds-states-card.enum';
import { StepPaymentPseEnum } from './../../constants/step-payment-pse.enum';
import { INavigatePaymentFD, NavigatePaymentFD } from './../../navigate/routes';

@Component({
  selector: 'app-step-end',
  templateUrl: './step-end.component.html',
  styleUrls: ['./step-end.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepEndComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public disabled: boolean = false;
  public costTransfer: number = 0.0;

  constructor(
    private model: PaymentFreeDestinationModel,
    private facade: FinancialOpFacade,
    private privatePseService: PsePrivateService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this.dom.scrollContentTop();
    this._setStep(StepPaymentPseEnum.step_end);
    const paymentId = this.privatePseService.getPaymentId();
    this.model.fetchStatusPaymentPse(paymentId);
    setTimeout(() => this.cd.markForCheck(), 10);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.privatePseService.removePaymentId();
  }

  public download(): void {
    this.disabled = true;
    createJpeg('voucher-payment')
      .then((dataUrl) => {
        downloadImage('voucher-payment.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  public redirect(url: string): void {
    this.router.navigate([url]);
  }

  private _resetDisabled(): void {
    this.disabled = false;
    this.cd.detectChanges();
  }

  private _setStep(step: number): void {
    this.model.setStep(step);
  }

  get statusPaymentPse$(): Observable<IStatusPse> {
    return this.model.statusPaymentPse$;
  }

  get statusPaymentDataPse$(): Observable<IPaymentPseStatusResponse> {
    return this.model.statusPaymentDataPse$;
  }

  get selectedPayment$(): Observable<IActiveFinancialOpPaymentPayments> {
    return this.facade.selectedPayment$;
  }

  get navigate(): INavigatePaymentFD {
    return NavigatePaymentFD;
  }

  get getStatusCard(): IDsStateCard {
    return DsStatesCardEnum;
  }

  get statusPaymentConst(): IStatusPaymentPse {
    return StatusPaymentPseEnum;
  }

  get getTypePayment(): ITypePayments {
    return TYPE_PAYMENTS;
  }
}

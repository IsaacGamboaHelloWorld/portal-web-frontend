import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { INavigate, Navigate } from '@core/constants/navigate';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  createJpeg,
  downloadImage,
} from '../../../../../../shared/helpers/download-image';
import { IPublicService } from '../../../entities/public-services';
import { PublicServicesFacade } from '../../../public-services.facade';
import { IInfoPayments } from '../../../registered-sp/store/state/registered-sp-module.state';
import { IRecurringPaymentState } from '../../../store/reducers/recurring-payment.reducer';
import { IAllPublicServicesPayments } from '../../../store/reducers/registered-bills.reducer';
import { UtilsService } from '../../../transversal/utils.service';
import {
  IBillerDetailRequest,
  ISuccessServicePayment,
} from '../../entities/new-payment';
import { PaymentServiceFacade } from '../../payment.facade';
import { INavigatePayment, NavigatePayment } from '../navigate/routes';
import { ManipulateDomService } from './../../../../../../core/services/manipulate-dom/manipulate-dom.service';

@Component({
  selector: 'app-payment-step-end',
  templateUrl: './step-end.component.html',
  styleUrls: ['./step-end.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepEndComponent implements OnInit, OnDestroy {
  private static readonly CURRENT_STEP: number = 4;
  public disabled: boolean = false;
  public costTransfer: number = 0;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  private selectedBill: IPublicService;
  public isBill: boolean = false;

  constructor(
    private _facade: PaymentServiceFacade,
    private _facadeSerivces: PublicServicesFacade,
    private cd: ChangeDetectorRef,
    private _dom: ManipulateDomService,
    private _util: UtilsService,
    private _parent_facade: PublicServicesFacade,
  ) {}

  ngOnInit(): void {
    this._dom.scrollTop();
    this._subsAllPayments();
    this._subsSelectNotData();
    this._subsChangeRecurring();
    this._subsGetInfoPayments();
    this._setStep(StepEndComponent.CURRENT_STEP);
  }

  ngOnDestroy(): void {
    this._facade.clear();
    this._destroy$.next(true);
    this._destroy$.complete();
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

  public setProgramed(data: boolean): void {
    this._util.setProgramed(data, this.selectedBill);
  }

  private _resetDisabled(): void {
    this.disabled = false;
    this.cd.detectChanges();
  }

  public selectBill(data: IPublicService): void {
    if (!data || !data.billerId) {
      return;
    }
    this.selectedBill = data;
    const bill: IBillerDetailRequest = {
      billerId: this.selectedBill.billerId,
      contract: this.selectedBill.contract,
    };
    this._facadeSerivces.selectPayment(this.selectedBill);
    this._facadeSerivces.clearInfoBill();
    this._facadeSerivces.getInfoBill(bill);
  }

  private _subsAllPayments(): void {
    this.allPayments$
      .pipe(takeUntil(this._destroy$))
      .subscribe((allPayments) => {
        if (
          !!allPayments &&
          !!allPayments.bills &&
          allPayments.bills.length > 0
        ) {
          if (isNullOrUndefined(this.selectedBill)) {
            return;
          }
          const billUpdate = allPayments.bills.find(
            (bill) =>
              bill.billerId === this.selectedBill.billerId &&
              bill.contract === this.selectedBill.contract,
          );
          if (this.selectedBill.paymentType !== billUpdate.paymentType) {
            this.selectedBill = billUpdate;
            this.selectBill(this.selectedBill);
          }
        }
      });
  }

  private _subsChangeRecurring(): void {
    this.changeRecurring$
      .pipe(takeUntil(this._destroy$))
      .subscribe((response: IRecurringPaymentState) => {
        if (!!response && (response.loaded || response.error)) {
          this._facadeSerivces.fetchAllPayments();
        }
      });
  }

  private _subsSelectNotData(): void {
    this.selectedNotDataPayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: IPublicService) => {
        this.selectedBill = data;
        this.selectBill(data);
      });
  }

  private _subsGetInfoPayments(): void {
    this._util
      .getInfoPaymentResponse()
      .pipe(takeUntil(this._destroy$))
      .subscribe((info: IInfoPayments) => {
        this.isBill = info.isBill;
      });
  }

  get changeRecurring$(): Observable<IRecurringPaymentState> {
    return combineLatest([
      this.selectRecurring$,
      this.selectDeleteRecurring$,
    ]).pipe(
      takeUntil(this._destroy$),
      map((combined) => {
        if (combined[0].loaded && combined[1].loaded) {
          return combined[0];
        } else if (combined[0].loaded) {
          return combined[0];
        } else if (combined[1].loaded) {
          return combined[1];
        }
      }),
    );
  }

  public _setStep(step: number): void {
    this._parent_facade.setStep({ step });
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
  }

  get paymentBill$(): Observable<ISuccessServicePayment> {
    return this._facade.paymentBill$;
  }

  get selectDeleteRecurring$(): Observable<IRecurringPaymentState> {
    return this._facadeSerivces.selectDeleteRecurring$;
  }

  get selectedNotDataPayment$(): Observable<IPublicService> {
    return this._facadeSerivces.selectedNotDataPayment$;
  }

  get selectRecurring$(): Observable<IRecurringPaymentState> {
    return this._facadeSerivces.selectRecurring$;
  }

  get allPayments$(): Observable<IAllPublicServicesPayments> {
    return this._facadeSerivces.allPayments$;
  }

  get getRecurringPaymentState$(): Observable<IRecurringPaymentState> {
    return this._facadeSerivces.getRecurringPaymentState$;
  }

  get infoPayment$(): Observable<IPublicService> {
    return this._util.infoPayment$.pipe(
      takeUntil(this._destroy$),
      map((payment: any) => {
        if (!!payment) {
          this.selectedBill = payment;
        }
        return payment;
      }),
    );
  }

  get navigate(): INavigate {
    return Navigate;
  }
}

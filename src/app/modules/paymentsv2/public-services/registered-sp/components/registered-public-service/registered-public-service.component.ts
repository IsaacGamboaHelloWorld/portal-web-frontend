import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { IBillerDetailRequest } from '../../../payment/entities/new-payment';
import { PublicServicesFacade } from '../../../public-services.facade';
import { IAllPublicServicesPayments } from '../../../store/reducers/registered-bills.reducer';
import { UtilsService } from '../../../transversal/utils.service';
import { IInfoPayments } from '../../store/state/registered-sp-module.state';
import {
  IEditRecurring,
  IPublicService,
} from './../../../entities/public-services';
import { IRecurringPaymentState } from './../../../store/reducers/recurring-payment.reducer';

@Component({
  selector: 'app-registered-public-service',
  templateUrl: './registered-public-service.component.html',
  styleUrls: ['./registered-public-service.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisteredPublicServiceComponent implements OnInit, OnDestroy {
  public actived: boolean = false;
  public selectedBill: IPublicService;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  public billWithErrorMessage: string;
  public billWithError: boolean = false;
  public isBill: boolean = false;

  public editMode: boolean = false;

  constructor(
    private _facade: PublicServicesFacade,
    private _util: UtilsService,
    private _dom: ManipulateDomService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._dom.scrollTop();
    this._subsAllPayments();
    this._subsSelectNotData();
    this._subsGetInfoPayments();
    this._subsChangeRecurring();
    this._subsDelete();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._util.OnDestroy();
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

  private _subsDelete(): void {
    this._util
      .getRefresh()
      .pipe(takeUntil(this._destroy$))
      .subscribe(({ isDeleted }) => {
        if (isDeleted) {
          this._router.navigate([Navigate.paymentsv2services]);
        }
      });
  }

  private _subsChangeRecurring(): void {
    this.changeRecurring$
      .pipe(takeUntil(this._destroy$))
      .subscribe((response: IRecurringPaymentState) => {
        if (!!response && (response.loaded || response.error)) {
          this._facade.fetchAllPayments();
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
        this.billWithErrorMessage = info.billWithErrorMessage;
        this.billWithError = info.billWithError;
        this.isBill = info.isBill;
      });

    this._util.infoPayment$.subscribe((data: any) => {
      if (!isNullOrUndefined(data)) {
        this.selectedBill = data;
      }
    });
  }

  public doEdit($event: any): void {
    const dataToSend: IEditRecurring = {
      account_origin: null,
      date: $event.data.daysBeforeAfterExpiration,
      amount: $event.data.maxAmount,
    };

    this._facade.setEditRecurrent(dataToSend);
    this.setProgramed(true);
  }

  public selectBill(data: IPublicService): void {
    if (!data || !data.billerId) {
      return;
    }
    if (!this.editMode) {
      this.selectedBill = data;
      const bill: IBillerDetailRequest = {
        billerId: this.selectedBill.billerId,
        contract: this.selectedBill.contract,
      };
      this._facade.selectPayment(this.selectedBill);
      this._facade.clearInfoBill();
      this._facade.getInfoBill(bill);
    }
  }

  public setProgramed(data: boolean): void {
    this._util.setProgramed(data, this.selectedBill);
  }

  public onDeletePublicService($event: any): void {
    this._util.onDeletePublicService($event);
  }

  paymentSubmit($event: any): void {
    this._util.doPayService($event);
  }

  get navigate(): INavigate {
    return Navigate;
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

  get infoPayment$(): Observable<IPublicService> {
    return this._util.infoPayment$;
  }

  get selectedNotDataPayment$(): Observable<IPublicService> {
    return this._facade.selectedNotDataPayment$;
  }

  get selectDeleteRecurring$(): Observable<IRecurringPaymentState> {
    return this._facade.selectDeleteRecurring$;
  }

  get selectRecurring$(): Observable<IRecurringPaymentState> {
    return this._facade.selectRecurring$;
  }

  get allPayments$(): Observable<IAllPublicServicesPayments> {
    return this._facade.allPayments$;
  }
}

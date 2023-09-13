import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { INavigate } from '@core/constants/navigate';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Navigate } from '../../../core/constants/navigate';
import { IEditRecurring, IPublicService } from './entities/public-services';
import { IBillerDetailRequest } from './payment/entities/new-payment';
import { PublicServicesFacade } from './public-services.facade';
import { IInfoPayments } from './registered-sp/store/state/registered-sp-module.state';
import { BillerDetailState } from './store/reducers/biller-detail.reducer';
import { IDeletePublicServicePayments } from './store/reducers/delete-payment.reducer';
import { EnabledAgreementsState } from './store/reducers/enabled-agreements.reducer';
import { INextPublicServicesPayments } from './store/reducers/next-payments.reducer';
import { IRecurringPaymentState } from './store/reducers/recurring-payment.reducer';
import { IAllPublicServicesPayments } from './store/reducers/registered-bills.reducer';
import { UtilsService } from './transversal/utils.service';

@Component({
  selector: 'app-public-services',
  templateUrl: './public-services.container.html',
  styleUrls: ['./public-services.container.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicServicesContainer implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public nextbillers: IPublicService[] = [];
  public selectedBill: IPublicService;
  public editMode: boolean = false;
  public billWithError: boolean = false;
  public isBill: boolean = false;
  public currentItem: number = 0;
  public isActive: boolean = false;
  public isSelected: boolean = false;
  public loadedProducts: boolean = false;
  public billItemSelected: number = 0;
  public billWithErrorMessage: string;
  public allPaymentsLength: number;
  public showNav: boolean;
  public iconArrowRight: string = '/arrow-left-scheduled.svg';
  public iconArrowLeft: string = '/arrow-right-scheduled.svg';
  public iconColor: boolean = false;
  public showArrow: boolean = false;

  @ViewChild('scroll', null) public scroll: ElementRef;
  constructor(
    private _facade: PublicServicesFacade,
    private _router: Router,
    private _util: UtilsService,
    private _dom: ManipulateDomService,
    @Inject('isMobile') public isMobile: boolean,
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event$: any): void {
    this.showNavsButtons();
  }

  @HostListener('scroll', ['$event']) scrollHandler(e: Event): void {
    this.iconColor = false;
    this.iconArrowRight = '/arrow-left-scheduled.svg';
    this.iconArrowLeft = '/arrow-right-scheduled.svg';
    const pos =
      this.scroll.nativeElement.scrollLeft +
      this.scroll.nativeElement.offsetWidth;
    const max = this.scroll.nativeElement.scrollWidth;
    if (!this.showArrow) {
      this.showArrow = pos < max;
    }
    if (pos > max - 10 && pos < max + 10) {
      this.iconArrowLeft = '/arrow-left-scheduled.svg';
      this.iconArrowRight = '/arrow-right-scheduled.svg';
      this.iconColor = true;
    }
  }

  ngOnInit(): void {
    this._facade.fetchNextPayments();
    this.startData();
    this.refresh();
    this.returnBillers();
    this._facade.fetchAvailableAgreements();
    this._subsChangeRecurring();
    this._subsGetInfoPayments();

    this._facade.selectRecurring$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        if (!!data && data.error) {
          this.selectBill(this.selectedBill, this.currentItem);
        }
      });

    this._util
      .getLoadedProduct()
      .pipe(takeUntil(this._destroy$))
      .subscribe((result) => (this.loadedProducts = result));

    this._util
      .getRefresh()
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => {
        this.refresh();
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public onLeft(): void {
    this.scroll.nativeElement.scrollTo({
      left: this.scroll.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  public onRight(): void {
    this.scroll.nativeElement.scrollTo({
      left: this.scroll.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
  }

  public selectBillClick(data: IPublicService, obj_i: number): void {
    this._facade.clearInfoBill();
    this.selectBill(data, obj_i);
  }

  public selectBill(data: IPublicService, obj_i: number): void {
    if (!data || !data.billerId) {
      return;
    }
    if (!this.editMode) {
      this.selectedBill = data;
      const bill: IBillerDetailRequest = {
        billerId: this.selectedBill.billerId,
        contract: this.selectedBill.contract,
      };
      this.billItemSelected = obj_i;
      this.currentItem = obj_i;
      this.selectItem();

      this._facade.selectPayment(this.selectedBill);
      this._facade.getInfoBill(bill);

      if (this.isMobile) {
        this._router.navigate([Navigate.paymentsv2registeredSP]);
      }
    }
  }

  public selectItem(): void {
    this._dom.removeMultipleClass('.card-admin', 'selected');
    this._dom.addClass('.card' + this.billItemSelected, 'selected');
  }

  public returnBillers(): void {
    this.nextPayments$
      .pipe(takeUntil(this._destroy$))
      .subscribe((billArray: INextPublicServicesPayments) => {
        if (!!billArray && !!billArray.bills) {
          const bills: IPublicService[] = billArray.bills;
          this.nextbillers = bills.filter((value: IPublicService) => {
            const dueDate = new Date(value.dueDate);
            const now = new Date();
            return !isNullOrUndefined(value) && value.biller && dueDate >= now;
          });
        }
      });
  }

  public startData(): void {
    this.allPayments$
      .pipe(takeUntil(this._destroy$))
      .subscribe((allPayments) => {
        if (
          !!allPayments &&
          !!allPayments.bills &&
          allPayments.bills.length > 0
        ) {
          this.allPaymentsLength = allPayments.bills.length;
          if (!this.isMobile) {
            if (!!this.selectedBill && !!this.selectedBill.contract) {
              this.currentItem = this._getIndexBiller(allPayments);
            }
            this.selectBill(
              allPayments.bills[this.currentItem],
              this.currentItem,
            );
            setTimeout(() => this.selectItem(), 100);
          }
        }
      });
  }

  private _getIndexBiller(allPayments: IAllPublicServicesPayments): number {
    return allPayments.bills.findIndex(
      (payment: IPublicService) =>
        payment.contract === this.selectedBill.contract &&
        payment.billerId === this.selectedBill.billerId,
    );
  }

  public addNewService(): void {
    this._router.navigate([Navigate.paymentsv2enrollservice]);
  }

  public doEdit($event: any): void {
    const dataToSend: IEditRecurring = {
      account_origin: $event.data.originAccountId,
      date: $event.data.daysBeforeAfterExpiration,
      amount: $event.data.maxAmount,
    };

    this._facade.setEditRecurrent(dataToSend);
    this.setProgramed(true);
  }

  public onDeletePublicService($event: any): void {
    this._util.onDeletePublicService($event.data);
  }

  public refresh(): void {
    this._facade.fetchAllPayments();
  }

  public doPayService($event: any): void {
    this._util.doPayService($event.data);
  }

  public doPayServiceTop($event: any): void {
    this._facade.setPayment($event.data);
    this._router.navigate([Navigate.paymentsv2payservice]);
  }

  public activeEdit(): void {
    this.editMode = !this.editMode;
  }

  public setProgramed(data: boolean): void {
    this._util.setProgramed(data, this.selectedBill);
  }

  public backitem(): void {
    document.querySelector('.next-payments-list').scrollLeft += 180;
  }

  public nextitem(): void {
    document.querySelector('.next-payments-list').scrollLeft -= 180;
  }

  public showNavsButtons(): void {
    if (document.querySelector('.next-payments-list')) {
      this.showNav = false;
      if (
        document.querySelector('.next-payments-list').clientWidth <
        document.querySelector('.next-payments-list').scrollWidth
      ) {
        this.showNav = true;
      }
    }
  }

  private _subsChangeRecurring(): void {
    this.changeRecurring$
      .pipe(takeUntil(this._destroy$))
      .subscribe((response: IRecurringPaymentState) => {
        if (!!response && (response.loaded || response.error)) {
          this.refresh();
        }
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
  }

  private _orderBills(
    data: IAllPublicServicesPayments,
  ): IAllPublicServicesPayments {
    return {
      ...data,
      bills: [...data.bills].sort((a, b) => {
        if (a.contract > b.contract) {
          return 1;
        }
        if (a.contract < b.contract) {
          return -1;
        }
        return 0;
      }),
    };
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

  get editModeStatus(): boolean {
    return this.editMode;
  }

  get hasNextBills$(): Observable<boolean> {
    return this.nextPayments$.pipe(
      map(
        (info) =>
          !isNullOrUndefined(info) &&
          !isNullOrUndefined(info.bills) &&
          info.bills.length > 0,
      ),
    );
  }

  get hasAllBills$(): Observable<boolean> {
    return this.allPayments$.pipe(
      map(
        (info) =>
          !isNullOrUndefined(info) &&
          !isNullOrUndefined(info.bills) &&
          info.bills.length > 0,
      ),
    );
  }

  get nextPayments$(): Observable<INextPublicServicesPayments> {
    return this._facade.nextPayments$;
  }

  get deletePayment$(): Observable<IDeletePublicServicePayments> {
    return this._facade.deletePayment$;
  }

  get allPayments$(): Observable<IAllPublicServicesPayments> {
    return this._facade.allPayments$.pipe(
      map((data) => {
        if (!data || !data.bills || data.bills.length <= 0) {
          return data;
        }
        return this._orderBills(data);
      }),
    );
  }

  get selectedPayment$(): Observable<BillerDetailState> {
    return this._facade.selectedPayment$;
  }

  get selectedNoDataPayment$(): Observable<IPublicService> {
    return this._facade.selectedNotDataPayment$;
  }

  get enabledAgreements$(): Observable<EnabledAgreementsState> {
    return this._facade.selectEnabledAgreements$;
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get selectDeleteRecurring$(): Observable<IRecurringPaymentState> {
    return this._facade.selectDeleteRecurring$;
  }

  get selectRecurring$(): Observable<IRecurringPaymentState> {
    return this._facade.selectRecurring$;
  }

  get getActiveNotdataPaymentState$(): Observable<IPublicService> {
    return this._facade.getActiveNotdataPaymentState$;
  }
  // tslint:disable-next-line:max-file-line-count
}

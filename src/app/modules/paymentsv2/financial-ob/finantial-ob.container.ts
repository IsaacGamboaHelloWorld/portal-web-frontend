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
import { ID_BANK_POPULAR } from '@app/core/constants/global';
import { TYPE_PAYMENTS } from '@app/modules/payments/home-payments/constants/types';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { INavigate } from '@core/constants/navigate';
import { IBanks } from '@store/reducers/models/banks/loans_banks.reducer';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Navigate } from '../../../core/constants/navigate';
import { TYPE_ACCOUNTS } from '../../../core/constants/types_account';
import { Product } from '../../../core/models/products/product';
import { PaymentModel } from '../../payments/payment.model';
import { ManipulateDomService } from './../../../core/services/manipulate-dom/manipulate-dom.service';
import { IBankElement, IFinancialOp } from './entities/financial-op';
import { FinancialOpFacade } from './finantial-ob.facade';
import { PaymentFreeDestinationModel } from './payment-fd-pse/store/models/payment-free-destination.model';
import { IDeleteLoanPayments } from './store/reducers/delete-payment.reducer';
import { IHistoricPayments } from './store/reducers/payment-history.reducer';
import { IAllFinancialOpPayments } from './store/reducers/registered-bills.reducer';
import { IActiveFinancialOpPaymentPayments } from './store/reducers/selected-payment.reducer';
import { UtilsService } from './transversal/utils.service';

@Component({
  selector: 'app-finantial-ob',
  templateUrl: './finantial-ob.container.html',
  styleUrls: ['./finantial-ob.container.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinantialObContainer implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public nextbillers: Product[] = [];
  public selectedBill: IFinancialOp;
  public editMode: boolean = false;
  public allBanks: IBankElement[];
  public allPaymentsLength: number = 0;
  public billSelected: number = 0;
  public showNav: boolean;
  public iconArrowRight: string = '/arrow-left-scheduled.svg';
  public iconArrowLeft: string = '/arrow-right-scheduled.svg';
  public iconColor: boolean = false;
  public showArrow: boolean = false;

  @ViewChild('scroll', null) public scroll: ElementRef;
  public indice: number = 1;
  constructor(
    private _facade: FinancialOpFacade,
    private _router: Router,
    private _model: PaymentModel,
    private _dom: ManipulateDomService,
    private _util: UtilsService,
    private _modelPse: PaymentFreeDestinationModel,
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
    this._facade.fetchAllPayments();
    this._facade.fetchHistoric();
    this._model.fetchBanks();
    this._modelPse.fetchBanksPse();
    this._model.resetProduct();
    this._setupClass(true);
    this._util.domMainContainreOb(false);

    this.loans_banks$
      .pipe(takeUntil(this._destroy$))
      .subscribe((banks) => (!!banks ? (this.allBanks = banks.data) : []));

    this._util
      .getRefresh()
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => {
        this.refresh();
      });

    this.selectedPayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((selected) => {
        if (!!selected.activePayment) {
          this.selectedBill = selected.activePayment;
        }
      });

    this.allPayments$
      .pipe(takeUntil(this._destroy$))
      .subscribe((allPayments: IAllFinancialOpPayments) =>
        this._checkAllPayments(allPayments),
      );

    this.hasNextBills$.pipe(takeUntil(this._destroy$)).subscribe((data) => {
      if (!!data) {
        this.showNavsButtons();
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._util.OnDestroy();
    this._setupClass(false);
  }

  private _checkAllPayments(allPayments: IAllFinancialOpPayments): void {
    if (
      !isNullOrUndefined(allPayments) &&
      !isNullOrUndefined(allPayments.registeredLoans) &&
      allPayments.registeredLoans.length > 0
    ) {
      this.allPaymentsLength = allPayments.registeredLoans.length;
      let selectedPayment = allPayments.registeredLoans[0];
      let index = 0;

      if (!isNullOrUndefined(this.selectedBill)) {
        selectedPayment = this.selectedBill;
        index = allPayments.registeredLoans.findIndex(
          (i: IFinancialOp) =>
            i.accountId === this.selectedBill.accountId &&
            i.accountType === this.selectedBill.accountType,
        );
      }
      if (!this.isMobile) {
        this.selectBill(selectedPayment, index);
      }
    }
  }

  private _setupClass(add: boolean): void {
    if (add) {
      this._dom.addClass('.main-container-transaction', 'container-ob');
    } else {
      this._dom.removeClass('.main-container-transaction', 'container-ob');
    }
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

  public selectBill(data: IFinancialOp, obj_i: number): void {
    if (!this.editMode) {
      if (!!data) {
        this.selectedBill = data;
        if (!!this.allBanks) {
          const e = this.allBanks.filter(
            (bank) => bank.value === this.selectedBill.bank,
          );
          this.selectedBill.bankName = e[0].name;
        }
        this._facade.selectPayment(data);
      }
    }

    this.billSelected = obj_i;
    setTimeout(() => this.selectItem(), 50);

    if (this.isMobile && !this.editMode) {
      this._router.navigate([Navigate.paymentsv2registeredOB]);
    }
  }

  get productsOrigin$(): Observable<Product[]> {
    return this.productsTC$.pipe(
      map((product: Product[]) =>
        product.filter(
          (data) => data.typeAccount === TYPE_ACCOUNTS.CREDIT_CARD,
        ),
      ),
    );
  }

  public selectItem(): void {
    this._dom.removeMultipleClass('.card-admin', 'selected');
    this._dom.addClass('.card' + this.billSelected, 'selected');
  }

  public doPayLoanTop($event: any): void {
    const tempLoan: IFinancialOp = {
      accountId: $event.data.accountInformation.accountIdentifier,
      accountType: $event.data.accountInformation.productType,
      bank: '0002',
      loanName: $event.data.accountInformation.productName,
      bankName: $event.data.accountInformation.bank,
      newLoan: false,
    };
    const _event = {
      data: tempLoan,
      action: 'PAY',
    };
    this.doPayLoan(_event);
  }

  public doPayLoan($event: any): void {
    this.optionsModule$
      .subscribe((data: OptionModuleState) =>
        this._mapOptionModule($event, data),
      )
      .unsubscribe();
  }

  private _mapOptionModule($event: any, data: OptionModuleState): void {
    if (
      !data ||
      !data.data ||
      !data.data.payments ||
      !data.data.payments.options
    ) {
      this._doPayRedirect($event, false, false);
      return;
    }
    const isPseTC = data.data.payments.options.payment_pse_credit_card;
    const isPseFD = data.data.payments.options.payment_pse_free_destiny;
    this._doPayRedirect($event, isPseFD, isPseTC);
  }

  private _doPayRedirect(
    $event: any,
    isPseFD: boolean,
    isPseTC: boolean,
  ): void {
    const typeProduct = $event.data.accountType;
    const bank = $event.data.bank;
    const isPseTCNavigate =
      isPseTC &&
      (typeProduct === TYPE_PAYMENTS.CREDIT_CARD ||
        typeProduct === TYPE_PAYMENTS.TC) &&
      bank === ID_BANK_POPULAR;
    const isPseFDNavigate =
      isPseFD &&
      typeProduct === TYPE_PAYMENTS.CREDIT &&
      bank === ID_BANK_POPULAR;
    const isPseNavigate = isPseFDNavigate || isPseTCNavigate;
    this._facade.setFlowFreeDestination(isPseNavigate);
    this.selectBill($event.data, 0);
    this._router.navigate([
      isPseNavigate ? Navigate.paymentsv2payForPse : Navigate.paymentsv2payloan,
    ]);
  }

  public addNewLoan(): void {
    this._router.navigate([Navigate.paymentsv2enrollloan]);
  }

  public doDeleteFinancialOp($event: any): void {
    this._util.doDeleteFinancialOp($event);
  }

  public refresh(): void {
    this._facade.fetchAllPayments();
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

  public activeEdit(): void {
    this.editMode = !this.editMode;
  }

  get editModeStatus(): boolean {
    return this.editMode;
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get hasNextBills$(): Observable<boolean> {
    return this.productsTC$.pipe(
      map((info) => !isNullOrUndefined(info) && info.length > 0),
    );
  }

  get loans_banks$(): Observable<IBanks> {
    return this._model.loans_banks$;
  }

  get hasAllBills$(): Observable<boolean> {
    return this.allPayments$.pipe(
      map(
        (info) =>
          !isNullOrUndefined(info) &&
          !isNullOrUndefined(info.registeredLoans) &&
          info.registeredLoans.length > 0,
      ),
    );
  }

  get productsTC$(): Observable<Product[]> {
    return this._facade.nextPayments$;
  }
  get allNextpayments$(): Observable<Product[]> {
    return this._facade.nextPayments$;
  }

  get allPayments$(): Observable<IAllFinancialOpPayments> {
    return this._facade.allPayments$;
  }

  get selectedPayment$(): Observable<IActiveFinancialOpPaymentPayments> {
    return this._facade.selectedPayment$;
  }

  get deletePayment$(): Observable<IDeleteLoanPayments> {
    return this._facade.deletePayment$;
  }

  get hasActivePayment$(): Observable<boolean> {
    return this.selectedPayment$.pipe(
      map(
        (info) =>
          !isNullOrUndefined(info) && !isNullOrUndefined(info.activePayment),
      ),
    );
  }

  get historicPayments$(): Observable<IHistoricPayments> {
    return this._facade.historicPayments$;
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this._model.optionModule$;
  }
  // tslint:disable-next-line: max-file-line-count
}

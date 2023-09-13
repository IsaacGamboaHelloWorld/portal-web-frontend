import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@app/core/constants/events';
import { NEW } from '@app/core/constants/global';
import { Navigate, Titles } from '@app/core/constants/navigate';
import { EventsService } from '@app/core/services/tag_manager/events.service';
import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { DATE } from '@app/modules/transfer-to-account/constants/calendar';
import { IFormOneTransferInterface } from '@app/modules/transfer-to-account/entities/formOneTransfer.interface';
import { IScheduleTransferCreate } from '@app/modules/transfer-to-account/entities/scheduledTransfer.interface';
import { IAccountTransferState } from '@app/modules/transfer-to-account/store/reducers/account-tranfer.reducer';
import { FormStepThreeState } from '@app/modules/transfer-to-account/store/reducers/form-step-three.reducer';
import { FormStepTwoState } from '@app/modules/transfer-to-account/store/reducers/form-step-two.reducer';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  INavigateOldTransfer,
  NavigateOldTransfer,
} from '../../constants/routes';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.sass'],
})
export class StepFourComponent implements OnInit, OnDestroy {
  public date: object = new Date();
  public loading: boolean = false;
  public subscribe: Subscription = new Subscription();
  public nicknameFrom: string = '';
  public nicknameTo: string = '';

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _modelTransfer: TransferModel,
    private events: EventsService,
    private nickName: NicknamesService,
    private _router: Router,
  ) {}
  // confirmacion

  ngOnInit(): void {
    this._setStep(4);

    this._validateStep();
    this.getNickname();
    this._modelTransfer.resetScheduledTransfer();
    this._modelTransfer.resetTransfer();
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _setStep(step: number): void {
    this._modelTransfer.setStep({ step });
  }
  public stepOne(): void {
    this._setStep(1);
    this._router.navigate([this.navigate.step1]);
  }
  get navigate(): INavigateOldTransfer {
    return NavigateOldTransfer;
  }

  public getNickname(): void {
    combineLatest([
      this.nickName.nicknamesAll(),
      this._modelTransfer.formOne$,
    ]).subscribe(([nick, formOne]: any) => {
      if (nick && formOne) {
        const nickname = nick.nicknames.filter(
          (e: any) =>
            e['accountId'] ===
            formOne.account_origin.accountInformation.accountIdentifier,
        );
        nickname['name'] = nickname['name']
          ? nickname['name']
          : formOne.account_origin.accountInformation.productName;
        this.nicknameFrom = nickname['name'];
        this.nicknameTo = formOne.account_destination.customerName;
      }
    });
  }

  get isNew$(): Observable<boolean> {
    return this.formOne$.pipe(
      filter(
        (data) =>
          !isNullOrUndefined(data) &&
          !isNullOrUndefined(data['account_destination']) &&
          !isNullOrUndefined(data.account_destination['destinationAccountId']),
      ),
      map((data: IFormOneTransferInterface) => {
        return data.account_destination.destinationAccountId === NEW;
      }),
    );
  }

  get isScheduled$(): Observable<boolean> {
    return this._modelTransfer.formThree$.pipe(
      map(
        (data) =>
          !isNullOrUndefined(data.scheduledTransfer) &&
          data.scheduledTransfer === DATE,
      ),
    );
  }

  get dateTransfer$(): Observable<object | string> {
    return this.formThree$.pipe(map((data) => data.dueDate));
  }

  get formOne$(): Observable<IFormOneTransferInterface> {
    return this._modelTransfer.formOne$;
  }

  get formTwo$(): Observable<FormStepTwoState> {
    return this._modelTransfer.formTwo$;
  }

  get formThree$(): Observable<FormStepThreeState> {
    return this._modelTransfer.formThree$;
  }

  public submitData(): void {
    this.loading = true;
    combineLatest([this.formOne$, this.formTwo$, this.formThree$])
      .subscribe(([formOne, formTwo, formThree]: any) => {
        formThree.scheduledTransfer === DATE
          ? this._modelTransfer.fetchScheduledCreate(
              formOne,
              formTwo.amount,
              formTwo.voucher,
              formTwo.description,
              this._validateDate(formThree),
              formOne.account_destination.destinationAccountId === NEW,
              formThree.scheduledTransfer === DATE,
              formThree.favorite,
              formThree.periodicity,
              formThree.numberRepeat,
              this.nicknameFrom,
              this.nicknameTo,
            )
          : this._modelTransfer.fetchTransfer(
              formOne,
              formTwo.amount,
              formTwo.voucher,
              formTwo.description,
              this._validateDate(formThree),
              formOne.account_destination.destinationAccountId === NEW,
              formThree.scheduledTransfer === DATE,
              formThree.favorite,
              formTwo.transactionCost,
              this.nicknameFrom,
              this.nicknameTo,
            );
      })
      .unsubscribe();
  }

  private _validateStep(): void {
    this._modelTransfer.formThree$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: FormStepThreeState) => {
        data.scheduledTransfer === DATE
          ? this.validTransferScheduled()
          : this.validTransfer();
      });
  }

  public validTransfer(): void {
    this.subscribe = this._modelTransfer.transfer$
      .pipe(takeUntil(this._destroy$))
      .subscribe((transfer: IAccountTransferState) => {
        this.loading = transfer.loading;
        if (!isNullOrUndefined(transfer.data)) {
          if (transfer.data.success) {
            this._setStep(5);
            this._router.navigate([this.navigate.step5]);
            this.subscribe.unsubscribe();
          }
        }
      });
  }

  public validTransferScheduled(): void {
    this.subscribe = this._modelTransfer.transferScheduled$
      .pipe(takeUntil(this._destroy$))
      .subscribe((transfer: IScheduleTransferCreate) => {
        if (!isNullOrUndefined(transfer)) {
          if (transfer.success) {
            this.events.event({
              event: Events.page_view,
              pagePath: window.location.pathname + Navigate.transfer_pending,
              pageTitle: Titles.transfer_pending,
            });
            this._setStep(6);
            this._router.navigate([this.navigate.step6]);
            this.loading = false;
            this.subscribe.unsubscribe();
          }
          if (transfer.errorMessage) {
            this.loading = false;
          }
        }
      });
  }

  private _validateDate(formThree: FormStepThreeState): string {
    if (formThree.scheduledTransfer === DATE) {
      return !isNullOrUndefined(formThree.dueDate)
        ? formThree.dueDate.toISOString()
        : null;
    } else {
      return null;
    }
  }
}

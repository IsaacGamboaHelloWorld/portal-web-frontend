import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { ClassNotification } from '@app/core/constants/notification';
import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  IAnswerPaymentTaxes,
  IDatePaymentTaxes,
  IPaymentTaxesFormOne,
  ISendPaymentTaxes,
} from '../../entities/payment-taxes';
import {
  INavigatePaymentTaxes,
  NavigatePaymentTaxes,
} from '../../entities/routes';
import { PaymentTaxesModel } from '../../store/model/payment-taxes.model';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFourComponent implements OnInit, OnDestroy {
  public viewSucces: boolean;
  public imgTicket: string;
  public textBtn: string;
  public approvalId: boolean = false;
  public textTitle: string;
  public textDescription: string;
  public textButton: string;
  public disabled: boolean = false;
  public costTransfer: number = 0;
  public nicknameFrom: string = '';

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private model: PaymentTaxesModel,
    private modelOpen: ApplicationModel,
    private router: Router,
    private _translateService: TranslateService,
    private nickName: NicknamesService,
  ) {}

  get navigate(): INavigatePaymentTaxes {
    return NavigatePaymentTaxes;
  }

  get infoPaymentTaxes(): Observable<IPaymentTaxesFormOne> {
    return this.model.stepOne$;
  }

  get datePaymentTaxes(): Observable<IDatePaymentTaxes> {
    return this.model.date$;
  }

  get statePayment(): Observable<IAnswerPaymentTaxes> {
    return this.model.statePayment$;
  }

  ngOnInit(): void {
    this._setStep(4);
    this.viewSucces = false;
    this.imgTicket = '/confirmation.png';
    this.textBtn = 'PAYMENT_TAXES.CONFIRM.BTN';
    this.textTitle = 'PAYMENT_TAXES.CONFIRM.TEXTCONFIRM';
    this.getNickname();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _setStep(step: number): void {
    this.model.setStep({ step });
  }

  public submitData(): void {
    this.approvalId = true;
    this.infoPaymentTaxes
      .subscribe((data) => {
        const sendData: ISendPaymentTaxes = {
          accountId: data.account_origin.id,
          accountType: data.account_origin.typeAccount,
          cityId: data.city['id'],
          serviceCode: data.taxe['organizationIdType'],
          nie: String(data.reference),
          invoiceNumber: String(data.reference),
          amount: String(data.amount),
          serviceCompanyName:
            data.city['name'] + ' - ' + data.taxe['entityName'],
          originNickName: this.nicknameFrom,
        };
        this.model.creationSucces(sendData);
      })
      .unsubscribe();

    this.statePayment.pipe(takeUntil(this._destroy$)).subscribe((amswer) => {
      if (amswer.errorMessage) {
        this.approvalId = false;
      }
      if (amswer.success) {
        this.approvalId = false;
        this.viewSucces = true;
        this.imgTicket = '/like_success.svg';
        this.textBtn = 'TRANSFER.PENDING.BTN';
        this.textTitle = 'PAYMENT_TAXES.CONFIRM.TEXTSUCCESS';
        this.textDescription = 'PAYMENT_TAXES.CONFIRM.DESCRIPTION';
        this.textButton = 'ADVANCE.DOWNLOAD';
      }
    });
  }

  public doEdit(): void {
    this._setStep(1);
    this.router.navigate([this.navigate.step1]);
  }

  public end(): void {
    this._setStep(1);
    this.modelOpen.notificationOpen(
      this._translateService.instant('PAYMENT_TAXES.LIST_MSM.MSM_SUCCESS'),
      true,
      ClassNotification.SUCCESS,
      false,
      '',
    );
    this.router.navigate([this.navigate.payment]);
    this.model.reset();
  }
  public download(): void {
    this.disabled = true;
    createJpeg('payment-taxes')
      .then((dataUrl) => {
        downloadImage('payment-taxes.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
  }
  public doNew(): void {
    this._setStep(1);
    this.router.navigate([this.navigate.payment]);
  }

  public getNickname(): void {
    combineLatest([
      this.nickName.nicknamesAll(),
      this.infoPaymentTaxes,
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
      }
    });
  }
}

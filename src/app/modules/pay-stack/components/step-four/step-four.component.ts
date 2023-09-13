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
  IDatePayStack,
  IPayStackFormOne,
  PilaPaymentRequest,
  PilaPaymentResponse,
} from '../../entities/pay-stack';
import { INavigatePayStack, NavigatePayStack } from '../../entities/routes';
import { PayStackModel } from '../../store/model/pay-stack.model';

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
  public expirationDate: Date;
  public disabled: boolean = false;
  public request: PilaPaymentRequest;
  public costTransfer: number = 0;
  public nicknameFrom: string = '';

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private model: PayStackModel,
    private modelOpen: ApplicationModel,
    private router: Router,
    private _translateService: TranslateService,
    private nickNames: NicknamesService,
  ) {}

  get navigate(): INavigatePayStack {
    return NavigatePayStack;
  }

  get infoPaystack(): Observable<IPayStackFormOne> {
    return this.model.stepOne$;
  }

  get datePayStack(): Observable<IDatePayStack> {
    return this.model.date$;
  }

  get statePayment(): Observable<PilaPaymentResponse> {
    return this.model.statePayment$;
  }

  ngOnInit(): void {
    this._setStep(4);
    this.viewSucces = false;
    this.imgTicket = '/confirmation.png';
    this.textBtn = 'PAY_STACK.CONFIRM.BTN';
    this.textTitle = 'PAYMENT_TAXES.CONFIRM.TEXTCONFIRM';
    this.datePayStack.subscribe((today: IDatePayStack) => {
      this.expirationDate = today.date;
    });
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
    this.infoPaystack
      .subscribe((data) => {
        const sendData: PilaPaymentRequest = {
          originAccount: {
            accountId: data.account_origin.id,
            accountType: data.account_origin.typeAccount,
            nickName: this.nicknameFrom,
          },
          payment: {
            amount: data.amount,
            billerId: data.payroll['organizationId'],
            billerName: data.payroll['entityName'],
            nie: String(data.number_payroll),
            invoice: data.invoiceNumber.split(' ').join(''),
          },
        };
        this.model.creationSucces(sendData);
      })
      .unsubscribe();

    this.statePayment
      .pipe(takeUntil(this._destroy$))
      .subscribe((amswer: PilaPaymentResponse) => {
        if (amswer.errorMessage) {
          this.approvalId = false;
        }
        if (amswer.success && !!amswer.request) {
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
    this.model.cleanOnBackAction();
    this._setStep(1);
    this.router.navigate([this.navigate.step1]);
  }

  public end(): void {
    this._setStep(1);
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
    this.modelOpen.notificationOpen(
      this._translateService.instant('PAYMENT_TAXES.LIST_MSM.MSM_SUCCESS'),
      true,
      ClassNotification.SUCCESS,
      false,
      '',
    );
    this.router.navigate([this.navigate.payment]);
  }

  public formatDate(date: Date): string {
    const d = new Date(date);
    let month: string = '' + (d.getMonth() + 1);
    let day: string = '' + d.getDate();
    const year: number = d.getFullYear();
    let dateFinal: string;

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    dateFinal = [year, month, day].join('-');
    return `${dateFinal}T00:00:00.000`;
  }

  public getNickname(): void {
    combineLatest([this.nickNames.nicknamesAll(), this.infoPaystack]).subscribe(
      ([nick, formOne]: any) => {
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
      },
    );
  }
}

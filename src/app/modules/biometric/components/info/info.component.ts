import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ClassNotification } from '@app/core/constants/notification';
import { PaymentTaxesModel } from '@app/modules/payment-taxes/store/model/payment-taxes.model';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { OtpAthOperations } from '@app/shared/otp-ath-wrapper/constants/otp-ath-operations.enum';
import {
  IOtpAthModalFlow,
  OtpAthModel,
} from '@app/shared/otp-ath-wrapper/store';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { INavigateBiometric, NavigateBiometric } from '../../entities/routes';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public listDesc: Array<{
    TEXT: string;
  }> = this.translate.instant('AUTH.ENROLLMENT.BIOMETRIC.REGISTER_LIST');
  public listPoints: object[] = [];
  public count: number = 0;
  public stepCheck: HTMLCollection;
  public titleStep: string = 'AUTH.ENROLLMENT.BIOMETRIC.ONBOARDING.STEP1.TITLE';
  public textStep: string = 'AUTH.ENROLLMENT.BIOMETRIC.ONBOARDING.STEP1.DESC';
  public imgStep: string = '/Illustration-Android.svg';
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public subsOtp: Subscription = new Subscription();
  @ViewChild('step', null) step: ElementRef;
  constructor(
    private fingerprintService: WebAuthnService,
    private translate: TranslateService,
    private router: Router,
    private model: PaymentTaxesModel,
    private render: Renderer2,
    private modalService: ModalService,
    private _otpModel: OtpAthModel,
  ) {}

  get navigate(): INavigateBiometric {
    return NavigateBiometric;
  }

  get otpAthModalFlow$(): Observable<IOtpAthModalFlow> {
    return this._otpModel.modalFlowOtpAth$;
  }

  ngOnInit(): void {
    this._setStep(1);
    this.listDesc = typeof this.listDesc === 'object' ? this.listDesc : [];
    this.listPoints = [];
    this.listPoints = [
      ...this.listPoints,
      { id: '1', checked: true, value: 0 },
      { id: '2', checked: false, value: 1 },
      { id: '3', checked: false, value: 2 },
    ];
    setTimeout(() => {
      this.stepCheck = document.getElementsByClassName('page-point');
      if (this.stepCheck.length) {
        this.stepCheck.item(this.count)['checked'] = true;
      }
    }, 500);
  }

  private _subOtpAthFlow(): void {
    this.subsOtp = this.otpAthModalFlow$
      .pipe(takeUntil(this._destroy$))
      .subscribe((state: IOtpAthModalFlow) => {
        if (state.success) {
          this.startRegister();
        }
        this.subsOtp.unsubscribe();
      });
  }

  public startRegister(): void {
    this.fingerprintService
      .register()
      .then((data) => {
        if (data['success']) {
          this.router.navigate([this.navigate.terms], {
            state: {
              rawId: data['request']['publicKeyCredential']['rawId'],
            },
          });
        } else {
          this.setFail();
        }
      })
      .catch((error) => {
        this.setFail();
      });
  }

  public create(): void {
    this._otpModel.otpAthModalOpen(OtpAthOperations.webauth);
    this._subOtpAthFlow();
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  public toggle(event: string): void {
    this.render.removeClass(this.step.nativeElement, 'fade-in-right');
    this.render.removeClass(this.step.nativeElement, 'fade-in-left');
    switch (event) {
      case 'prev':
        this.count--;
        this.render.addClass(this.step.nativeElement, 'fade-in-left');
        break;
      case 'next':
        this.count++;
        this.render.addClass(this.step.nativeElement, 'fade-in-right');
        break;
    }
    this.count =
      this.count < 0
        ? 0
        : this.count >= this.stepCheck.length
        ? this.stepCheck.length - 1
        : this.count;
    this.stepCheck.item(this.count)['checked'] = true;
    switch (this.stepCheck.item(this.count)['value']) {
      case '0':
        this.titleStep = 'AUTH.ENROLLMENT.BIOMETRIC.ONBOARDING.STEP1.TITLE';
        this.textStep = 'AUTH.ENROLLMENT.BIOMETRIC.ONBOARDING.STEP1.DESC';
        this.imgStep = '/Illustration-Android.svg';
        break;
      case '1':
        this.titleStep = 'AUTH.ENROLLMENT.BIOMETRIC.ONBOARDING.STEP2.TITLE';
        this.textStep = 'AUTH.ENROLLMENT.BIOMETRIC.ONBOARDING.STEP2.DESC';
        this.imgStep = '/Illustration-Mark.svg';
        break;
      case '2':
        this.titleStep = 'AUTH.ENROLLMENT.BIOMETRIC.ONBOARDING.STEP3.TITLE';
        this.textStep = 'AUTH.ENROLLMENT.BIOMETRIC.ONBOARDING.STEP3.DESC';
        this.imgStep = '/Illustration-Devices.svg';
        break;
      default:
        this.count = 0;
        break;
    }
  }

  public registerBiometric(): void {
    this.isLoading = true;
    this.question(false, true);
  }

  public question(question?: boolean, valid?: boolean): void {
    this.modalService.open(
      ModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
      false,
      { viewQuestion: question, viewValid: valid },
    );

    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.modalService.close();
        this.isLoading = false;
      });
      component.actionAgree
        .pipe(takeUntil(this._destroy$))
        .subscribe((obj?: object) => {
          this.modalService.close();
          this.isLoading = false;
          if (obj && obj['valid']) {
            setTimeout(() => {
              this.question(false, true);
            }, 500);
          } else {
            this.create();
          }
        });
    }
  }

  public skip(): void {
    this.router.navigate([this.navigate.home]);
  }

  public setFail(): void {
    this.model.notificationOpen(
      this.translate.instant('AUTH.ENROLLMENT.BIOMETRIC.MODAL_ERROR.TITLE'),
      true,
      ClassNotification.ERROR,
      true,
      this.translate.instant('AUTH.ENROLLMENT.BIOMETRIC.MODAL_ERROR.DESC'),
    );
    this.router.navigate([this.navigate.dashboard]);
  }

  ngOnDestroy(): void {
    this.subsOtp.unsubscribe();
  }
}

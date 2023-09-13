import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public options: object = {};
  public list: object[] = [];
  public visibleModal: boolean;
  public showResult: boolean = false;
  public validRegister: boolean = false;
  public subsOtp: Subscription = new Subscription();
  public count: number = 0;
  constructor(
    private router: Router,
    private modalService: ModalService,
    private fingerprintService: WebAuthnService,
    private model: ApplicationModel,
    private translate: TranslateService,
    private modelStep: PaymentTaxesModel,
    private _otpModel: OtpAthModel,
  ) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation()['extras']['state']
    ) {
      this.showResult = this.router.getCurrentNavigation().extras.state.result;
    }
  }

  get navigate(): INavigateBiometric {
    return NavigateBiometric;
  }

  get otpAthModalFlow$(): Observable<IOtpAthModalFlow> {
    return this._otpModel.modalFlowOtpAth$;
  }

  ngOnInit(): void {
    this.fingerprintService.listCredentials().subscribe((data: object) => {
      this.list = [];
      this.validRegister = true;
      if (data && data['credentials']) {
        this.list = data['credentials'];
      }
    });
    if (this.showResult) {
      this.openAlert();
    }
  }
  public _setStep(step: number): void {
    this.modelStep.setStep({ step });
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
  public create(): void {
    this._otpModel.otpAthModalOpen(OtpAthOperations.webauth);
    this._subOtpAthFlow();
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

  public more(credential: object): void {
    this.options = credential;
    this.modalService.open(
      ModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
      false,
      this.options,
    );

    setTimeout(() => {
      this._actionsModal();
    }, 10);
  }

  public select(event: object): void {
    this.visibleModal = false;
  }

  public openAlert(): void {
    this.modalService.open(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
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
      component.icon = '/24-essential-like.svg';
      component.iconColor = '#50B946';
      component.contIconColor = '#C5ECBF';
      component.title = 'AUTH.ENROLLMENT.BIOMETRIC.MODAL_SUCCCES.TITLE';
      component.desc = 'AUTH.ENROLLMENT.BIOMETRIC.MODAL_SUCCCES.DESC';
      component.btnAgree = 'AUTH.ENROLLMENT.BIOMETRIC.MODAL_SUCCCES.BTN';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.modalService.close();
      });
      component.actionAgree
        .pipe(takeUntil(this._destroy$))
        .subscribe((data: object) => {
          if (data && data['reload']) {
            this.showResult = true;
            this.ngOnInit();
          }
          this.modalService.close();
        });
    }
  }

  public setFail(): void {
    this.model.notificationOpen(
      this.translate.instant('AUTH.ENROLLMENT.BIOMETRIC.MODAL_ERROR.TITLE'),
      true,
      ClassNotification.ERROR,
      true,
      this.translate.instant('AUTH.ENROLLMENT.BIOMETRIC.MODAL_ERROR.DESC'),
    );
    this.router.navigate([this.navigate.security]);
  }

  ngOnDestroy(): void {
    this.subsOtp.unsubscribe();
  }
}

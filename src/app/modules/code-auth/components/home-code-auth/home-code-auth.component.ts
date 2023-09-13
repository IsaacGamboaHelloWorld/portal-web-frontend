import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassNotification } from '@app/core/constants/notification';
import { DebitCardListStateData } from '@app/modules/blocked-products/entities/debit-cards-response';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  IAnswerAllowedCodeAuth,
  IAnswerGetQuestion,
  IAnswerSecureData,
  IAnswerSecureState,
} from '../../entities/code-auth';
import { INavigateCodeAuth, NavigateCodeAuth } from '../../entities/routes';
import { CodeAuthService } from '../../services/code-auth.service';
import { CodeAuthModel } from '../../store/model/code-auth.model';
import { ModalCodeAuthComponent } from '../modal-code-auth/modal-code-auth.component';

@Component({
  selector: 'app-home-code-auth',
  templateUrl: './home-code-auth.component.html',
  styleUrls: ['./home-code-auth.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCodeAuthComponent implements OnInit, OnDestroy {
  public count: number = 0;
  public indi: string = '';
  public editSecureData: boolean;
  public formSecureData: FormGroup;
  public contactPreference: string;
  private link: string =
    'https://www.bancopopular.com.co/BuscadordePuntosPopular/?entidad=popular';
  public titleCardOne: string = '';
  public descCardOne: string = '';
  public btnCardOne: string = '';
  public secondFactorAuth: string;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public subStateLoadCard: Subscription = new Subscription();
  public subStateQuestion: Subscription = new Subscription();
  public loading: boolean = false;
  public mailSecureData: string = '';

  constructor(
    private model: CodeAuthModel,
    private modalService: ModalService,
    private service: CodeAuthService,
    private translate: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  get stateActivate(): Observable<IAnswerAllowedCodeAuth> {
    return this.model.stateAllowedCodeAuth$;
  }

  get stateGetSecureData(): Observable<IAnswerSecureData> {
    return this.model.stateGetSecureDataCodeAuth$;
  }

  get navigate(): INavigateCodeAuth {
    return NavigateCodeAuth;
  }

  get stateGetQuestion(): Observable<IAnswerGetQuestion> {
    return this.model.stateGetQuestion$;
  }

  get stateLoadCard(): Observable<DebitCardListStateData> {
    return this.model.debitCardList$;
  }

  ngOnInit(): void {
    this._initForm();
    this.state();
    this._setStep(1);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public _initForm(): void {
    this.formSecureData = new FormGroup({
      phoneSecureData: new FormControl('', [Validators.required]),
      mailSecureData: new FormControl('', [Validators.email]),
      contactPreference: new FormControl(''),
    });
  }

  public update(event: string): void {
    this.model.setUserSecureData(
      this.formSecureData.value.phoneSecureData,
      this.formSecureData.value.mailSecureData,
      this.formSecureData.value.contactPreference,
    );
    let stateOn: DebitCardListStateData = null;
    let stateTw: IAnswerGetQuestion = null;
    this.stateLoadCard.subscribe((load) => {
      stateOn = load;
    });
    this.stateGetQuestion.subscribe((data) => {
      stateTw = data;
    });
    setTimeout(() => {
      if (
        !stateOn.success &&
        stateTw &&
        !stateTw.enrollmentSecureData &&
        stateTw.errorMessage
      ) {
        // RELEASE-EXPERIAN
        this.router.navigate([this.navigate.experian]);
        return;
        // TODO: UNCOMMENT THIS ON PRODUCTION STEPS BEFORE RELEASE-EXPERIAN
        // this.modalService.close();
        // this.model.notificationOpen(
        //   this.translate.instant('CODE_AUTH.LIST_MSM.MSM2'),
        //   true,
        //   ClassNotification.INFO,
        // );
      } else if (
        stateOn.success &&
        stateTw &&
        stateTw.enrollmentSecureData &&
        stateTw.success
      ) {
        this.modalService.open(
          ModalCodeAuthComponent,
          false,
          `${SMALL_WIDTH} not-button-close`,
        );
        setTimeout(() => {
          this._actionsModal();
        }, 10);
      } else {
        this.router.navigate([this.navigate.experian]);
      }
    }, 1000);
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
      component.secureEmail = this.formSecureData.value.mailSecureData;
      component.secureTelephone = `${this.formSecureData.value.phoneSecureData}`;
      component.contactPreference = this.formSecureData.value.contactPreference;

      component.actionCancel
        .pipe(takeUntil(this._destroy$))
        .subscribe(() => {});
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.modalService.close();
        this.model.authGetSecuerDataSucces();
        this.state();
      });
    }
  }
  public cancel(event: string): void {
    this.state();
    this.editSecureData = false;
  }

  public edit(event: string): void {
    this.editSecureData = true;
  }

  public state(): void {
    let secureTelephone = null;
    if (this.stateGetSecureData) {
      this.stateGetSecureData.subscribe((secure: IAnswerSecureData) => {
        this.formSecureData.controls.contactPreference.setValue(
          secure.contactPreference,
        );
        this.contactPreference = secure.contactPreference;
        this.count = 0;
        if (secure.secureTelephone) {
          this.indi = secure.ind;
          secureTelephone = secure.secureTelephone;
          this.count++;
          this.formSecureData.controls.phoneSecureData.setValue(
            secure.secureTelephone,
          );
        }
        if (secure.secureEmail) {
          this.count++;
          this.mailSecureData = this.setMaskEmail(secure.secureEmail);
          this.formSecureData.controls.mailSecureData.setValue(
            secure.secureEmail,
          );
        }
      });

      this.service.statusCodeAuth().subscribe((status: IAnswerSecureState) => {
        if (status.secondFactorAuth === 'ENHANCED') {
          this.secondFactorAuth = status.secondFactorAuth;
          this.titleCardOne = this.translate.instant(
            'CODE_AUTH.HOME.CARD1.TITLE1',
          );
          this.descCardOne = this.translate.instant(
            'CODE_AUTH.HOME.CARD1.TEXT1',
            { celular: String(secureTelephone).slice(-4) },
          );
        }
        if (
          status.secondFactorAuth === 'HARD' ||
          status.secondFactorAuth === 'QR' ||
          status.secondFactorAuth === 'VIRTUAL' ||
          status.secondFactorAuth === null
        ) {
          this.secondFactorAuth = '';
          this.titleCardOne = this.translate.instant(
            'CODE_AUTH.HOME.CARD1.TITLE2',
          );
          switch (status.secondFactorAuth) {
            case 'HARD':
              this.descCardOne = this.translate.instant(
                'CODE_AUTH.HOME.CARD1.TEXT2',
              );
              this.btnCardOne = this.translate.instant(
                'CODE_AUTH.HOME.BTN.ACTION',
              );
              break;
            case 'QR':
            case 'VIRTUAL':
            case null:
              this.descCardOne = this.translate.instant(
                'CODE_AUTH.HOME.CARD1.TEXT3',
              );
              this.btnCardOne = this.translate.instant(
                'CODE_AUTH.HOME.BTN.TEMPORARY',
              );
              break;
          }
        }
        this.cdr.detectChanges();
      });
    }
  }

  public offices(): void {
    window.open(this.link, '_blank');
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  public redirect(): void {
    this.stateGetQuestion.pipe(takeUntil(this._destroy$)).subscribe((data) => {
      if (data && !data.enrollmentSecureData && data.errorMessage) {
        this.modalService.close();
        this.model.notificationOpen(
          this.translate.instant('CODE_AUTH.LIST_MSM.MSM2'),
          true,
          ClassNotification.INFO,
        );
      }
      if (data && data.enrollmentSecureData && data.success) {
        this.router.navigate([this.navigate.step1]);
      }
    });
  }
  public selectContactPreference(preference: string): void {
    this.formSecureData.controls.contactPreference.setValue(preference);
    this.contactPreference = preference;
  }

  public setMaskEmail(secureEmail: string): string {
    const textSecureEmail = secureEmail;
    const countMask = textSecureEmail
      .split('@')[0]
      .slice(0, textSecureEmail.split('@')[0].length - 4);
    const mask = [];
    for (const iterator of Object.assign([], countMask)) {
      mask.push('*');
    }
    return `${String(mask).replace(/,/g, '')}${textSecureEmail
      .split('@')[0]
      .slice(textSecureEmail.split('@')[0].length - 4)}@${
      textSecureEmail.split('@')[1]
    }`;
  }
}

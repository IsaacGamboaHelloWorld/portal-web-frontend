import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassNotification } from '@app/core/constants/notification';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { AuthService } from '@app/modules/auth-old/services/auth.service';
import { DEFAULT_WIDTH } from '@app/shared/modal/constants/modal.style';
import { REMEMBER, TIMEOUT } from '@core/constants/auth';
import { IP } from '@core/constants/global';
import { PageView } from '@core/decorators/page-view.decorator';
import { SecurityService } from '@modules/security/services/security.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { NotificationTimeoutComponent } from '../../../core/components/notification-timeout/notification-timeout.component';
import { Events } from '../../../core/constants/events';
import { ModalService } from '../../../shared/modal/services/modal.service';
import { NavigateEnrollment, TitlesEnrollment } from '../constants/navigate';

// tslint:disable-next-line:ban-types
declare var rsaFunc: Function;
@PageView(NavigateEnrollment.login, TitlesEnrollment.login, Events.page_view)
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public showPassword: boolean = false;
  public disabled: boolean = false;
  public error: boolean = false;
  public options: object[];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild('idInput', { static: true }) public idInput: ElementRef;

  private initRemember: { type: string; number: string; remember: boolean } = {
    type: 'CC',
    number: '',
    remember: false,
  };

  constructor(
    private model: AuthModelOld,
    private securityService: SecurityService,
    private authService: AuthService,
    private modal: ModalService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.securityService.removePaymentId();
    this.options = [
      { label: 'AUTH.LOGIN.DOCUMENT_TYPE.CC', value: 'CC' },
      { label: 'AUTH.LOGIN.DOCUMENT_TYPE.CE', value: 'CE' },
      { label: 'AUTH.LOGIN.DOCUMENT_TYPE.NUI', value: 'TI' },
    ];

    if (localStorage.getItem(TIMEOUT)) {
      this.modal.open(
        NotificationTimeoutComponent,
        true,
        `${DEFAULT_WIDTH} not-button-close`,
        true,
        null,
      );
      localStorage.removeItem(TIMEOUT);
    }
    this._validRemember();
    this._initForm();
    this.isLoading$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      if (!isNullOrUndefined(data) && !data) {
        this.disabled = data;
      }
    });
    this.idInput.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get inputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  get isLoading$(): Observable<boolean> {
    return this.model.isLoadingLogin$;
  }

  public async onSubmit(): Promise<void> {
    const data: any = this.registerForm.value;
    this.saveUserOnStoreToRememberUserOption(data);
    this.resetData(true);
    try {
      if (await this.securityService.getSymmetricKey()) {
        setTimeout((_) => {
          this.model.fetchUser(data);
        }, 500);
      } else {
        this.resetData(false);
        setTimeout(() => {
          this.model.notificationOpen(
            this.translate.instant('CIPHER.TIMESTAMP_ERROR'),
            true,
            ClassNotification.ERROR,
          );
        }, 500);
      }
    } catch (e) {
      this.resetData(false);
      setTimeout(() => {
        this.model.notificationOpen(
          this.translate.instant('CIPHER.TIMESTAMP_ERROR'),
          true,
          ClassNotification.ERROR,
        );
      }, 500);
    }
  }

  private saveUserOnStoreToRememberUserOption(data: any): void {
    const rememberUserInfo = {
      type: data['content']['idType'],
      number: data['content']['id'],
      remember: data['remember'],
    };
    this.model.rememberUser(btoa(JSON.stringify(rememberUserInfo)));
  }

  public toggleInputType(): void {
    this.showPassword = !this.showPassword;
  }

  private _validRemember(): void {
    if (!isNullOrUndefined(localStorage.getItem(REMEMBER))) {
      this.initRemember = JSON.parse(atob(localStorage.getItem(REMEMBER)));
    }
  }

  private resetData(data: boolean): void {
    this.disabled = data;
    this.model.notificationReset();
  }

  private _initForm(): void {
    const rsaData: string = rsaFunc();
    this.registerForm = new FormGroup({
      content: new FormGroup({
        idType: new FormControl(this.initRemember.type, [Validators.required]),
        id: new FormControl(
          !isNullOrUndefined(this.initRemember.number)
            ? this.initRemember.number
            : '',
          [Validators.required, Validators.pattern(/^[0-9]+$/)],
        ),
        deviceSerial: new FormControl(rsaData),
        deviceName: new FormControl('Samsung'),
        companyId: new FormControl('0002'),
        ipAddress: new FormControl(IP),
      }),
      remember: new FormControl(
        !isNullOrUndefined(localStorage.getItem(REMEMBER)),
      ),
    });
  }

  public stateError(event: boolean): void {
    this.error = !event;
  }
}

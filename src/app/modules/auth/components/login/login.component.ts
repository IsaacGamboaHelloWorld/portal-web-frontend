import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationTimeoutComponent } from '@app/core/components/notification-timeout/notification-timeout.component';
import { IP } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@app/modules/security/services/security.service';
import { DEFAULT_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { REMEMBER, TIMEOUT } from '@core/constants/auth';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { URL_POLICIES } from '../../constants/urls-policies';
import { AuthModel } from '../../store/model/auth.model';

declare var rsaFunc: () => string;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  public formLoginDs: FormGroup;
  public showPassword: boolean = false;
  public disabled: boolean = false;
  public error: boolean = false;
  public options: object[];
  public ip: string;
  public viewBiometric: boolean = false;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  private initRemember: { type: string; number: string; remember: boolean } = {
    type: 'CC',
    number: '',
    remember: false,
  };
  constructor(
    private model: AuthModel,
    private securityService: SecurityService,
    private modal: ModalService,
    private translate: TranslateService,
    private dom: ManipulateDomService,
    private http: HttpClient,
    private fingerprintService: WebAuthnService,
  ) {}

  ngOnInit(): void {
    this.getIPAddress();
    this.securityService.removePaymentId();
    this.dom.removeClass('.footer-auth', 'remove-footer-auth');
    this.dom.addClass('.footer-auth', 'add-footer-auth');
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
    this.onValidBiometric();
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

  public async onSubmit(typelogin?: string): Promise<void> {
    const data: any = this.formLoginDs.value;
    this.saveUserOnStoreToRememberUserOption(data);
    this.resetData(true);
    try {
      if (await this.securityService.getSymmetricKey()) {
        setTimeout((_) => {
          this.model.fetchUser(data, typelogin);
        }, 500);
      } else {
        this.cipherError();
      }
    } catch (e) {
      this.cipherError();
    }
  }
  public async onValidBiometric(): Promise<void> {
    const data: any = this.formLoginDs.value;
    this.saveUserOnStoreToRememberUserOption(data);
    this.fingerprintService.getInitAuthData().then((init) => {
      if (init['success']) {
        this.viewBiometric = init['success'];
      }
    });
  }

  private cipherError(): void {
    this.resetData(false);
    setTimeout(() => {
      this.model.notificationOpen(
        this.translate.instant('CIPHER.TIMESTAMP_ERROR'),
        true,
        ClassNotification.ERROR,
      );
    }, 500);
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
    this.formLoginDs = new FormGroup({
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
        ipAddress: new FormControl(this.ip),
      }),
      remember: new FormControl(
        !isNullOrUndefined(localStorage.getItem(REMEMBER)),
      ),
    });
  }

  public stateError(event: boolean): void {
    this.error = !event;
  }

  public openPolicies(type: string): void {
    switch (type) {
      case 'privacy':
        window.open(URL_POLICIES.PRIVACY, '_blank');
        break;
      case 'terms':
        window.open(URL_POLICIES.TERMS, '_blank');
        break;
    }
  }

  public getIPAddress(): void {
    this.http
      .get('https://api.ipify.org/?format=json')
      .toPromise()
      .then((data: any) => {
        this.ip = data['ip'];
      });
  }
}

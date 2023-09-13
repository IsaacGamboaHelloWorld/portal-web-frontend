import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BIOMETRIC, STATE_BIOMETRIC } from '@app/core/constants/auth';
import { UserData } from '@app/core/models/user/userData';
import { STEPS } from '@app/modules/auth/constants/steps';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import {
  IOtpAthModalFlow,
  OtpAthModel,
} from '@app/shared/otp-ath-wrapper/store';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@Component({
  selector: 'app-info-register-biometric',
  templateUrl: './info-register-biometric.component.html',
  styleUrls: ['./info-register-biometric.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoRegisterBiometricComponent extends AbstractEnrollmentComponent
  implements OnInit {
  public options: any[] = [];
  public state: string = STATE_BIOMETRIC.INFO;
  public isLoading: boolean = false;
  public enrollmentData$: Observable<{
    data: UserData;
  }> = this.model.enrollmentData$;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public listDesc: Array<{
    TEXT: string;
  }> = this.translate.instant('AUTH.ENROLLMENT.BIOMETRIC.REGISTER_LIST');

  constructor(
    protected model: AuthModel,
    private fingerprintService: WebAuthnService,
    private translate: TranslateService,
    private modelAuth: AuthModel,
  ) {
    super(model);
  }

  ngOnInit(): void {
    this.listDesc = typeof this.listDesc === 'object' ? this.listDesc : [];
    this._initForm();
  }

  protected _initForm(): void {
    let processId: any = '';
    this.enrollmentData$.subscribe((enroll) => {
      if (enroll && enroll.data['processId']) {
        processId = enroll.data['processId'];
      }
    });
    this.registerForm = new FormGroup({
      content: new FormGroup({
        universalPassword: new FormControl(''),
        forgotPassword: new FormControl(false),
        fingerprint: new FormControl(null),
      }),
      processId: new FormControl(processId),
    });
  }

  public registerBiometric(): void {
    this.isLoading = true;
    this.fingerprintService.getInitAuthData().then((init) => {
      if (init.success) {
        this.fingerprintService.getCredential(init).then((credential) => {
          if (credential.success) {
            this.registerForm.controls.content['controls'].fingerprint.setValue(
              credential['publicKeyCredential'],
            );
            this.modelAuth.fetchUser(this.registerForm.value);
          } else {
            this.setFail();
          }
        });
      }
    });
  }

  public startRegisterBiometric(): void {
    this.fingerprintService
      .register()
      .then((data) => {
        this.isLoading = false;
        if (data['success']) {
          localStorage.setItem(
            BIOMETRIC,
            data['request']['publicKeyCredential']['rawId'],
          );
          this.setUpdate();
        } else {
          this.setFail();
        }
      })
      .catch((error) => {
        this.isLoading = false;
        this.setFail();
      });
  }

  public setUpdate(): void {
    this.enrollmentData$
      .pipe(
        takeUntil(this._destroy$),
        filter((_) => !isNullOrUndefined(_)),
        map((info: { data: UserData }) => info.data),
      )
      .subscribe((data) => {
        data.step = STEPS.FILL_LOGIN_CREDENTIALS_BIOMETRIC_U;
      })
      .unsubscribe();
  }

  public setFail(): void {
    this.enrollmentData$
      .pipe(
        takeUntil(this._destroy$),
        filter((_) => !isNullOrUndefined(_)),
        map((info: { data: UserData }) => info.data),
      )
      .subscribe((data) => {
        data.step = STEPS.BIOMETRIC_SERVICE_ERROR;
      })
      .unsubscribe();
  }

  public recovery(): void {
    this.enrollmentData$
      .pipe(
        takeUntil(this._destroy$),
        filter((_) => !isNullOrUndefined(_)),
        map((info: { data: UserData }) => info.data),
      )
      .subscribe((data) => {
        data.step = STEPS.PROCESS_WEBAUTHN_FLOW;
      })
      .unsubscribe();
  }
}

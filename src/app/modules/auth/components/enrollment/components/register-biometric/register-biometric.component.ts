import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { STATE_BIOMETRIC } from '@app/core/constants/auth';
import { Events } from '@app/core/constants/events';
import { PageView } from '@app/core/decorators/page-view.decorator';
import { DataUser } from '@app/core/interfaces/dataUser.interface';
import { UserData } from '@app/core/models/user/userData';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth/constants/navigate';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import * as FingerprintUtil from '../../../../../../shared/web-authn/web-authn.util';
import { STEPS } from '../../../../constants/steps';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@PageView(
  NavigateEnrollment.validateUniversalPassword,
  TitlesEnrollment.validateUniversalPassword,
  Events.page_view,
)
@Component({
  selector: 'app-register-biometric',
  templateUrl: './register-biometric.component.html',
  styleUrls: ['./register-biometric.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterBiometricComponent extends AbstractEnrollmentComponent
  implements OnInit {
  public showPassword: boolean = false;
  public register: boolean = false;
  public enrollmentData$: Observable<{
    data: UserData;
  }> = this.model.enrollmentData$;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public state: string = STATE_BIOMETRIC.REGISTER;

  constructor(
    protected model: AuthModel,
    private fingerprintService: WebAuthnService,
    private translate: TranslateService,
  ) {
    super(model);
  }

  ngOnInit(): void {
    this._initForm();
  }

  protected _initForm(): void {
    this.registerForm = new FormGroup({
      content: new FormGroup({
        universalPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.pattern(/^[0-9]+$/),
        ]),
        forgotPassword: new FormControl(false),
        fingerprint: new FormControl(null),
      }),
      processId: new FormControl(this.userEnrollmentFlowInformation.processId),
    });
  }

  public forgotPassword(): void {
    const data: DataUser = this.registerForm.value;
    data.content.forgotPassword = true;
    this.submitActionHandler(data);
  }

  public getStatusFingerPrint(): boolean {
    return FingerprintUtil.isWebAuthnAvailable();
  }

  public startBiometric(): void {
    if (this.register) {
      this.submitForm('biometric');
    } else if (FingerprintUtil.isWebAuthnAvailable()) {
      this.fingerprintService.getInitAuthData().then((data) => {
        if (!data.success) {
          this.register = true;
          return data;
        }
      });
    }
  }

  public redirectPassword(): void {
    this.initUserData();
  }
  public initUserData(): void {
    this.enrollmentData$
      .pipe(
        takeUntil(this._destroy$),
        filter((_) => !isNullOrUndefined(_)),
        map((info: { data: UserData }) => info.data),
      )
      .subscribe((data) => {
        data.step = STEPS.FILL_LOGIN_CREDENTIALS;
      })
      .unsubscribe();
  }
}

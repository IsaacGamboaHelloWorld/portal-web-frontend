import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import {
  BIOMETRIC,
  ONBOARDING,
  STATE_BIOMETRIC,
} from '@app/core/constants/auth';
import { Navigate } from '@app/core/constants/navigate';
import { UserData } from '@app/core/models/user/userData';
import { STEPS } from '@app/modules/auth/constants/steps';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@Component({
  selector: 'app-set-name-biometric',
  templateUrl: './set-name-biometric.component.html',
  styleUrls: ['./set-name-biometric.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SetNameBiometricComponent extends AbstractEnrollmentComponent
  implements OnInit {
  public state: string = STATE_BIOMETRIC.UPDATE;
  public formNameCredential: FormGroup;
  public isLoading: boolean = false;
  public enrollmentData$: Observable<{
    data: UserData;
  }> = this.model.enrollmentData$;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    protected model: AuthModel,
    private fingerprintService: WebAuthnService,
    private translate: TranslateService,
    protected router: Router,
    private modalService: ModalService,
  ) {
    super(model);
  }

  ngOnInit(): void {
    this._initForm();
  }

  protected _initForm(): void {
    this.formNameCredential = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  public submitName(): void {
    this.isLoading = true;
    if (localStorage.getItem(BIOMETRIC)) {
      this.fingerprintService
        .updateCredential(
          localStorage.getItem(BIOMETRIC),
          this.formNameCredential.value.name,
        )
        .subscribe((data) => {
          if (data['success']) {
            this.isLoading = false;
            this.openAlert();
          } else {
            this.isLoading = false;
            this.setFail();
          }
        });
    }
  }
  protected timerRedirect(url: string): void {
    this.router.navigate([url]);
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
      component.icon = '/24-essential-bell-5.svg';
      component.iconColor = '#008cff';
      component.title = 'AUTH.ENROLLMENT.BIOMETRIC.MODAL_SUCCCES.TITLE';
      component.desc = 'AUTH.ENROLLMENT.BIOMETRIC.MODAL_SUCCCES.DESC';
      component.btnAgree = 'AUTH.ENROLLMENT.BIOMETRIC.MODAL_SUCCCES.BTN';

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.modalService.close();
      });
      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.modalService.close();
        if (!!localStorage.getItem(ONBOARDING)) {
          this.timerRedirect(Navigate.home);
        } else {
          this.timerRedirect(Navigate.induction);
        }
      });
    }
  }
}

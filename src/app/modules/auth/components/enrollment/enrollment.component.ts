import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DataUser } from '@app/core/interfaces/dataUser.interface';
import { UserData } from '@app/core/models/user/userData';
import { Observable, of, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { STEPS } from '../../constants/steps';
import { URL_POLICIES } from '../../constants/urls-policies';
import { AuthService } from '../../services/auth.service';
import { AuthModel } from '../../store/model/auth.model';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class EnrollmentComponent implements OnInit, OnDestroy {
  public step: number = 1;
  public showBack: boolean = true;
  public enrollmentData$: Observable<{
    data: UserData;
  }> = this.model.enrollmentData$;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private model: AuthModel,
    private router: Router,
    private loginService: AuthService,
  ) {}

  ngOnInit(): void {
    this.enrollmentData$
      .pipe(
        takeUntil(this._destroy$),
        filter((_) => !isNullOrUndefined(_)),
        map((info: { data: UserData }) => info.data),
      )
      .subscribe((data) => {
        if (
          data === STEPS.FILL_SECURE_DATA ||
          data === STEPS.FILL_SECURITY_QUESTION
        ) {
          this.step = 1;
        } else if (
          data === STEPS.FILL_OTP_DATA ||
          data === STEPS.V2_FILL_OTP_DATA
        ) {
          this.step = 2;
        } else if (
          data === STEPS.FILL_NEW_UNIVERSAL_PASSWORD ||
          data === STEPS.FILL_NEW_CREDENTIALS
        ) {
          this.step = 3;
        }
        this.showBack = true;
        if (
          data.step === STEPS.V2_SERVICE_ERROR ||
          data.step === STEPS.SERVICE_ERROR
        ) {
          this.showBack = false;
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public submit(data: DataUser): void {
    this.model.fetchUser(data, data.typeLogin);
  }

  public resetAndRedirectToLogin(): void {
    this.model.resetUser();
    this.router.navigate(['/login']);
    this.loginService.logOut();
  }

  get steps(): any {
    return STEPS;
  }

  public showLine(data: UserData): boolean {
    if (!isNullOrUndefined(data)) {
      const hasStep =
        data.step === STEPS.FILL_SECURE_DATA ||
        data.step === STEPS.FILL_OTP_DATA ||
        data.step === STEPS.FILL_NEW_UNIVERSAL_PASSWORD ||
        data.step === STEPS.FILL_SECURITY_QUESTION ||
        data.step === STEPS.V2_FILL_OTP_DATA ||
        data.step === STEPS.FILL_NEW_CREDENTIALS;
      return hasStep && isNullOrUndefined(data.sdsPasswordValidation);
    } else {
      return false;
    }
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

  get currentStep(): Observable<number> {
    return of(this.step);
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageView } from '@core/decorators/page-view.decorator';
import { isNullOrUndefined } from 'util';

import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth-old/constants/navigate';
import { STEPS } from '@app/modules/auth-old/constants/steps';
import { Events } from '@core/constants/events';
import { EventsService } from '@core/services/tag_manager/events.service';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@PageView(
  NavigateEnrollment.login_error,
  TitlesEnrollment.login_error,
  Events.page_view,
)
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent extends AbstractEnrollmentComponent
  implements OnInit {
  constructor(protected model: AuthModelOld, private events: EventsService) {
    super(model);
  }

  protected _initForm(): void {}

  ngOnInit(): void {
    if (isNullOrUndefined(this.userEnrollmentFlowInformation.step)) {
      this.redirectToHome();
    }
    this._validateStep();
  }

  get steps(): any {
    return STEPS;
  }

  public redirectToHome(): void {
    this.submitActionHandler({});
  }

  private _validateStep(): void {
    if (!isNullOrUndefined(this.userEnrollmentFlowInformation.step)) {
      switch (this.userEnrollmentFlowInformation.step) {
        case STEPS.SERVICE_ERROR:
          this._event(
            NavigateEnrollment.serviceError,
            TitlesEnrollment.serviceError,
          );
          break;
        case STEPS.LIMIT_EXCEED_ON_OTP_GENERATION:
          this._event(
            NavigateEnrollment.limitExceedOnOtpGeneration,
            TitlesEnrollment.limitExceedOnOtpGeneration,
          );
          break;
        case STEPS.LIMIT_EXCEED_ON_SECURE_DATA_GENERATION:
          this._event(
            NavigateEnrollment.limitExceedOnSecureDataGeneration,
            TitlesEnrollment.limitExceedOnSecureDataGeneration,
          );
          break;
        case STEPS.DOES_NOT_EXISTS:
          this._event(
            NavigateEnrollment.doNotExists,
            TitlesEnrollment.doNotExists,
          );
          break;
      }
    }
  }

  private _event(path: string, title: string): void {
    this.events.event({
      event: Events.page_view,
      pagePath: window.location.pathname + path,
      pageTitle: title,
    });
  }
}

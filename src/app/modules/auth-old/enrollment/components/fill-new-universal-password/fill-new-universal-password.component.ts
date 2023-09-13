import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { maxRepeatedCharsPatternValidator } from '@app/core/interfaces/auth/pattern-validator.interface';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth-old/constants/navigate';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { Events } from '@core/constants/events';
import { PageView } from '@core/decorators/page-view.decorator';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@PageView(
  NavigateEnrollment.new_password,
  TitlesEnrollment.new_password,
  Events.page_view,
)
@Component({
  selector: 'app-fill-new-universal-password',
  templateUrl: './fill-new-universal-password.component.html',
  styleUrls: ['./fill-new-universal-password.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class FillNewUniversalPasswordComponent
  extends AbstractEnrollmentComponent
  implements OnInit {
  public newPassword: boolean = true;
  public retryPassword: boolean = true;
  private noRepeatedMoreThanTwoTimes: RegExp = new RegExp(
    '^(?=[\\D]*\\d)(?=.{4,4})(?!.*([0-9])\\1{2})(?!.*([0-9])(?:.*?\\2){2,}).*$',
  );
  private noConsecutiveRuleRegex: RegExp = new RegExp(
    '^(?=[\\D]*\\d)(?=.{4,4})(?!(0123|1234|2345|3456|4567|5678|6789|7890)).+$',
  );

  public onFillNewUniversalPasswordBannerMessage: boolean;

  constructor(
    protected model: AuthModelOld,
    private formBuilder: FormBuilder,
    private tealium: TealiumUtagService,
  ) {
    super(model);
  }

  ngOnInit(): void {
    this._initForm();
    this.onFillNewUniversalPasswordBannerMessage =
      !!this.userEnrollmentFlowInformation.sdsPasswordValidation &&
      '' !== this.userEnrollmentFlowInformation.sdsPasswordValidation;
  }

  public togglePassword(el: string): void {
    this[el] = !this[el];
  }

  public type(el: string): string {
    return this[el] ? 'password' : 'text';
  }

  protected _initForm(): void {
    this.registerForm = this.formBuilder.group({
      content: this.formBuilder.group(
        {
          universalPassword: [
            '',
            [
              Validators.required,
              maxRepeatedCharsPatternValidator(this.noRepeatedMoreThanTwoTimes),
              Validators.pattern(this.noConsecutiveRuleRegex),
              Validators.minLength(4),
              Validators.maxLength(4),
            ],
          ],
          universalPasswordConfirmation: ['', [Validators.required]],
        },
        {
          validator: this.mustMatch(
            'universalPassword',
            'universalPasswordConfirmation',
          ),
        },
      ),
      processId: this.userEnrollmentFlowInformation.processId,
    });
  }

  public hideBannerMessage(): void {
    this.onFillNewUniversalPasswordBannerMessage = false;
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataUser } from '@app/core/interfaces/dataUser.interface';
import { AuthSession } from '@app/core/services/auth-session';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth-old/constants/navigate';
import { SecurityService } from '@app/modules/security/services/security.service';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { Events } from '@core/constants/events';
import { PageView } from '@core/decorators/page-view.decorator';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@PageView(
  NavigateEnrollment.login_password_universal,
  TitlesEnrollment.login_password_universal,
  Events.page_view,
)
@Component({
  selector: 'app-validate-universal-password',
  templateUrl: './validate-universal-password.component.html',
  styleUrls: ['./validate-universal-password.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ValidateUniversalPasswordComponent
  extends AbstractEnrollmentComponent
  implements OnInit {
  public showPassword: boolean = false;

  constructor(
    protected model: AuthModelOld,
    private authStorage: AuthSession,
    private security: SecurityService,
    private tealium: TealiumUtagService,
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
      }),
      processId: new FormControl(this.userEnrollmentFlowInformation.processId),
    });
  }

  public forgotPassword(): void {
    const data: DataUser = this.registerForm.value;
    data.content.forgotPassword = true;
    data.content.universalPassword = 'EMPTY';
    this.submitActionHandler(data);
  }
}

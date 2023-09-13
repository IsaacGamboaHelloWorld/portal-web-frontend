import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataUser } from '@app/core/interfaces/dataUser.interface';
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
  NavigateEnrollment.validateUniversalPassword,
  TitlesEnrollment.validateUniversalPassword,
  Events.page_view,
)
@Component({
  selector: 'app-validate-current-password',
  templateUrl: './validate-current-password.component.html',
  styleUrls: ['./validate-current-password.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ValidateCurrentPasswordComponent
  extends AbstractEnrollmentComponent
  implements OnInit {
  public channel: string;

  constructor(
    protected model: AuthModelOld,
    private tealium: TealiumUtagService,
  ) {
    super(model);
  }

  ngOnInit(): void {
    this._initForm();
    this.channel = this.userEnrollmentFlowInformation.sdsPasswordValidation;
  }

  protected _initForm(): void {
    this.registerForm = new FormGroup({
      content: new FormGroup({
        currentPassword: new FormControl('', [Validators.required]),
        forgotPassword: new FormControl(false),
      }),
      processId: new FormControl(this.userEnrollmentFlowInformation.processId),
    });
  }

  public forgotPassword(): void {
    const data: DataUser = this.registerForm.value;
    data.content.forgotPassword = true;
    data.content.currentPassword = 'EMPTY';
    this.submitActionHandler(data);
  }
}

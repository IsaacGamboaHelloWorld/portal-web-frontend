import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { TranslateService } from '@ngx-translate/core';

import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@Component({
  selector: 'app-accept-channel-policies',
  templateUrl: './accept-channel-policies.component.html',
  styleUrls: ['./accept-channel-policies.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AcceptChannelPoliciesComponent extends AbstractEnrollmentComponent
  implements OnInit {
  private path: string = 'AUTH.ENROLLMENT.ACCEPT_CHANNEL_POLICIES';
  public properties: {};

  constructor(
    protected model: AuthModel,
    private translateService: TranslateService,
  ) {
    super(model);
  }

  ngOnInit(): void {
    this.translateService
      .get(this.path)
      .subscribe((e) => (this.properties = e));
    this._initForm();
  }

  protected _initForm(): void {
    this.registerForm = new FormGroup({
      content: new FormGroup({
        termsAndConditions: new FormControl(false, [Validators.requiredTrue]),
        bankPolicies: new FormControl(false, [Validators.requiredTrue]),
      }),
      processId: new FormControl(this.userEnrollmentFlowInformation.processId),
    });
  }
}

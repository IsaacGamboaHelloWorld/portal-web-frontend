import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataUser } from '@app/core/interfaces/dataUser.interface';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth-old/constants/navigate';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { PageView } from '@core/decorators/page-view.decorator';
import { Events } from '../../../../../core/constants/events';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@PageView(
  NavigateEnrollment.enter_insurance_data,
  TitlesEnrollment.enter_insurance_data,
  Events.page_view,
)
@Component({
  selector: 'app-enrollment-experian-wrapper',
  templateUrl: './enrollment-experian-wrapper.component.html',
  styleUrls: ['./enrollment-experian-wrapper.component.sass'],
})
export class EnrollmentExperianWrapperComponent extends AbstractEnrollmentComponent {
  @Input() public loading: boolean;
  @Input() public error: boolean;

  constructor(
    protected model: AuthModelOld,
    private formBuilder: FormBuilder,
    private tealium: TealiumUtagService,
  ) {
    super(model);
  }

  public _initForm(): void {}

  public submitExperianForm(data: any): void {
    const experianData: any = {
      ...this.userEnrollmentFlowInformation.experian,
      ...data,
    };
    const request: DataUser = {
      processId: this.userEnrollmentFlowInformation.processId,
      content: {
        experian: experianData,
      },
    };
    this.submitActionHandler(request);
  }

  public submitOnErrorExperianFlowHandler(event: any): void {
    this.resetActionHandler();
  }

  public actionClose(): void {
    this.resetActionHandler();
  }
}

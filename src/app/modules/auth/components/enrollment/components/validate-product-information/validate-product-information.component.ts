import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataUser } from '@app/core/interfaces/dataUser.interface';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth/constants/navigate';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { replaceText } from '@app/shared/helpers/replaceText.helper';
import { Events } from '@core/constants/events';
import { EventsService } from '@core/services/tag_manager/events.service';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@Component({
  selector: 'app-validate-product-information',
  templateUrl: './validate-product-information.component.html',
  styleUrls: ['./validate-product-information.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ValidateProductInformationComponent
  extends AbstractEnrollmentComponent
  implements OnInit {
  private QUESTION_TEXT_TYPE: string = 'text';
  private QUESTION_PASSWORD_TYPE: string = 'password';

  constructor(
    protected model: AuthModel,
    private events: EventsService,
    private translate: TranslateService,
  ) {
    super(model);
  }

  ngOnInit(): void {
    this._initForm();
    this.sendEvent(
      this.translate.instant(
        `PRODUCT_TYPES.${this.userEnrollmentFlowInformation.secureDataBriefQuestion.productType}`,
      ),
    );
  }

  get inputType(): string {
    return this.userEnrollmentFlowInformation.secureDataBriefQuestion
      .questionType === 'product'
      ? this.QUESTION_TEXT_TYPE
      : this.QUESTION_PASSWORD_TYPE;
  }

  private answerInputFormControl(): FormControl {
    return this.inputType === this.QUESTION_TEXT_TYPE
      ? this.setupValidatorOnProductValidation()
      : this.setupValidatorOnPasswordValidation();
  }

  get answerLength(): number {
    return this.userEnrollmentFlowInformation.secureDataBriefQuestion.length;
  }

  get accountType(): string {
    return this.userEnrollmentFlowInformation.secureDataBriefQuestion
      .accountType;
  }

  public accountSuffix(): string {
    const indexOfPivotChar = this.userEnrollmentFlowInformation.secureDataBriefQuestion.question.lastIndexOf(
      '*',
    );
    const question = this.userEnrollmentFlowInformation.secureDataBriefQuestion.question.substring(
      indexOfPivotChar,
    );
    return question.match(/\d/g).join('');
  }

  public sendEvent(product: string): void {
    if (!isNullOrUndefined(product)) {
      this.events.event({
        event: Events.page_view,
        pagePath:
          window.location.pathname +
          NavigateEnrollment.validate +
          replaceText(product),
        pageTitle: TitlesEnrollment.validate + product,
      });
    }
  }

  protected _initForm(): void {
    this.registerForm = new FormGroup({
      content: new FormGroup({
        secureDataSecret: this.answerInputFormControl(),
      }),
      processId: new FormControl(this.userEnrollmentFlowInformation.processId),
    });
  }

  private setupValidatorOnProductValidation(): FormControl {
    const fieldSize: number =
      this.userEnrollmentFlowInformation.secureDataBriefQuestion.length -
      this.accountSuffix().length;
    return new FormControl('', [
      Validators.required,
      Validators.minLength(fieldSize),
      Validators.maxLength(fieldSize),
    ]);
  }

  private setupValidatorOnPasswordValidation(): FormControl {
    const fieldSize: number = this.userEnrollmentFlowInformation
      .secureDataBriefQuestion.length;
    return new FormControl('', [
      Validators.required,
      Validators.minLength(fieldSize),
      Validators.maxLength(fieldSize),
    ]);
  }

  public submitForm(): void {
    const data: DataUser = this.registerForm.value;
    if (this.inputType === this.QUESTION_TEXT_TYPE) {
      data.content.secureDataSecret += this.accountSuffix();
    }
    this.submitActionHandler(data);
  }

  public onInputChange(value: string): any {
    this.registerForm.controls.content.patchValue({ secureDataSecret: value });
  }
}

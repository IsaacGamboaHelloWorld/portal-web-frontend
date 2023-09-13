import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ID_BANK_POPULAR, IP } from '@app/core/constants/global';
import { maxRepeatedCharsPatternValidator } from '@app/core/interfaces/auth/pattern-validator.interface';
import { Observable } from 'rxjs';
import { ChangePasswordModel } from './change-password.model';

// tslint:disable-next-line:ban-types
declare var rsaFunc: Function;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public showPassword: boolean = false;

  private noRepeatedMoreThanTwoTimes: RegExp = new RegExp(
    '^(?=[\\D]*\\d)(?=.{4,4})(?!.*([0-9])\\1{2})(?!.*([0-9])(?:.*?\\2){2,}).*$',
  );

  private noConsecutiveRuleRegex: RegExp = new RegExp(
    '^(?=[\\D]*\\d)(?=.{4,4})(?!(0123|1234|2345|3456|4567|5678|6789|7890)).+$',
  );

  constructor(
    private formBuilder: FormBuilder,
    private model: ChangePasswordModel,
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    const rsaData: string = rsaFunc();
    this.changePasswordForm = this.formBuilder.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(4),
            maxRepeatedCharsPatternValidator(this.noRepeatedMoreThanTwoTimes),
            Validators.pattern(this.noConsecutiveRuleRegex),
          ],
        ],
        confirmedPassword: ['', [Validators.required]],
        deviceSerial: rsaData.substring(rsaData.length - 17),
        deviceName: 'Samsung',
        companyId: ID_BANK_POPULAR,
        ipAddress: IP,
      },
      {
        validator: this.mustMatch('newPassword', 'confirmedPassword'),
      },
    );
  }

  protected mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  get inputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  public toggleInputType(): void {
    this.showPassword = !this.showPassword;
  }

  public submitForm(): void {
    this.model.changePassword(this.changePasswordForm.value);
    this.changePasswordForm.reset();
    this._initForm();
  }

  get isLoading$(): Observable<boolean> {
    return this.model.isLoadingChangePasswordCommand$;
  }
}

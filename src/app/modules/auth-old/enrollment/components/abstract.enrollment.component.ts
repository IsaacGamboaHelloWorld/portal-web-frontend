import { EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DataUser } from '@app/core/interfaces/dataUser.interface';
import { UserData } from '@app/core/models/user/userData';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AuthModelOld } from '../../auth.model';

export abstract class AbstractEnrollmentComponent {
  @Input() public userEnrollmentFlowInformation: UserData;

  @Output() public submitAction: EventEmitter<DataUser> = new EventEmitter();

  @Output() public resetAction: EventEmitter<void> = new EventEmitter();

  public registerForm: FormGroup;

  public showPassword: boolean = false;

  constructor(protected model: AuthModelOld) {}

  protected abstract _initForm(): void;

  protected submitActionHandler(data: DataUser): void {
    this.submitAction.emit(data);
    if (!isNullOrUndefined(this.registerForm)) {
      this.registerForm.reset();
      this._initForm();
    }
  }

  protected mustMatch(controlName: string, matchingControlName: string): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      matchingControl.setErrors(
        control.value !== matchingControl.value ? { mustMatch: true } : null,
      );
    };
  }

  get inputType(): string {
    return this.showPassword ? 'text' : 'password';
  }

  public toggleInputType(): void {
    this.showPassword = !this.showPassword;
  }

  get isLoading$(): Observable<boolean> {
    return this.model.isLoadingLogin$;
  }

  public submitForm(): void {
    const value: any = this.registerForm.value;
    this.submitActionHandler(value);
  }

  public resetActionHandler(): void {
    this.resetAction.emit();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import {
  IAnswerAllowedCodeAuth,
  IAnswerAssignCodeAuth,
} from '../../entities/code-auth';
import { CodeAuthModel } from '../../store/model/code-auth.model';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent implements OnInit {
  public formStepTwo: FormGroup;
  public obj: object;
  public code: string;
  public approvalId: boolean = false;
  public showErrorPass: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private model: CodeAuthModel) {}

  get stateActivate(): Observable<IAnswerAllowedCodeAuth> {
    return this.model.stateAllowedCodeAuth$;
  }

  get stateAssing(): Observable<IAnswerAssignCodeAuth> {
    return this.model.stateAssignCodeAuth$;
  }

  private _initForm(): void {
    this.formStepTwo = new FormGroup({
      codeAuth: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
    });
  }

  ngOnInit(): void {
    this._initForm();
    this._setStep(3);
    this.stateActivate
      .pipe(filter((answer: IAnswerAllowedCodeAuth) => answer.success))
      .subscribe((answer: IAnswerAllowedCodeAuth) => {
        if (answer.success) {
          this.obj = answer.enrollmentSecureData.enrollmentSecureData;
          const code =
            answer.enrollmentSecureData.enrollmentSecureData.secureDataMessage;
          this.code = code.split('****')[1];
        }
      });
  }
  public _setStep(step: number): void {
    this.model.setStep({ step });
  }
  public submitForm(): void {
    this.obj['secret'] = this.formStepTwo.value.codeAuth;
    delete this.obj['secureDataMessage'];
    this.approvalId = true;
    this.model.creationAssignSucces({ enrollmentSecureData: this.obj });
    this.stateAssing
      .pipe(takeUntil(this._destroy$))
      .subscribe((answer: IAnswerAssignCodeAuth) => {
        if (answer.errorMessage) {
          this.approvalId = false;
          this.showErrorPass = answer.errorMessage.indexOf('incorrecta') > 0;
        }
      });
  }
}

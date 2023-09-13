import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  clearWithBackspaceOtp,
  inputOtp,
} from '@app/shared/helpers/inputsOtp.helper';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import {
  EnrollSecureData,
  IAnswerGetQuestion,
  IAnswerSecureValidQuestion,
  IAnswerUpdateSecureData,
  ISendEnrollSecureData,
  IUpdateSecureData,
} from '../../entities/code-auth';
import { INavigateCodeAuth, NavigateCodeAuth } from '../../entities/routes';
import { CodeAuthModel } from '../../store/model/code-auth.model';

@Component({
  selector: 'app-modal-code-auth',
  templateUrl: './modal-code-auth.component.html',
  styleUrls: ['./modal-code-auth.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCodeAuthComponent implements OnInit {
  public img: string = '/validacion-identidad.png';
  public loading: boolean = false;
  public formG: FormGroup;
  public inputs: number[];
  public enrollmentSecureData: EnrollSecureData;
  public retries: number = 0;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _maxOtpLength: number = 4;
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionAgree: EventEmitter<void> = new EventEmitter<void>();
  @Input() secureEmail: string;
  @Input() secureTelephone: string;
  @Input() contactPreference: string;

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private model: CodeAuthModel,
    private _router: Router,
  ) {}

  get navigate(): INavigateCodeAuth {
    return NavigateCodeAuth;
  }

  get stateGetQuestion(): Observable<IAnswerGetQuestion> {
    return this.model.stateGetQuestion$;
  }

  get stateValidQuestion(): Observable<IAnswerSecureValidQuestion> {
    return this.model.stateValidQuestion$;
  }

  get stateUpdateSecureData(): Observable<IAnswerUpdateSecureData> {
    return this.model.stateUpdateSecureDataCodeAuth$;
  }

  get hasSecureDataMessage(): Observable<boolean> {
    return this.secureDataMessage.pipe(
      map((data) => {
        return !!data;
      }),
    );
  }

  get secureDataMessage(): Observable<string> {
    return this.stateGetQuestion.pipe(
      map((data) => {
        if (
          data &&
          data.enrollmentSecureData &&
          data.enrollmentSecureData.secureDataMessage
        ) {
          this.enrollmentSecureData = data.enrollmentSecureData;
          const messageSplitted = String(
            this.enrollmentSecureData.secureDataMessage,
          ).split('****')[1];
          return messageSplitted;
        }
      }),
    );
  }

  ngOnInit(): void {
    this._initForm();
  }

  public emitClick(): void {
    if (this.retries === 3) {
      this.close();
      this._router.navigate([this.navigate.experian]);
      return;
    }
    this.retries++;

    const obj: IUpdateSecureData = {};
    obj.secureEmail = this.secureEmail;
    obj.secureTelephone = this.secureTelephone;
    obj.contactPreference = this.contactPreference;
    const code: ISendEnrollSecureData = {
      secret: Object.values(this.formG.value).join(''),
      acctId: this.enrollmentSecureData.acctId,
      acctType: this.enrollmentSecureData.acctType,
      secretId: this.enrollmentSecureData.secretId,
    };
    this.model.authValidQuestionSucces(code);

    this.stateValidQuestion
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        if (data && data.success) {
          this.model.authUpdateSecuerDataSucces(obj);
          if (this.stateUpdateSecureData) {
            this.stateUpdateSecureData
              .pipe(takeUntil(this._destroy$))
              .subscribe((dataUpdate: IAnswerUpdateSecureData) => {
                if (dataUpdate.success) {
                  this.actionAgree.emit();
                }
                setTimeout(() => {
                  this.modalService.close();
                }, 1000);
              });
          }
        }
      });
  }

  private _initForm(): void {
    this.formG = this.formBuilder.group({});
    this.inputs = [...Array(this._maxOtpLength).keys()];
    this.inputs.forEach((i) => {
      this.formG.addControl(
        `char${i}`,
        new FormControl(null, [
          Validators.required,
          Validators.max(9),
          Validators.maxLength(1),
          Validators.min(0),
        ]),
      );
    });
    setTimeout(() => {
      if (document.getElementById('char0')) {
        document.getElementById('char0').focus();
      }
    }, 500);
  }

  goToNextInput(index: number, e: KeyboardEvent): void {
    inputOtp(index, e, this._maxOtpLength, this.formG);
    clearWithBackspaceOtp(index, e);
  }

  public close(): void {
    this.retries = 0;
    this.model.resetAuthValidQuestionState();
    this.modalService.close();
    this.actionCancel.emit();
  }
}

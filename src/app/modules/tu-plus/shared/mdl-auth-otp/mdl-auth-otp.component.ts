import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
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
import {
  clearWithBackspaceOtp,
  inputOtp,
} from '@app/shared/helpers/inputsOtp.helper';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Observable, Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { ERROR_MESSAGE, MAX_ITEMS_OTP } from '../../constants/constants';
import { IReqRedemption } from '../../entities/redemption.interface';
import { YourPlusModel } from '../../store/models/your-plus.model';
import { IRedemption } from '../../store/reducers/redemption.reducer';

@Component({
  selector: 'app-mdl-auth-otp',
  templateUrl: './mdl-auth-otp.component.html',
  styleUrls: ['./mdl-auth-otp.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class MdlAuthOtpComponent implements OnInit, OnDestroy {
  public formG: FormGroup;
  public inputs: number[];
  public isError: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _maxItemsOTP: number = MAX_ITEMS_OTP;

  @Input() img: string = '/enrollment/otp.png';
  @Input() txtTitle: string;
  @Input() txtDescription: string;
  @Input() txtCode: string;
  @Input() txtBtn: string;

  @Input() dataToSubmit: IReqRedemption;
  @Input() approvalId: string;

  @Output() actionCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() actionAgree: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private _modalService: ModalService,
    private _formBuilder: FormBuilder,
    private _model: YourPlusModel,
  ) {}

  ngOnInit(): void {
    this._initForm();
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._model.otpGenerationReset();
  }
  public emitClick(): void {
    if (
      !isNullOrUndefined(this.dataToSubmit) &&
      !isNullOrUndefined(this.approvalId)
    ) {
      this._submitForm(
        Object.values(this.formG.value).join(''),
        this.approvalId,
      );
    }
  }

  private _submitForm(otpValue?: string, spRefId?: string): void {
    this._model.redemptionLoad(
      this.dataToSubmit.totalPoints + '',
      this.dataToSubmit.curAmt + '',
      this.dataToSubmit.accountId,
      this.dataToSubmit.accountType,
      this.dataToSubmit.bankId,
      this.dataToSubmit.bankName,
      otpValue,
      spRefId,
    );
    this._loadRedemption();
  }
  get redemption$(): Observable<IRedemption> {
    return this._model.redemption$;
  }

  private _loadRedemption(): void {
    const subscribeRedemption = this.redemption$.subscribe(
      (data: IRedemption) => {
        if (!!data && data.success) {
          this.actionAgree.emit();
          subscribeRedemption.unsubscribe();
        } else if (data.error && data.loaded) {
          if (
            data.errorMessageCode === ERROR_MESSAGE.REDEMPTION_CODE_MAX_RETRY
          ) {
            this.actionCancel.emit(true);
          }

          subscribeRedemption.unsubscribe();
        }
      },
    );
  }

  private _initForm(): void {
    this.formG = this._formBuilder.group({});
    this.inputs = [...Array(this._maxItemsOTP).keys()];
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
    inputOtp(index, e, this._maxItemsOTP, this.formG);
    clearWithBackspaceOtp(index, e);
  }

  public close(): void {
    this._modalService.close();
    this.actionCancel.emit(false);
  }
}

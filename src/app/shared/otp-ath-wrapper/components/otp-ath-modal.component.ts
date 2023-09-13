import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
} from '../../helpers/inputsOtp.helper';
import { ModalService } from '../../modal/services/modal.service';
import { MAX_ITEMS_OTP, MAX_RETRIES_OTP } from './otp-ath-modal.constant';
import { IOtpAthAgree } from './otp-ath-modal.interface';

@Component({
  selector: 'app-otp-modal',
  templateUrl: './otp-ath-modal.component.html',
  styleUrls: ['./otp-ath-modal.component.sass'],
})
export class OtpAthModalComponent implements OnInit, AfterViewInit {
  @Input() maxItemsOTP: number = MAX_ITEMS_OTP;
  @Input() img: string = '/enrollment/otp.png';
  @Input() txtTitle: string = 'TWO_FA.ATH.TITLE';
  @Input() txtDescription: string = 'TWO_FA.ATH.DESCRIPTION';
  @Input() txtCode: string = 'TWO_FA.ATH.NAME';
  @Input() txtBtn: string = 'TWO_FA.BTN_CONTINUE';
  @Input() txtError: string = '';
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() enableCloseAgree: boolean = false;
  @Input() retries: number = 0;

  @Output() actionCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() actionAgree: EventEmitter<IOtpAthAgree> = new EventEmitter<
    IOtpAthAgree
  >();

  public formG: FormGroup;
  public inputs: number[];

  constructor(
    private _modalService: ModalService,
    private _formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  ngAfterViewInit(): void {
    const el = document.getElementById('input-otp-0');
    if (el) {
      el.focus();
    }
  }

  private _initForm(): void {
    this.formG = this._formBuilder.group({});
    this.inputs = [...Array(this.maxItemsOTP).keys()];
    this.inputs.forEach((i: number) => {
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
  }

  public goToNextInput(index: number, e: KeyboardEvent): void {
    inputOtp(index, e, this.maxItemsOTP, this.formG);
    clearWithBackspaceOtp(index, e);
  }

  public close(): void {
    this._modalService.close();
    this.actionCancel.emit();
  }

  public emitClick(): void {
    if (this.retries >= MAX_RETRIES_OTP) {
      this.actionAgree.emit({
        otp: null,
        retries: this.retries,
        event: 'error',
      });
      this.retries = 0;
      return;
    }

    const otp: string = Object.values(this.formG.value).join('');
    this.actionAgree.emit({
      otp,
      retries: this.retries,
      event: 'success',
    });
    if (this.enableCloseAgree) {
      this._modalService.close();
    }
  }
}

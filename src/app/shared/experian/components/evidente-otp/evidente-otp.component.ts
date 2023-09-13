import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth-old/constants/navigate';
import {
  clearWithBackspaceOtp,
  inputOtp,
} from '@app/shared/helpers/inputsOtp.helper';
import { PageView } from '@core/decorators/page-view.decorator';
import { AbstractExperianEvidenteComponent } from '../abstract.experian-evidente.component';
import { Events } from './../../../../core/constants/events';

@PageView(
  NavigateEnrollment.otp_buro,
  TitlesEnrollment.otp_buro,
  Events.page_view,
)
@Component({
  selector: 'app-evidente-otp',
  templateUrl: './evidente-otp.component.html',
  styleUrls: ['./evidente-otp.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvidenteOtpComponent extends AbstractExperianEvidenteComponent
  implements OnDestroy {
  public inputs: number[];
  public ticker: any;
  private _maxOtpLength: number = 6;
  @Input() btnClose: boolean;

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  protected _initForm(): void {
    clearInterval(this.ticker);
    this.timerPrueba();
    this.form = this.formBuilder.group({});
    this.inputs = [...Array(this._maxOtpLength).keys()];
    this.inputs.forEach((i) => {
      this.form.addControl(
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

  _processSubmitAction(): void {
    const dataToSubmit: any = {
      otpCode: Object.values(this.form.value).join(''),
    };
    this.submitActionHandler(dataToSubmit);
  }

  goToNextInput(index: number, e: KeyboardEvent): void {
    inputOtp(index, e, this._maxOtpLength, this.form);
    clearWithBackspaceOtp(index, e);
  }

  public timerPrueba(): void {
    let timeInSecs = 0;

    timeInSecs = parseInt((2 * 60).toString(), 0);
    this.ticker = setInterval(() => {
      let secs = timeInSecs;
      if (secs > 0) {
        timeInSecs--;
      } else {
        clearInterval(this.ticker);
        this._processSubmitAction();
      }
      const mins = Math.floor(secs / 60);
      secs %= 60;
      const pretty =
        (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
      document.getElementById('countdown').innerHTML = pretty;
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.ticker);
  }
}

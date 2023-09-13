import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataUser } from '@app/core/interfaces/dataUser.interface';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth-old/constants/navigate';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { Events } from '@core/constants/events';
import { PageView } from '@core/decorators/page-view.decorator';
import { Subscription, timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { AbstractEnrollmentComponent } from '../abstract.enrollment.component';

@PageView(
  NavigateEnrollment.key_debit,
  TitlesEnrollment.key_debit,
  Events.page_view,
)
@Component({
  selector: 'app-validate-code',
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ValidateCodeComponent extends AbstractEnrollmentComponent
  implements OnInit {
  public isRetryOtpGenerationAvailable: boolean = false;
  public endTime: number = 2;
  public finalTime: number = 60;
  public minutesDisplay: number = 0;
  public secondsDisplay: number = 60;
  timerSubscription: Subscription;

  constructor(model: AuthModelOld, private tealium: TealiumUtagService) {
    super(model);
  }

  ngOnInit(): void {
    this.showPassword = true;
    this._initForm();
    this.resetTimer();
  }

  protected _initForm(): void {
    this.registerForm = new FormGroup({
      content: new FormGroup({
        otpValue: new FormControl('', [Validators.required]),
        forceOtpGeneration: new FormControl(false),
        isOtpGeneratedByOtherChannel: new FormControl(false),
      }),
      processId: new FormControl(this.userEnrollmentFlowInformation.processId),
    });
  }

  public getNewOtpCode(): void {
    const data: DataUser = this.registerForm.value;
    data.content.forceOtpGeneration = true;
    data.content.otpValue = 'anyData';
    this.submitActionHandler(data);
  }

  private resetTimer(endTime: number = this.endTime): void {
    const interval = 1000;
    const duration = endTime * this.finalTime;
    this.timerSubscription = timer(0, interval)
      .pipe(take(duration))
      .subscribe(
        (value) => this.render((duration - +value) * interval),
        (err) => {},
        () => {
          this.submitForm();
          // this.isRetryOtpGenerationAvailable = true;
        },
      );
  }

  private render(count: number): void {
    this.secondsDisplay = this.getSeconds(count);
    this.minutesDisplay = this.getMinutes(count);
  }

  private getSeconds(ticks: number): any {
    const seconds = ((ticks % 60000) / 1000).toFixed(0);
    return this.pad(seconds);
  }

  private getMinutes(ticks: number): any {
    const minutes = Math.floor(ticks / 60000);
    return this.pad(minutes);
  }

  private pad(digit: any): number {
    return digit <= 9 ? '0' + digit : digit;
  }
}

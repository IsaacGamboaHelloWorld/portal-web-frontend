import {
  Component,
  EventEmitter,
  HostListener,
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
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { clearWithBackspaceOtp, inputOtp } from '../helpers/inputsOtp.helper';
import { WebAuthnService } from '../web-authn/web-authn.service';
import { Action } from './models/action-code';
import { Challenge } from './models/challenge-type';
import { MfaResponse } from './models/mfa-response.interface';
import { TwoFactorAuthService } from './twofactorauth.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'adl-twofactorauth',
  templateUrl: './twofactorauth.component.html',
  styleUrls: ['./twofactorauth.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TwoFactorAuthComponent implements OnInit, OnDestroy {
  @Input() icon: string;
  @Input() animation: string;
  @Input() heading: string;
  @Input() description: string;
  @Input() withoutReceiving: string;
  @Input() timerText: string;
  @Input() allowedIcon: string;
  @Input() allowedHeading: string;
  @Input() allowedDescription: string;
  @Input() deniedAssign: boolean;
  @Input() deniedIcon: string;
  @Input() deniedHeading: string;
  @Input() deniedDescription: string;
  @Input() selectChallengeIcon: string;
  @Input() selectChallengeHeading: string;
  @Input() selectChallengeDescription: string;
  @Input() webAuthnDescription: string;
  @Input() totpDescription: string;
  @Input() hardDescription: string;
  @Input() enhancedDescription: string;
  @Input() descPseOne: string;
  @Input() descPseTwo: string;
  @Input() challengeResponse: MfaResponse;
  @Output() eventBtn: EventEmitter<boolean> = new EventEmitter<boolean>();

  public formG: FormGroup;
  public prefix: string = 'twofa';
  public timer$: Observable<string>;
  public timerStop$: Subject<any> = new Subject<any>();
  public timerSubscription: Subscription;
  public showBtnNewCode: boolean = false;
  public inputs: number[];
  public disabledContinue: boolean = false;

  public twoFactorSubscription: Subscription;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private twoFactorService: TwoFactorAuthService,
    private webAuthnService: WebAuthnService,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.initResend();
    this.twoFactorSubscription = this.twoFactorService.events
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  @HostListener('click', ['$event.target'])
  onClick(target: any): void {
    if (target.hasAttribute(`${this.prefix}-btn-cancel`)) {
      this.onCancelClick();
    } else if (target.hasAttribute(`${this.prefix}-btn-continue`)) {
      this.onContinueClick();
    } else if (target.hasAttribute(`${this.prefix}-btn-new-code`)) {
      this.onNewCodeClick();
    } else if (target.hasAttribute(`${this.prefix}-btn-select`)) {
      this.onSelectClick();
    }
  }

  private initResend(): void {
    if (
      !!this.challengeResponse.challengeInformation &&
      !!this.challengeResponse.challengeInformation.resend &&
      this.challengeResponse.challengeInformation.resend.enabled
    ) {
      if (
        this.challengeResponse.challengeInformation.resend.time > 0 &&
        !!this.timerText
      ) {
        this.initTimer();
      } else {
        this.showBtnNewCode = true;
      }
    }
  }

  public initTimer(): void {
    this.showBtnNewCode = false;
    this.timer$ = interval(1000).pipe(
      takeUntil(this.timerStop$),
      map(
        (time) =>
          this.challengeResponse.challengeInformation.resend.time - time,
      ),
      tap((val) => (val === -1 ? this.stopTimer() : null)),
      map((val) => [Math.floor(val / 60), val % 60]),
      map(([min, seg]) => [this.format(min), this.format(seg)]),
      map(([min, seg]) =>
        this.timerText.replace(
          '[timer]',
          `<span class="seconds">${min}:${seg}</span>`,
        ),
      ),
    );
    this.timerSubscription = this.timer$
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }

  private format(number: number): string {
    return ('0' + number).slice(-2);
  }

  private stopTimer(showButton: boolean = true): void {
    this.showBtnNewCode = showButton;
    this.timerStop$.next();
    this.timerStop$.complete();
    if (!!this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  private _initForm(): void {
    this.formG = this.formBuilder.group({});
    switch (this.challengeResponse.action) {
      case Action.ALLOW:
      case Action.DENY:
        break;
      case Action.SELECT_CHALLENGE:
        this.formG.addControl(
          `challenge`,
          new FormControl(null, [Validators.required]),
        );
        this.formG.valueChanges
          .pipe(takeUntil(this._destroy$))
          .subscribe(() => {
            this.changeDisabledContinue(
              !this.formG.valid || this.disabledContinue,
            );
          });
        this.changeDisabledContinue(true);
        break;
      case Action.CHALLENGE:
        this.inputs = [
          ...Array(
            this.challengeResponse.challengeInformation.parameters.length,
          ).keys(),
        ];
        if (this.isOtp) {
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
        } else if (this.isWebAuthn) {
          this.formG.addControl(
            'publicKey',
            new FormControl(null, [Validators.nullValidator]),
          );
          this.webAuthnService
            .getCredential(
              this.challengeResponse.challengeInformation.parameters,
            )
            .then((credential) => {
              this.formG.value.publicKey = credential;
              this.onContinueClick();
            });
        }
        this.formG.valueChanges
          .pipe(takeUntil(this._destroy$))
          .subscribe(() => {
            this.changeDisabledContinue(
              !this.formG.valid || this.disabledContinue,
            );
          });
        this.changeDisabledContinue(true);
        break;
    }
    if (this.formG.status === 'INVALID') {
      this.eventBtn.emit(true);
    }
  }

  public onContinueClick(): void {
    if (this.formG.valid) {
      this.disabledContinue = true;
      this.changeDisabledContinue(true);
      this.setLoadingContinue();
      this.stopTimer(false);
      const data: any = {};
      if (this.isOtp) {
        data.code = Object.values(this.formG.value).join('');
      } else if (this.isWebAuthn) {
        data.publicKeyCredential = this.formG.value.publicKey.publicKeyCredential;
      }
      this.twoFactorService.validateChallenge(data).subscribe();
    }
  }

  public onSelectClick(): void {
    if (this.formG.valid) {
      this.disabledContinue = true;
      this.changeDisabledSelect(true);
      this.setLoadingSelect();
      this.stopTimer(false);
      this.twoFactorService
        .selectChallenge(Object.values(this.formG.value).join(''))
        .subscribe();
    }
  }

  private onCancelClick(): void {
    this.disabledContinue = true;
    this.changeDisabledContinue(true);
    this.twoFactorService.cancelChallenge();
  }

  private onNewCodeClick(): void {
    this.initTimer();
  }

  onFocusInput(e: KeyboardEvent): void {
    const targ: any = e.target;
    targ.select();
  }

  goToNextInput(index: number, e: KeyboardEvent): void {
    inputOtp(
      index,
      e,
      this.challengeResponse.challengeInformation.parameters.length,
      this.formG,
    );
    clearWithBackspaceOtp(index, e);
  }

  onPaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData || window['clipboardData'];
    const pastedText: string = clipboardData.getData('text');
    for (
      let i = 0;
      i < this.challengeResponse.challengeInformation.parameters.length &&
      i < pastedText.length;
      i++
    ) {
      this.formG.controls[`char${i}`].setValue(pastedText.charAt(i));
    }
    event.preventDefault();
  }

  changeDisabledContinue(disabled: boolean): void {
    const continueBtn = document.querySelector(
      `button[${this.prefix}-btn-continue]`,
    );
    if (!!continueBtn) {
      disabled
        ? continueBtn.setAttribute('disabled', '')
        : continueBtn.removeAttribute('disabled');
    }
  }

  changeDisabledSelect(disabled: boolean): void {
    const selectBtn = document.querySelector(
      `button[${this.prefix}-btn-select]`,
    );
    if (!!selectBtn) {
      disabled
        ? selectBtn.setAttribute('disabled', '')
        : selectBtn.removeAttribute('disabled');
    }
  }

  setLoadingContinue(): void {
    const continueBtn = document.querySelector(
      `button[${this.prefix}-btn-continue]`,
    );
    if (!!continueBtn) {
      continueBtn.classList.add('btn-loading');
    }
  }

  setLoadingSelect(): void {
    const selectBtn = document.querySelector(
      `button[${this.prefix}-btn-select]`,
    );
    if (!!selectBtn) {
      selectBtn.classList.add('btn-loading');
    }
  }

  stringToArray(str: string): string[] {
    return str.split('');
  }

  get isOtp(): boolean {
    return (
      this.isChallenge &&
      (this.challengeResponse.challengeInformation.challenge ===
        Challenge.ENHANCED ||
        this.challengeResponse.challengeInformation.challenge ===
          Challenge.HARD ||
        this.challengeResponse.challengeInformation.challenge ===
          Challenge.TOTP)
    );
  }

  get isWebAuthn(): boolean {
    return (
      this.isChallenge &&
      this.challengeResponse.challengeInformation.challenge ===
        Challenge.WEB_AUTHN
    );
  }

  get isChallenge(): boolean {
    return this.challengeResponse.action === Action.CHALLENGE;
  }

  get isAllowed(): boolean {
    return this.challengeResponse.action === Action.ALLOW;
  }

  get isDenied(): boolean {
    return this.challengeResponse.action === Action.DENY;
  }

  get isError(): boolean {
    return !this.challengeResponse.success;
  }

  get isSelectChallenge(): boolean {
    return this.challengeResponse.action === Action.SELECT_CHALLENGE;
  }
  get showSelectTotp(): boolean {
    return this.challengeResponse.challenges.includes(Challenge.TOTP);
  }

  get showSelectWebAuthn(): boolean {
    return this.challengeResponse.challenges.includes(Challenge.WEB_AUTHN);
  }

  get showSelectHard(): boolean {
    return this.challengeResponse.challenges.includes(Challenge.HARD);
  }

  get showSelectEnhanced(): boolean {
    return this.challengeResponse.challenges.includes(Challenge.ENHANCED);
  }

  get isResponseChallenge(): boolean {
    return this.challengeResponse.animation;
  }
  // tslint:disable-next-line:max-file-line-count
}

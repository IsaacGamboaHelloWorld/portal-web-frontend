import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { Action } from '@app/shared/two-factor-auth/models/action-code';
import { Challenge } from '@app/shared/two-factor-auth/models/challenge-type';
import { TwoFactorAuthService } from '@app/shared/two-factor-auth/twofactorauth.service';
import { environment } from '@environment';
import { isNullOrUndefined } from 'util';
import { Errors2FA, IErrors2FA } from './two-fa-global.util';

@Component({
  selector: 'app-two-fa-global',
  templateUrl: './two-fa-global.component.html',
  styleUrls: ['./two-fa-global.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TwoFaGlobalComponent implements OnInit, OnDestroy {
  public loading: boolean = false;
  public disabled: boolean = false;
  private interval: any = null;
  constructor(
    public dialogConfig: DialogConfig,
    private router: Router,
    private twoFactorService: TwoFactorAuthService,
    private appModel: ApplicationModel,
  ) {}

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.appModel.fetchAdvertising();
    }, 30000);
  }

  ngOnDestroy(): void {
    if (!!this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  assign(): void {
    this.router.navigate(['/codigo-2fa/inicio']);
  }
  home(): void {
    this.twoFactorService.cancelChallenge();
    this.router.navigate(['/']);
  }

  get hasData(): boolean {
    return !isNullOrUndefined(this.dialogConfig.data);
  }

  get iconName(): string {
    if (this.hasData && !!this.dialogConfig.data.challengeInformation) {
      switch (this.dialogConfig.data.challengeInformation.challenge) {
        case Challenge.ENHANCED:
          return '/identity-validation.svg';
        case Challenge.TOTP:
          return '/totp.png';
        case Challenge.HARD:
          return '/token.png';
        case Challenge.WEB_AUTHN:
          return '/huella.png';
      }
    }
  }
  get isAllowed(): boolean {
    return this.dialogConfig.data.action === Action.ALLOW;
  }

  get descriptionText(): string {
    if (this.hasData && this.dialogConfig.data.animation) {
      return 'TWO_FA.SUCCESS_DESC';
    }
    if (this.hasData && !!this.dialogConfig.data.challengeInformation) {
      switch (this.dialogConfig.data.challengeInformation.challenge) {
        case Challenge.ENHANCED:
          return 'TWO_FA.ENHANCED.DESCRIPTION';
        case Challenge.TOTP:
          return 'TWO_FA.TOTP.DESCRIPTION';
        case Challenge.HARD:
          return 'TWO_FA.HARD.DESCRIPTION';
        case Challenge.WEB_AUTHN:
          return 'TWO_FA.WEB_AUTHN.DESCRIPTION';
      }
    }
  }

  get allowedIcon(): string {
    if (
      this.hasData &&
      this.isAllowed &&
      !!this.dialogConfig.data.challengeResponses
    ) {
      let lastAllowed: any;
      for (const challengeResponse of this.dialogConfig.data
        .challengeResponses) {
        if (challengeResponse.success) {
          lastAllowed = challengeResponse;
          break;
        }
      }
      switch (lastAllowed && lastAllowed.challenge) {
        case Challenge.ENHANCED:
          return `${environment.resources.base_assets}/assets/animations/ani_icon_2faotp.json`;
        case Challenge.TOTP:
          return `${environment.resources.base_assets}/assets/animations/ani_icon_2faotp.json`;
        case Challenge.HARD:
          return `${environment.resources.base_assets}/assets/animations/ani_icon_2fatoken.json`;
        case Challenge.WEB_AUTHN:
          return `${environment.resources.base_assets}/assets/animations/ani_icon_2faotp.json`;
      }
    }
  }

  get headText(): string {
    if (this.hasData && !!this.dialogConfig.data.challengeInformation) {
      if (
        this.dialogConfig.data.challengeInformation.challenge ===
        Challenge.ENHANCED
      ) {
        return `TWO_FA.${this.dialogConfig.data.challengeInformation.challenge}.TITLE`;
      }
      return 'TWO_FA.PENDING';
    }
  }

  get deniedHead(): string {
    if (this.hasData) {
      return String(this.dialogConfig.data.errorMessage).includes('configurado')
        ? 'TWO_FA.ERROR'
        : 'TWO_FA.ERROR_DENIED';
    }
  }
  get deniedDes(): string {
    if (this.hasData) {
      return String(this.dialogConfig.data.errorMessage).includes('configurado')
        ? 'TWO_FA.ERROR_DESC'
        : this.dialogConfig.data.errorMessage;
    }
  }
  get deniedIcon(): string {
    if (this.hasData) {
      return String(this.dialogConfig.data.errorMessage).includes('configurado')
        ? '/idea.png'
        : '/numero-de-intentos-excedidos.png';
    }
  }
  get errors(): IErrors2FA {
    return Errors2FA;
  }
  get deniedBtn(): boolean {
    if (this.hasData) {
      switch (this.dialogConfig.data.errorMessage) {
        case this.errors.ERROR_DESC:
          return true;
        case this.errors.ERROR:
          return false;
        default:
          return false;
      }
    }
  }

  get addSmall(): boolean {
    return (
      this.hasData &&
      !!this.dialogConfig.data &&
      !!this.dialogConfig.data.challengeInformation &&
      !!this.dialogConfig.data.challengeInformation.parameters &&
      this.dialogConfig.data.challengeInformation.parameters.length > 6
    );
  }

  public formatDate(date: Date): string {
    const d = new Date(date);
    let month: string = '' + (d.getMonth() + 1);
    let day: string = '' + d.getDate();
    const year: number = d.getFullYear();
    let dateFinal: string;

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    dateFinal = [year, month, day].join('-');
    return `${dateFinal}T00:00:00.000`;
  }
}

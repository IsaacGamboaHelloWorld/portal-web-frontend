import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { ID_CHANNEL } from '@app/core/constants/global';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { TranslateService } from '@ngx-translate/core';
import * as DeviceDetector from 'device-detector-js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  NavigateOptionEnum,
  ObjectOptionEnum,
} from '../../../../core/constants/navigate-option-enum';
import { HomeSecurityOptions } from '../../entities/home-security-options.interface';
import {
  ILimitManagementGet,
  ILimitManagementGetData,
  LimitManagementModel,
} from '../../modules/limit-management/store';

@Component({
  selector: 'app-home-security',
  templateUrl: './home-security.component.html',
  styleUrls: ['./home-security.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeSecurityComponent implements OnInit {
  options: HomeSecurityOptions[] = [];

  constructor(
    @Inject('isMobile') public isMobile: boolean,
    private _translate: TranslateService,
    private _model: ApplicationModel,
    private _limitModel: LimitManagementModel,
  ) {
    this.options = [];
  }

  ngOnInit(): void {
    this._limitModel.limitManagementGetLoad({
      channel: ID_CHANNEL,
      operation: 'transfer',
    });
    this._getOptions();
  }

  private _getOptions(): void {
    const check = this.deviceDetector();
    const os = 'Android';
    this.options = [];
    this.options = this._translate.instant('SECURITY.HOME_CARDS.OPTIONS');
    const found = (e: any) => e.order === 6;
    if (
      check &&
      check['os']['name'] !== os &&
      this.options.findIndex(found) >= 1
    ) {
      this.options.splice(this.options.findIndex(found), 1);
    }
  }

  public deviceDetector(): object {
    const deviceDetector = new DeviceDetector();
    const userAgent = window.navigator.userAgent;
    const device = deviceDetector.parse(userAgent);
    return device;
  }

  public trackByFn(_index: number, item: HomeSecurityOptions): string {
    return item.title;
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this._model.optionModule$;
  }

  get limitManagementGet$(): Observable<ILimitManagementGet> {
    return this._limitModel.limitManagementGet$;
  }

  get limitManagementGetData$(): Observable<ILimitManagementGetData> {
    return this.limitManagementGet$.pipe(
      map((state: ILimitManagementGet) => {
        if (!!state && !!state.data) {
          return state.data;
        }
      }),
    );
  }

  public showOption(options: any, title: string): boolean {
    if (!options) {
      return;
    }
    const obj = {
      [NavigateOptionEnum.SECURITY_DATA]: ObjectOptionEnum.SECURITY_DATA,
      [NavigateOptionEnum.VERIFICATION_METHODS]:
        ObjectOptionEnum.VERIFICATION_METHODS,
      [NavigateOptionEnum.AUTH_2FACTHOR]: ObjectOptionEnum.AUTH_2FACTHOR,
      [NavigateOptionEnum.ALERTS_AND_NOTIFICATIONS]:
        ObjectOptionEnum.ALERTS_AND_NOTIFICATIONS,
      [NavigateOptionEnum.ACTIVATE_CARD]: ObjectOptionEnum.ACTIVATE_CARD,
      [NavigateOptionEnum.CHANGE_PASSWORD]: ObjectOptionEnum.CHANGE_PASSWORD,
      [NavigateOptionEnum.BLOCK_PRODUCT]: ObjectOptionEnum.BLOCK_PRODUCT,
      [NavigateOptionEnum.BIOMETRIC_AUTHENTICATION]:
        ObjectOptionEnum.BIOMETRIC_AUTHENTICATION,
      [NavigateOptionEnum.ACCESS_CONTROL]: ObjectOptionEnum.ACCESS_CONTROL,
      [NavigateOptionEnum.TOTP_AUTHENTICATION]:
        ObjectOptionEnum.TOTP_AUTHENTICATION,
      [NavigateOptionEnum.LIMIT_MANAGEMENT]: ObjectOptionEnum.LIMIT_MANAGEMENT,
    };
    const option = obj[title];
    const state = options[option];
    return state;
  }
}

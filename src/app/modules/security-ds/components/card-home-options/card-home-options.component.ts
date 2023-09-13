import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { BIOMETRIC } from '@app/core/constants/auth';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { ClassNotification } from '@app/core/constants/notification';
import { mapOptionToNavigate } from '@app/shared/helpers/map-options-to-navigate';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { isNullOrUndefined } from 'util';
import {
  NavigateOptionEnum,
  ObjectOptionEnum,
} from '../../../../core/constants/navigate-option-enum';
import { HomeSecurityOptions } from '../../entities/home-security-options.interface';

@Component({
  selector: 'app-card-home-options',
  templateUrl: './card-home-options.component.html',
  styleUrls: ['./card-home-options.component.sass'],
})
export class CardHomeOptionsComponent implements OnInit {
  @Input() data: HomeSecurityOptions;
  @Input() loading: boolean;
  @Input() showNavigate: boolean;
  @Input() isNew: boolean;

  constructor(
    private router: Router,
    private fingerprintService: WebAuthnService,
    private model: ApplicationModel,
  ) {
    this.loading = false;
    this.showNavigate = true;
    this.isNew = false;
  }

  ngOnInit(): void {}

  public redirect(): void {
    if (!this.data) {
      return;
    }
    const obj = {
      [NavigateOptionEnum.LIMIT_MANAGEMENT]: [
        ObjectOptionEnum.LIMIT_MANAGEMENT,
      ],
      [NavigateOptionEnum.SECURITY_DATA]: [ObjectOptionEnum.SECURITY_DATA],
      [NavigateOptionEnum.VERIFICATION_METHODS]: [
        ObjectOptionEnum.VERIFICATION_METHODS,
      ],
      [NavigateOptionEnum.AUTH_2FACTHOR]: [ObjectOptionEnum.AUTH_2FACTHOR],
      [NavigateOptionEnum.ALERTS_AND_NOTIFICATIONS]: [
        ObjectOptionEnum.ALERTS_AND_NOTIFICATIONS,
      ],
      [NavigateOptionEnum.ACTIVATE_CARD]: [ObjectOptionEnum.ACTIVATE_CARD],
      [NavigateOptionEnum.CHANGE_PASSWORD]: [ObjectOptionEnum.CHANGE_PASSWORD],
      [NavigateOptionEnum.BLOCK_PRODUCT]: [ObjectOptionEnum.BLOCK_PRODUCT],
      [NavigateOptionEnum.BIOMETRIC_AUTHENTICATION]: [
        ObjectOptionEnum.BIOMETRIC_AUTHENTICATION,
      ],
      [NavigateOptionEnum.ACCESS_CONTROL]: [ObjectOptionEnum.ACCESS_CONTROL],
      [NavigateOptionEnum.TOTP_AUTHENTICATION]: [
        ObjectOptionEnum.TOTP_AUTHENTICATION,
      ],
    };

    const path = mapOptionToNavigate(obj[this.data.title]);
    if (!isNullOrUndefined(path)) {
      this.router.navigate([path]);
    }
  }

  private _deleteBiometric(): void {
    if (localStorage.getItem(BIOMETRIC)) {
      this.fingerprintService
        .deleteCredential(localStorage.getItem(BIOMETRIC))
        .subscribe((del: any) => {
          if (del['success']) {
            this.model.notificationOpen(
              'Se borro el registro de biometrico',
              true,
              ClassNotification.SUCCESS,
            );
          }
        });
    }
  }

  get navigate(): INavigate {
    return Navigate;
  }
}

import { HttpUrlEncodingCodec } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { BIOMETRIC, CURRENT_USER } from '@app/core/constants/auth';
import {
  URL_CDT_UTM,
  URL_CREDIT_CARD,
  URL_OFFERS_UTM,
} from '@app/core/constants/global';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { ObjectOptionEnum } from '@app/core/constants/navigate-option-enum';
import { ClassNotification } from '@app/core/constants/notification';
import {
  DataOption,
  DocumentsOptions,
  SecurityOptions,
} from '@app/core/interfaces/option-module.interface';
import { AuthService } from '@app/modules/auth-old/services/auth.service';
import { SecurityService } from '@app/modules/security/services/security.service';
import { eventDataLayer } from '@app/shared/helpers/eventDataLayer';
import { mapOptionToNavigate } from '@app/shared/helpers/map-options-to-navigate';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import * as Events from '@core/constants/events';
import { TranslateService } from '@ngx-translate/core';
import * as DeviceDetector from 'device-detector-js';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-option-nav-ds',
  templateUrl: './option-nav-ds.component.html',
  styleUrls: ['./option-nav-ds.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionNavDsComponent implements OnInit {
  @Input() disableProfile: boolean = false;
  @Output() eventNavigate: EventEmitter<boolean> = new EventEmitter<boolean>();

  public securityOptions: Array<{
    name: string;
    show: boolean;
    url: INavigate;
  }> = [];
  private nameSecurityMenu: Array<{ name: string }> = [
    { name: ObjectOptionEnum.AUTH_2FACTHOR },
    { name: ObjectOptionEnum.ALERTS_AND_NOTIFICATIONS },
    { name: ObjectOptionEnum.LIMIT_MANAGEMENT },
    { name: ObjectOptionEnum.ACTIVATE_CARD },
    { name: ObjectOptionEnum.BIOMETRIC_AUTHENTICATION },
    { name: ObjectOptionEnum.SECURITY_DATA },
    { name: ObjectOptionEnum.CHANGE_PASSWORD },
    { name: ObjectOptionEnum.VERIFICATION_METHODS },
    { name: ObjectOptionEnum.BLOCK_PRODUCT },
    { name: ObjectOptionEnum.CHANNEL_BLOCK },
    { name: ObjectOptionEnum.TOTP_AUTHENTICATION },
  ];

  public documentsOptions: Array<{
    name: string;
    show: boolean;
    url: INavigate;
  }> = [];
  private nameDocumentsMenu: Array<{ name: string }> = [
    { name: ObjectOptionEnum.EXTRACTS },
    { name: ObjectOptionEnum.CERTIFICATE },
    { name: ObjectOptionEnum.TRIBUTARY },
  ];

  public urlActive: string;
  public openedSecurity: boolean;
  public openedDocuments: boolean;
  public openedOffers: boolean;

  constructor(
    private authService: AuthService,
    private model: ApplicationModel,
    private router: Router,
    private cd: ChangeDetectorRef,
    private fingerprintService: WebAuthnService,
    private translateService: TranslateService,
    private urlEncode: HttpUrlEncodingCodec,
    private securityService: SecurityService,
  ) {
    this.urlActive = '';
    this.openedSecurity = false;
    this.openedDocuments = false;
    this.openedOffers = false;
  }

  ngOnInit(): void {
    this.urlActive = this.router.url;
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((data: any) => {
        this.urlActive = data.url;
        this.cd.markForCheck();
      });
  }

  private _mapOptionModules(data: DataOption): void {
    if (!data) {
      return;
    }
    if (!!data.security && !!data.security.options) {
      this._mapSecurityOptions(data.security.options);
    }
    if (!!data.documents && !!data.documents.options) {
      this._mapDocumentOptions(data.documents.options);
    }
  }

  public deviceDetector(): object {
    const deviceDetector = new DeviceDetector();
    const userAgent = window.navigator.userAgent;
    const device = deviceDetector.parse(userAgent);
    return device;
  }
  private _mapSecurityOptions(option: SecurityOptions): void {
    this.securityOptions = [];
    const check = this.deviceDetector();
    const os = 'Android';
    this.nameSecurityMenu.forEach((item: { name: string }) => {
      this.securityOptions.push({
        name: item.name,
        show: option[item.name],
        url: mapOptionToNavigate(item.name),
      });
    });
    const found = (e: any) =>
      e.name === ObjectOptionEnum.BIOMETRIC_AUTHENTICATION;
    if (
      check &&
      check['os']['name'] !== os &&
      this.securityOptions.findIndex(found) >= 1
    ) {
      this.securityOptions.splice(this.securityOptions.findIndex(found), 1);
    }
  }

  private _mapDocumentOptions(option: DocumentsOptions): void {
    this.documentsOptions = [];
    this.nameDocumentsMenu.forEach((item: { name: string }) => {
      this.documentsOptions.push({
        name: item.name,
        show: option[item.name],
        url: mapOptionToNavigate(item.name),
      });
    });
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

  public redirect(url: string, webauth?: boolean, open?: any): void {
    // TODO: borrar else junto con el método _deleteBiometric, se agregó para pruebas en ambientes bajos
    if (webauth) {
      this._deleteBiometric();
    } else {
      if (
        environment.menuTopDisables.profile &&
        url === this.navigate.user_profile
      ) {
        return;
      }
      if (open) {
        this.open(open);
      } else {
        this.router.navigate([url]);
      }
      this.openedSecurity = false;
      this.openedDocuments = false;
      this.openedOffers = false;
      this.eventNavigate.emit(false);
      this.cd.markForCheck();
    }
  }

  public doLogout(): void {
    this.urlActive = '';
    this.authService.logOut();
    this.cd.markForCheck();
  }

  public toggleMenuSecurity(): void {
    this.openedSecurity = !this.openedSecurity;
  }

  public toggleMenuDocuments(): void {
    this.openedDocuments = !this.openedDocuments;
  }

  public open(event: object): void {
    const setObj: object = Events.obj_layer(Events.EventLabel.saving_account);
    const objEvent: object = {
      eventCategory: setObj['eventCategory'],
      eventAction: setObj['eventAction'],
      eventLabel: setObj['eventLabel'],
    };
    eventDataLayer(objEvent, setObj['eventCategory']);
    const tokenPB = this.urlEncode.encodeValue(
      this.securityService.getItem(CURRENT_USER),
    );
    let url = '';
    switch (event['ID']) {
      case '1':
        url = `${environment.url_redirect}${tokenPB}${URL_OFFERS_UTM}`;
        window.open(url, '_blank');
        break;
      case '2':
        url = `${environment.url_redirect_credit}${tokenPB}${URL_CREDIT_CARD}`;
        window.open(url, '_blank');
        break;
      case '3':
        url = `${environment.url_redirect_cdt}${URL_CDT_UTM}`;
        const openWindow: any = window.open(url, '_blank');
        const obj = { token: tokenPB };
        setTimeout(() => {
          if (openWindow) {
            openWindow.postMessage(obj, url);
          }
        }, 5000);
        break;
    }
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$.pipe(
      tap((resp: OptionModuleState) => this._mapOptionModules(resp.data)),
    );
  }

  get version(): string {
    return environment.version;
  }

  get hasHour$(): Observable<boolean> {
    return this.hour$.pipe(map((data) => !!data));
  }

  get hour$(): Observable<Date> {
    return this.model.hourSession$.pipe(
      filter((data) => !!data),
      map((date) => new Date(date)),
    );
  }

  get optionsOffers$(): Observable<object[]> {
    return this.translateService
      .get('HOME.OFFER_PRODUCTS.OFFER_PRODUCTS_CONTENT')
      .pipe(
        map((items) =>
          items.filter((item: object) => item['ACTIVE'] === 'TRUE'),
        ),
      );
  }
}

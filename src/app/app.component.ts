import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TwoFaGlobalComponent } from '@core/components/two-fa-global/two-fa-global.component';
import { PwaService } from '@core/services/pwa/pwa.service';
import { environment } from '@environment';
import { SecurityService } from '@modules/security/services/security.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { TIMESTAMP } from './core/constants/auth';
import { Events } from './core/constants/events';
import {
  ClassNotification,
  TIME_CLOSE_NOTIFICATION,
} from './core/constants/notification';
import { eventDataLayer } from './shared/helpers/eventDataLayer';
import {
  RequiredChallenge,
  ResponsedChallenge,
  SelectChallenge,
  SuccessfulChallenge,
  UnsuccessfulChallenge,
} from './shared/two-factor-auth/models/events-challenge';
import { TwoFactorAuthService } from './shared/two-factor-auth/twofactorauth.service';
import { INotificationState } from './store/reducers/global/notification/notification.reducer';
import { TealiumUtagService } from './tealium/utag.service';

export let browserRefresh = false;
export let browserState = '';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
  providers: [TealiumUtagService],
})
export class AppComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private _twoFaModal: any;

  private _timeoutAutoClose: any;
  public subscription: Subscription;

  constructor(
    private twoAuthService: TwoFactorAuthService,
    private model: ApplicationModel,
    private security: SecurityService,
    private modal: ModalService,
    private auth: AuthService,
    private router: Router,
    private pwaService: PwaService,
    private translate: TranslateService,
    private tealium: TealiumUtagService,
    private _elementRef: ElementRef,
  ) {
    this.initDataDog();
    this.tealium.setConfig({
      account: environment.config_tealium.account,
      profile: environment.config_tealium.profile,
      environment: environment.config_tealium.environment,
    });
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
        browserState = this.statusPage();
      }
    });
  }
  ngOnInit(): void {
    this._elementRef.nativeElement.removeAttribute('ng-version');
    this.pwaService.pwaSettings();
    this._2fa();
    this._closeModal();
    this.initializeSecurityKeys();
    this.validateSession();
    this._subsNotification();
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((data) => {
        eventDataLayer(
          {
            pagePath: data.url,
            pageTitle: data.url.split('/')[1]
              ? data.url.split('/')[1]
              : Events.home_view,
          },
          Events.page_view,
        );
        this.tealium.view({
          tealium_event: 'view',
          pagePath: data.url,
        });
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this.subscription.unsubscribe();
  }

  statusPage(): string {
    const entries = performance.getEntriesByType('navigation');
    const checkStatusPage = entries.map((nav: any) => nav.type);
    return checkStatusPage[0];
  }

  private validateSession(): void {
    const data = this.security.getItem(TIMESTAMP);
    const paymentId = this.security.getPaymentId();
    if (
      !isNullOrUndefined(data) &&
      (new Date().getTime() - JSON.parse(data)) / 1000 > 30
    ) {
      if (!!paymentId) {
        this.model.setIsLogged(true);
      } else {
        this.auth.logOut();
      }
    }
    this.security.removeItem(TIMESTAMP);
  }

  @HostListener('window:beforeunload', ['$event'])
  public doSomething($event: any): void {
    this.security.setItem(TIMESTAMP, JSON.stringify(new Date().getTime()));
    if (!environment.isLocal) {
      this.auth.logOut();
    }
  }
  @HostListener('window:unload')
  public doUnload(): void {
    if (!environment.isLocal) {
      this.auth.logOut();
    }
  }

  get showAnimate$(): Observable<boolean> {
    return this.model.animateInit$;
  }

  private async initializeSecurityKeys(): Promise<void> {
    if (await this.security.getSymmetricKey()) {
      this.auth.getServerPublicKey();
    } else {
      this.model.notificationOpen(
        this.translate.instant('CIPHER.TIMESTAMP_ERROR'),
        true,
        ClassNotification.ERROR,
      );
    }
  }

  private _2fa(): void {
    this.twoAuthService.setBaseUrl(environment.api.base);
    this.twoAuthService.events
      .pipe(takeUntil(this._destroy$))
      .subscribe((e) => {
        if (
          e instanceof RequiredChallenge ||
          e instanceof UnsuccessfulChallenge ||
          e instanceof SelectChallenge ||
          e instanceof SuccessfulChallenge
        ) {
          const animation = !this._twoFaModal;
          if (!!this._twoFaModal) {
            this.modal.close(true);
          }
          this._twoFaModal = this.modal.open(
            TwoFaGlobalComponent,
            false,
            `${SMALL_WIDTH}`,
            animation,
            e.data,
          );
          this._twoFaModal.afterClosed
            .pipe(takeUntil(this._destroy$))
            .subscribe((_) => {
              this.twoAuthService.cancelChallenge();
            });
          if (e instanceof SuccessfulChallenge) {
            this.twoAuthService.validateChallenge().subscribe();
            setTimeout(() => {
              if (!!this._twoFaModal) {
                this._twoFaModal = null;
                this.modal.close(true);
              }
            }, 3000);
          }
        } else if (e instanceof ResponsedChallenge) {
          if (!!this._twoFaModal) {
            this._twoFaModal = null;
            this.modal.close(true);
          }
        }
      });
  }

  private _closeModal(): void {
    this.router.events
      .pipe(
        takeUntil(this._destroy$),
        filter((e): e is NavigationStart => e instanceof NavigationStart),
      )
      .subscribe((_) => {
        this.modal.close();
      });
  }

  get hasPrompt(): boolean {
    return (
      !isNullOrUndefined(this.pwaService.promptEv) && environment.production
    );
  }
  private initDataDog(): void {
    if (environment.datadog_enable) {
      const d = document;
      let s: any;
      let t: any;
      s = d.createElement('script');
      s.language = 'javascript';
      s.type = 'text/javascript';
      s.async = 1;
      s.charset = 'utf-8';
      s.src = 'https://www.datadoghq-browser-agent.com/datadog-rum-us.js';
      t = d.getElementsByTagName('script')[0];
      t.parentNode.insertBefore(s, t);
      const script = document.createElement('script');
      script.innerHTML = `window.DD_RUM && DD_RUM.init({
    clientToken: '${environment.datadog_clientToken}', applicationId: '${environment.datadog_appId}', datacenter: 'us',
    sampleRate: 100
    }); `;
      document.head.appendChild(script);
    }
  }

  private _subsNotification(): void {
    this.infoNotification$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: INotificationState) => {
        if (data.autoClosed) {
          if (!!this._timeoutAutoClose) {
            clearTimeout(this._timeoutAutoClose);
          }
          this._timeoutAutoClose = setTimeout(
            () => this.notificationClosed(),
            TIME_CLOSE_NOTIFICATION,
          );
        }
      });
  }

  public notificationClosed(): void {
    this.model.notificationClosed();
    setTimeout((_) => this.model.notificationReset(), 600);
  }

  get infoNotification$(): Observable<INotificationState> {
    return this.model.notification$;
  }
}

import { registerLocaleData } from '@angular/common';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import localeEs from '@angular/common/locales/es-US';
import {
  APP_INITIALIZER,
  InjectionToken,
  LOCALE_ID,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApplicationModel } from '@app/application.model';
import { AuthModelOld } from '@app/modules/auth-old/auth.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { userToken } from '@app/shared/helpers/checkNested.helper';
import { isMobile } from '@app/shared/helpers/isMobile';
import { ModalModule } from '@app/shared/modal/modal.module';
import { NotificationTimeoutComponent } from '@core/components//notification-timeout/notification-timeout.component';
import { AddPwaComponent } from '@core/components/add-pwa/add-pwa.component';
import { AlertCloseComponent } from '@core/components/alert-close/alert-close.component';
import { NotificationMMComponent } from '@core/components/notification-multiple-message/notification-multiple-message.component';
import { NotificationComponent } from '@core/components/notification/notification.component';
import { TwoFaGlobalComponent } from '@core/components/two-fa-global/two-fa-global.component';
import { CoreModule } from '@core/core.module';
import { CoreEffects } from '@core/effects';
import { GeneralInterceptor } from '@core/interceptor/general.interceptor';
import { AuthSession } from '@core/services/auth-session';
import { AuthToken } from '@core/services/auth-token';
import { PwaService } from '@core/services/pwa/pwa.service';
import { environment } from '@environment';
import { SecurityModule } from '@modules/security/security.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { INITIAL_STATE, StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { clearState, rootReducer } from '@store/reducers/root.reducer';
import { INITIAL_APPLICATION_STATE } from '@store/state/application.state';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { onAppInit, translateConfig } from './app.translate';
import { LoaderInterceptor } from './core/components/loader/interceptors/loader-interceptor.service';
import { LoaderComponent } from './core/components/loader/loader.component';
import { LoaderService } from './core/components/loader/services/loader.service';
import { ManipulateDomService } from './core/services/manipulate-dom/manipulate-dom.service';
import { AuthModel } from './modules/auth/store/model/auth.model';
import { DsModalModule } from './shared/ds/ds-modal/ds-modal.module';
import { DsNotificationModule } from './shared/ds/ds-notification/ds-notification.module';
import { ExperianModule } from './shared/experian/experian.module';
import { LottieModule } from './shared/lottie/lottie.module';
import { ModalService } from './shared/modal/services/modal.service';
import { TwofactorauthModule } from './shared/two-factor-auth/twofactorauth.module';
import { WebAuthnModule } from './shared/web-authn/web-authn.module';

registerLocaleData(localeEs, 'es-US');
export const REDUCER_TOKEN = new InjectionToken('Registered Reducers');

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent,
    NotificationMMComponent,
    AddPwaComponent,
    TwoFaGlobalComponent,
    AlertCloseComponent,
    NotificationTimeoutComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    SecurityModule,
    TranslateModule.forRoot(translateConfig),
    StoreModule.forRoot(REDUCER_TOKEN, { metaReducers: [clearState] }),
    EffectsModule.forRoot([...CoreEffects]),
    environment.storeDev,
    TwofactorauthModule,
    ModalModule,
    BtnModule,
    RecaptchaV3Module,
    NgSelectModule,
    LottieModule,
    WebAuthnModule,
    DsNotificationModule,
    DsModalModule,
    ExperianModule,
  ],
  providers: [
    ApplicationModel,
    AuthModelOld,
    AuthModel,
    PwaService,
    {
      provide: APP_INITIALIZER,
      useFactory: onAppInit,
      multi: true,
      deps: [HttpClient, TranslateService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: userToken,
      multi: true,
      deps: [AuthToken],
    },
    { provide: 'isMobile', useFactory: isMobile, deps: [] },
    {
      provide: INITIAL_STATE,
      useValue: INITIAL_APPLICATION_STATE,
    },
    {
      provide: REDUCER_TOKEN,
      useValue: rootReducer,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralInterceptor,
      multi: true,
    },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: LOCALE_ID,
      useValue: 'es-US',
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.siteKeyRecaptcha,
    },
    AuthToken,
    AuthSession,
    ModalService,
    ManipulateDomService,
  ],
  entryComponents: [
    TwoFaGlobalComponent,
    AlertCloseComponent,
    NotificationTimeoutComponent,
    LoaderComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {
  constructor() {
    if ('serviceWorker' in navigator && environment.pwa) {
      navigator.serviceWorker
        .register('/pb-sw.js', {
          scope: '/',
        })
        .then((reg) => {
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            newWorker.addEventListener('statechange', () => {
              switch (newWorker.state) {
                case 'installed':
                  if (navigator.serviceWorker.controller) {
                    newWorker.postMessage({ action: 'skipWaiting' });
                  }
                  break;
              }
            });
          });
        })
        .catch((err) =>
          // tslint:disable-next-line:no-console
          console.log('ServiceWorker registration failed: ', err),
        );

      navigator.serviceWorker.addEventListener('controllerchange', (event) => {
        window.location.reload();
      });
    }
  }
}

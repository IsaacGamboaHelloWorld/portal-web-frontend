import { CommonModule } from '@angular/common';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { InjectionToken, NgModule } from '@angular/core';

import { ApplicationModel } from '@app/application.model';
import { LottieModule } from '@app/shared/lottie/lottie.module';
import { NewsService } from '@app/shared/news/services/news.service';
import { NewsEffect } from '@app/shared/news/store/effects/news.effects';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import {
  NewsFeatureName,
  NewsModuleState,
} from '@app/shared/news/store/state/news.state';
import { OtpAthWrapperModule } from '@app/shared/otp-ath-wrapper/otp-ath-wrapper.module';
import { OtpAthModel } from '@app/shared/otp-ath-wrapper/store';
import { CoreModule } from '@core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ICodeAuthModuleState } from '../code-auth/entities/code-auth';
import { CodeAuthService } from '../code-auth/services/code-auth.service';
import { CodeAuthEffect } from '../code-auth/store/effects/code-auth.effects';
import { CodeAuthModel } from '../code-auth/store/model/code-auth.model';
import { CodeAuthRootReducer } from '../code-auth/store/reducers';
import { NewCodeAuthFeatureName } from '../code-auth/store/state/code-auth.state';
import { HeaderComponent } from './components/header/header.component';
import { MenulatComponent } from './components/menulat/menulat.component';
import { OptionNavDsComponent } from './components/option-nav-ds/option-nav-ds.component';
import { TabbarDsComponent } from './components/tabbar-ds/tabbar-ds.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OptionModuleService } from './services/option-module.service';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ICodeAuthModuleState>
>('Feature Payment Taxes Reducer');

export const FEATURE_REDUCER_TOKEN_NEWS = new InjectionToken<
  ActionReducerMap<NewsModuleState>
>('Feature Nes Reducers');

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule,
    StoreModule.forFeature(NewCodeAuthFeatureName, FEATURE_REDUCER_TOKEN),
    StoreModule.forFeature(NewsFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([CodeAuthEffect, NewsEffect]),
    LottieModule,
    OtpAthWrapperModule,
  ],
  declarations: [
    DashboardComponent,
    HeaderComponent,
    MenulatComponent,
    OptionNavDsComponent,
    TabbarDsComponent,
  ],
  providers: [
    ApplicationModel,
    OtpAthModel,
    CodeAuthModel,
    CodeAuthService,
    NewsService,
    NewsModel,
    OptionModuleService,
    HttpUrlEncodingCodec,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: CodeAuthRootReducer,
    },
  ],
})
export class DashboardModule {}

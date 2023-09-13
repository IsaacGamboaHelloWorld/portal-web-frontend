import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WnocotherEffect } from '@app/modules/wnocother/effects/wnocother.effect';
import { WnocotherRoutingModule } from '@app/modules/wnocother/wnocother-routing.module';
import { WnocotherMoldel } from '@app/modules/wnocother/wnocother.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { NewsService } from '@app/shared/news/services/news.service';
import { NewsEffect } from '@app/shared/news/store/effects/news.effects';
import { NewsModel } from '@app/shared/news/store/model/news.model';
import { NewsRootReducer } from '@app/shared/news/store/reducers';
import {
  NewsFeatureName,
  NewsModuleState,
} from '@app/shared/news/store/state/news.state';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { CoreModule } from '@core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CancelWnocotherComponent } from './components/cancel-wnocother/cancel-wnocother.component';
import { ModalWnocotherComponent } from './components/modal-wnocother/modal-wnocother.component';
import { ModalWnocotherModule } from './components/modal-wnocother/modal-wnocother.module';
import { WnocotherService } from './services/withdrawal.service';
import { WnocotherContainer } from './wnocother.container';

export const FEATURE_REDUCER_TOKEN_NEWS = new InjectionToken<
  ActionReducerMap<NewsModuleState>
>('Feature News Reducers');
@NgModule({
  declarations: [WnocotherContainer, CancelWnocotherComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    BtnModule,
    ReactiveFormsModule,
    WnocotherRoutingModule,
    LineTimeModule,
    TicketModule,
    ModalWnocotherModule,
    CurrencyModule.forRoot('es-US'),
    EffectsModule.forFeature([WnocotherEffect]),
    StoreModule.forFeature(NewsFeatureName, FEATURE_REDUCER_TOKEN_NEWS),
    EffectsModule.forFeature([NewsEffect]),
    TemplateSystemModule,
  ],
  entryComponents: [ModalWnocotherComponent],
  providers: [
    WnocotherMoldel,
    WnocotherService,
    ModalService,
    NewsService,
    NewsModel,
    {
      provide: FEATURE_REDUCER_TOKEN_NEWS,
      useValue: NewsRootReducer,
    },
  ],
})
export class WnocotherModule {}

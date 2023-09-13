import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { BtnModule } from '../btn/btn.module';
import { NewsComponent } from './news.component';
import { NewsService } from './services/news.service';
import { NewsEffect } from './store/effects/news.effects';
import { NewsModel } from './store/model/news.model';
import { NewsRootReducer } from './store/reducers/index';
import { NewsFeatureName, NewsModuleState } from './store/state/news.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<NewsModuleState>
>('Feature Nes Reducers');

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CoreModule,
    CommonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    BtnModule,
    StoreModule.forFeature(NewsFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([NewsEffect]),
  ],
  providers: [
    NewsService,
    NewsModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: NewsRootReducer,
    },
  ],
  exports: [NewsComponent],
})
export class NewsModule {}

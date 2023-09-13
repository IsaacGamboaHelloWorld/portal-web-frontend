import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnSquareModule } from '@app/shared/btn-square/btn-square.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { DsDropdownSelectModule } from '@app/shared/ds/ds-dropdown-select/ds-dropdown-select.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ITributary } from '../../entities/documents';
import { DocumentsService } from '../../services/documents.service';
import { TributaryEffect } from '../../store/effects/tributary.effects';
import { HomeModelDocuments } from '../../store/model/home.model';
import { TributaryModel } from '../../store/model/tributary.model';
import { DocumentsRootReducer } from '../../store/reducers';
import { NewDocumentsFeatureName } from '../../store/state/documents.state';
import { TributaryComponent } from './tributary.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ITributary>
>('Feature Tributary Reducer');
@NgModule({
  declarations: [TributaryComponent],
  imports: [
    CommonModule,
    TemplateSystemModule,
    CoreModule,
    BtnSquareModule,
    DropdownModuleSelect,
    DsDropdownSelectModule,
    ReactiveFormsModule,
    FormsModule,
    BtnModule,
    RouterModule.forChild([
      {
        path: '',
        component: TributaryComponent,
      },
    ]),
    StoreModule.forFeature(NewDocumentsFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([TributaryEffect]),
  ],
  providers: [
    TributaryModel,
    HomeModelDocuments,
    DocumentsService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: DocumentsRootReducer,
    },
  ],
})
export class TributaryModule {}

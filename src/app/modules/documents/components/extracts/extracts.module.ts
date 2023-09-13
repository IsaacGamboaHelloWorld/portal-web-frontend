import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { StatementsService } from '@app/modules/detail-product/components/statements/services/statements.service';
import { StatementModel } from '@app/modules/detail-product/components/statements/statements.model';
import { BtnSquareModule } from '@app/shared/btn-square/btn-square.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { IExtracts } from '../../entities/documents';
import { DocumentsService } from '../../services/documents.service';
import { ExtractsEffect } from '../../store/effects/extracts.effects';
import { ExtractsModel } from '../../store/model/extracts.model';
import { HomeModelDocuments } from '../../store/model/home.model';
import { DocumentsRootReducer } from '../../store/reducers';
import { NewDocumentsFeatureName } from '../../store/state/documents.state';
import { ExtractsComponent } from './extracts.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IExtracts>
>('Feature Extracts Reducer');
@NgModule({
  declarations: [ExtractsComponent],
  imports: [
    CommonModule,
    TemplateSystemModule,
    CoreModule,
    BtnSquareModule,
    DropdownModuleSelect,
    ReactiveFormsModule,
    FormsModule,
    BtnModule,
    RouterModule.forChild([
      {
        path: '',
        component: ExtractsComponent,
      },
    ]),
    StoreModule.forFeature(NewDocumentsFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([ExtractsEffect]),
  ],
  providers: [
    ExtractsModel,
    HomeModelDocuments,
    DocumentsService,
    StatementsService,
    StatementModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: DocumentsRootReducer,
    },
  ],
})
export class ExtractsModule {}

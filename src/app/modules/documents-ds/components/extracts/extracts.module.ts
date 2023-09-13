import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { StatementsService } from '@app/modules/detail-product/components/statements/services/statements.service';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardAccountRadiusModule } from '@app/shared/card-account-radius/card-account-radius.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { DsDropdownSelectModule } from '../../../../shared/ds/ds-dropdown-select/ds-dropdown-select.module';
import { UtilsDocumentsService } from '../../services/utils-documents.service';
import { ExtractsModel } from '../../store/model/extracts.model';
import {
  IExtractsState,
  NewDocumentsFeatureName,
} from '../../store/state/documents.state';

import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { DsStatesCardModule } from '@app/shared/ds/ds-states-card/ds-states-card.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { EffectsModule } from '@ngrx/effects';
import { DocumentsService } from '../../services/documents.service';
import { ExtractsEffect } from '../../store/effects/extracts.effects';
import { HomeModelDocuments } from '../../store/model/home.model';
import { DocumentsRootReducer } from '../../store/reducers';
import { ExtractsRoutingModule } from './extracts-routing.module';
import { ExtractsComponent } from './extracts.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IExtractsState>
>('Feature Extracts Reducer');
@NgModule({
  declarations: [ExtractsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExtractsRoutingModule,
    CoreModule,
    TemplateSystemModule,
    CardAccountRadiusModule,
    DsStatesCardModule,
    DsDropdownSelectModule,
    BtnModule,
    ModalModule,
    DsModalModule,
    StoreModule.forFeature(NewDocumentsFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([ExtractsEffect]),
  ],
  providers: [
    ExtractsModel,
    HomeModelDocuments,
    UtilsDocumentsService,
    ModalService,
    StatementsService,
    DocumentsService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: DocumentsRootReducer,
    },
  ],
})
export class ExtractsModule {}

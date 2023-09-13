import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardAccountRadiusModule } from '@app/shared/card-account-radius/card-account-radius.module';
import { DsDropdownSelectModule } from '@app/shared/ds/ds-dropdown-select/ds-dropdown-select.module';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ICertificate } from '../../entities/certificate';
import { DocumentsService } from '../../services/documents.service';
import { CertificateDocEffect } from '../../store/effects/certificate.effects';
import { CertificateModel } from '../../store/model/certificate.model';
import { HomeModelDocuments } from '../../store/model/home.model';
import { DocumentsRootReducer } from '../../store/reducers';
import { NewDocumentsFeatureName } from '../../store/state/documents.state';

import { CertificateRoutingModule } from './certificate-routing.module';
import { CertificateComponent } from './certificate.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ICertificate>
>('Feature Certificate Reducer');

@NgModule({
  declarations: [CertificateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CertificateRoutingModule,
    CoreModule,
    TemplateSystemModule,
    CardAccountRadiusModule,
    DsDropdownSelectModule,
    DsInputModule,
    BtnModule,
    ModalModule,
    DsModalModule,
    StoreModule.forFeature(NewDocumentsFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([CertificateDocEffect]),
  ],
  providers: [
    CertificateModel,
    HomeModelDocuments,
    DocumentsService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: DocumentsRootReducer,
    },
  ],
})
export class CertificateModule {}

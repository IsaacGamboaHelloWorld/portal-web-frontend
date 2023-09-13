import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnSquareModule } from '@app/shared/btn-square/btn-square.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ICertificate } from '../../entities/documents';
import { DocumentsService } from '../../services/documents.service';
import { CertificateDocEffect } from '../../store/effects/certificate.effects';
import { CertificateModel } from '../../store/model/certificate.model';
import { HomeModelDocuments } from '../../store/model/home.model';
import { DocumentsRootReducer } from '../../store/reducers';

import { NewDocumentsFeatureName } from '../../store/state/documents.state';
import { CertificateComponent } from './certificate.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ICertificate>
>('Feature Certificate Reducer');
@NgModule({
  declarations: [CertificateComponent],
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
        component: CertificateComponent,
      },
    ]),
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

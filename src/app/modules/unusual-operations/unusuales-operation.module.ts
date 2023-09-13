import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { CoreModule } from '../../core/core.module';
import { BtnModule } from '../../shared/btn/btn.module';

import { ReactiveFormsModule } from '@angular/forms';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { LimitManagementModel } from '../security-ds/modules/limit-management/store';
import { CardUnsualOperationsComponent } from './components/card-unsual-operations/card-unsual-operations.component';
import { UnsualOperationProductComponent } from './components/unsual-operation-product/unsual-operation-product.component';
import { UnsualOperationsComponent } from './components/unsual-operations/unsual-operations.component';
import { UnsualOperationsService } from './services/unsual-operations.service';
import { UnusualOperationsContainerComponent } from './unusual-operations-container.component';
import { UnusualesOperationRoutingModule } from './unusual-operations-routing.module';

@NgModule({
  declarations: [
    UnsualOperationsComponent,
    CardUnsualOperationsComponent,
    UnusualOperationsContainerComponent,
    UnsualOperationProductComponent,
  ],
  imports: [
    CommonModule,
    UnusualesOperationRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    BtnModule,
    TemplateSystemModule,
  ],
  providers: [UnsualOperationsService, ApplicationModel, LimitManagementModel],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class UnusualOperationsModule {}

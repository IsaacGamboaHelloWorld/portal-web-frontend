import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { BtnModule } from '@app/shared/btn/btn.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { CoreModule } from '@core/core.module';
import { DsModalComponent } from './components/ds-modal/ds-modal.component';

@NgModule({
  declarations: [DsModalComponent],
  imports: [CommonModule, BtnModule, CoreModule],
  providers: [ModalService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [DsModalComponent],
})
export class DsModalModule {}

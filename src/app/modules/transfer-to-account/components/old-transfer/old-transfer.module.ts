import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TransferModel } from '../../transfer.model';

import { OldTransferRoutingModule } from './old-transfer-routing.module';
import { OldTransferComponent } from './old-transfer.component';

@NgModule({
  declarations: [OldTransferComponent],
  imports: [
    CommonModule,
    CoreModule,
    OldTransferRoutingModule,
    TemplateSystemModule,
    LineTimeModule,
  ],
  providers: [TransferModel],
})
export class OldTransferModule {}

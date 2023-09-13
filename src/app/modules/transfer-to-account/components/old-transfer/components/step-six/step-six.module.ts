import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';

import { StepSixRoutingModule } from './step-six-routing.module';
import { StepSixComponent } from './step-six.component';

@NgModule({
  declarations: [StepSixComponent],
  imports: [
    CommonModule,
    StepSixRoutingModule,
    CoreModule,
    TicketModule,
    BtnModule,
  ],
})
export class StepSixModule {}

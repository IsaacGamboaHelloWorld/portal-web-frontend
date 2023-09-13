import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';

import { StepTwoRoutingModule } from './step-two-routing.module';
import { StepTwoComponent } from './step-two.component';

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    CommonModule,
    StepTwoRoutingModule,
    CoreModule,
    TicketModule,
    BtnModule,
  ],
})
export class StepTwoModule {}

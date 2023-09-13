import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { StepFiveRoutingModule } from './step-five-routing.module';
import { StepFiveComponent } from './step-five.component';

@NgModule({
  declarations: [StepFiveComponent],
  imports: [
    CommonModule,
    StepFiveRoutingModule,
    CoreModule,
    TicketModule,
    BtnModule,
  ],
})
export class StepFiveModule {}

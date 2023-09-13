import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';

import { StepFourRoutingModule } from './step-four-routing.module';
import { StepFourComponent } from './step-four.component';

@NgModule({
  declarations: [StepFourComponent],
  imports: [
    CommonModule,
    StepFourRoutingModule,
    CoreModule,
    TicketModule,
    BtnModule,
  ],
})
export class StepFourModule {}

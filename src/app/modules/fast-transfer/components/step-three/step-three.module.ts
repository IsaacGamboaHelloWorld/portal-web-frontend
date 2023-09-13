import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { StepThreeRoutingModule } from './step-three-routing.module';
import { StepThreeComponent } from './step-three.component';

@NgModule({
  declarations: [StepThreeComponent],
  imports: [
    CommonModule,
    StepThreeRoutingModule,
    CoreModule,
    TicketModule,
    BtnModule,
  ],
})
export class StepThreeModule {}

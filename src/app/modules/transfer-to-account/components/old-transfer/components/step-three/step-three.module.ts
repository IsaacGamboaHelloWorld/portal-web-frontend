import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { AppCalendarModule } from '@app/shared/calendar/calendar.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { StepThreeRoutingModule } from './step-three-routing.module';
import { StepThreeComponent } from './step-three.component';

@NgModule({
  declarations: [StepThreeComponent],
  imports: [
    CommonModule,
    StepThreeRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
    CurrencyModule.forRoot('es-US'),
    AppCalendarModule,
  ],
})
export class StepThreeModule {}

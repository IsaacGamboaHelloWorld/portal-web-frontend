import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { StepTwoRoutingModule } from './step-two-routing.module';
import { StepTwoComponent } from './step-two.component';

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    CommonModule,
    StepTwoRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
    CurrencyModule.forRoot('es-US'),
  ],
})
export class StepTwoModule {}

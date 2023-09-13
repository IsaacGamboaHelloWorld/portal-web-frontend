import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardAccountRadiusModule } from '@app/shared/card-account-radius/card-account-radius.module';
import { CardChangeDataModule } from '@app/shared/card-change-data/card-change-data.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsDropdownSelectModule } from '@app/shared/ds/ds-dropdown-select/ds-dropdown-select.module';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { StateInputModule } from '@app/shared/state-input/state-input.module';

import { StepOneRoutingModule } from './step-one-routing.module';
import { StepOneComponent } from './step-one.component';

@NgModule({
  declarations: [StepOneComponent],
  imports: [
    CommonModule,
    StepOneRoutingModule,
    CoreModule,
    CardChangeDataModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
    StateInputModule,
    DsInputModule,
    CardAccountRadiusModule,
    DsDropdownSelectModule,
    CurrencyModule.forRoot('es-US'),
  ],
})
export class StepOneModule {}

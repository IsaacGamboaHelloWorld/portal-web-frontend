import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';

import { StepOneRoutingModule } from './step-one-routing.module';
import { StepOneComponent } from './step-one.component';

@NgModule({
  declarations: [StepOneComponent],
  imports: [
    CommonModule,
    CoreModule,
    StepOneRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class StepOneModule {}

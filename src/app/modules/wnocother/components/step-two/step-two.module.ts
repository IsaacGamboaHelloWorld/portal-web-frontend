import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { StepTwoComponent } from './step-two.component';

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: StepTwoComponent,
      },
    ]),
  ],
})
export class StepTwoModule {}

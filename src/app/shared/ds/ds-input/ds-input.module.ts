import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsInputComponent } from './ds-input.component';

@NgModule({
  declarations: [DsInputComponent],
  imports: [CommonModule, CurrencyModule.forRoot('es-US')],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [DsInputComponent],
})
export class DsInputModule {}

import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { DsCreditCardComponent } from './ds-credit-card.component';
import { DsMaskCreditCardPipe } from './pipes/ds-mask-credit-card.pipe';

@NgModule({
  declarations: [DsCreditCardComponent, DsMaskCreditCardPipe],
  imports: [CommonModule, CoreModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [DsCreditCardComponent, DsMaskCreditCardPipe],
})
export class DsCreditCardModule {}

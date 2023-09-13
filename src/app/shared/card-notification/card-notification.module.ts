import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CardNotificationComponent } from './card-notification.component';

@NgModule({
  declarations: [CardNotificationComponent],
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [CardNotificationComponent],
})
export class CardNotificationModule {}

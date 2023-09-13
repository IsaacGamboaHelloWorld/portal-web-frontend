import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { DsNotificationComponent } from './ds-notification.component';

@NgModule({
  declarations: [DsNotificationComponent],
  imports: [CommonModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  exports: [DsNotificationComponent],
})
export class DsNotificationModule {}

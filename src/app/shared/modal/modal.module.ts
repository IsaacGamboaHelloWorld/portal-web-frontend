import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PublicServicesFacade } from '@app/modules/paymentsv2/public-services/public-services.facade';
import { RecurringPopupModule } from './../../modules/paymentsv2/public-services/components/recurring-popup/recurring-popup.module';
import { InsertionDirective } from './directive/insertion.directive';
import { ModalComponent } from './modal.component';

@NgModule({
  imports: [CommonModule, RecurringPopupModule],
  declarations: [InsertionDirective, ModalComponent],
  entryComponents: [ModalComponent],
  providers: [PublicServicesFacade],
})
export class ModalModule {}

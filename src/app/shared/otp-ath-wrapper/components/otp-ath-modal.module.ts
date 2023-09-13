import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '../../btn/btn.module';
import { ModalService } from '../../modal/services/modal.service';
import { OtpAthModalComponent } from './otp-ath-modal.component';

@NgModule({
  declarations: [OtpAthModalComponent],
  imports: [CommonModule, ReactiveFormsModule, CoreModule, BtnModule],
  providers: [ModalService],
  entryComponents: [OtpAthModalComponent],
})
export class OtpModalModule {}

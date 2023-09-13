import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { AdvanceFacade } from '@app/modules/advance/advance.facade';
import { HomeModel } from '@app/modules/home/home.model';
import { BtnModule } from '@app/shared/btn/btn.module';

import { MdlAuthOtpComponent } from './mdl-auth-otp.component';

@NgModule({
  declarations: [MdlAuthOtpComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
  ],
  entryComponents: [MdlAuthOtpComponent],
  providers: [HomeModel, AdvanceFacade],
})
export class MdlAuthOtpModule {}

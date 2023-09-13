import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordModel } from './change-password.model';
import { ChangePasswordEffect } from './effects/change-password.effect';
import { NotificationSmsEffect } from './effects/notification-sms.effect';
import { ChangePasswordService } from './services/change-password.service';
import { NotificationSmsService } from './services/notification-sms.service';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateSystemModule,
    EffectsModule.forFeature([ChangePasswordEffect, NotificationSmsEffect]),
    RouterModule.forChild([
      {
        path: '',
        component: ChangePasswordComponent,
      },
    ]),
  ],
  providers: [
    FormBuilder,
    ChangePasswordModel,
    ChangePasswordService,
    NotificationSmsService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ChangePasswordModule {}

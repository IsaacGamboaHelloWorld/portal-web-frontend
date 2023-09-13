import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardNotificationModule } from '@app/shared/card-notification/card-notification.module';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { OtpAthModel } from '@app/shared/otp-ath-wrapper/store';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './components/home/home.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LimitManagementRoutingModule } from './limit-management-routing.module';
import { LimitManagementComponent } from './limit-management.component';
import { LimitManagementService } from './services/limit-management.service';
import { LimitManagementEffect, LimitManagementModel } from './store';

@NgModule({
  declarations: [LimitManagementComponent, OnboardingComponent, HomeComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    LimitManagementRoutingModule,
    TemplateSystemModule,
    BtnModule,
    CardNotificationModule,
    DsInputModule,
    DsModalModule,
    EffectsModule.forFeature([LimitManagementEffect]),
  ],
  providers: [LimitManagementService, LimitManagementModel, OtpAthModel],
})
export class LimitManagementModule {}

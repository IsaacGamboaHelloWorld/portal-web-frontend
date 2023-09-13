import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LottieModule } from '../lottie/lottie.module';
import { TwoFactorAuthInterceptor } from './interceptors/two-factor-auth.interceptor';
import { TwoFactorAuthComponent } from './twofactorauth.component';

@NgModule({
  declarations: [TwoFactorAuthComponent],
  imports: [CommonModule, ReactiveFormsModule, LottieModule],
  exports: [TwoFactorAuthComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TwoFactorAuthInterceptor,
      multi: true,
    },
  ],
})
export class TwofactorauthModule {}

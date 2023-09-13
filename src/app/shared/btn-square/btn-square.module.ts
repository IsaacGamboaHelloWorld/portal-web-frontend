import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { LottieModule } from '../lottie/lottie.module';
import { BtnSquareComponent } from './btn-square.component';

@NgModule({
  declarations: [BtnSquareComponent],
  imports: [CommonModule, CoreModule, LottieModule],
  exports: [BtnSquareComponent],
})
export class BtnSquareModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { HomeModel } from '@app/modules/home/home.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TranslateModule } from '@ngx-translate/core';
import { TuPlusSerivceFacade } from '../../tu-plus.facade';

import { HowRoutingModule } from './step-two-routing.module';
import { StepTwoComponent } from './step-two.component';

@NgModule({
  declarations: [StepTwoComponent],

  imports: [
    CommonModule,
    HowRoutingModule,
    CoreModule,
    TranslateModule,
    BtnModule,
  ],
  providers: [TuPlusSerivceFacade, HomeModel],
  entryComponents: [],
})
export class StepTwoModule {}

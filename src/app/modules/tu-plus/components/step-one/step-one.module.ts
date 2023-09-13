import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { DetailProductModel } from '@app/modules/detail-product/detail-product.model';
import { HomeModel } from '@app/modules/home/home.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { HistoricTransactionModule } from '@app/shared/historic-transaction/historic-transaction.module';
import { HistoricModule } from '@app/shared/historic/historic.module';
import { TableModule } from '@app/shared/table/table.module';
import { HomePointsComponent } from '../../shared/home-points/home-points.component';
import { TuPlusSerivceFacade } from '../../tu-plus.facade';

import { StepOneRoutingModule } from './step-one-routing.module';
import { StepOneComponent } from './step-one.component';

@NgModule({
  declarations: [StepOneComponent, HomePointsComponent],
  imports: [
    CommonModule,
    StepOneRoutingModule,
    CoreModule,
    BtnModule,
    FormsModule,
    ReactiveFormsModule,
    HistoricTransactionModule,
    HistoricModule,
    TableModule,
  ],

  providers: [TuPlusSerivceFacade, DetailProductModel, HomeModel],
  entryComponents: [],
})
export class StepOneModule {}

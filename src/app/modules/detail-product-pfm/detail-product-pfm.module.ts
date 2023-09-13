import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from './../../core/core.module';
import { DsDropdownSelectModule } from './../../shared/ds/ds-dropdown-select/ds-dropdown-select.module';

import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DsLoadingModule } from '@app/shared/ds/ds-loading/ds-loading.module';
import { HomePFMComponent } from './components/home-pfm/home-pfm.component';
import { RecategorizationComponent } from './components/recategorization/recategorization.component';
import { DetailPfmContainer } from './detail-pfm.component';
import { DetailProductPfmRoutingModule } from './detail-product-pfm-routing.module';
import { DetailProductPFMModel } from './detail-product-pfm.model';
import { PfmProductDetailService } from './services/pfm-product-detail.service';
import {
  PfmCreditCardsEffects,
  PfmExpensesEffects,
  PfmItemsEffects,
  PfmMovimentsEffects,
  PfmRecategorizeEffects,
  ProductDetailPfmEffects,
} from './store';

@NgModule({
  declarations: [
    DetailPfmContainer,
    HomePFMComponent,
    RecategorizationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    DetailProductPfmRoutingModule,
    TranslateModule,
    TemplateSystemModule,
    DsDropdownSelectModule,
    DsLoadingModule,
    BtnModule,
    EffectsModule.forFeature([
      PfmExpensesEffects,
      ProductDetailPfmEffects,
      PfmCreditCardsEffects,
      PfmRecategorizeEffects,
      PfmMovimentsEffects,
      PfmItemsEffects,
    ]),
  ],
  providers: [
    ApplicationModel,
    DetailProductPFMModel,
    ManipulateDomService,
    PfmProductDetailService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailProductPfmModule {}

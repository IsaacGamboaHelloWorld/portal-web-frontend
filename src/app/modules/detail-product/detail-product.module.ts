import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WnocotherMoldel } from '@app/modules/wnocother/wnocother.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ObfuscateNumberModule } from '@app/shared/obfuscate-number/obfuscate-number.module';
import { CoreModule } from '@core/core.module';
import { CurrencyFormatPipe } from '@core/pipes/currency-format/currency-format.pipe';
import { DetailProductContainer } from '@modules/detail-product/detail-product.container';
import { ProductDetailRoutingModule } from '@modules/detail-product/product-detail-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CalendarModule } from 'primeng/calendar';
import { TemplateSystemModule } from '../../shared/template-system/template-system.module';
import { DetailProductPFMModel } from '../detail-product-pfm/detail-product-pfm.model';
import { PfmProductDetailService } from '../detail-product-pfm/services/pfm-product-detail.service';
import { ProductDetailPfmEffects } from '../detail-product-pfm/store/effects/product-detail-pfm.effects';
import { HomeModel } from '../home/home.model';
import { CardPfmComponent } from './components/card-pfm/card-pfm.component';
import { CertificatesContainer } from './components/certificates/certificates.component';
import { CertificateModel } from './components/certificates/certificates.model';
import { CertificatesEffect } from './components/certificates/effects/certificates.effect';
import { CertificatesService } from './components/certificates/services/certificates.service';
import { DetailLoadingComponent } from './components/detail-loading/detail-loading.component';
import { FilterDateComponent } from './components/filter-date/filter-date.component';
import { MovementsLoadingComponent } from './components/movements-loading/movements-loading.component';
import { CdtMovementComponent } from './components/movements/components/cdt-movement/cdt-movement.component';
import { CreditCardMovementComponent } from './components/movements/components/credit-card-movement/credit-card-movement.component';
import { CurrentMovementComponent } from './components/movements/components/current-movement/current-movement.component';
import { DepositMovementComponent } from './components/movements/components/deposit-movement/deposit-movement.component';
import { MovementsComponent } from './components/movements/movements.component';
import { OrderOfPaymentDetailComponent } from './components/order-of-payment-detail/order-of-payment-detail.component';
import { CardDetailFreeDestinationComponent } from './components/smart-card-free-destiny/components/card-detail-free-destination/card-detail-free-destination.component';
import { HeaderCardFreeDestinyComponent } from './components/smart-card-free-destiny/components/header-card-free-destiny/header-card-free-destiny.component';
import { SmartCardFreeDestinyComponent } from './components/smart-card-free-destiny/smart-card-free-destiny.component';
import { HeaderCardComponent } from './components/smart-card/components/header-card/header-card.component';
import { MainBalancesComponent } from './components/smart-card/components/main-balances/main-balances.component';
import { SecondaryBalancesComponent } from './components/smart-card/components/secondary-balances/secondary-balances.component';
import { SmartCardComponent } from './components/smart-card/smart-card.component';
import { SmartMovementsComponent } from './components/smart-movements/smart-movements.component';
import { SmartOptionsComponent } from './components/smart-options/smart-options.component';
import { StatementEffect } from './components/statements/effects/statements.effect';
import { StatementsService } from './components/statements/services/statements.service';
import { StatementsContainer } from './components/statements/statements.component';
import { StatementModel } from './components/statements/statements.model';
import { DetailProductModel } from './detail-product.model';
import { MovementEffect } from './effects/movement.effect';
import { NicknamesEffect } from './effects/nicknames.effect';
import { PocketsEffect } from './effects/pockets.effect';
import { CcMovementPipe } from './pipes/search-text-credit-card-movement/cc-movement.pipe';
import { SearchTextMovementPipe } from './pipes/search-text-movement/search-text-movement.pipe';
import { StatusProductPipe } from './pipes/status-product/status-product.pipe';
import { MovementsService } from './services/movements/movements.service';
import { PocketsService } from './services/pockets/pockets.service';
import { DetailProductReducers } from './store/reducer/index';
import {
  DetailProductFeatureName,
  FEATURE_DETAIL_PRODUCT_REDUCER,
} from './store/state/detail-product.state';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    ProductDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    TemplateSystemModule,
    CurrencyModule.forRoot('es-US'),
    EffectsModule.forFeature([
      MovementEffect,
      PocketsEffect,
      StatementEffect,
      CertificatesEffect,
      NicknamesEffect,
      ProductDetailPfmEffects,
    ]),
    ModalModule,
    BtnModule,
    StoreModule.forFeature(
      DetailProductFeatureName,
      FEATURE_DETAIL_PRODUCT_REDUCER,
    ),
    ObfuscateNumberModule,
  ],
  declarations: [
    DetailProductContainer,
    MovementsComponent,
    DepositMovementComponent,
    CurrentMovementComponent,
    CreditCardMovementComponent,
    CcMovementPipe,
    DetailLoadingComponent,
    MovementsLoadingComponent,
    CdtMovementComponent,
    StatementsContainer,
    FilterDateComponent,
    CertificatesContainer,
    SmartCardComponent,
    StatusProductPipe,
    MainBalancesComponent,
    SecondaryBalancesComponent,
    HeaderCardComponent,
    SmartOptionsComponent,
    SmartMovementsComponent,
    OrderOfPaymentDetailComponent,
    SmartCardFreeDestinyComponent,
    HeaderCardFreeDestinyComponent,
    CardDetailFreeDestinationComponent,
    CardPfmComponent,
  ],
  providers: [
    HomeModel,
    DetailProductModel,
    MovementsService,
    WnocotherMoldel,
    StatementsService,
    CurrencyFormatPipe,
    PocketsService,
    StatementModel,
    ModalService,
    CertificatesService,
    CertificateModel,
    DetailProductPFMModel,
    PfmProductDetailService,
    {
      provide: FEATURE_DETAIL_PRODUCT_REDUCER,
      useValue: DetailProductReducers,
    },
    SearchTextMovementPipe,
  ],
  entryComponents: [
    StatementsContainer,
    FilterDateComponent,
    CertificatesContainer,
  ],
})
export class DetailProductModule {}

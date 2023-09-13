import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { CreateDateModule } from '@app/shared/create-date/create-date.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { NewsModule } from '@app/shared/news/news.module';
import { ObfuscateNumberModule } from '@app/shared/obfuscate-number/obfuscate-number.module';
import { CoreModule } from '@core/core.module';
import { HomeRoutingModule } from '@modules/home/home-routing.module';
import { HomeContainer } from '@modules/home/home.container';
import { HomeModel } from '@modules/home/home.model';
import { OtherProductsService } from '@modules/home/services/other-products.service';
import { StocksService } from '@modules/home/services/stocks.service';
import { OtherProductsEffects } from '@modules/home/store/effects/otherProducts.effects';
import { StocksEffects } from '@modules/home/store/effects/stocks.effects';
import { HomeRootReducer } from '@modules/home/store/reducers';
import {
  HomeFeatureName,
  HomeModuleState,
} from '@modules/home/store/state/home-module.state';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CoexistenceService } from 'app/modules/home/services/coexistence.service';
import { DetailProductModel } from '../detail-product/detail-product.model';
import { NicknamesEffect } from '../detail-product/effects/nicknames.effect';
import { NicknamesService } from '../detail-product/services/nicknames/nicknames.service';
import { ButtonRedirectCdtComponent } from './components/button-redirect-cdt/button-redirect-cdt.component';
import { CoexistenceComponent } from './components/coexistence/coexistence.component';
import { ContToPlusComponent } from './components/cont-to-plus/cont-to-plus.component';
import { FreeDestinationContainerComponent } from './components/free-destination-container/free-destination-container.component';
import { ModalOtherProductsComponent } from './components/modal-other-products/modal-other-products.component';
import { ModalProductActionsComponent } from './components/modal-product-actions/modal-product-actions.component';
import { OrderOfPaymentComponent } from './components/order-of-payment/order-of-payment.component';
import { OtherProductsComponent } from './components/other-products/other-products.component';
import { ProductActionsComponent } from './components/product-actions/product-actions.component';
import { ProductCdtComponent } from './components/product-cdt/product-cdt.component';
import { ProductCreditCardComponent } from './components/product-credit-card/product-credit-card.component';
import { ProductCurrentAccountComponent } from './components/product-current-account/product-current-account.component';
import { ProductDefaultComponent } from './components/product-default/product-default.component';
import { ProductDepositAccountComponent } from './components/product-deposit-account/product-deposit-account.component';
import { ProductErrorComponent } from './components/product-error/product-error.component';
import { ProductFreeDestinationComponent } from './components/product-free-destination/product-free-destination.component';
import { ProductLoadingErrorComponent } from './components/product-loading-error/product-loading-error.component';
import { ProductLoadingComponent } from './components/product-loading/product-loading.component';
import { ProductOfferComponent } from './components/product-offer/product-offer.component';
import { ProductToPlusComponent } from './components/product-to-plus/product-to-plus.component';
import { ProductsComponent } from './components/products/products.component';
import { ContSliderFinanceComponent } from './components/total-finance/cont-slider-finance/cont-slider-finance.component';
import { SliderFinanceComponent } from './components/total-finance/slider-finance/slider-finance.component';
import { TotalFinanceComponent } from './components/total-finance/total-finance.component';
import { OrderProductsPipe } from './pipes/order-products.pipe';
import { AdvertisingService } from './services/advertising.service';
import { OrderOfPaymentEffects } from './store/effects/order-of-payment.effects';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<HomeModuleState>
>('Feature Home Reducers');

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    CheckboxSlideModule,
    StoreModule.forFeature(HomeFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([
      OtherProductsEffects,
      StocksEffects,
      OrderOfPaymentEffects,
      NicknamesEffect,
    ]),
    ModalModule,
    BtnModule,
    ReactiveFormsModule,
    CreateDateModule,
    NewsModule,
    ObfuscateNumberModule,
  ],
  declarations: [
    HomeContainer,
    TotalFinanceComponent,
    ProductsComponent,
    ProductDepositAccountComponent,
    ProductOfferComponent,
    ProductCreditCardComponent,
    ProductCdtComponent,
    ProductCurrentAccountComponent,
    ProductLoadingComponent,
    ProductErrorComponent,
    OrderProductsPipe,
    ContSliderFinanceComponent,
    SliderFinanceComponent,
    CoexistenceComponent,
    ProductLoadingErrorComponent,
    OtherProductsComponent,
    ProductDefaultComponent,
    ModalOtherProductsComponent,
    ProductToPlusComponent,
    ContToPlusComponent,
    ProductActionsComponent,
    ModalProductActionsComponent,
    OrderOfPaymentComponent,
    ButtonRedirectCdtComponent,
    ProductFreeDestinationComponent,
    FreeDestinationContainerComponent,
  ],
  providers: [
    HomeModel,
    DetailProductModel,
    CoexistenceService,
    OtherProductsService,
    AdvertisingService,
    ModalService,
    StocksService,
    NicknamesService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: HomeRootReducer,
    },
  ],
  entryComponents: [ModalOtherProductsComponent, ModalProductActionsComponent],
})
export class HomeModule {}

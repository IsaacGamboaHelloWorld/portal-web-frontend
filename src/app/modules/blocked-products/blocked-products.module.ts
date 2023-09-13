import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockproductRoutingModule } from '@app/modules/blocked-products/blocked-products-routing.module';
import { BlockedProductsContainer } from '@app/modules/blocked-products/blocked-products.container';
import { BlockedProductsModel } from '@app/modules/blocked-products/store/model/blocked-products.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsCreditCardModule } from '@app/shared/ds/ds-credit-card/ds-credit-card.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { CoreModule } from '@core/core.module';
import { BlockProductService } from '@modules/blocked-products/services/block-products.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from '../../shared/modal/modal.module';
import { AccountBaseComponent } from './components/account-base/account-base.component';
import { AccountsListBlockedComponent } from './components/accounts-list-blocked/accounts-list-blocked.component';
import { CardBaseComponent } from './components/card-base/card-base.component';
import { CardsListBlockedComponent } from './components/cards-list-blocked/cards-list-blocked.component';
import { HomeBlockedComponent } from './components/home-blocked/home-blocked.component';
import { PopupAccountLockConfirmationComponent } from './components/popup-account-lock-confirmation/popup-account-lock-confirmation.component';
import { PopupCardLockConfirmationComponent } from './components/popup-card-lock-confirmation/popup-card-lock-confirmation.component';
import { PopupInfoBlockedComponent } from './components/popup-info-blocked/popup-info-blocked.component';
import { DebitCardListService } from './services/debit-card-list.service';
import { BlockProductsEffects } from './store/effects/block-prods.effects';
import { DebitCardListEffects } from './store/effects/debit-card-list.effects';
import { BlockProductsReducers } from './store/reducers';
import {
  BlockProductFeatureName,
  FEATURE_BLOCK_PRODUCT_REDUCER,
} from './store/state/block-product.state';

@NgModule({
  declarations: [
    BlockedProductsContainer,
    CardBaseComponent,
    HomeBlockedComponent,
    CardsListBlockedComponent,
    PopupCardLockConfirmationComponent,
    PopupAccountLockConfirmationComponent,
    PopupInfoBlockedComponent,
    AccountBaseComponent,
    AccountsListBlockedComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    BtnModule,
    ReactiveFormsModule,
    BlockproductRoutingModule,
    LineTimeModule,
    TicketModule,
    DsModalModule,
    CurrencyModule.forRoot('es-US'),
    TemplateSystemModule,
    StoreModule.forFeature(
      BlockProductFeatureName,
      FEATURE_BLOCK_PRODUCT_REDUCER,
    ),
    EffectsModule.forFeature([BlockProductsEffects, DebitCardListEffects]),
    ModalModule,
    DsCreditCardModule,
  ],
  providers: [
    BlockedProductsModel,
    ModalService,
    BlockProductService,
    DebitCardListService,
    {
      provide: FEATURE_BLOCK_PRODUCT_REDUCER,
      useValue: BlockProductsReducers,
    },
  ],
  entryComponents: [
    PopupCardLockConfirmationComponent,
    PopupInfoBlockedComponent,
    PopupAccountLockConfirmationComponent,
  ],
})
export class BlockedproductsModule {}

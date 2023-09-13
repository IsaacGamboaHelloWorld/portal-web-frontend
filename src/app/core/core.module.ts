import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BtnModule } from '@app/shared/btn/btn.module';

import { GlobalFooterComponent } from '@core/components/global-footer/global-footer.component';
import { CurrencyFormatPipe } from '@core/pipes/currency-format/currency-format.pipe';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SearchTextMovementPipe } from '@modules/detail-product/pipes/search-text-movement/search-text-movement.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { BlockCopyPasteDirective } from './directives/block-copy-paste.directive';
import { OnlyNumbersDirective } from './directives/only-numbers.directive';
import { RemoveDiacriticsDirective } from './directives/remove-diacritics.directive';
import { CardFranchiseTypePipe } from './pipes/card-franchise-type/card-franchise-type.pipe';
import { CardTypeclassPipe } from './pipes/card-type-class/card-type-class.pipe';
import { CardTypeProductPipe } from './pipes/card-type-product/card-type-product.pipe';
import { CreditCardHiddenPipe } from './pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from './pipes/credit-card-mask/credit-card-mask.pipe';
import { FileCdnPipe } from './pipes/file-cdn/file-cdn.pipe';
import { ImageCdnPipe } from './pipes/image-cdn/image-cdn.pipe';
import { KeyFuncionalityAssetsPipe } from './pipes/key-funcionality-assets/key-funcionality-assets.pipe';
import { KeyFuncionalityPipe } from './pipes/key-funcionality/key-funcionality.pipe';
import { KeysPipe } from './pipes/keys/keys.pipe';
import { LoadAmountPipe } from './pipes/load-amount.pipe';
import { RemoveValuePipe } from './pipes/remove-value.pipe';
import { SanitizerurlsPipe } from './pipes/sanitizerurls/sanitizerurls.pipe';
import { TypeCreditCardPipe } from './pipes/type-credit-card/type-credit-card.pipe';
import { SplitFirstPipe } from './pipes/utils/split-first.pipe';
import { VariableValuePipe } from './pipes/variable-value/variable-value.pipe';

@NgModule({
  imports: [CommonModule, TranslateModule, BtnModule],
  exports: [
    TranslateModule,
    KeysPipe,
    TypeCreditCardPipe,
    SearchTextMovementPipe,
    SanitizerurlsPipe,
    ImageCdnPipe,
    CurrencyFormatPipe,
    RemoveValuePipe,
    CreditCardMaskPipe,
    CreditCardHiddenPipe,
    OnlyNumbersDirective,
    SplitFirstPipe,
    RemoveDiacriticsDirective,
    FileCdnPipe,
    GlobalFooterComponent,
    BlockCopyPasteDirective,
    CardTypeclassPipe,
    CardTypeProductPipe,
    CardFranchiseTypePipe,
    LoadAmountPipe,
    VariableValuePipe,
    KeyFuncionalityPipe,
    KeyFuncionalityAssetsPipe,
  ],
  declarations: [
    KeysPipe,
    TypeCreditCardPipe,
    SearchTextMovementPipe,
    SanitizerurlsPipe,
    ImageCdnPipe,
    CurrencyFormatPipe,
    RemoveValuePipe,
    CreditCardMaskPipe,
    CreditCardHiddenPipe,
    OnlyNumbersDirective,
    SplitFirstPipe,
    RemoveDiacriticsDirective,
    FileCdnPipe,
    GlobalFooterComponent,
    BlockCopyPasteDirective,
    CardTypeclassPipe,
    CardTypeProductPipe,
    CardFranchiseTypePipe,
    LoadAmountPipe,
    VariableValuePipe,
    KeyFuncionalityPipe,
    KeyFuncionalityAssetsPipe,
  ],
  providers: [ManipulateDomService],
})
export class CoreModule {}

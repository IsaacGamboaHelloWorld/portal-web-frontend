import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ContentFullConfigService } from '@app/shared/currency/contentFull-config.service';
import { CurrencyDirective } from '@app/shared/currency/currency.directive';

@NgModule({
  declarations: [CurrencyDirective],
  exports: [CurrencyDirective],
  imports: [CommonModule],
})
export class CurrencyModule {
  static forRoot(config: string = 'es-CO'): ModuleWithProviders {
    return {
      ngModule: CurrencyModule,
      providers: [
        {
          provide: ContentFullConfigService,
          useValue: config,
        },
      ],
    };
  }
}

import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { tap } from 'rxjs/operators';

import { environment } from '@environment';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    http,
    environment.resources.base_assets + '/assets/i18n/',
    '.json',
  );
}

export const translateConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [HttpClient],
  },
};

export function onAppInit(
  http: HttpClient,
  translate: TranslateService,
): () => Promise<any> {
  return (): Promise<any> => {
    return http
      .get(
        environment.resources.base_assets +
          '/assets/i18n/' +
          environment.languages.es +
          '.json',
      )
      .pipe(
        tap(() => {
          const defaultLang = environment.languages.es;
          translate.setDefaultLang(defaultLang);
        }),
      )
      .toPromise();
  };
}

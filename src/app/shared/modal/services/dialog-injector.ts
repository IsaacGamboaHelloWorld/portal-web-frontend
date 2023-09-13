import { InjectFlags, InjectionToken, Injector, Type } from '@angular/core';

export class DialogInjector implements Injector {
  constructor(
    private _parentInjector: Injector,
    private _additionalTokens: WeakMap<any, any>,
  ) {}

  /* tslint:disable */
  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags,
  ): T;
  get(token: any, notFoundValue?: any);
  get<T>(token: any, notFoundValue?: any, flags?: any): T {
    const value = this._additionalTokens.get(token);

    if (value) return value;

    return this._parentInjector.get<any>(token, notFoundValue);
  }
  /* tslint:enable */
}

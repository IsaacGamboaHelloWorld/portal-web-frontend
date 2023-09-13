import { isNullOrUndefined } from 'util';

import { eventDataLayer } from '@app/shared/helpers/eventDataLayer';

export function PageView(
  url: string = '',
  title: string = '',
  event: string = '',
): ClassDecorator {
  return (constructor: any): any => {
    const ngOnInit = constructor.prototype.ngOnInit;

    constructor.prototype.ngOnInit = function(...args: any): void {
      eventDataLayer(
        {
          pagePath: window.location.pathname + url,
          pageTitle: title,
        },
        event,
      );
      if (this.tealium) {
        this.tealium.view({
          tealium_event: 'view',
          pagePath: window.location.pathname + url,
        });
      }

      if (!isNullOrUndefined(ngOnInit)) {
        ngOnInit.apply(this, args);
      }
    };

    const ngOnDestroy = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function(...args: any): void {
      if (!isNullOrUndefined(ngOnDestroy)) {
        ngOnDestroy.apply(this, args);
      }
    };
  };
}

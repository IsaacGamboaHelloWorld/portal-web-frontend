import { environment } from '@environment';

export function eventDataLayer(data: object, event: string = 'link'): void {
  window['dataLayer'] = window['dataLayer'] || [];
  // const TEALIUM = window['utag'] || [];

  if (environment.trackEvents) {
    const TRACK = {
      ...data,
      event,
      pwa: matchMedia('(display-mode: standalone)').matches,
    };
    window['dataLayer'].push(TRACK);
  }
}

export function evenProducts(data: object): void {
  window['getDataMaxyProducts'] = new Promise((resolve) => {
    resolve(data);
  });
  // window['dataMaxymiserProduct'] = data;
}

export function clearProducts(): void {
  window['getDataMaxyProducts'] = undefined;
}

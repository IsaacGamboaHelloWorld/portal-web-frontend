import { Injectable } from '@angular/core';
@Injectable()
export class TealiumUtagService {
  public scriptSrc: string = '';

  // Typically set "noview" flag (no first page automatic view event) to true for Single Page Apps (SPAs)
  constructor() {
    (window as any).utag_cfg_ovrd = { noview: true };
    (window as any).utag_data = {};
  }

  // Generic script loader with callback
  public getScript(src: string, callback: () => void): void {
    const d = document;
    const fn = () => {};
    const o = { callback: callback || fn };
    let s: any;
    let t: any;

    if (typeof src === 'undefined') {
      return;
    }

    s = d.createElement('script');
    s.language = 'javascript';
    s.type = 'text/javascript';
    s.async = 1;
    s.charset = 'utf-8';
    s.src = src;
    if (typeof o.callback === 'function') {
      if (d.addEventListener) {
        s.addEventListener(
          'load',
          () => {
            o.callback();
          },
          false,
        );
      } else {
        // old IE support
        // tslint:disable-next-line: typedef
        s.onreadystatechange = function() {
          if (this.readyState === 'complete' || this.readyState === 'loaded') {
            this.onreadystatechange = null;
            o.callback();
          }
        };
      }
    }
    t = d.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }

  // Config settings used to build the path to the utag.js file
  setConfig(config: {
    account: string;
    profile: string;
    environment: string;
  }): void {
    if (
      config.account !== undefined &&
      config.profile !== undefined &&
      config.environment !== undefined
    ) {
      this.scriptSrc =
        'https://tags.tiqcdn.com/utag/' +
        config.account +
        '/' +
        config.profile +
        '/' +
        config.environment +
        '/utag.js';
    }
  }

  // Data layer is optional set of key/value pairs
  public track(tealiumEvent: string, data?: any): void {
    if (this.scriptSrc === '') {
      // tslint:disable-next-line: no-console
      console.log('Tealium config not set.');
      return;
    }
    if ((window as any).utag === undefined) {
      this.getScript(this.scriptSrc, () => {
        (window as any).utag.track(tealiumEvent, data);
      });
    } else {
      (window as any).utag.track(tealiumEvent, data);
    }
  }

  public view(data?: any): void {
    this.track('view', data);
  }

  public link(data?: any): void {
    this.track('link', data);
  }
}

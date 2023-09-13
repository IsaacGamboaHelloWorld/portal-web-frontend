import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { isNullOrUndefined } from 'util';
import * as SmoothScroll from '../../../../../node_modules/smooth-scroll/dist/smooth-scroll.polyfills.min.js';

@Injectable()
export class ManipulateDomService {
  constructor(@Inject(DOCUMENT) private document: any) {}

  public scrollTop(position: number = 0): void {
    this.document.body.scrollTop = this.document.documentElement.scrollTop = position;
  }

  public scrollContentTop(position: number = 0): void {
    const contentElement = document.querySelector('#dashboard-content');
    if (!!contentElement) {
      contentElement.scrollTop = position;
    } else {
      window.scrollTo(0, position);
    }
  }

  public addClass(el: string, className: string = ''): void {
    if (!isNullOrUndefined(el) && document.querySelector(el)) {
      document.querySelector(el).classList.add(className);
    }
  }

  public removeClass(el: string, className: string = ''): void {
    if (!isNullOrUndefined(el) && document.querySelector(el)) {
      document.querySelector(el).classList.remove(className);
    }
  }

  public removeMultipleClass(el: string, className: string = ''): void {
    const arrEl = document.querySelectorAll(el);
    if (!isNullOrUndefined(arrEl) && arrEl.length > 0) {
      arrEl.forEach((element) => {
        element.classList.remove(className);
      });
    }
  }

  public containsClass(el: string, className: string = ''): boolean {
    if (!isNullOrUndefined(el) && document.querySelector(el)) {
      return document.querySelector(el).classList.contains(className);
    }
    return false;
  }

  public scrollToDivById(id: string, addSpace: number = 0): void {
    const header = this.document.getElementById('header');
    const _id = this.document.getElementById(id);
    if (!isNullOrUndefined(header) && !isNullOrUndefined(_id)) {
      const scroll = new SmoothScroll();
      scroll.animateScroll(_id.offsetTop - (header.offsetHeight + addSpace));
    }
  }

  public isChrome(): boolean {
    return navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  }

  public isSafari(): boolean {
    return navigator.vendor.toLowerCase().indexOf('apple') > -1;
  }
}

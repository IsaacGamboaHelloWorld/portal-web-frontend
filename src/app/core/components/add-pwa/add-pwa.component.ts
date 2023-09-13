import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { eventDataLayer } from '@app/shared/helpers/eventDataLayer';
import { isNullOrUndefined } from 'util';

import { CLOSE_PWA } from '@core/constants/auth';
import { Events } from '@core/constants/events';
import { PwaService } from '@core/services/pwa/pwa.service';
import { EventsService } from '@core/services/tag_manager/events.service';

const EXPIRE_STORAGE = 5;

@Component({
  selector: 'app-add-pwa',
  templateUrl: './add-pwa.component.html',
  styleUrls: ['./add-pwa.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AddPwaComponent implements OnInit {
  public show: boolean;

  constructor(
    private pwaService: PwaService,
    private tag_manager: EventsService,
  ) {}

  ngOnInit(): void {
    this._initPwa();
    this.pwaService.eventInstallPwa();
  }

  get domain(): string {
    return window.location.origin;
  }

  public install(event?: object): void {
    const objEvent: object = {
      eventCategory: Events.pwa,
      eventAction: event['type'],
      eventLabel: event['srcElement']['id'],
    };
    this.createEvent(objEvent, Events.pwa);
    this.show = false;
    this.pwaService.installPwa();
  }
  public close(event?: object): void {
    const objEvent: object = {
      eventCategory: Events.desktop,
      eventAction: event['type'],
      eventLabel: event['srcElement']['id'],
    };
    this.createEvent(objEvent, Events.desktop);
    this.show = false;
    this.saveDays();
  }

  private createEvent(dataLayer?: object, event?: string): void {
    eventDataLayer(dataLayer, event);
  }

  private _initPwa(): void {
    const hasStorage = isNullOrUndefined(localStorage.getItem(CLOSE_PWA));

    setTimeout(() => {
      if (hasStorage) {
        this.show = true;
      } else {
        const days: number = parseInt(
          (new Date().getTime() - +atob(localStorage.getItem(CLOSE_PWA))) /
            (1000 * 60 * 60 * 24) +
            '',
          10,
        );
        this.show = days > EXPIRE_STORAGE;
      }
    }, 1000);
  }

  private saveDays(): void {
    localStorage.setItem(CLOSE_PWA, btoa(new Date().getTime().toString()));
  }
}

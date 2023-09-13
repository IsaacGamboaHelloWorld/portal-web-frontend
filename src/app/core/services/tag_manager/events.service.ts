import { Injectable } from '@angular/core';

import { eventDataLayer } from '@app/shared/helpers/eventDataLayer';

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  constructor() {}

  public event(data: object, event?: string): void {
    eventDataLayer(data, event);
  }
}

import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';

describe('EventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    window['dataLayer'] = [];

    const service: EventsService = TestBed.get(EventsService);

    service.event({});

    expect(service).toBeTruthy();
  });
});

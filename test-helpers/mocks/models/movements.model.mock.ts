import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Movement } from '@core/models/movement/movement';

@Injectable()
export class MovementsModelMock {
  public account$: BehaviorSubject<Movement> = new BehaviorSubject(null);
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public fetchMovement(): void {}
}

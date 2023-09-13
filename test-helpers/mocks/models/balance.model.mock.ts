import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BalanceModelMock {
  public balances$: BehaviorSubject<object> = new BehaviorSubject({});

  public fetchMovements(): void {}
}

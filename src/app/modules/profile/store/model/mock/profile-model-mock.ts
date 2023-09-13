import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ProfileModelMock {
  public loadCatalogs$: BehaviorSubject<object> = new BehaviorSubject({});

  public loadCatalogs(): void {}
}

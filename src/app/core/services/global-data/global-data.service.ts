import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  constructor() {}

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  get cancel(): Observable<boolean> {
    return this._destroy$.asObservable();
  }

  public cancelRequest(): void {
    this._destroy$.next(true);
  }
}

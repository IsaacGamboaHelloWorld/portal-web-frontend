import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StepService {
  private _stepObservable: Subject<number> = new Subject();

  private _step: number = 0;
  constructor() {}
  get stepObservable(): Observable<number> {
    return this._stepObservable;
  }

  get step(): number {
    return this._step;
  }

  public setStep(step: number): void {
    this._step = step;
    this._stepObservable.next(this._step);
  }
}

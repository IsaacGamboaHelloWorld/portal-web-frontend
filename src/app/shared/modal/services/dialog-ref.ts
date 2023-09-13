import { Observable, Subject } from 'rxjs';

export class DialogRef {
  constructor() {}

  public close(result?: any): void {
    this._afterClosed.next(result);
  }

  /* tslint:disable */
  private readonly _afterClosed = new Subject<any>();
  public afterClosed: Observable<any> = this._afterClosed.asObservable();
  /* tslint:enable */
}

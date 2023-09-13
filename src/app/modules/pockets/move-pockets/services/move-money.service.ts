import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IMovePocketResp } from '../entities/move-pockets';

@Injectable()
export class MoveMoneyPocketService {
  constructor(private http: HttpClient) {}

  public moveMoneyPocket(_data: any): Observable<IMovePocketResp> {
    return this.http.post<IMovePocketResp>(
      environment.api.base + environment.api.services.pockets.move,
      _data,
    );
  }
}

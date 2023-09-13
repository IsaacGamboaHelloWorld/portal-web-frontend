import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  IDeletePocketRequest,
  IDeletePocketResponse,
  IEditPocketRequest,
  IEditPocketResponse,
} from '../entities/edit-pocket';

@Injectable()
export class EditPocketService {
  constructor(private http: HttpClient) {}

  public editPocket(
    _data: IEditPocketRequest,
  ): Observable<IEditPocketResponse> {
    return this.http.post<IEditPocketResponse>(
      environment.api.base + environment.api.services.pockets.update,
      _data,
    );
  }

  public deletePocket(
    _data: IDeletePocketRequest,
  ): Observable<IDeletePocketResponse> {
    return this.http.post<IDeletePocketResponse>(
      environment.api.base + environment.api.services.pockets.delete,
      _data,
    );
  }
}

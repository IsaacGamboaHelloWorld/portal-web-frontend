import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { combineLatest, Observable } from 'rxjs';
import {
  IAnswerNicknamesCreate,
  IAnswerNicknamesDelete,
  IAnswerNicknamesUpdate,
  ISendNicknames,
} from '../../entities/nicknames';

@Injectable({
  providedIn: 'root',
})
export class NicknamesService {
  constructor(private http: HttpClient) {}

  public nicknamesAll(): Observable<any> {
    const payload = {};

    return this.http.post<any>(
      environment.api.base + environment.api.services.nicknames.all,
      payload,
    );
  }

  public nicknamesCreate(
    nick: ISendNicknames,
  ): Observable<IAnswerNicknamesCreate> {
    const payload = nick;

    return this.http.post<IAnswerNicknamesCreate>(
      environment.api.base + environment.api.services.nicknames.create,
      payload,
    );
  }

  public nicknamesDelete(
    nick: ISendNicknames,
  ): Observable<IAnswerNicknamesDelete> {
    const payload = nick;

    return this.http.post<IAnswerNicknamesDelete>(
      environment.api.base + environment.api.services.nicknames.delete,
      payload,
    );
  }

  public nicknamesUpdate(
    nick: ISendNicknames,
  ): Observable<IAnswerNicknamesUpdate> {
    const payload = nick;
    return this.http.post<IAnswerNicknamesUpdate>(
      environment.api.base + environment.api.services.nicknames.update,
      payload,
    );
  }
}

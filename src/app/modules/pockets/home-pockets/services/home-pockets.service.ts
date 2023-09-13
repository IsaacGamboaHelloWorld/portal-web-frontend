import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IRespondHomePockets } from '@modules/pockets/home-pockets/entities/home-pockets';
import { environment } from 'environments/environment';
import { BANKS } from '../../../../core/constants/banks';
import {
  IHomePocketAccount,
  IPocketToSearch,
  IPrefsLoadResponse,
  IPrefsRequest,
  IPrefsResponse,
} from '../entities/home-pockets';

@Injectable()
export class HomePocketsService {
  constructor(private http: HttpClient) {}

  public homePockets(): Observable<IRespondHomePockets> {
    const USER_POCKETS_REQUEST = {
      companyId: BANKS.BANCO_POPULAR,
    };

    return this.http.post<IRespondHomePockets>(
      environment.api.base + environment.api.services.pockets.home,
      USER_POCKETS_REQUEST,
    );
  }

  public detailPocket(data: IPocketToSearch): Observable<IHomePocketAccount> {
    return this.http.post<IHomePocketAccount>(
      environment.api.base + environment.api.services.pockets.detail,
      data,
    );
  }

  public savePrefs(data: IPrefsRequest): Observable<IPrefsResponse> {
    const saveData = {
      preferences: data,
    };
    return this.http.post<IPrefsResponse>(
      environment.api.base + environment.api.services.preferences.save,
      saveData,
    );
  }

  public LoadPrefs(): Observable<IPrefsLoadResponse> {
    const data = {};
    return this.http.post<IPrefsLoadResponse>(
      environment.api.base + environment.api.services.preferences.all,
      data,
    );
  }
}

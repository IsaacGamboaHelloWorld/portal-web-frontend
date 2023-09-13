import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  ILimitManagementCreateRequest,
  ILimitManagementCreateResponse,
  ILimitManagementDeleteRequest,
  ILimitManagementDeleteResponse,
  ILimitManagementGetRequest,
  ILimitManagementGetResponse,
  ILimitManagementUpdateRequest,
  ILimitManagementUpdateResponse,
} from '../entities';

@Injectable()
export class LimitManagementService {
  constructor(private http: HttpClient) {}

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2851307562/Administration+Limits+API+Create+Limits
  public create(
    body: ILimitManagementCreateRequest,
  ): Observable<ILimitManagementCreateResponse> {
    return this.http.post<ILimitManagementCreateResponse>(
      environment.api.base + environment.api.services.limitManagement.create,
      body,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2851307577/Administration+Limits+API+Get+Limits
  public get(
    body: ILimitManagementGetRequest,
  ): Observable<ILimitManagementGetResponse> {
    return this.http.post<ILimitManagementGetResponse>(
      environment.api.base + environment.api.services.limitManagement.get,
      body,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2851307592/Administration+Limits+API+Update+Limits
  public update(
    body: ILimitManagementUpdateRequest,
  ): Observable<ILimitManagementUpdateResponse> {
    return this.http.post<ILimitManagementUpdateResponse>(
      environment.api.base + environment.api.services.limitManagement.update,
      body,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2851307607/Administration+Limits+API+Delete+Limits
  public delete(
    body: ILimitManagementDeleteRequest,
  ): Observable<ILimitManagementDeleteResponse> {
    return this.http.post<ILimitManagementDeleteResponse>(
      environment.api.base + environment.api.services.limitManagement.delete,
      body,
    );
  }
}

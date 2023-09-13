import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  ICreateUserAlertRequest,
  ICreateUserAlertResponse,
  ISearchUserAlertsResponse,
} from '../entities/alerts';
import { ICreateAlertRequest, ICreateAlertResponse } from '../entities/create';
import { IGroupsAlertRequest, IGroupsAlertResponse } from '../entities/groups';
import {
  IGroupsTypeAlertRequest,
  IGroupsTypeAlertResponse,
} from '../entities/groups-type';
import {
  IInactiveAlertRequest,
  IInactiveAlertResponse,
} from '../entities/inactive';
import { ITargetAlertRequest, ITargetAlertResponse } from '../entities/target';
import {
  ITransactionAlertRequest,
  ITransactionAlertResponse,
} from '../entities/transaction';
import { IUserAlertRequest, IUserAlertResponse } from '../entities/user';

@Injectable()
export class AlertsService {
  constructor(private http: HttpClient) {}

  public searchAlerts(): Observable<ISearchUserAlertsResponse> {
    const _data = {};

    return this.http.post<ISearchUserAlertsResponse>(
      environment.api.base + environment.api.services.alerts.search_v1,
      _data,
    );
  }

  public createAlerts(
    _data: ICreateUserAlertRequest,
  ): Observable<ICreateUserAlertResponse> {
    return this.http.post<ICreateUserAlertResponse>(
      environment.api.base + environment.api.services.alerts.create_v1,
      _data,
    );
  }
  public createAlert(
    _data: ICreateAlertRequest,
  ): Observable<ICreateAlertResponse> {
    return this.http.post<ICreateAlertResponse>(
      environment.api.base + environment.api.services.alerts.create,
      _data,
    );
  }

  public groupsAlert(
    _data: IGroupsAlertRequest,
  ): Observable<IGroupsAlertResponse> {
    return this.http.post<IGroupsAlertResponse>(
      environment.api.base + environment.api.services.alerts.groups,
      _data,
    );
  }

  public groupsTypeAlert(
    _data: IGroupsTypeAlertRequest,
  ): Observable<IGroupsTypeAlertResponse> {
    return this.http.post<IGroupsTypeAlertResponse>(
      environment.api.base + environment.api.services.alerts.groups_type,
      _data,
    );
  }

  public inactiveAlert(
    _data: IInactiveAlertRequest,
  ): Observable<IInactiveAlertResponse> {
    return this.http.post<IInactiveAlertResponse>(
      environment.api.base + environment.api.services.alerts.inactive,
      _data,
    );
  }

  public targetAlert(
    _data: ITargetAlertRequest,
  ): Observable<ITargetAlertResponse> {
    return this.http.post<ITargetAlertResponse>(
      environment.api.base + environment.api.services.alerts.target,
      _data,
    );
  }

  public transactionAlert(
    _data: ITransactionAlertRequest,
  ): Observable<ITransactionAlertResponse> {
    return this.http.post<ITransactionAlertResponse>(
      environment.api.base + environment.api.services.alerts.transaction,
      _data,
    );
  }

  public userAlert(_data: IUserAlertRequest): Observable<IUserAlertResponse> {
    return this.http.post<IUserAlertResponse>(
      environment.api.base + environment.api.services.alerts.user,
      _data,
    );
  }

  public allRegisteredFinancialOp(): Observable<any> {
    const data = {};
    return this.http.post<any>(
      environment.api.base + environment.api.services.financial_op.registered,
      data,
    );
  }

  public allRegisteredPublicServices(): Observable<any> {
    const data = {};
    return this.http.post<any>(
      environment.api.base + environment.api.services.bills.allRegistered,
      data,
    );
  }

  public getInfoUser(): Observable<any> {
    const data = {};
    return this.http.post<any>(
      environment.api.base + environment.api.services.infoUser,
      data,
    );
  }
}

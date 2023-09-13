import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { IAlertObj } from '../../entities/alerts';
import { IGroupsTypeAlertResponse } from '../../entities/groups-type';
import { IUserAlertResponse } from '../../entities/user';
import { AlertsModel } from '../../store/model/alerts.model';
import { IHomeAlerts } from '../../store/reducers/get-alerts.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public alertsData: object;
  public sectionsData: object;
  public alertsArray: object[] = [];
  public id: number;

  constructor(private _facade: AlertsModel, private _router: Router) {}

  ngOnInit(): void {
    this._facade.setStep({ step: 2 });
    this._initDashboard();
    this._facade.fetchUserAlert({});
    this.defaultAlertsUser();
  }

  get hasAlertUser$(): Observable<boolean> {
    if (this._facade.userAlert$) {
      return this._facade.userAlert$.pipe(
        map((info) => !isNullOrUndefined(info.data) && info.data.length > 0),
      );
    }
  }

  get infoUserAlerts$(): Observable<IUserAlertResponse> {
    return this._facade.userAlert$;
  }

  get infoAlertsGroupType$(): Observable<IGroupsTypeAlertResponse> {
    return this._facade.groupTypeAlert$;
  }

  private _initDashboard(): void {
    this._facade.fetchAllAlerts();

    this._facade.allAlerts$.subscribe((data) => {
      if (!!data && !!data.alerts) {
        this.alertsData = this._createAlerts(data.alerts, 'accountId');
      }
    });
  }

  private _createAlerts(_data: IAlertObj[], _key: string): object {
    return _data.reduce((acc, obj) => {
      const key = obj['product'][_key];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, []);
  }

  public create(): void {
    this._router.navigate([this.navigate.alerts_create]);
  }

  public defaultAlertsUser(): void {
    if (this.infoUserAlerts$) {
      this.infoUserAlerts$.subscribe((aler: IUserAlertResponse) => {
        this.alertsArray = [];
        this.alertsArray = aler.data;
        if (this.id) {
          this.alertsArray = aler.data.filter(
            (e) => e['alertGroupKey'] === String(this.id),
          );
        }
      });
    }
  }

  public typeEvent(event: number): void {
    switch (event) {
      case 1:
        this.id = null;
        this._facade.fetchUserAlert({});
        break;
      case 2:
        // 17
        this.id = 17;
        this._facade.fetchGroupsType({ alertGroupKey: 17 });
        break;
      case 3:
        // 20
        this.id = 20;
        this._facade.fetchGroupsType({ alertGroupKey: 20 });
        break;
      case 4:
        // 18
        this.id = 18;
        this._facade.fetchGroupsType({ alertGroupKey: 18 });
        break;
      default:
        this.id = null;
        this._facade.fetchUserAlert({});
        break;
    }
    this.defaultAlertsUser();
  }

  get alerts$(): Observable<IHomeAlerts> {
    return this._facade.allAlerts$;
  }

  get navigate(): INavigate {
    return Navigate;
  }
}

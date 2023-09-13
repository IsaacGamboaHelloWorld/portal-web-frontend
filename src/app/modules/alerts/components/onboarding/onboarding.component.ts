import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { UserSecureDataMdmState } from '@app/store/reducers/global/user/user-get-secure-data-mdm.reducer';
import { UserInfoState } from '@app/store/reducers/global/user/user.reducer';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { AlertsModel } from '../../store/model/alerts.model';
import { IHomeAlerts } from '../../store/reducers/get-alerts.reducer';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class OnboardingComponent implements OnInit, OnDestroy {
  public showDashboard: boolean = true; // false
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public listPoints: object[] = [];
  public titleStep: string = 'ALERTS.ONBOARDING.STEP1.TITLE';
  public textStep: string = 'ALERTS.ONBOARDING.STEP1.DESC';
  public imgStep: string = '/idea-2.png';
  public count: number = 0;
  public stepCheck: HTMLCollection;
  @ViewChild('step', null) step: ElementRef;
  constructor(
    private _router: Router,
    private _model: AlertsModel,
    private model: ApplicationModel,
    private render: Renderer2,
  ) {}

  ngOnInit(): void {
    this._model.fetchAllAlerts();
    this._model.setStep({ step: 1 });
    this._model.allAlerts$.pipe(takeUntil(this._destroy$)).subscribe((data) => {
      this.listPoints = [];
      this.listPoints = [
        ...this.listPoints,
        { id: '1', checked: true, value: 0 },
        { id: '2', checked: false, value: 1 },
        { id: '3', checked: false, value: 2 },
      ];
      setTimeout(() => {
        this.stepCheck = document.getElementsByClassName('page-point');
        if (this.stepCheck.length) {
          this.stepCheck.item(this.count)['checked'] = true;
        }
      }, 1000);
      if (!!data && !!data.alerts) {
        if (data.alerts.length > 0) {
          this._router.navigate([this.navigate.alerts_home]);
        } else {
          this.showDashboard = true;
        }
      }
    });
  }

  public toggle(event: string): void {
    this.render.removeClass(this.step.nativeElement, 'fade-in-right');
    this.render.removeClass(this.step.nativeElement, 'fade-in-left');
    switch (event) {
      case 'prev':
        this.count--;
        this.render.addClass(this.step.nativeElement, 'fade-in-left');
        break;
      case 'next':
        this.count++;
        this.render.addClass(this.step.nativeElement, 'fade-in-right');
        break;
    }
    this.count =
      this.count < 0
        ? 0
        : this.count >= this.stepCheck.length
        ? this.stepCheck.length - 1
        : this.count;
    this.stepCheck.item(this.count)['checked'] = true;
    switch (this.stepCheck.item(this.count)['value']) {
      case '0':
        this.imgStep = '/idea-2.png';
        this.titleStep = 'ALERTS.ONBOARDING.STEP1.TITLE';
        this.textStep = 'ALERTS.ONBOARDING.STEP1.DESC';
        break;
      case '1':
        this.imgStep = '/processing.png';
        this.titleStep = 'ALERTS.ONBOARDING.STEP2.TITLE';
        this.textStep = 'ALERTS.ONBOARDING.STEP2.DESC';
        break;
      case '2':
        this.imgStep = '/devices.png';
        this.titleStep = 'ALERTS.ONBOARDING.STEP3.TITLE';
        this.textStep = 'ALERTS.ONBOARDING.STEP3.DESC';
        break;
      default:
        this.count = 0;
        break;
    }
  }

  public closeOnboardingAlert(): void {
    this._router.navigate([Navigate.alerts_create]);
  }
  public skip(): void {
    this._router.navigate([Navigate.alerts_home]);
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get alerts$(): Observable<IHomeAlerts> {
    return this._model.allAlerts$;
  }

  get basicData$(): Observable<UserInfoState> {
    return this._model.basicData$;
  }

  get name$(): Observable<string> {
    return this.model.userInfo$.pipe(
      map((userState) =>
        this.hasName(userState)
          ? userState.data.PartyAssociation[0].PersonInfo.PersonName[0]
              .FirstName +
            ' ' +
            userState.data.PartyAssociation[0].PersonInfo.PersonName[0].LastName
          : '',
      ),
    );
  }
  get hasName$(): Observable<boolean> {
    return this.model.userInfo$.pipe(
      map((userState) => this.hasName(userState)),
    );
  }

  hasName(userState: UserSecureDataMdmState): boolean {
    return (
      !!userState &&
      !!userState.data &&
      userState.data.success &&
      !!userState.data.PartyAssociation &&
      !!userState.data.PartyAssociation[0] &&
      !!userState.data.PartyAssociation[0].PersonInfo &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0] &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0].FirstName &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0].LastName
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}

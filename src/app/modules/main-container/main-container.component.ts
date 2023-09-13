import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { TIME_SYMMETRIC, TIMEOUT } from '@app/core/constants/auth';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import {
  INTERVAL_TIME_SESSION,
  TIME_SYMMETRIC_SESSION,
} from '@core/constants/global';
import { environment } from '@environment';
import { MainContainerModel } from '@modules/main-container/main-container.model';
import { TranslateService } from '@ngx-translate/core';
import * as DeviceDetector from 'device-detector-js';
import { AuthService } from '../auth/services/auth.service';
import { SecurityService } from '../security/services/security.service';
import { ITransactionsByCard } from '../unusual-operations/entities/unusual-query-response.interface';
import { IUnusualOpQuery } from '../unusual-operations/store/state/unsual-operations.state';
@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class MainContainerComponent implements OnInit, OnDestroy {
  public endTime: number = 1;
  public finalTime: number = 180;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  private timerSubscription: Subscription;
  private stopListening: any;

  constructor(
    private oAuth: AuthService,
    private securityService: SecurityService,
    private model: MainContainerModel,
    private router: Router,
    private renderer: Renderer2,
    private modalService: ModalService,
    private translate: TranslateService,
  ) {
    this.stopListening = renderer.listen(
      'window',
      'message',
      this.handleMessage.bind(this),
    );
  }

  /**
   * This is use for Analytics Campaigns
   * this receive events for redirect to module
   */
  handleMessage(event: Event): void {
    const message = event as MessageEvent;

    if (message.origin !== environment.analyticalDomain) {
      return;
    }

    const data = message.data;

    if (typeof data === 'string' && data.includes('eventFromCard')) {
      const dataArray = data.split('::');
      if (dataArray.length > 1) {
        const obj = JSON.parse(dataArray[1]);
        const { url, queryParams } = obj;
        !!queryParams
          ? this.router.navigate([url], { queryParams })
          : this.router.navigate([url]);
      }
    }
  }

  @HostListener('document:keyup')
  @HostListener('document:click')
  @HostListener('document:wheel')
  resetTimerInt(): void {
    if (environment.production) {
      this.oAuth.notifyUserAction();
    }
  }

  @HostListener('window:unload')
  unloadHandler(): void {
    if (environment.production) {
      this.oAuth.notifyUserAction();
    }
  }

  @HostListener('window:beforeunload')
  beforeUnloadHander(): void {
    if (environment.production) {
      this.oAuth.notifyUserAction();
    }
  }

  public deviceFunction(): void {
    const deviceDetector = new DeviceDetector();
    const userAgent = window.navigator.userAgent;
    const device = deviceDetector.parse(userAgent);
  }

  ngOnInit(): void {
    this._sessionSymmetric();
    this.model.ValidateSession();
    this.model.ValidatePing();
    this.model.optionModuleLoad();
    this._loadInitData();
    this._subsUnusualOperationsQuery();

    this.resetTimer();
    this.oAuth.userActionOccured
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        if (this.timerSubscription) {
          this.timerSubscription.unsubscribe();
        }
        this.resetTimer();
      });
  }

  ngOnDestroy(): void {
    this.stopListening();
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public resetTimer(endTime: number = this.endTime): void {
    const timeInterval = 1000;
    const duration = endTime * this.finalTime;
    this.timerSubscription = timer(0, timeInterval)
      .pipe(takeUntil(this._destroy$), take(duration + 1))
      .subscribe((value) => {
        if (value === duration && environment.production) {
          this.oAuth.logOut();
          localStorage.setItem(TIMEOUT, 'true');
        }
      });
  }

  private _sessionSymmetric(): void {
    if (!isNullOrUndefined(this.securityService.getItem(TIME_SYMMETRIC))) {
      const symmetric_time = JSON.parse(
        this.securityService.getItem(TIME_SYMMETRIC),
      );
      const time = !isNullOrUndefined(symmetric_time.time)
        ? symmetric_time.time
        : TIME_SYMMETRIC_SESSION;

      interval(INTERVAL_TIME_SESSION)
        .pipe(takeUntil(this._destroy$))
        .subscribe((_) => {
          const oldDate: number = new Date(symmetric_time.date).setMinutes(
            time,
          );
          const newDate: number = new Date().getTime();

          if (newDate >= new Date(oldDate).getTime()) {
            this.oAuth.logOut();
          }
        });
    }
  }

  private _subsOptionsModule(): void {
    this.optionModule$
      .pipe(takeUntil(this._destroy$))
      .subscribe((response: OptionModuleState) =>
        this._responseOptionModule(response),
      );
  }

  private _responseOptionModule(response: OptionModuleState): void {
    if (
      !!response &&
      !!response.data &&
      !!response.data.security &&
      !!response.data.security.options &&
      !!response.data.security.options.unusual_operations
    ) {
      this.model.fetchUnusualOperationsQueryLoad();
    }
  }

  private _loadInitData(): void {
    this.model.fetchUserSecureData();
    this.model.fetchProducts();
    this.model.fetchFreeDestinationsAll();
    this.model.fetchToPlus();
    this.model.fetchAdvertising();
    this._subsOptionsModule();
  }

  get optionModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }

  private _subsUnusualOperationsQuery(): void {
    this.unusualOperationsQuery$
      .pipe(takeUntil(this._destroy$))
      .subscribe((response: IUnusualOpQuery) =>
        this._responseUnusualQuery(response),
      );
  }

  private _responseUnusualQuery(response: IUnusualOpQuery): void {
    if (response.success && !!response && !!response.data) {
      if (response.data.length > 0) {
        this.modalService.close();
        const cardNumberArray = response.data.map((i: ITransactionsByCard) =>
          i.CardNum.slice(-4),
        );
        setTimeout(() => this.openUnusualModal(cardNumberArray), 500);
      }
    }
  }

  get unusualOperationsQuery$(): Observable<IUnusualOpQuery> {
    return this.model.unusualOperationsQuery$;
  }

  get mainNavigate(): INavigate {
    return Navigate;
  }

  public openUnusualModal(cardNumber: string[]): void {
    this.modalService.open(
      DsModalComponent,
      environment.isLocal,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => {
      this._actionsModal(cardNumber);
    }, 10);
  }

  private _actionsModal(cardNumberArray: string[]): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modalService._dialogComponentRef,
      )
    ) {
      const cardNumber = cardNumberArray.join(', ');
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.img = '/essential-warning-6@3x.png';
      component.typeModal = 'warning';
      component.title = 'UNUSUALES_OPERATIONS.MODAL_WARNING_HOME.TITLE';
      component.description = this.translate
        .instant('UNUSUALES_OPERATIONS.MODAL_WARNING_HOME.DESCRIPTION')
        .replace('{{number}}', cardNumber);
      component.btnAgree = 'UNUSUALES_OPERATIONS.MODAL_WARNING_HOME.BTN_OK';

      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this.router.navigate([this.mainNavigate.unusuales_operations]);
        this.modalService.close();
      });
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import { ClassNotification } from '@app/core/constants/notification';
import { HomeModel } from '@app/modules/home/home.model';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { IToPlusState } from '@app/store/reducers/models/to-plus/to-plus.reducer';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { INavigateYourPlus, NavigateYourPlus } from '../../constants/routes';
import { YourPlusOption } from '../../entities/your-plus.interface';
import { ModalSuccessComponent } from '../../shared/modal-success/modal-success.component';
import { YourPlusModel } from '../../store/models/your-plus.model';
import { IConfiguration } from '../../store/reducers/configuration.reducer';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
})
export class StepTwoComponent implements OnInit, OnDestroy {
  options: YourPlusOption[];
  public minPoints: number;
  public actualPoints: number;

  _destroy$: Subject<boolean>;
  constructor(
    private _translate: TranslateService,
    private _model: YourPlusModel,
    private _home_model: HomeModel,
    private _router: Router,
    private _modalService: ModalService,
  ) {
    this._destroy$ = new Subject();
  }

  ngOnInit(): void {
    this._setStep(2);
    this._getAssets();
    this._loadTuPlus();
    this._loadConfiguration();
    this._loadFirstMessage();
  }
  private _loadFirstMessage(): void {
    if (
      !isNullOrUndefined(this.minPoints) &&
      this.minPoints >= this.actualPoints
    ) {
      setTimeout(() => {
        this._showToastInfo();
      }, 10);
    }
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
  private _showToastInfo(): void {
    const text = this._translate
      .instant('TO_PLUS.MONEY.INSUFFICIENT_DESC_ERROR')
      .replace('{{minPoints}}', this.minPoints + '');
    this._model.notificationOpen(
      this._translate.instant('TO_PLUS.MONEY.INSUFFICIENT_TITLE_ERROR'),
      true,
      ClassNotification.INFO,
      false,
      text,
    );
  }

  get configuration$(): Observable<IConfiguration> {
    return this._model.configuration$;
  }
  get toPlus$(): Observable<IToPlusState> {
    return this._home_model.toPlus$;
  }

  private _loadTuPlus(): void {
    this.toPlus$
      .subscribe((data: IToPlusState) => {
        if (!!data && !!data.data && data.data.success) {
          this.actualPoints = data.data.totalPoints;
        }
      })
      .unsubscribe();
  }

  private _loadConfiguration(): void {
    this.configuration$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: IConfiguration) => {
        if (!!data && !!data.data && data.data.success) {
          this.minPoints = data.data.MinCurAmt.Amt;
        }
      })
      .unsubscribe();
  }
  private _getAssets(): void {
    this.options = this._translate.instant('TO_PLUS.OPTIONS');
  }
  private _setStep(step: number): void {
    this._model.setStep({ step });
  }
  get navigate(): INavigateYourPlus {
    return NavigateYourPlus;
  }

  public goToRedeem(): void {
    if (this.actualPoints >= this.minPoints) {
      this._setStep(3);
      this._router.navigate([this.navigate.step3]);
    } else {
      if (!isNullOrUndefined(this.minPoints)) {
        this._showToastInfo();
      }
    }
  }

  public openModal(): void {
    this._modalService.open(
      ModalSuccessComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(), 10);
  }

  private _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = this._modalService._dialogComponentRef.instance
        .componentRef.instance;

      component.actionCancel.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this._modalService.close();
      });

      component.actionAgree.pipe(takeUntil(this._destroy$)).subscribe(() => {
        this._modalService.close();
        this._router.navigate([Navigate.home]);
      });
    }
  }
}

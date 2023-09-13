import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IFormOneTransferInterface } from '../../entities/formOneTransfer.interface';
import { IStepNewTransfer } from '../../entities/new-transfer.interface';
import { IScheduleTransferCreate } from '../../entities/scheduledTransfer.interface';
import { IAccountTransferState } from '../../store/reducers/account-tranfer.reducer';
import { FormStepThreeState } from '../../store/reducers/form-step-three.reducer';
import { FormStepTwoState } from '../../store/reducers/form-step-two.reducer';
import { TransferModel } from '../../transfer.model';
import { INavigateOldTransfer, NavigateOldTransfer } from './constants/routes';

@Component({
  selector: 'app-old-transfer',
  templateUrl: './old-transfer.component.html',
  styleUrls: ['./old-transfer.component.sass'],
})
export class OldTransferComponent implements OnInit, OnDestroy {
  public viewBack: boolean = false;
  public maxStep: number = 3;
  public backUrl: string;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _modelTransfer: TransferModel,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this._router.navigate([this.navigate.step1]);
    this.validateSteps();
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
  get navigate(): INavigateOldTransfer {
    return NavigateOldTransfer;
  }
  get step$(): Observable<IStepNewTransfer> {
    return this._modelTransfer.step$;
  }

  public validateSteps(): void {
    this.step$.pipe(takeUntil(this._destroy$)).subscribe((response) => {
      this.selectStep(response.step);
    });
  }
  private selectStep(step: number): void {
    this.viewBack = false;
    if (step === 1 || step === 2 || step === 3 || step === 4) {
      this.viewBack = true;
    }
    switch (step) {
      case 1:
        this.backUrl = this.navigate.home;
        break;
      case 2:
        this.backUrl = this.navigate.step1;
        break;
      case 3:
        this.backUrl = this.navigate.step2;
        break;
      case 4:
        this.backUrl = this.navigate.step3;
        break;
      default:
        this.backUrl = this.navigate.step1;
        break;
    }
  }

  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.home;
    } else {
      this.validateSteps();
    }
  }

  get items$(): Observable<string[]> {
    return this.translate.get('LINE_TIME');
  }

  get formOne$(): Observable<IFormOneTransferInterface> {
    return this._modelTransfer.formOne$;
  }
  get formTwo$(): Observable<FormStepTwoState> {
    return this._modelTransfer.formTwo$;
  }
  get formThree$(): Observable<FormStepThreeState> {
    return this._modelTransfer.formThree$;
  }
  get scheduled$(): Observable<IScheduleTransferCreate> {
    return this._modelTransfer.transferScheduled$;
  }
  get transfer$(): Observable<IAccountTransferState> {
    return this._modelTransfer.transfer$;
  }
}

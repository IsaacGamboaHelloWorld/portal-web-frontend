import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  INavigateFastTransfer,
  NavigateFastTransfer,
} from './constants/routes';
import { IStepFastTransfer } from './entities/fast-transfer.interface';
import { FastTransferModel } from './fast-transfer.model';

@Component({
  selector: 'app-fast-transfer',
  templateUrl: './fast-transfer.component.html',
  styleUrls: ['./fast-transfer.component.sass'],
})
export class FastTransferComponent implements OnInit, OnDestroy {
  public viewBack: boolean = true;
  public maxStep: number = 3;
  public backUrl: string;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _router: Router,
    private _modelFastTransfer: FastTransferModel,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this.validateSteps();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
  get navigate(): INavigateFastTransfer {
    return NavigateFastTransfer;
  }
  get step$(): Observable<IStepFastTransfer> {
    return this._modelFastTransfer.stepFastTransfer$;
  }
  public validateSteps(): void {
    this.step$.pipe(takeUntil(this._destroy$)).subscribe((response) => {
      this.selectStep(response.step);
    });
  }
  private selectStep(step: number): void {
    this.viewBack = true;
    switch (step) {
      case 1:
        this.backUrl = this.navigate.transfer;
        break;
      case 2:
        this.backUrl = this.navigate.step1;
        break;
      case 3:
        this.backUrl = this.navigate.step2;
        break;
      default:
        this.backUrl = this.navigate.home;
        break;
    }
  }

  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.transfer;
    } else {
      this.validateSteps();
    }
  }
}

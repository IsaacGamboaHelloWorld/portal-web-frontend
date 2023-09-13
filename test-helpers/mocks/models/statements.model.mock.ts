import { Injectable } from '@angular/core';
import { IPdfdata } from '@app/core/interfaces/statement/pdfdata';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { BehaviorSubject } from 'rxjs';
import { IStatement } from '../../../src/app/core/interfaces/statement/statement';

@Injectable()
export class StatementsModelMock {
  private innerPdfData?: any;
  private innerPeriodsData?: any;

  get getInnerPreiodsData(): any {
    return this.innerPeriodsData;
  }

  get getInnerPdfData(): any {
    return this.innerPdfData;
  }

  set setInnerPeriodsData(data: any) {
    this.innerPeriodsData = data;
    this.periods$.next(data);
  }

  set setInnerPdfData(data: any) {
    this.innerPdfData = data;
    this.pdf$.next(data);
  }

  public periods$: BehaviorSubject<IStatement> = new BehaviorSubject(
    this.getInnerPdfData,
  );
  public periodsLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public periodsLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public periodsError$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public pdf$: BehaviorSubject<IPdfdata> = new BehaviorSubject(
    this.getInnerPdfData,
  );
  public pdfLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public pdfLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public pdfError$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public pdfFailedRetries$: BehaviorSubject<boolean> = new BehaviorSubject(
    true,
  );

  public getPeriods(type: string, id: string): void {}
  public resetPdfData(): void {}
  public resetPeriods(): void {}
  public getPdf(type: string, id: string, value: IPeriodItem): void {}
  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {}

  public notificationClosed(): void {}
}

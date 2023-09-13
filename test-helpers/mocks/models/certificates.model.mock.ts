import { Injectable } from '@angular/core';
import { IPdfdata } from '@app/core/interfaces/certificates/pdfdata';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CertificatesModelMock {
  private innerPdfData?: any;

  get getInnerPdfData(): any {
    return this.innerPdfData;
  }

  set setInnerPdfData(data: any) {
    this.innerPdfData = data;
    this.pdf$.next(data);
  }

  public pdf$: BehaviorSubject<IPdfdata> = new BehaviorSubject(
    this.getInnerPdfData,
  );
  public pdfLoading$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public pdfLoaded$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public pdfError$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public pdfFailedRetries$: BehaviorSubject<boolean> = new BehaviorSubject(
    true,
  );

  public resetPdfData(): void {}
  public getPdf(type: string, id: string, balance: boolean): void {}
  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {}

  public notificationClosed(): void {}
}

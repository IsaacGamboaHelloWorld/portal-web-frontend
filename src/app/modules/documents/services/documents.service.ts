import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { ITributary } from '../entities/documents';

@Injectable()
export class DocumentsService {
  constructor(private http: HttpClient) {}

  public generateCertificateGmf(year?: string): Observable<ITributary> {
    const payload = {
      taxYear: year,
    };

    return this.http.post<ITributary>(
      environment.api.base + environment.api.services.tax_certificates,
      payload,
    );
  }

  public generateCertificateIncome(year?: string): Observable<any> {
    const payload = {
      taxYear: year,
    };

    return this.http.post<any>(
      environment.api.base + environment.api.services.income_certificates,
      payload,
    );
  }

  public generateCertificateAccount(data?: object): Observable<any> {
    const payload = data;

    return this.http.post<any>(
      environment.api.base + environment.api.services.accountCertificate,
      payload,
    );
  }

  public generateCertificateIncomeTaxTC(data?: object): Observable<any> {
    return this.http.post<any>(
      environment.api.base + environment.api.services.rental_certificates,
      {},
    );
  }

  public generateCertificateRac(year?: string): Observable<any> {
    const payload = {
      taxYear: year,
    };

    return this.http.post<any>(
      environment.api.base + environment.api.services.rac,
      payload,
    );
  }

  public downloadPDF(
    pdf: string,
    status: boolean = false,
    error: string,
    namepdf: string,
  ): boolean {
    if (status) {
      const linkSource = `${pdf}`;
      const downloadLink = document.createElement('a');
      const fch: Date = new Date();
      const fileName = `${namepdf}(${fch.toLocaleDateString()}-${fch.toLocaleTimeString()}).pdf`;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
    return status;
  }
}

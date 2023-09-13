import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  ICertificateAccountRequest,
  IIncomeTaxesResponse,
  IIncomeTaxTCResponse,
} from '../entities/documents-general';
import { ITributaryGmf } from './../entities/tribubtary';

@Injectable()
export class DocumentsService {
  constructor(private http: HttpClient) {}

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/1183416620/Certificates+-+GMF
  public generateCertificateGmf(year?: string): Observable<ITributaryGmf> {
    const payload = {
      taxYear: year,
    };

    return this.http.post<ITributaryGmf>(
      environment.api.base + environment.api.services.tax_certificates,
      payload,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/1189085689/Certificates+-+Income+Taxes
  public generateCertificateIncome(year?: string): Observable<any> {
    const payload = {
      taxYear: year,
    };

    return this.http.post<IIncomeTaxesResponse>(
      environment.api.base + environment.api.services.income_certificates,
      payload,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/1183711499/Certificates+-+Account
  public generateCertificateAccount(
    data?: ICertificateAccountRequest,
  ): Observable<any> {
    const payload = data;

    return this.http.post<any>(
      environment.api.base + environment.api.services.accountCertificate,
      payload,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2418049203/Certificates+-+Income+Taxes+Credit+Card
  public generateCertificateIncomeTaxTC(_data: any): Observable<any> {
    return this.http.post<IIncomeTaxTCResponse>(
      environment.api.base + environment.api.services.rental_certificates,
      {},
    );
  }

  public downloadPDF(
    pdf: string,
    status: boolean,
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

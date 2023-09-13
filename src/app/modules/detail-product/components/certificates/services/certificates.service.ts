import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IPdfdata } from '@app/core/interfaces/certificates/pdfdata';
import { environment } from '@environment';

@Injectable()
export class CertificatesService {
  constructor(private http: HttpClient) {}

  public getPdf(
    account: string,
    type: string,
    balance: boolean,
  ): Observable<IPdfdata> {
    const data = {
      accountId: account,
      accountType: type,
      includeBalance: balance,
    };

    return this.http.post<IPdfdata>(
      environment.api.base + environment.api.services.accountCertificate,
      data,
    );
  }
}

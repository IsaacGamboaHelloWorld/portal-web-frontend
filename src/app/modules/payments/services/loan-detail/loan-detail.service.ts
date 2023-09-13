import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IAnswerBillerLoanDetail } from '../../entities/biller-loan-detail';

@Injectable()
export class LoanDetailService {
  constructor(private http: HttpClient) {}

  public getLoanDetail(data: any): Observable<IAnswerBillerLoanDetail> {
    const loanDetail = {
      language: 'es_CO',
      billerPayment: data,
    };

    return this.http.post<IAnswerBillerLoanDetail>(
      environment.api.base + environment.api.services.paymentBillDetail,
      loanDetail,
    );
  }
}

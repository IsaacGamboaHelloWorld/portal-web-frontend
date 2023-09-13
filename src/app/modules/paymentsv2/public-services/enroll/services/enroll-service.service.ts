import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BANKS } from '@app/core/constants/banks';
import { IActiveCompanySave } from '@app/core/interfaces/paymentBills.interface';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IAgreementSaved, ICompanyListResponse } from '../entities/enroll';

@Injectable()
export class EnrollService {
  constructor(private http: HttpClient) {}

  public searchBillCompany(_data: string): Observable<ICompanyListResponse> {
    const company = {
      companyId: BANKS.BANCO_POPULAR,
      entityName: _data,
    };

    return this.http.post<ICompanyListResponse>(
      environment.api.base +
        environment.api.services.bills.agreementsAvailables,
      company,
    );
  }
  public saveCompany(_data: IActiveCompanySave): Observable<IAgreementSaved> {
    const company = {
      companyId: BANKS.BANCO_POPULAR,
      serviceCompanyCode: _data.company_code,
      serviceCompanyName: _data.company_name,
      billId: _data.billId,
      typeServiceCompany: 'NO_BILLER',
    };
    return this.http.post<IAgreementSaved>(
      environment.api.base + environment.api.services.bills.addAgreement,
      company,
    );
  }
}

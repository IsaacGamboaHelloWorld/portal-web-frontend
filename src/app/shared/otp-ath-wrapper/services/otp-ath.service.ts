import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { OtpAthOperations } from '../constants/otp-ath-operations.enum';
import {
  IOtpAthGenerateRequest,
  IOtpAthGenerateResponse,
  IOtpAthValidateRequest,
  IOtpAthValidateResponse,
} from '../entites';

@Injectable()
export class OtpAthService {
  constructor(private _http: HttpClient) {}

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2886698553/OTP+Enrollment+Generate
  public Generate(
    transactionType: OtpAthOperations,
  ): Observable<IOtpAthGenerateResponse> {
    const body: IOtpAthGenerateRequest = {
      transactionType,
    };
    return this._http.post<IOtpAthGenerateResponse>(
      environment.api.base + environment.api.services.otpAth.generate,
      body,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2886666586/OTP+Enrollment+Validate
  public Validate(
    request: IOtpAthValidateRequest,
  ): Observable<IOtpAthValidateResponse> {
    const { otpValue, transactionRqUID, transactionType } = request;
    const body = {
      otpValue,
      transactionRqUID,
      transactionType,
    };
    return this._http.post<IOtpAthValidateResponse>(
      environment.api.base + environment.api.services.otpAth.validate,
      body,
    );
  }
}

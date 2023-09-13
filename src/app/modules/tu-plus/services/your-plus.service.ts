import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { BANKS } from '@app/core/constants/banks';
import { GenericResponse } from '@app/core/interfaces/generic-response.interface';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { IResConfiguration } from '../entities/configuration.interface';
import { IResHistoricMovements } from '../entities/historic-movements.interface';
import { IResOTPGeneration } from '../entities/otp-generation.interface';
import { IResRedemption } from '../entities/redemption.interface';

@Injectable({
  providedIn: 'root',
})
export class YourPlusService {
  protected customerId: string;
  protected customerIdType: string;
  protected ipAddress: string;

  constructor(
    private _http: HttpClient,
    private _modelApplication: ApplicationModel,
  ) {}
  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2737178565/Tu+Plus+-+Loyalty+Transactions+Docsv2
  public HistoricMovementsService(
    startDt: string,
    endDt: string,
    isPagination: boolean,
    numPage: number,
  ): Observable<IResHistoricMovements> {
    const bodyHistoricMovements = {
      companyId: BANKS.BANCO_POPULAR,
      transactionsRequest: {
        startDt,
        endDt,
        isPagination,
        numPage,
      },
    };
    return this._http.post<IResHistoricMovements>(
      environment.api.base + environment.api.services.tuPlus.historicMovements,
      bodyHistoricMovements,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2744615225/Tu+Plus+-+Loyalty+Configuration+Docsv2
  public ConfigurationService(Type: string): Observable<IResConfiguration> {
    const bodyConfiguration = {
      companyId: BANKS.BANCO_POPULAR,
      configurationRequest: {
        Type,
      },
    };
    return this._http.post<IResConfiguration>(
      environment.api.base + environment.api.services.tuPlus.configuration,
      bodyConfiguration,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2751333812/Tu+Plus+-+Loyalty+Redemption+Docsv2
  public RedemptionService(
    totalPoints: string,
    curAmt: string,
    accountId: string,
    accountType: string,
    bankId: string,
    bankName: string,
    otpValue?: string,
    spRefId?: string,
  ): Observable<IResRedemption> {
    const bodyRedemption = {
      companyId: BANKS.BANCO_POPULAR,
      redemptionRequest: {
        totalPoints,
        curAmt,
        accountId,
        accountType,
        bankId,
        bankName,
        otpInfo: {
          otpValue,
          spRefId,
        },
      },
    };
    return this._http.post<IResRedemption>(
      environment.api.base + environment.api.services.tuPlus.redemption,
      bodyRedemption,
    );
  }
  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2752282864/Tu+Plus+-+Loyalty+Redemption+OTP+Generation
  public OTPGenerationService(): Observable<IResOTPGeneration> {
    const bodyOTPGeneration = {
      companyId: BANKS.BANCO_POPULAR,
    };
    return this._http.post<IResOTPGeneration>(
      environment.api.base + environment.api.services.tuPlus.otpGeneration,
      bodyOTPGeneration,
    );
  }

  // https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2745204959/logout
  public CloseSessionTuPlus(): Observable<GenericResponse> {
    return this._http.post<GenericResponse>(
      environment.api.base + environment.api.services.tuPlus.closeToPlus,
      {},
    );
  }
}

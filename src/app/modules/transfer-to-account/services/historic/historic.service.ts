import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { IRespHistoricTransfer } from '../../entities/historic';
import { IPendingTransfers } from '../../entities/pendingTransfer.interface';
import { IScheduledTransfersSearch } from '../../entities/scheduledTransfer.interface';

@Injectable()
export class HistoricService {
  constructor(private http: HttpClient) {}

  public historicTransfer(): Observable<IRespHistoricTransfer> {
    const USER = {
      companyId: BANKS.BANCO_POPULAR,
      itemsPerPage: 1000,
    };
    return this.http.post<IRespHistoricTransfer>(
      environment.api.base + environment.api.services.historyTransfer,
      USER,
    );
  }

  public pendingTransfer(): Observable<IPendingTransfers> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
      companyId: BANKS.BANCO_POPULAR,
      currentSystemDate: '',
    };

    return this.http.post<IPendingTransfers>(
      environment.api.base + environment.api.services.pendingTransfer,
      user,
    );
  }

  public scheduledTransfer(): Observable<IScheduledTransfersSearch> {
    return this.http.post<IScheduledTransfersSearch>(
      environment.api.base + environment.api.services.scheduled.search,
      {},
    );
  }
}

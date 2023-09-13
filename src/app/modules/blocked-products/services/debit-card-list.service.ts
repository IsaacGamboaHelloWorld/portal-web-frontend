import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { IDebitCardListResponse } from '../entities/debit-cards-response';

@Injectable()
export class DebitCardListService {
  constructor(private http: HttpClient) {}

  public loadDebitCards(): Observable<IDebitCardListResponse> {
    return this.http.post<IDebitCardListResponse>(
      environment.api.base + environment.api.services.load_debit_cards,
      {},
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  PfmCreditCardResponse,
  PfmExpensesResponse,
  PfmItemsRequest,
  PfmItemsResponse,
  PfmMovimentRequest,
  PfmMovimentsResponse,
  PfmProductResponse,
  PfmRecategorizeRequest,
  PfmRecategorizeResponse,
} from '../entities';

@Injectable()
export class PfmProductDetailService {
  constructor(private http: HttpClient) {}

  /**
   * https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2017624389/PFM+-+Products
   */
  public getPfmProducts(
    month: string,
    year: string,
  ): Observable<PfmProductResponse> {
    const user = {
      month,
      year,
    };
    return this.http.post<PfmProductResponse>(
      environment.api.base + environment.api.services.pfm.products,
      user,
    );
  }

  /**
   * https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2056488015/PFM+-+Expenses
   */
  public getPfmExpenses(
    month: string,
    year: string,
    type: string,
    product_type: string,
  ): Observable<PfmExpensesResponse> {
    const user = {
      month,
      year,
      type,
      product_type,
    };

    return this.http.post<PfmExpensesResponse>(
      environment.api.base + environment.api.services.pfm.expenses,
      user,
    );
  }

  /**
   * https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2239692928/PFM+-+Movements
   */
  public getPfmMovements(
    body: PfmMovimentRequest,
  ): Observable<PfmMovimentsResponse> {
    return this.http.post<PfmMovimentsResponse>(
      environment.api.base + environment.api.services.pfm.moviments,
      body,
    );
  }

  /**
   * https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2239562810/PFM+-+Items
   */
  public getPfmItems(body: PfmItemsRequest): Observable<PfmItemsResponse> {
    return this.http.post<PfmItemsResponse>(
      environment.api.base + environment.api.services.pfm.items,
      body,
    );
  }

  /**
   * https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2843574466/PFM+-+Credit+Cards
   */
  public getPfmCreditCards(
    month: string,
    year: string,
  ): Observable<PfmCreditCardResponse> {
    const user = {
      month,
      year,
    };

    return this.http.post<PfmCreditCardResponse>(
      environment.api.base + environment.api.services.pfm.creditCards,
      user,
    );
  }

  /**
   * https://avaldigitallabs.atlassian.net/wiki/spaces/PBPOP/pages/2879553806/PFM+-+Recategorize
   */
  public postPfmRecategorize(
    body: PfmRecategorizeRequest,
  ): Observable<PfmRecategorizeResponse> {
    return this.http.post<PfmRecategorizeResponse>(
      environment.api.base + environment.api.services.pfm.recategorize,
      body,
    );
  }
}

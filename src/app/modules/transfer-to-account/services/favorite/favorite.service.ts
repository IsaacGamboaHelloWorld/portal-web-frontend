import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BANKS } from '@core/constants/banks';
import { environment } from '@environment';
import { IFavorite, IRespFavorite } from '../../entities/favorites';
@Injectable()
export class FavoriteService {
  constructor(private http: HttpClient) {}

  public allFavorites(): Observable<IRespFavorite> {
    const user = {
      companyId: BANKS.BANCO_POPULAR,
    };

    return this.http.post<IRespFavorite>(
      environment.api.base + environment.api.services.favoriteTransfer,
      user,
    );
  }

  public deleteFavorite(favorite: IFavorite): Observable<any> {
    const options = {
      companyId: favorite.companyId,
      fromProductType: favorite.accountFromInformation.productType,
      fromAccountIdentifier: favorite.accountFromInformation.accountIdentifier,
      toProductType: favorite.accountToInformation.productType,
      toAccountIdentifier: favorite.accountToInformation.accountIdentifier,
      name: favorite.accountToInformation.name,
    };

    return this.http.post(
      environment.api.base + environment.api.services.favoriteDelete,
      options,
    );
  }
}

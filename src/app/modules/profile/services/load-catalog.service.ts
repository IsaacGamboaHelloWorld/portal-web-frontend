import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { CustomerProfileCatalog } from '../entities/load-catalog';

@Injectable()
export class LoadCatalogService {
  constructor(private http: HttpClient) {}

  public loadCatalog(): Observable<CustomerProfileCatalog> {
    return this.http.post<CustomerProfileCatalog>(
      environment.api.base + environment.api.services.customer.catalogs,
      {},
    );
  }
}

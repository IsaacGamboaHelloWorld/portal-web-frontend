import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICategoriesTransfer } from '@core/interfaces/categoriesTransfer.interface';
import { environment } from '@environment';

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}

  public categories(): Observable<ICategoriesTransfer> {
    return this.http.get<ICategoriesTransfer>(
      environment.api.base + environment.api.services.categoriesTransfer,
    );
  }
}

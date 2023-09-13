import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import {
  IAnswerPocket,
  ICategoriesPocket,
  ISendPocket,
} from '../entities/new-pockets';

@Injectable()
export class NewPocketService {
  constructor(private http: HttpClient) {}

  public createPocket(_data: ISendPocket): Observable<IAnswerPocket> {
    return this.http.post<IAnswerPocket>(
      environment.api.base + environment.api.services.pockets.createpockets,
      _data,
    );
  }

  public loadCategories(): Observable<ICategoriesPocket> {
    return this.http.get<ICategoriesPocket>(
      environment.api.base + environment.api.services.pockets.categories,
    );
  }
}

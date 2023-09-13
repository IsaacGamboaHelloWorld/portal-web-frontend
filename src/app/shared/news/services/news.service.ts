import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import {
  IPrefsLoadResponse,
  IPrefsRequest,
  IPrefsResponse,
} from '../entities/news';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  public savePrefs(data: IPrefsRequest): Observable<IPrefsResponse> {
    const saveData = {
      preferences: data,
    };
    return this.http.post<IPrefsResponse>(
      environment.api.base + environment.api.services.preferences.save,
      saveData,
    );
  }

  public LoadPrefs(): Observable<IPrefsLoadResponse> {
    const data = {};
    return this.http.post<IPrefsLoadResponse>(
      environment.api.base + environment.api.services.preferences.all,
      data,
    );
  }
}

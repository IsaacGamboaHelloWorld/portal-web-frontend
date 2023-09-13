import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class ExperianService {
  constructor(private http: HttpClient) {}
  public executeFlow(data: any): Observable<any> {
    return this.http.post<any>(
      environment.api.base + environment.api.services.experian,
      data,
    );
  }
}

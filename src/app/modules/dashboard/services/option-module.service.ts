import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseOptionModule } from '@app/core/interfaces/option-module.interface';
import { environment } from '@environment';
import { Observable } from 'rxjs';

@Injectable()
export class OptionModuleService {
  constructor(private http: HttpClient) {}

  public getOptions(): Observable<ResponseOptionModule> {
    const user = {
      requestId: Math.floor(Date.now() / 1000),
    };

    return this.http.post<ResponseOptionModule>(
      environment.api.base + environment.api.services.optionsModules,
      user,
    );
  }
}

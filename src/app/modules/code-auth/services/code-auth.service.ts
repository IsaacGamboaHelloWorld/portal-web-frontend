import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  IAnswerAllowedCodeAuth,
  IAnswerAssignCodeAuth,
  IAnswerGetQuestion,
  IAnswerSecureData,
  IAnswerSecureState,
  IAnswerSecureValidQuestion,
  IAnswerUpdateSecureData,
  ISendAssignCodeAuth,
  ISendEnrollSecureData,
  IUpdateSecureData,
} from '../entities/code-auth';

@Injectable()
export class CodeAuthService {
  constructor(private http: HttpClient) {}

  public codeAuthInfoUser(): Observable<IAnswerSecureData> {
    return this.http.post<IAnswerSecureData>(
      environment.api.base + environment.api.services.customer.getSecureData,
      {},
    );
  }

  public codeAuthInfoUserUpdate(
    data: IUpdateSecureData,
  ): Observable<IAnswerUpdateSecureData> {
    return this.http.post<IAnswerUpdateSecureData>(
      environment.api.base + environment.api.services.customer.updateSecureData,
      data,
    );
  }

  public getQuestion(): Observable<IAnswerGetQuestion> {
    return this.http.post<IAnswerGetQuestion>(
      environment.api.base + environment.api.services.code_auth.question,
      {},
    );
  }

  public validQuestion(
    data: ISendEnrollSecureData,
  ): Observable<IAnswerSecureValidQuestion> {
    return this.http.post<IAnswerSecureValidQuestion>(
      environment.api.base + environment.api.services.code_auth.validate,
      { enrollmentSecureData: data },
    );
  }
  public statusCodeAuth(): Observable<IAnswerSecureState> {
    return this.http.post<IAnswerSecureState>(
      environment.api.base + environment.api.services.code_auth.state,
      {},
    );
  }

  public codeAuthAllowed(): Observable<IAnswerAllowedCodeAuth> {
    return this.http.post<IAnswerAllowedCodeAuth>(
      environment.api.base + environment.api.services.code_auth.allowed,
      {},
    );
  }

  public codeAuthAssign(
    enrollment?: ISendAssignCodeAuth,
  ): Observable<IAnswerAssignCodeAuth> {
    const payload = enrollment;

    return this.http.post<IAnswerAssignCodeAuth>(
      environment.api.base + environment.api.services.code_auth.assign,
      payload,
    );
  }
}

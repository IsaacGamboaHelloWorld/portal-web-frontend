import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { ModalService } from '../modal/services/modal.service';
import { Action } from './models/action-code';
import {
  CancelChallenge,
  ChallengeEvents,
  RequiredChallenge,
  ResponsedChallenge,
  SelectChallenge,
  SuccessfulChallenge,
  UnsuccessfulChallenge,
} from './models/events-challenge';
import { MfaResponse } from './models/mfa-response.interface';

@Injectable({
  providedIn: 'root',
})
export class TwoFactorAuthService {
  private challengeResponse: MfaResponse;
  private resolverActive: boolean = false;
  private baseUrl: string;

  public readonly events: Observable<ChallengeEvents> = new Subject();

  public response: Subject<any>;

  constructor(private http: HttpClient, private modal: ModalService) {}

  /** @internal */
  private triggerEvent(event: ChallengeEvents): void {
    (this.events as Subject<ChallengeEvents>).next(event);
  }

  public setBaseUrl(url: string): void {
    this.baseUrl = url;
  }

  public processResponse(response: HttpResponse<MfaResponse>): void {
    this.challengeResponse = response.body;
    switch (this.challengeResponse.action) {
      case Action.ALLOW:
        this.triggerEvent(new SuccessfulChallenge(this.challengeResponse));
        break;
      case Action.CHALLENGE:
        this.triggerEvent(new RequiredChallenge(this.challengeResponse));
        break;
      case Action.DENY:
        this.triggerEvent(new UnsuccessfulChallenge(this.challengeResponse));
        break;
      case Action.RESPONSE:
        this.triggerEvent(new ResponsedChallenge(this.challengeResponse));
        break;
      case Action.SELECT_CHALLENGE:
        this.triggerEvent(new SelectChallenge(this.challengeResponse));
        break;
    }
  }

  public cancelChallenge(): void {
    if (
      !!this.challengeResponse &&
      !!this.challengeResponse.url &&
      !!this.challengeResponse.transactionId &&
      (this.challengeResponse.action === Action.CHALLENGE ||
        this.challengeResponse.action === Action.SELECT_CHALLENGE)
    ) {
      const data = {
        action: 'CANCEL',
        transactionId: this.challengeResponse.transactionId,
      };
      this.http
        .post(this.baseUrl + this.challengeResponse.url, data)
        .subscribe();
    } else {
      this.triggerEvent(new CancelChallenge(this.challengeResponse));
    }
    this.challengeResponse = null;
  }

  public validateChallenge(data: any = null): Observable<any> {
    if (
      !!this.challengeResponse &&
      !!this.challengeResponse.url &&
      !!this.challengeResponse.transactionId
    ) {
      data = {
        transactionId: this.challengeResponse.transactionId,
        challengeResponse: data,
      };
      return this.http.post(this.baseUrl + this.challengeResponse.url, data);
    }
    return of('');
  }

  public selectChallenge(challenge: string): Observable<any> {
    if (
      !!this.challengeResponse &&
      !!this.challengeResponse.url &&
      !!this.challengeResponse.transactionId
    ) {
      const data = {
        transactionId: this.challengeResponse.transactionId,
        selectedChallenge: challenge,
        action: Action.SELECT_CHALLENGE,
      };
      return this.http.post(this.baseUrl + this.challengeResponse.url, data);
    }
    return of('');
  }

  public isTwoFactorAuthResponse(httpEvent: HttpEvent<any>): boolean {
    return (
      httpEvent instanceof HttpResponse &&
      !!httpEvent.body &&
      !!httpEvent.body['action']
    );
  }

  public resolver(httpEvent: HttpEvent<any>): Observable<HttpEvent<any>> {
    if (
      !this.resolverActive &&
      httpEvent instanceof HttpResponse &&
      !!httpEvent.body &&
      httpEvent.body['action'] !== Action.RESPONSE
    ) {
      this.resolverActive = true;
      this.response = new Subject();
      this.events
        .pipe(
          filter(
            (event) =>
              event instanceof ResponsedChallenge ||
              event instanceof CancelChallenge,
          ),
          tap((event) => {
            if (event instanceof ResponsedChallenge) {
              let responseBody = event.data.response.body;
              if (!!responseBody) {
                if (responseBody.length > 0) {
                  responseBody = JSON.parse(responseBody);
                  responseBody['response'] = responseBody.request;
                  responseBody['request'] = event.data.request;
                  responseBody['dateTime'] = event.data.dateTime;
                }
                if (responseBody['success']) {
                  this.modal.edit(
                    'animation',
                    event instanceof ResponsedChallenge,
                  );
                }
              }
              this.response.next(
                new HttpResponse({
                  body: responseBody,
                  status: event.data.response.status,
                  headers: event.data.response.headers,
                }),
              );
            } else if (event instanceof CancelChallenge) {
              this.response.next(
                new HttpResponse({
                  body: {
                    success: false,
                    errorMessage: 'Operación cancelada',
                  },
                  status: 200,
                }),
              );
            }
            this.resolverActive = false;
            this.response.complete();
            this.response = null;
          }),
          take(1),
        )
        .subscribe();
      return this.response;
    }
    return of(httpEvent);
  }
}

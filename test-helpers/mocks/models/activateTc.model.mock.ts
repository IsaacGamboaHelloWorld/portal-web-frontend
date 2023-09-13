import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DebitCardListStateData } from '@app/modules/blocked-products/entities/debit-cards-response';
import { IAnswerSecureData } from '@app/modules/code-auth/entities/code-auth';
import { debitCardListStateDataMock } from '../data/products-blocks.mock';

@Injectable()
export class ActivateTcModelMock {
  get getInnerDebitCardData(): any {
    return this.innerDebitCardData;
  }
  set setInnerDebitCardData(data: any) {
    this.innerDebitCardData = data;
    this.debitCardList$.next(data);
  }
  public categories$: BehaviorSubject<object> = new BehaviorSubject({});
  public firstStep$: BehaviorSubject<object> = new BehaviorSubject({});
  public navigate: BehaviorSubject<object> = new BehaviorSubject({});
  public stateActivate: BehaviorSubject<object> = new BehaviorSubject({});
  public stateGetSecureData: BehaviorSubject<
    IAnswerSecureData
  > = new BehaviorSubject({
    secureEmail: '',
    secureTelephone: '',
    success: false,
    ComponentID: '',
    PartyAssociation: [],
    loading: false,
    phoneNumber: '',
    email: '',
    contactPreference: '',
  });
  private innerDebitCardData?: any = debitCardListStateDataMock;

  public step$: BehaviorSubject<number> = new BehaviorSubject(1);
  public _setStep: BehaviorSubject<number> = new BehaviorSubject(1);
  public stateGetQuestion$: BehaviorSubject<object> = new BehaviorSubject({});

  public viewSucces: BehaviorSubject<string> = new BehaviorSubject('');
  public imgTicket: BehaviorSubject<string> = new BehaviorSubject('');
  public textBtn: BehaviorSubject<string> = new BehaviorSubject('');

  public debitCardList$: BehaviorSubject<
    DebitCardListStateData
  > = new BehaviorSubject(this.innerDebitCardData);

  public submitData(): void {}
  public init(): void {}
  public reset(): void {}
  public creationAllowedSucces(): void {}
  public authGetSecuerDataSucces(): void {}
  public authGetQuestionSucces(): void {}
  public setStep(step: number = 0): void {}
}

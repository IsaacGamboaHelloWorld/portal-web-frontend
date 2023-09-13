import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class DetailProductPfmMock {
  public detailProductPfm$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmProductLoading$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmProductData$: BehaviorSubject<any> = new BehaviorSubject({});

  public pfmExpensesLoading$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmExpensesData$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmExpenses$: BehaviorSubject<any> = new BehaviorSubject({});

  public products$: BehaviorSubject<any> = new BehaviorSubject({});

  public pfmCreditCardsData$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmMoviments$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmItems$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmRecategorizarion$: BehaviorSubject<any> = new BehaviorSubject({});

  public pfmDateSelected$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmProductSelected$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmTapSelected$: BehaviorSubject<any> = new BehaviorSubject({});
  public pfmIsFirstTime$: BehaviorSubject<any> = new BehaviorSubject({});

  public fetchProductPfm(_month: string, _year: string): void {}
  public pfmProductReset(): void {}

  public fetchExpesesPfm(
    _month: string,
    _year: string,
    _type2: string,
    _product_type: string,
  ): void {}

  public pfmExpensesReset(): void {}

  public pfmMovimentsLoad(_body: any): void {}

  public pfmMovimentsReset(): void {}

  public fetchCreditCardsPfm(_month: string, _year: string): void {}

  public resetCreditCards(): void {}

  public fetchItemsPfm(_body: any): void {}

  public resetItems(): void {}

  public fetchRecategorizationPfm(_body: any): void {}

  public resetRecategorization(): void {}

  public tabSelected(_tab: any): void {}

  public tabSelectedReset(): void {}

  public productSelected(_product: any): void {}

  public productSelectedReset(): void {}

  public dateSelected(_date: any): void {}

  public dateSelectedReset(): void {}

  public isFirstTime(_value: any): void {}
}

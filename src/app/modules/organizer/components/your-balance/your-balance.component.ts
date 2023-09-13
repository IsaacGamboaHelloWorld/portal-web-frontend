import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  IfinancialResumeInterface,
  ProductsInterface,
} from '@app/core/interfaces';
import { Product } from '@app/core/models/products/product';
import { IHomePocketsRecord } from '@app/modules/pockets/home-pockets/entities/home-pockets';
import { HomePocketsFacade } from '@app/modules/pockets/home-pockets/home-pockets.facade';
import { IHomePockets } from '@app/modules/pockets/home-pockets/store/reducers/get-pockets.reducer';
import { HomeModel } from '@modules/home/home.model';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-your-balance',
  templateUrl: './your-balance.component.html',
  styleUrls: ['./your-balance.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class YourBalanceComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public styleBar: object = {};
  public pocketsList: IHomePocketsRecord[] = [];
  public goalComplete: string[] = [];
  private mapValues: any = {
    MY_CURRENT_BAG: {
      DEPOSIT_ACCOUNT: 'saldo_actual',
      CURRENT_ACCOUNT: 'saldo_actual',
      CERTIFIED_DEPOSIT_TERM: 'valor_constitucion',
      FIDUCIARY: 'saldo_actual',
    },
    MY_TOTAL_DEBTS: {
      CREDIT_CARD: 'saldo_actual',
      PAYDAY_LOAN: 'saldo_actual',
      MORTGAGE_CREDIT: 'saldo_actual',
      FREE_DESTINATION: 'saldo_actual',
      OTHER_CREDIT: 'saldo_actual',
    },
  };
  constructor(private model: HomeModel, private facade: HomePocketsFacade) {}

  ngOnInit(): void {
    this.styleBar['height'] = `8px`;
    this.styleBar['position'] = `relative`;
    this.styleBar['bottom'] = `5px`;
    this._setDefaultValue();
    this.facade.fetchHome();
  }

  get hasFinance$(): Observable<boolean> {
    return this.finance$.pipe(
      map((data: object[]) => !isNullOrUndefined(data) && data.length > 0),
    );
  }

  get finance$(): Observable<IfinancialResumeInterface[]> {
    return this.mapProductsToFinancialResume();
  }

  get homePockets$(): Observable<IHomePockets> {
    return this.facade.homePockets$;
  }

  private mapProductsToFinancialResume(): Observable<
    IfinancialResumeInterface[]
  > {
    return this.model.products$.pipe(
      map((products: ProductsInterface) => {
        const values: IfinancialResumeInterface[] = Object.keys(
          this.mapValues,
        ).map((section) => this.buildRow(products, section));
        return values.filter((value) => !isNullOrUndefined(value));
      }),
    );
  }

  private buildRow(
    products: ProductsInterface,
    section: string,
  ): IfinancialResumeInterface {
    let value = 0;
    let exists = false;
    let row: IfinancialResumeInterface = null;
    if (!isNullOrUndefined(products)) {
      Object.keys(this.mapValues[section]).forEach((productType) => {
        if (!isNullOrUndefined(products[productType])) {
          products[productType]
            .filter(
              (product: Product) =>
                !isNullOrUndefined(product.productAccountBalances) &&
                product.didAthCall,
            )
            .forEach((product: Product) => {
              if (
                !isNullOrUndefined(
                  product.productAccountBalances[
                    this.mapValues[section][productType]
                  ],
                )
              ) {
                value +=
                  product.productAccountBalances[
                    this.mapValues[section][productType]
                  ].amount;
                exists = true;
              }
            });
        }
      });
    }
    if (exists) {
      row = {
        propertyName: section,
        amount: value,
      };
    }
    return row;
  }

  public findByProperty(
    property: string,
  ): Observable<IfinancialResumeInterface> {
    return this.finance$.pipe(
      map((properties: IfinancialResumeInterface[]) => {
        const filtered: IfinancialResumeInterface[] = properties.filter(
          (data) => data.propertyName === property,
        );
        return !!filtered ? filtered[0] : { amount: 0 };
      }),
    );
  }

  private _setDefaultValue(): void {
    this.pocketsList = [];
    combineLatest([this.facade.homePockets$])
      .pipe(
        takeUntil(this.destroy$),
        map((data) => {
          return {
            pockets: data[0],
          };
        }),
      )
      .subscribe((info) => {
        if (info.pockets && info.pockets.data) {
          this.pocketsList = info.pockets.data[0].pockets;
          this.pocketsList.forEach((e, i) => {
            if (e.savingGoal === e.amountSaved) {
              this.goalComplete.push(String(i));
            }
          });
        }
      });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ProductsInterface } from '@app/core/interfaces/products.interface';
import { Product } from '@app/core/models/products/product';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { IfinancialResumeInterface } from '@core/interfaces/financialResume.interface';
import { HomeModel } from '@modules/home/home.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ModalOtherProductsComponent } from '../modal-other-products/modal-other-products.component';

@Component({
  selector: 'app-total-finance',
  templateUrl: './total-finance.component.html',
  styleUrls: ['./total-finance.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TotalFinanceComponent {
  public showAllAmount: boolean = false;
  public loadingItems: number = 2;
  public checkOtherCredits: boolean = false;

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

  constructor(
    private model: HomeModel,
    private dom: ManipulateDomService,
    private modalService: ModalService,
  ) {}

  get hasFinance$(): Observable<boolean> {
    return this.finance$.pipe(
      map((data: object[]) => !isNullOrUndefined(data) && data.length > 0),
    );
  }

  get finance$(): Observable<IfinancialResumeInterface[]> {
    return this.mapProductsToFinancialResume();
  }

  get check$(): Observable<boolean> {
    return this.model.otherProductsShow$;
  }

  get checkOtherProducts$(): Observable<boolean> {
    return of(this.checkOtherCredits);
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

  public toggleAllAmount(): void {
    this.showAllAmount = !this.showAllAmount;
  }

  public loadOtherProducts(check: boolean): void {
    this.model.showOtherProducts(check);
    if (check) {
      this.model.loadOtherBanks();
      this.model.hasOtherProducts$
        .subscribe((data) => {
          if (!isNullOrUndefined(data) && data) {
            this.dom.scrollToDivById('other-products');
          } else {
            this.modalService.open(ModalOtherProductsComponent);
          }
        })
        .unsubscribe();
    }
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

  public loadOtherCredits(): void {
    this.checkOtherCredits = !this.checkOtherCredits;
    if (this.checkOtherCredits) {
      this.model.loadOrderOfPayment();
      this.model.orderOfPayment$
        .subscribe((data) => {
          if (
            !!data &&
            data.success &&
            !!data.payrollLoans &&
            data.payrollLoans.length > 0
          ) {
            this.dom.scrollToDivById('other-credits');
          }
        })
        .unsubscribe();
    }
  }
}

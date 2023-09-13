import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IBankElement } from '@app/core/interfaces/banks.interface';
import {
  ITypePayments,
  TYPE_PAYMENTS,
} from '@app/modules/paymentsv2/choose-history/entities/types';
import { TransferModel } from '@app/modules/transfer-to-account/transfer.model';
import { IBanks } from '@app/store/reducers/models/banks/banks.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-table-historic',
  templateUrl: './table-historic.component.html',
  styleUrls: ['./table-historic.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TableHistoricComponent implements OnInit {
  @Input() columns: number;
  @Input() names: string[] = [];
  @Input() table: object[] = [];
  @Input() filter: string;
  @Input() bodyWithCard: boolean = false;

  public types: ITypePayments = TYPE_PAYMENTS;
  public showInHome: boolean = false;
  public isSuccess: boolean = true;

  public showInfo: boolean = false;
  constructor(private model: TransferModel) {}

  ngOnInit(): void {}

  public countColumns(i: number): number[] {
    return new Array(i);
  }

  public toggleInfo(): void {
    this.showInfo = !this.showInfo;
  }

  public loadBankName(bankCode: string): Observable<IBankElement> {
    return this.model.banks$.pipe(
      map((banksState: IBanks) => {
        if (!!banksState.data) {
          let bankInfo: IBankElement;
          banksState.data.forEach((element) => {
            if (element.value === bankCode) {
              bankInfo = element;
            }
          });
          return bankInfo;
        }
      }),
    );
  }
}

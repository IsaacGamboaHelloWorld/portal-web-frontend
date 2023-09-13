import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { IBankElement } from '@app/core/interfaces/banks.interface';
import { IBanks } from '@app/store/reducers/models/banks/banks.reducer';
import { IHistoric } from '@store/reducers/models/transfer/historic/historic.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransferModel } from '../../transfer.model';

@Component({
  selector: 'app-historic-transfer',
  templateUrl: './historic-transfer.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricTransferComponent {
  @Input() historic: IHistoric;

  constructor(private model: TransferModel) {}

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

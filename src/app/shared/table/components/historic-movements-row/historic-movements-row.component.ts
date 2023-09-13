import { Component, Input, ViewEncapsulation } from '@angular/core';
import {
  BANK_ICONS,
  BANK_NICKNAME,
  TYPE_MOVEMENTS,
} from '@app/modules/tu-plus/constants/constants';
import { ListTransaction } from '@app/modules/tu-plus/entities/historic-movements.interface';
import {
  IBankIcons,
  ITypeMovements,
} from '@app/modules/tu-plus/entities/your-plus.interface';

@Component({
  selector: 'app-historic-movements-row',
  templateUrl: './historic-movements-row.component.html',
  styleUrls: ['./historic-movements-row.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HistoricMovementsRowComponent {
  @Input() data: ListTransaction = null;
  public types: ITypeMovements = TYPE_MOVEMENTS;
  public toggle: boolean = false;
  public bank_icon: IBankIcons = BANK_ICONS;
  public bank_name: IBankIcons = BANK_NICKNAME;

  constructor() {}

  get isSuccess(): boolean {
    return !!this.data;
  }
  get hasData(): ListTransaction {
    return this.data;
  }

  public getIcon(): string {
    if (this.isSuccess && this.hasData) {
      return this.data.TrnType === this.types.CANJE
        ? this._getIconRedemptionItem()
        : this.data.TrnType === this.types.ACUMULACION
        ? this._getIconAccumulationItem()
        : this.bank_icon.AVAL;
    } else {
      return this.bank_icon.AVAL;
    }
  }

  private _getIconRedemptionItem(): string {
    if (this.isSuccess && this.hasData) {
      return this.getIconURL(this.data.RedemptionItem[0].PartnerName);
    }
  }
  private _getIconAccumulationItem(): string {
    if (this.isSuccess && this.hasData) {
      return this.getIconURL(this.data.AccumulationItem[0].AccumulationPartner);
    }
  }
  public getIconURL(iconName: string): string {
    switch (iconName) {
      case this.bank_name.POPULAR:
        return this.bank_icon.POPULAR;
      case this.bank_name.AVVILLAS:
        return this.bank_icon.AVVILLAS;
      case this.bank_name.BOGOTA:
        return this.bank_icon.BOGOTA;
      case this.bank_name.OCCIDENTE:
        return this.bank_icon.OCCIDENTE;
      case this.bank_name.AVAL:
        return this.bank_icon.AVAL;
      default:
        return this.bank_icon.AVAL;
    }
  }
}

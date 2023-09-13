import { Pipe, PipeTransform } from '@angular/core';
import { CREDIT_CARDS_FRANCHISE } from '@core/constants/imgs_cards';
import { isNullOrUndefined } from 'util';

const TYPE_VISA: object = new RegExp(
  '^450658|454405|453405|454476|450658|450011|406694|420559|489469|485926|474634|474638',
);
const TYPE_MC_COLOR: object = new RegExp('^536170|539168|539238');
const TYPE_MC_BLACK: object = new RegExp('^520189');

@Pipe({
  name: 'cardFranchiseType',
})
export class CardFranchiseTypePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!isNullOrUndefined(value)) {
      if (this.validateCard(value, TYPE_VISA)) {
        return CREDIT_CARDS_FRANCHISE.IMG_VISA;
      }
      if (this.validateCard(value, TYPE_MC_COLOR)) {
        return CREDIT_CARDS_FRANCHISE.IMG_MASTER_CARD_COLOR;
      }
      if (this.validateCard(value, TYPE_MC_BLACK)) {
        return CREDIT_CARDS_FRANCHISE.IMG_MASTER_CARD_BLACK;
      }
      return CREDIT_CARDS_FRANCHISE.IMG_DEFAULT;
    }
    return value;
  }

  private validateCard(value: string, regExp: any): boolean {
    return value.toString().match(regExp) !== null;
  }
}

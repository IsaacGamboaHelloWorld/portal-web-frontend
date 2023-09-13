import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { CREDIT_CARDS_FRANCHISE_LOGO } from './../../constants/imgs_cards';

import { CREDIT_CARDS } from '@core/constants/imgs_cards';

const TYPE_VISA: object = new RegExp('^4');
const MASTER_CARD = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
const AMERICAN_EXPRESS: object = new RegExp('^3[47]');
const DINERS: object = new RegExp('^36');
const DINNER_BLANCHE: object = new RegExp('^30[0-5]');

const VISA_NAME = 'Visa';
const MASTER_CARD_NAME = 'Master Card';
const AMERICAN_EXPRESS_NAME = 'American Express';
const DINNER_NAME = 'Dinner';

const PACK_VISA = {
  img: CREDIT_CARDS.IMG_VISA,
  name: VISA_NAME,
  logo: CREDIT_CARDS_FRANCHISE_LOGO.IMG_VISA,
};

const PACK_MASTER_CARD = {
  img: CREDIT_CARDS.IMG_MASTER_CARD,
  name: MASTER_CARD_NAME,
  logo: CREDIT_CARDS_FRANCHISE_LOGO.IMG_MASTER_CARD,
};

const PACK_AMERICAN_EXPRESS = {
  img: CREDIT_CARDS.IMG_AMERICAN_EXPRESS,
  name: AMERICAN_EXPRESS_NAME,
  logo: CREDIT_CARDS_FRANCHISE_LOGO.IMG_DEFAULT,
};

const PACK_DINNER = {
  img: CREDIT_CARDS.IMG_DINNER,
  name: DINNER_NAME,
  logo: CREDIT_CARDS_FRANCHISE_LOGO.IMG_DEFAULT,
};

const DEFAULT = {
  img: CREDIT_CARDS.IMG_DEFAULT,
  name: '',
  logo: CREDIT_CARDS_FRANCHISE_LOGO.IMG_DEFAULT,
};

@Pipe({
  name: 'typeCreditCard',
})
export class TypeCreditCardPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!isNullOrUndefined(value)) {
      if (this.validateCard(value, TYPE_VISA)) {
        return PACK_VISA;
      }

      if (MASTER_CARD.test(value)) {
        return PACK_MASTER_CARD;
      }

      if (this.validateCard(value, AMERICAN_EXPRESS)) {
        return PACK_AMERICAN_EXPRESS;
      }

      if (
        this.validateCard(value, DINERS) ||
        this.validateCard(value, DINNER_BLANCHE)
      ) {
        return PACK_DINNER;
      }

      return DEFAULT;
    }

    return DEFAULT;
  }

  private validateCard(value: string, regExp: any): boolean {
    return value.toString().match(regExp) !== null;
  }
}

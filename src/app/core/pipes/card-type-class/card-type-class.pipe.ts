import { Pipe, PipeTransform } from '@angular/core';
import { CREDIT_CARDS_BACKGROUNDS } from '@core/constants/imgs_cards';
import { isNullOrUndefined } from 'util';
import {
  CARD_TYPES_CLASS,
  CARD_TYPES_NAMES,
} from '../../constants/credit_card_class_types';

const TYPE_VISA_CLASIC: object = new RegExp('^450658');
const TYPE_VISA_GOLD: object = new RegExp('^454405|453405');
const TYPE_VISA_ENTERP: object = new RegExp('^454476');
const TYPE_VISA_BLACK: object = new RegExp('^450658');
const TYPE_VISA_POPULAR: object = new RegExp('^450011');
const TYPE_VISA_PLATINIUM: object = new RegExp('^406694');
const TYPE_VISA_DIAMANT: object = new RegExp('^420559');
const TYPE_VISA_SIGNATURE: object = new RegExp('^489469');
const TYPE_VISA_EXPRESS: object = new RegExp('^485926|474634|474638');
const TYPE_MC_ESTANDAR: object = new RegExp('^536170');
const TYPE_MC_BLACK: object = new RegExp('^520189');
const TYPE_MC_GOLD: object = new RegExp('^539168');
const TYPE_MC_PLATINO: object = new RegExp('^539238');

@Pipe({
  name: 'cardTypeclass',
})
export class CardTypeclassPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!isNullOrUndefined(value)) {
      if (this.validateCard(value, TYPE_VISA_CLASIC)) {
        return {
          class: CARD_TYPES_CLASS.VISA_CLASSIC,
          name: CARD_TYPES_NAMES.VISA_CLASSIC,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_VISA_CLASSIC,
        };
      }
      if (this.validateCard(value, TYPE_VISA_GOLD)) {
        return {
          class: CARD_TYPES_CLASS.VISA_GOLD,
          name: CARD_TYPES_NAMES.VISA_GOLD,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_VISA_GOLD,
        };
      }
      if (this.validateCard(value, TYPE_VISA_ENTERP)) {
        return {
          class: CARD_TYPES_CLASS.VISA_CLASSIC,
          name: CARD_TYPES_NAMES.VISA_CLASSIC,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_VISA_CLASSIC,
        };
      }
      if (this.validateCard(value, TYPE_VISA_BLACK)) {
        return {
          class: CARD_TYPES_CLASS.VISA_BLACK,
          name: CARD_TYPES_NAMES.VISA_BLACK,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_VISA_BLACK,
        };
      }
      if (this.validateCard(value, TYPE_VISA_POPULAR)) {
        return {
          class: CARD_TYPES_CLASS.VISA_CLASSIC,
          name: CARD_TYPES_NAMES.VISA_CLASSIC,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_VISA_CLASSIC,
        };
      }
      if (this.validateCard(value, TYPE_VISA_PLATINIUM)) {
        return {
          class: CARD_TYPES_CLASS.VISA_PLATINIUM,
          name: CARD_TYPES_NAMES.VISA_PLATINIUM,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_VISA_PLATINIUM,
        };
      }
      if (this.validateCard(value, TYPE_VISA_DIAMANT)) {
        return {
          class: CARD_TYPES_CLASS.VISA_CLASSIC,
          name: CARD_TYPES_NAMES.VISA_CLASSIC,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_VISA_CLASSIC,
        };
      }
      if (this.validateCard(value, TYPE_VISA_SIGNATURE)) {
        return {
          class: CARD_TYPES_CLASS.VISA_CLASSIC,
          name: CARD_TYPES_NAMES.VISA_CLASSIC,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_VISA_CLASSIC,
        };
      }
      if (this.validateCard(value, TYPE_VISA_EXPRESS)) {
        return {
          class: CARD_TYPES_CLASS.VISA_CLASSIC,
          name: CARD_TYPES_NAMES.VISA_CLASSIC,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_VISA_CLASSIC,
        };
      }
      if (this.validateCard(value, TYPE_MC_ESTANDAR)) {
        return {
          class: CARD_TYPES_CLASS.MC_REGULAR,
          name: CARD_TYPES_NAMES.MC_REGULAR,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_MC_REGULAR,
        };
      }
      if (this.validateCard(value, TYPE_MC_BLACK)) {
        return {
          class: CARD_TYPES_CLASS.MC_BLACK,
          name: CARD_TYPES_NAMES.MC_BLACK,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_MC_BLACK,
        };
      }
      if (this.validateCard(value, TYPE_MC_GOLD)) {
        return {
          class: CARD_TYPES_CLASS.MC_GOLD,
          name: CARD_TYPES_NAMES.MC_GOLD,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_MC_GOLD,
        };
      }
      if (this.validateCard(value, TYPE_MC_PLATINO)) {
        return {
          class: CARD_TYPES_CLASS.MC_PLATINO,
          name: CARD_TYPES_NAMES.MC_PLATINO,
          background: CREDIT_CARDS_BACKGROUNDS.IMG_MC_PLATINO,
        };
      }
      if (!value) {
        return {
          class: CARD_TYPES_CLASS.VISA_CLASSIC,
          name: CARD_TYPES_NAMES.VISA_CLASSIC,
          background: CREDIT_CARDS_BACKGROUNDS.BG_BLANK,
        };
      }
    }
    return {
      class: CARD_TYPES_CLASS.VISA_CLASSIC,
      name: CARD_TYPES_NAMES.VISA_CLASSIC,
      background: CREDIT_CARDS_BACKGROUNDS.BG_BLANK,
    };
  }

  private validateCard(value: string, regExp: any): boolean {
    return value.toString().match(regExp) !== null;
  }
}

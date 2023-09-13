import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'dsMaskCreditCard',
})
export class DsMaskCreditCardPipe implements PipeTransform {
  transform(
    value: string,
    returnHtml: boolean = true,
    hide: boolean = true,
  ): string {
    if (!isNullOrUndefined(value) && value !== '') {
      const formatted = this._formatWitoutHtml(value);
      if (returnHtml && hide) {
        return this._convertHtml(formatted, true);
      } else if (returnHtml && !hide) {
        return this._convertHtml(formatted);
      } else if (!returnHtml && hide) {
        return this._hideWitoutHtml(formatted);
      } else {
        return formatted;
      }
    }
    return '';
  }

  /**
   * return number formatted
   * @param value credit card number
   */
  private _formatWitoutHtml(value: string): string {
    if (value.length <= 8) {
      return value.replace(/([0-9]{4})([0-9*])/, '$1 $2');
    } else if (value.length >= 9 && value.length <= 13) {
      return value.replace(/([0-9]{4})([0-9]{4})([0-9*])/, '$1 $2 $3');
    } else {
      return value.replace(
        /([0-9]{4})([0-9]{4})([0-9]{4})([0-9*])/,
        '$1 $2 $3 $4',
      );
    }
  }

  /**
   * hide numbers
   * @param value credit card number formated
   * @returns credit card with first numbers hide
   */
  private _hideWitoutHtml(value: string): string {
    let returnedData = '';
    const mask = value.toString().match(/(.{3,4})$/);
    const length2change = value.indexOf(mask[0]);
    const returnData = value.slice(0, length2change);
    returnedData = returnData.replace(/[0-9]/g, '•');
    value = returnedData + mask[0];
    return value;
  }

  /**
   * return result item into html
   * @param formatted credit card number formated
   * @param mask boolean for hide numbers
   */
  private _convertHtml(formatted: string, mask: boolean = false): string {
    const split = formatted.split(' ');
    const lastIndex = split.length - 1;
    const concatHtml = split.map((item: string, index: number) => {
      if (mask) {
        return `<p>${
          lastIndex === index ? item : item.replace(/[0-9]/g, '•')
        }</p>`;
      } else {
        return `<p>${item}</p>`;
      }
    });
    return `<div class="split-card-container"> ${concatHtml.join('')} </div>`;
  }
}

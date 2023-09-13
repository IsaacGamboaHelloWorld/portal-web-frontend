import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'replace',
})
export class RemoveValuePipe implements PipeTransform {
  transform(value: any, search: string = '', replace: string = ''): any {
    return !isNullOrUndefined(value) ? value.replace(search, replace) : '';
  }
}
